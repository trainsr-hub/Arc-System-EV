import React, { useState } from 'react';
import { EvoAvatar } from '../../../../molecule/EvoAvatar/EvoAvatar';
import { Crown, ChevronDown, ChevronUp, Swords, Zap } from 'lucide-react';
import type { GachaTopDinosWorkerProps } from '../../types';
import './GachaTopDinosWorker.css';

const RARITY_COLORS: Record<string, string> = {
    common: '#a0aec0',
    rare: '#3b82f6',
    'super-rare': '#eab308',
    'super rare': '#eab308',
    legendary: '#a855f7',
    tournament: '#ec4899',
    vip: '#06b6d4',
    star: '#ffd700',
    'super-star': '#ffd700',
    toy: '#f97316',
    boss: '#ef4444'
};

const getImage = (lookup: any, category: string, key: string, fallback: string) => {
    return lookup?.[category]?.[key] ?? fallback;
};

/**
 * Worker: GachaTopDinosWorker
 * Responsibility: Renders the user's Apex Vanguard (Top 3 Dinos) panel on the left side
 * of the Gacha Init view, displaying their contribution to the active Ferocity Cap
 * with full-size EvoAvatars matching the List of Dinos catalog.
 */
export const GachaTopDinosWorker: React.FC<GachaTopDinosWorkerProps> = ({
    top3Dinos,
    top3Ferocity,
    cap,
    lookup
}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full flex flex-col items-center gap-3">
            {/* Toggle Header Button for small screens */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition border cursor-pointer select-none ${
                    isOpen
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                        : 'bg-white/5 border-white/15 text-gray-400 hover:text-white'
                }`}
            >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Apex Vanguard (Top 3 Dinos)</span>
                {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Docked Left Panel */}
            {isOpen && (
                <div className="dino-top3-panel dino-top3-panel-docked">
                    {/* Header */}
                    <div className="dino-top3-header">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#ffd86b]/30 to-[#841822]/40 border border-[#ffd86b]/40 flex items-center justify-center text-[#ffd86b]">
                                <Crown className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-[#f5f0e8] uppercase tracking-wider font-cinzel">
                                    Apex Vanguard
                                </div>
                                <div className="text-[10px] text-[#9c93a8]">
                                    Top 3 Ferocity Contributors
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#ffd700] bg-black/40 px-2.5 py-1 rounded-lg border border-amber-500/30">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>⚡{top3Ferocity}</span>
                        </div>
                    </div>

                    {/* Telemetry Bar */}
                    <div className="px-3 py-1.5 bg-black/30 border-b border-white/5 flex justify-between items-center text-[10.5px] text-[#8c7a9e]">
                        <span>Pool Cap: <strong className="text-amber-400">⚡{cap}</strong></span>
                        <span className="text-[10px] font-mono text-emerald-400">
                            {top3Dinos.length}/3 Vanguards
                        </span>
                    </div>

                    {/* Top 3 List */}
                    <div className="dino-top3-content">
                        {top3Dinos.map((dino, idx) => {
                            const rankClass = `rank-${idx + 1}`;
                            const frameUrl = getImage(lookup, 'portrait_frames', dino.rarity, `https://cdn.paleo.gg/games/jwtg/images/portrait-frame/${dino.rarity}.png`);
                            const classIconUrl = getImage(lookup, 'class_icons', dino.class || '', `https://cdn.paleo.gg/games/jwtg/images/class/${dino.class}.png`);
                            const rarityColor = RARITY_COLORS[(dino.rarity || '').toLowerCase()] || '#a0aec0';

                            return (
                                <div
                                    key={dino.uuid}
                                    className={`dino-top3-card ${rankClass}`}
                                >
                                    {/* Rank Badge #1, #2, #3 */}
                                    <div className={`dino-top3-badge ${rankClass}`}>
                                        #{idx + 1}
                                    </div>

                                    {/* Full-Size Avatar Matching List of Dinos (size 60) */}
                                    <div className="shrink-0">
                                        <EvoAvatar
                                            size={60}
                                            imageUrl={dino.evoImg}
                                            frameUrl={frameUrl}
                                            isUnlocked={true}
                                            showLockOverlay={false}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-bold text-white truncate font-cinzel">
                                                {dino.name}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[10px] flex-wrap mt-0.5">
                                            {classIconUrl && (
                                                <img src={classIconUrl} width="12" height="12" alt={dino.class} />
                                            )}
                                            <span style={{ color: rarityColor }} className="font-semibold capitalize">
                                                {dino.rarity}
                                            </span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-cyan-400 font-bold font-mono">
                                                LV.{dino.level}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Ferocity + Stats */}
                                    <div className="flex flex-col items-end shrink-0 gap-0.5">
                                        <div className="flex items-center gap-1 text-[#ffd700] font-bold text-xs font-mono">
                                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                                            <span>{dino.ferocity}</span>
                                        </div>
                                        <div className="text-[9.5px] text-gray-400 font-mono">
                                            <span className="text-red-400">{dino.damage}</span>/<span className="text-emerald-400">{dino.health}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Fill placeholder slots if player has fewer than 3 dinos */}
                        {Array.from({ length: Math.max(0, 3 - top3Dinos.length) }).map((_, i) => {
                            const slotIndex = top3Dinos.length + i + 1;
                            return (
                                <div key={`empty-${slotIndex}`} className="dino-top3-empty">
                                    <Swords className="w-4 h-4 text-gray-600" />
                                    <span>Empty Vanguard Slot #{slotIndex} (Floor: 200 Fero)</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
