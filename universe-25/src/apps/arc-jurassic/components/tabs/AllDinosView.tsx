import React, { useMemo, useState } from 'react';
import { DinoDetailsView } from './DinoDetailsView';
import { rutGonTime } from '../../core/rutGonTime';
import { EvoAvatar } from '../molecule/EvoAvatar/EvoAvatar';

interface AllDinosViewProps {
  objects: any[];
  lookup: any;
  userProgress: any;
  onBack: () => void;
}

export const AllDinosView: React.FC<AllDinosViewProps> = ({ objects, lookup, userProgress, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClasses, setFilterClasses] = useState<string[]>([]);
  const [filterRarities, setFilterRarities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('ferocity');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  const getImage = (category: string, key: string, fallback: string) => {
    return lookup?.[category]?.[key] ?? fallback;
  };

  const uniqueClasses = useMemo(() => Array.from(new Set(objects.map(o => (o.class || '').toLowerCase()))).filter(Boolean), [objects]);
  const uniqueRarities = useMemo(() => Array.from(new Set(objects.map(o => (o.rarity || '').toLowerCase()))).filter(Boolean), [objects]);

  const toggleFilter = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else setList([...list, item]);
  };

  const listData = useMemo(() => {
    if (!objects || !Array.isArray(objects)) return [];

    let mapped = objects.map(item => {
      const uuid = item.uuid || item.id || item.name;
      const userDino = userProgress?.owned_dinos?.[uuid];

      const number = userDino ? (Number(userDino.number) || 0) : 0;
      const rank = userDino ? (Number(userDino.rank) || 0) : 0;
      const isUnlocked = number > 0;

      const evolutions = item.evolutions || [];
      const maxIndex = Math.max(0, evolutions.length - 1);
      const targetRank = Math.max(1, rank);
      let evoIndex = targetRank - 1;
      if (evoIndex > maxIndex) evoIndex = maxIndex;

      const currentEvo = evolutions[evoIndex] || {};

      const damage = currentEvo.damage || 0;
      const health = currentEvo.health || 0;
      const ferocity = damage + (health / 3.2);
      const hatchTime = Number(item.hatch_time_mins) || 0;

      const sellPrice = (Number(item.sell_price_dna) || 0) * 2;
      const efficiency = (sellPrice > 0 && hatchTime > 0) ? (ferocity / (sellPrice * hatchTime)) : 0;
      const releaseTime = new Date(item.release_date || "1970-01-01").getTime();

      return {
        uuid, isUnlocked, rank, ferocity, damage, health, hatchTime, sellPrice, efficiency, releaseTime,
        evoImg: currentEvo.image_url || "",
        rarity: (item.rarity || "").toLowerCase(),
        class: (item.class || "").toLowerCase(),
        name: item.name || "",
        image_url: item.image_url || "",
        hybrid_type: item.hybrid_type || "",
        region: item.region || "",
        facts: item.facts || [],
        ingredients: item.ingredients || [],
        evolutions: item.evolutions || []
      };
    });

    // Filter by search
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      mapped = mapped.filter(d =>
        d.name.toLowerCase().includes(term) ||
        d.class.includes(term) ||
        d.rarity.includes(term) ||
        d.hybrid_type.includes(term) ||
        d.region.includes(term)
      );
    }

    // Filter by class
    if (filterClasses.length > 0) {
      mapped = mapped.filter(d => filterClasses.includes(d.class));
    }
    // Filter by rarity
    if (filterRarities.length > 0) {
      mapped = mapped.filter(d => filterRarities.includes(d.rarity));
    }

    // Sort
    mapped.sort((a, b) => {
      if (a.isUnlocked && !b.isUnlocked) return -1;
      if (!a.isUnlocked && b.isUnlocked) return 1;

      const valA = (a as any)[sortBy] || 0;
      const valB = (b as any)[sortBy] || 0;
      const modifier = sortOrder === 'asc' ? 1 : -1;

      if (valA !== valB) {
        return (valA - valB) * modifier;
      }

      return b.releaseTime - a.releaseTime;
    });

    return mapped;
  }, [objects, userProgress, searchTerm, filterClasses, filterRarities, sortBy, sortOrder]);

  const getStatDisplayInfo = (data: any) => {
    switch (sortBy) {
      case 'damage':
        return {
          valueStr: Math.round(data.damage).toLocaleString(),
          icon: getImage("stats", "damage", "https://cdn.paleo.gg/games/jwtg/images/stats/damage.png"),
          color: "#e74c3c"
        };
      case 'health':
        return {
          valueStr: Math.round(data.health).toLocaleString(),
          icon: getImage("stats", "health", "https://cdn.paleo.gg/games/jwtg/images/stats/health.png"),
          color: "#2ecc71"
        };
      case 'hatchTime':
        return {
          valueStr: rutGonTime(data.hatchTime, 'minutes'),
          icon: getImage("stats", "time", "⏳"),
          color: "#3498db"
        };
      case 'sellPrice':
        return {
          valueStr: Math.round(data.sellPrice).toLocaleString(),
          icon: getImage("stats", "dna", "🧬"),
          color: "#9b59b6"
        };
      case 'efficiency':
        return {
          valueStr: data.efficiency.toFixed(4),
          icon: getImage("stats", "efficiency", "📈"),
          color: "#00e5ff"
        };
      case 'ferocity':
      default:
        return {
          valueStr: Math.round(data.ferocity).toLocaleString(),
          icon: getImage("stats", "ferocity", "https://cdn.paleo.gg/games/jwtg/images/stats/ferocity.png"),
          color: "#ffd700"
        };
    }
  };

  if (selectedUuid) {
    return (
      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', width: '100%' }}>
        <DinoDetailsView
          uuid={selectedUuid}
          objects={objects}
          lookup={lookup}
          userProgress={userProgress}
          onBack={onBack}
        />
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', width: '100%' }}>
      <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '16px', color: '#eee', textTransform: 'uppercase', letterSpacing: '1px' }}>All Dinosaurs</h3>

      <div style={{ marginBottom: '25px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#aaa', textTransform: 'uppercase', minWidth: '60px' }}>Search:</span>
          <input
            type="text"
            placeholder="Search by name, class, rarity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: '#111', color: 'white', border: '1px solid #444', padding: '6px 12px', borderRadius: '4px', outline: 'none', fontSize: '13px', cursor: 'pointer', minWidth: '150px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#aaa', textTransform: 'uppercase', minWidth: '60px' }}>Class:</span>
          {uniqueClasses.map(cls => (
            <div
              key={cls}
              onClick={() => toggleFilter(cls, filterClasses, setFilterClasses)}
              style={{
                padding: '4px 12px', fontSize: '11px', borderRadius: '14px', cursor: 'pointer', textTransform: 'capitalize', fontWeight: 'bold', transition: 'all 0.15s ease',
                background: filterClasses.includes(cls) ? '#4CAF50' : 'rgba(255,255,255,0.05)',
                color: filterClasses.includes(cls) ? '#fff' : '#aaa',
                border: `1px solid ${filterClasses.includes(cls) ? '#4CAF50' : 'rgba(255,255,255,0.15)'}`
              }}
            >
              {cls}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#aaa', textTransform: 'uppercase', minWidth: '60px' }}>Rarity:</span>
          {uniqueRarities.map(rarity => (
            <div
              key={rarity}
              onClick={() => toggleFilter(rarity, filterRarities, setFilterRarities)}
              style={{
                padding: '4px 12px', fontSize: '11px', borderRadius: '14px', cursor: 'pointer', textTransform: 'capitalize', fontWeight: 'bold', transition: 'all 0.15s ease',
                background: filterRarities.includes(rarity) ? '#7c4dff' : 'rgba(255,255,255,0.05)',
                color: filterRarities.includes(rarity) ? '#fff' : '#aaa',
                border: `1px solid ${filterRarities.includes(rarity) ? '#7c4dff' : 'rgba(255,255,255,0.15)'}`
              }}
            >
              {rarity}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#aaa', textTransform: 'uppercase' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ background: '#111', color: 'white', border: '1px solid #444', padding: '6px 12px', borderRadius: '4px', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
          >
            <option value="ferocity">Ferocity</option>
            <option value="damage">Damage</option>
            <option value="health">Health</option>
            <option value="hatchTime">Hatching Time</option>
            <option value="sellPrice">Sell Price (DNA)</option>
            <option value="efficiency">Efficiency Index (Fero / Price×Time)</option>
          </select>
          <button
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            style={{ background: 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)', color: 'white', border: '1px solid #a0aec0', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
          >
            {sortOrder === 'desc' ? '⬇ GIẢM DẦN' : '⬆ TĂNG DẦN'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        {listData.map(data => {
          const frameUrl = getImage("portrait_frames", data.rarity, `https://cdn.paleo.gg/games/jwtg/images/portrait-frame/${data.rarity}.png`);

          const statInfo = getStatDisplayInfo(data);

          return (
            <div
              key={data.uuid}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div
                onClick={() => setSelectedUuid(data.uuid)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: '#111',
                  transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                  cursor: 'pointer',
                  flexShrink: 0,
                  padding: '8px',
                  borderRadius: '8px',
                  border: data.isUnlocked ? '2px solid #ffd700' : '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <EvoAvatar
                  size={64}
                  imageUrl={data.evoImg}
                  frameUrl={frameUrl}
                  isUnlocked={data.isUnlocked}
                  style={{ margin: 0 }}
                />
                {data.isUnlocked && (
                  <div style={{ marginTop: '4px', fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                    LV{data.rank > 0 ? data.rank * 10 : '?'}
                  </div>
                )}
              </div>

              {data.isUnlocked && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 'bold', color: statInfo.color, marginTop: '6px' }}>
                  {statInfo.icon.startsWith('http')
                    ? <img src={statInfo.icon} width="14" height="14" style={{ objectFit: 'contain' }} alt={sortBy} />
                    : <span style={{ fontSize: '14px' }}>{statInfo.icon}</span>
                  }
                  {statInfo.valueStr}
                </div>
              )}
              {!data.isUnlocked && (
                <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Locked</div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .dino-avatar-item:hover {
          transform: scale(1.12) !important;
          z-index: 5 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.6) !important;
        }
      `}</style>
    </div>
  );
};