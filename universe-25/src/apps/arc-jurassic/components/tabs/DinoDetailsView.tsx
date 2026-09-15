// path: src/apps/arc-jurassic/components/tabs/DinoDetailsView.tsx
import React, { useEffect, useRef } from 'react';
import { DinoCard } from '../molecule/DinoCard/DinoCard';
import { EvoAvatar } from '../molecule/EvoAvatar/EvoAvatar';

// ============================================================================
// [MODIFIED_START: ÁP DỤNG MOLECULE COMPONENTS]
// - Nhúng <DinoCard /> để thay thế toàn bộ khối code render thẻ bài bên trái.
// - Nhúng <EvoAvatar /> để thay thế cấu trúc render ảnh tiến hóa ở thanh Progress.
// ============================================================================

interface DinoDetailsProps {
    uuid: string;
    objects: any[];
    lookup: any;
    userProgress: any;
    onBack: () => void;
}

export const DinoDetailsView: React.FC<DinoDetailsProps> = ({ uuid, objects, lookup, userProgress, onBack }) => {
    const dino = objects.find(o => o.uuid === uuid);

    // Refs cho Animation
    const progressBarRef = useRef<HTMLDivElement>(null);
    const evoNodeRefs = useRef<(HTMLDivElement | null)[]>([]);

    const getImage = (category: string, key: string, fallback: string) => {
        return lookup?.[category]?.[key] ?? fallback;
    };

    if (!dino) return <div style={{ color: 'red' }}>Lỗi: Không tìm thấy Dino.</div>;

    // --- 1. TÍNH TOÁN USER PROGRESS ---
    const userDinoData = userProgress?.owned_dinos?.[uuid] || { number: 0, rank: 0 };
    const dinoRank = Number(userDinoData.rank) || 0;
    const dinoNumber = Number(userDinoData.number) || 0;
    const isLeftCardUnlocked = dinoNumber !== 0;

    // --- 2. RARITY & THEME ---
    const rawRarity = (dino.rarity || "").toLowerCase();
    const rarityMap: any = { tournament: "legendary", vip: "legendary", star: "legendary", toy: "legendary", "super-star": "legendary" };
    const displayRarity = (rarityMap[rawRarity] || rawRarity).toUpperCase();
    const rarityColors: any = { COMMON: "#b0c4de", RARE: "#4169e1", "SUPER RARE": "#ffd700", LEGENDARY: "#9370db" };
    const themeColor = rarityColors[displayRarity] || "#888";

    // --- 3. CLASSIFICATION ---
    const regionUrl = getImage("region", dino.region, `https://cdn.paleo.gg/games/jwtg/images/region/${dino.region}.png`);
    const classIconUrl = getImage("class_icons", dino.class, `https://cdn.paleo.gg/games/jwtg/images/class/${dino.class}.png`);
    const hybridTypeUrl = getImage("hybrid_types", dino.hybrid_type, `https://cdn.paleo.gg/games/jwtg/images/hybrid-type/${dino.hybrid_type}.png`);

    const capitalize = (str: string) => str ? str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "N/A";

    // --- 4. STATS ---
    const evolutions = dino.evolutions || [];
    const currentEvo = evolutions.length === 0 ? null : !isLeftCardUnlocked ? evolutions[evolutions.length - 1] : evolutions[Math.min(Math.max(dinoRank - 1, 0), evolutions.length - 1)];
    const currentDamage = currentEvo?.damage !== undefined ? currentEvo.damage.toLocaleString() : "N/A";
    const currentHealth = currentEvo?.health !== undefined ? currentEvo.health.toLocaleString() : "N/A";
    const currentFerocity = currentEvo?.damage !== undefined && currentEvo?.health !== undefined ? Math.floor(currentEvo.damage + currentEvo.health / 3.2) : "N/A";

    const damageIconUrl = getImage("stats", "damage", "https://cdn.paleo.gg/games/jwtg/images/stats/damage.png");
    const healthIconUrl = getImage("stats", "health", "https://cdn.paleo.gg/games/jwtg/images/stats/health.png");

    // --- 5. PROGRESS & ANIMATION (Effect) ---
    let progressWidth = 0;
    if (dinoNumber <= 0) progressWidth = 0;
    else if (dinoNumber <= 1) progressWidth = dinoNumber * 12.5;
    else if (dinoNumber <= 2) progressWidth = 12.5 + (dinoNumber - 1) * 25;
    else if (dinoNumber <= 4) progressWidth = 37.5 + ((dinoNumber - 2) / 2) * 25;
    else if (dinoNumber <= 8) progressWidth = 62.5 + ((dinoNumber - 4) / 4) * 25;
    else progressWidth = 100;

    useEffect(() => {
        if (!progressBarRef.current || evoNodeRefs.current.length === 0) return;

        const evoMilestones = [12.5, 37.5, 62.5, 87.5];
        const evoUnlockedScale = 1.10;
        const evoTemporaryScale = 1.12;
        const animationDuration = 1400;
        let animationStart = performance.now();
        let previousProgress = 0;
        let frameId: number;

        const triggerEvoAnimation = (node: HTMLDivElement | null, isUnlocked: boolean) => {
            if (!node || node.dataset.evoTriggered === "true") return;
            node.dataset.evoTriggered = "true";
            node.style.transform = `scale(${evoTemporaryScale})`;
            setTimeout(() => {
                if(node) node.style.transform = isUnlocked ? `scale(${evoUnlockedScale})` : "scale(1)";
            }, 280);
        };

        const animateProgress = (now: number) => {
            const elapsed = now - animationStart;
            const rawT = Math.min(elapsed / animationDuration, 1);
            const easedT = 1 - Math.pow(1 - rawT, 3);
            const currentProgress = progressWidth * easedT;

            if (progressBarRef.current) progressBarRef.current.style.width = `${currentProgress}%`;

            evoNodeRefs.current.forEach((node, i) => {
                const milestone = evoMilestones[i] !== undefined ? evoMilestones[i] : ((i + 0.5) / evoNodeRefs.current.length) * 100;
                if (previousProgress < milestone && currentProgress >= milestone) {
                    triggerEvoAnimation(node, node?.dataset.evoUnlocked === "true");
                }
            });

            previousProgress = currentProgress;

            if (rawT < 1) {
                frameId = requestAnimationFrame(animateProgress);
            } else {
                if (progressBarRef.current) progressBarRef.current.style.width = `${progressWidth}%`;
                evoNodeRefs.current.forEach((node, i) => {
                    const milestone = evoMilestones[i] !== undefined ? evoMilestones[i] : ((i + 0.5) / evoNodeRefs.current.length) * 100;
                    if (progressWidth >= milestone) triggerEvoAnimation(node, node?.dataset.evoUnlocked === "true");
                });
            }
        };

        frameId = requestAnimationFrame(animateProgress);
        return () => cancelAnimationFrame(frameId);
    }, [progressWidth, uuid]);

    const bgKey = `${dino.hybrid_type}_${dino.rarity}`;
    const cardBgUrl = getImage("card_backgrounds", bgKey, `https://cdn.paleo.gg/games/jwtg/images/card-bg/${dino.hybrid_type}/${dino.rarity}.png`);

    return (
        <div style={{ width: '100%' }}>
            {/* Nút Back */}
            <div style={{ marginBottom: '15px' }}>
                <button onClick={onBack} style={{
                    background: 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)',
                    border: '2px solid #a0aec0', borderRadius: '6px', boxShadow: '0 4px 0 #1a202c, 0 5px 10px rgba(0,0,0,0.4)',
                    color: '#ffffff', fontFamily: 'Courier New, monospace', fontSize: '14px', fontWeight: 900,
                    padding: '8px 20px', cursor: 'pointer', textTransform: 'uppercase'
                }}>
                    ◀ QUAY LẠI ROSTER
                </button>
            </div>

            {/* CLASSIFICATION */}
            <div style={{ marginBottom: '20px', width: '100%', opacity: 0.85 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', background: 'linear-gradient(145deg,rgba(255,255,255,0.05),rgba(0,0,0,0.2))', border: '1px solid rgba(255,255,255,0.1)', borderTop: `3px solid ${themeColor}`, borderRadius: '8px', padding: '12px 15px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    {[
                        { label: 'Region', val: capitalize(dino.region), icon: regionUrl },
                        { label: 'Class', val: capitalize(dino.class), icon: classIconUrl },
                        { label: 'Type', val: capitalize(dino.hybrid_type), icon: hybridTypeUrl },
                        { label: 'Rarity', val: displayRarity, color: themeColor },
                        { label: 'Release', val: dino.release_date || "N/A", bold: true }
                    ].map((c, i) => (
                        <div key={i} style={{ flex: '1 1 0', minWidth: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ color: '#aaa', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{c.label}</div>
                            <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', color: c.color || 'white', fontWeight: c.bold || c.color ? 'bold' : 'normal' }}>
                                {c.icon && <img src={c.icon} width="16" height="16" style={{ objectFit: 'contain' }} alt={c.label} />}
                                <span>{c.val}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MID SECTION: Left Card + Facts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>

                {/*
                ========================================================================
                SỬ DỤNG DINOCARD: Rút gọn khối DOM khổng lồ thành 1 Component.
                ========================================================================
                */}
                <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DinoCard
                        dinoName={dino.name || ""}
                        imageUrl={dino.image_url}
                        cardBgUrl={cardBgUrl}
                        classIconUrl={classIconUrl}
                        displayRarity={displayRarity}
                        isUnlocked={isLeftCardUnlocked}
                    />
                </div>

                {/* Facts Accordion */}
                <div style={{ flex: '1 1 300px', marginBottom: 0 }}>
                    {dino.facts?.map((fact: string, index: number) => {
                        const isUnlocked = index + 1 <= dinoRank;
                        const highestUnlocked = Math.min(dino.facts?.length || 0, dinoRank) - 1;
                        const isOpen = index === highestUnlocked && isUnlocked;
                        return (
                            <details key={index} open={isOpen} style={{ marginBottom: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                                <summary style={{ padding: '8px 12px', fontWeight: 'bold', background: 'rgba(255,255,255,0.05)', userSelect: 'none', outline: 'none', cursor: isUnlocked ? 'pointer' : 'not-allowed', opacity: isUnlocked ? 1 : 0.5 }}>
                                    Fact {index + 1} {!isUnlocked && "🔒"}
                                </summary>
                                <div style={{ padding: '10px 12px', lineHeight: 1.5 }}>{fact}</div>
                            </details>
                        );
                    })}
                </div>
            </div>

            {/* EVOLUTIONS & STATS */}
            <div style={{ marginBottom: '8px', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ position: 'relative', padding: '10px 0' }}>
                    <div style={{ position: 'absolute', top: '40px', left: 0, height: '6px', width: '100%', background: 'rgba(255,255,255,0.08)', zIndex: 0, borderRadius: '3px' }}></div>
                    <div ref={progressBarRef} style={{ position: 'absolute', top: '40px', left: 0, height: '6px', width: '0%', background: '#2196F3', zIndex: 1, borderRadius: '3px', boxShadow: '0 0 8px rgba(33,150,243,0.55)' }}></div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px 10px', justifyItems: 'center', position: 'relative', zIndex: 2 }}>
                        {evolutions.map((evo: any, index: number) => {
                            const isEvoUnlocked = index + 1 <= dinoRank;
                            const frameUrl = getImage("portrait_frames", dino.rarity, `https://cdn.paleo.gg/games/jwtg/images/portrait-frame/${dino.rarity}.png`);

                            return (
                                <div
                                    key={index}
                                    ref={el => { evoNodeRefs.current[index] = el; }}
                                    data-evo-unlocked={isEvoUnlocked ? "true" : "false"}
                                    data-evo-triggered="false"
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, background: '#111', borderRadius: '50%', transform: `scale(${isEvoUnlocked ? 1.1 : 1})`, transformOrigin: 'center center', transition: 'transform 280ms cubic-bezier(0.2,0.8,0.2,1)', willChange: 'transform' }}
                                >
                                    {/*
                                    ====================================================================
                                    SỬ DỤNG EVOAVATAR: Thay thế code DOM, nhưng giữ lại div parent
                                    để bọc Ref và thực hiện animation scale cả badge LV bên dưới.
                                    ====================================================================
                                    */}
                                    <EvoAvatar
                                        size={60}
                                        imageUrl={evo.image_url}
                                        frameUrl={frameUrl}
                                        isUnlocked={isEvoUnlocked}
                                        style={{ margin: 0 }}
                                    />

                                    <div style={{ marginTop: '4px', fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                                        LV{evo.level || (index + 1) * 10}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Rank Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', alignItems: 'center', marginTop: '15px', padding: '10px 15px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontWeight: 'bold' }}>
                    <div></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><img src={damageIconUrl} width="20" height="20" style={{ objectFit: 'contain' }} alt="Damage" /><span style={{ color: '#e74c3c' }}>{currentDamage}</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><img src="https://cdn.paleo.gg/games/jwtg/images/stats/ferocity.png" width="20" height="20" style={{ objectFit: 'contain' }} alt="Ferocity" /><span style={{ color: '#ffd700' }}>{currentFerocity}</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><img src={healthIconUrl} width="20" height="20" style={{ objectFit: 'contain' }} alt="Health" /><span style={{ color: '#2ecc71' }}>{currentHealth}</span></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};