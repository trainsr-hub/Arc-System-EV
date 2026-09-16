// path: src/core/syncEngine.ts — Dynamic Plugin-Aware Sync Engine
// Mandate: Authoritative Backend SQLite persistence for Game Resources & Progress.

import { execute } from './api'
import { useCurrencyStore } from '../store/useCurrencyStore'
import { useInventoryStore } from '../store/useInventoryStore'
import { useGoldenHourStore } from '../apps/golden-hour/store/useGoldenHourStore'
import { useGlobalStore } from '../store/useGlobalStore'
import type { Plot } from './types'
import type { PullItem, ArenaSlot, EnergyReserves } from '../apps/golden-hour/types'

export interface BackendStateData {
  timeBalance?: number
  userProfile?: { name: string; avatar: string; createdAt: string }
  hazardProfile?: { goldenHours: number; hazardLevel: number }
}

export interface BackendInventoryData {
  discs?: number
  solarEssence?: number
  codexFragments?: number
  angelRollTickets?: number
  solarRollTickets?: number
  codexRollTickets?: number
}

export interface BackendVaultData {
  vault?: PullItem[]
  arenaSlots?: ArenaSlot[]
  energyReserves?: EnergyReserves
  totalPulls?: number
}

export interface BackendFarmsData {
  [key: string]: Plot[] | undefined
}

export interface ArcResourceItem {
  amount: number
  unit?: string
  name?: string
  icon?: string
  description?: string
  updated_at?: string
}

export interface ArcResourcesMap {
  jurassic_time?: ArcResourceItem
  dna?: ArcResourceItem
  red_orbs?: ArcResourceItem
  [key: string]: ArcResourceItem | undefined
}

export interface ArcDinoProgressItem {
  number: number
  rank: number
  ferocity?: number
  updated_at?: string
}

export interface ArcProgressMap {
  owned_dinos: Record<string, ArcDinoProgressItem>
}

export async function logAuditEvent(eventType: string, details: Record<string, unknown> = {}): Promise<void> {
  try {
    await execute('events', 'append', undefined, {
      event_type: eventType,
      timestamp: new Date().toISOString(),
      details,
    })
  } catch (err) {
    console.warn(`[SyncEngine] Audit event logging failed: ${err instanceof Error ? err.message : String(err)}`)
  }
}

export async function persistState(data: BackendStateData): Promise<void> {
  const current = (await execute<BackendStateData>('state', 'read_all')).data || {}
  const merged = { ...current, ...data }
  await execute('state', 'overwrite', undefined, merged)
}

export async function persistInventory(data: BackendInventoryData): Promise<void> {
  const current = (await execute<BackendInventoryData>('inventory', 'read_all')).data || {}
  const merged = { ...current, ...data }
  await execute('inventory', 'overwrite', undefined, merged)
}

export async function persistVault(data: BackendVaultData): Promise<void> {
  const current = (await execute<BackendVaultData>('vault', 'read_all')).data || {}
  const merged = { ...current, ...data }
  await execute('vault', 'overwrite', undefined, merged)
}

export async function persistFarms(data: BackendFarmsData): Promise<void> {
  const current = (await execute<BackendFarmsData>('farms', 'read_all')).data || {}
  const merged = { ...current, ...data }
  await execute('farms', 'overwrite', undefined, merged)
}

/**
 * Authoritative SQLite I/O for ARC Jurassic Resources
 */
export async function fetchArcResources(): Promise<ArcResourcesMap> {
  const res = await execute<Record<string, ArcResourceItem>>('arc_resources', 'read_all')
  const rows = res.data || {}
  return {
    jurassic_time: rows.jurassic_time || { amount: 14400, unit: 'seconds', name: 'Jurassic Time' },
    dna: rows.dna || { amount: 50000, unit: 'dna', name: 'DNA' },
    red_orbs: rows.red_orbs || { amount: 50, unit: 'orbs', name: 'Red Orbs' },
  }
}

export async function persistArcResources(data: ArcResourcesMap): Promise<void> {
  const payload: Record<string, any> = {}
  const now = new Date().toISOString()

  for (const [id, item] of Object.entries(data)) {
    if (item && typeof item === 'object') {
      payload[id] = {
        amount: Number(item.amount || 0),
        unit: item.unit || '',
        name: item.name || id,
        icon: item.icon || '',
        description: item.description || '',
        updated_at: now,
      }
    }
  }

  await execute('arc_resources', 'batch_upsert', undefined, payload)
}

/**
 * Authoritative SQLite I/O for ARC Jurassic Dinosaur Progress & Total Army Ferocity
 */
export async function fetchArcProgress(): Promise<ArcProgressMap> {
  const res = await execute<Record<string, { number: number; rank: number; ferocity?: number; updated_at?: string }>>('arc_progress', 'read_all')
  const rows = res.data || {}
  const owned_dinos: Record<string, ArcDinoProgressItem> = {}

  for (const [uuid, d] of Object.entries(rows)) {
    owned_dinos[uuid] = {
      number: Number(d.number || 0),
      rank: Number(d.rank || 0),
      ferocity: Number(d.ferocity || 0),
      updated_at: d.updated_at,
    }
  }

  return { owned_dinos }
}

export async function persistArcProgress(progress: ArcProgressMap): Promise<void> {
  const payload: Record<string, any> = {}
  const now = new Date().toISOString()

  for (const [uuid, d] of Object.entries(progress.owned_dinos || {})) {
    payload[uuid] = {
      number: Number(d.number || 0),
      rank: Number(d.rank || 0),
      ferocity: Number(d.ferocity || 0),
      updated_at: now,
    }
  }

  await execute('arc_progress', 'batch_upsert', undefined, payload)
}

export async function resetArcProgress(): Promise<void> {
  const current = await fetchArcProgress()
  const keys = Object.keys(current.owned_dinos || {})
  if (keys.length > 0) {
    await execute('arc_progress', 'batch_delete', undefined, keys)
  }
}

/**
 * Hydrates all master game stores from the authoritative backend storage engine.
 */
export async function hydrateAllStores(): Promise<{ success: boolean }> {
  const [stateRes, invRes, vaultRes, farmsRes] = await Promise.all([
    execute<BackendStateData>('state', 'read_all'),
    execute<BackendInventoryData>('inventory', 'read_all'),
    execute<BackendVaultData>('vault', 'read_all'),
    execute<BackendFarmsData>('farms', 'read_all'),
  ])

  const stateData = stateRes.data || {}
  const invData = invRes.data || {}
  const vaultData = vaultRes.data || {}
  const farmsData = farmsRes.data || {}

  if (typeof stateData.timeBalance === 'number') {
    useCurrencyStore.setState({ timeBalance: stateData.timeBalance })
  } else {
    await persistState({ timeBalance: 3600 })
    useCurrencyStore.setState({ timeBalance: 3600 })
  }

  if (stateData.userProfile) {
    useGlobalStore.setState({ userProfile: stateData.userProfile })
  }

  useInventoryStore.setState({
    discs: invData.discs ?? 0,
    solarEssence: invData.solarEssence ?? 0,
    codexFragments: invData.codexFragments ?? 0,
    angelRollTickets: invData.angelRollTickets ?? 0,
    solarRollTickets: invData.solarRollTickets ?? 0,
    codexRollTickets: invData.codexRollTickets ?? 0,
  })

  useGoldenHourStore.setState((prev) => ({
    vault: vaultData.vault ?? prev.vault,
    arenaSlots: vaultData.arenaSlots ?? prev.arenaSlots,
    energyReserves: vaultData.energyReserves ?? prev.energyReserves,
    totalPulls: vaultData.totalPulls ?? prev.totalPulls,
  }))

  for (const [key, plots] of Object.entries(farmsData)) {
    if (key && Array.isArray(plots)) {
      console.log(`[SyncEngine] Plugin farm tier loaded: ${key} (${plots.length} plots)`)
    }
  }

  await logAuditEvent('SESSION_HYDRATED', {
    timeBalance: useCurrencyStore.getState().timeBalance,
    totalVaultItems: useGoldenHourStore.getState().vault.length,
    angelTickets: useInventoryStore.getState().angelRollTickets,
    solarTickets: useInventoryStore.getState().solarRollTickets,
    codexTickets: useInventoryStore.getState().codexRollTickets,
  })

  return { success: true }
}
