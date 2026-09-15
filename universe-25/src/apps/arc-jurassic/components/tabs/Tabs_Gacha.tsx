// path: src/apps/arc-jurassic/components/tabs/Tabs_Gacha.tsx

import React, { useState, useRef, useEffect } from 'react';
import { rutGonTime } from '../../core/rutGonTime';

// ============================================================================
// [MODIFIED_START: GACHA TAB & BLACKHOLE EFFECT]
// 1. Phục dựng toàn bộ Engine vật lý của Blackhole Effect: Timeline mở rộng (jump/steady),
//    hút hạt (suction), chớp lóa Supernova, sinh màu ngẫu nhiên.
// 2. Tách bạch View: Quản lý 2 trạng thái 'idle' (đang ở màn hình Gacha) và 'result' (đã roll ra thẻ).
// 3. Callback thông minh: Khi mua xong, gọi onBuySuccess(uuid) để RebasedApp chuyển hướng chính xác.
// ============================================================================

const getImage = (lookup: any, category: string, key: string, fallback: string) => {
    return lookup?.[category]?.[key] ?? fallback;
};

// --- TOÁN HỌC & LOGIC BLACKHOLE ---
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(random(min, max + 1));

const getRollColorFromTime = () => {
    const hue = Date.now() % 360;
    return {
        hue, color: `hsl(${hue},90%,65%)`, bright: `hsl(${hue},100%,82%)`,
        soft: `hsla(${hue},90%,65%,0.55)`, deep: `hsla(${hue},90%,40%,0.45)`
    };
};

const createExpansionTimeline = () => {
    const jumpCount = randomInt(0, 4);
    const totalDuration = random(1450, 2000);
    const eventTypes: string[] = [];

    if (Math.random() < 0.72) eventTypes.push("steady");
    for (let i = 0; i < jumpCount; i++) eventTypes.push("jump");
    const steadyCount = randomInt(0, Math.max(1, 6 - jumpCount));
    for (let i = 0; i < steadyCount; i++) eventTypes.push("steady");
    if (eventTypes.length === 0) eventTypes.push("steady");

    for (let i = eventTypes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [eventTypes[i], eventTypes[j]] = [eventTypes[j], eventTypes[i]];
    }

    const maxScale = random(1.85, 2.50);
    const timeline: any[] = [];
    let currentScale = 1;
    let remainingScale = maxScale - currentScale;

    for (let i = 0; i < eventTypes.length; i++) {
        const type = eventTypes[i];
        let nextScale;
        if (type === "jump") {
            const maxJump = Math.min(remainingScale, random(0.25, 0.58));
            const minJump = Math.min(maxJump, 0.15);
            nextScale = currentScale + random(minJump, Math.max(minJump, maxJump));
        } else {
            const maxSteady = Math.min(remainingScale, random(0.08, 0.30));
            const minSteady = Math.min(maxSteady, 0.025);
            nextScale = currentScale + random(minSteady, Math.max(minSteady, maxSteady));
        }
        nextScale = Math.min(nextScale, maxScale);
        timeline.push({ type, from: currentScale, to: nextScale, duration: 0 });
        currentScale = nextScale;
        remainingScale = maxScale - currentScale;
        if (i === eventTypes.length - 1 && currentScale < maxScale) {
            timeline[timeline.length - 1].to = maxScale;
            timeline[timeline.length - 1].from = currentScale;
        }
        if (currentScale >= maxScale) break;
    }

    let durationSum = 0;
    for (const event of timeline) {
        event._weight = event.type === "jump" ? random(0.45, 0.90) : random(0.80, 1.60);
        durationSum += event._weight;
    }
    for (const event of timeline) {
        event.duration = (event._weight / durationSum) * totalDuration;
    }

    return { timeline, maxScale };
};

// ============================================================================
// COMPONENT CHÍNH
// ============================================================================

interface TabsGachaProps {
    objects: any[];
    lookup: any;
    userFerocity: number;
    excludedIds: string[];
    userProgress: any;
    myResources: any;
    onUpdateResources: (newRes: any) => void;
    onUpdateProgress: (newProg: any) => void;
    onWriteTempt: (uuid: string | null) => Promise<void>;
    initialTemptUuid?: string | null;
    onBuySuccess: (uuid: string) => void;
}

export const Tabs_Gacha: React.FC<TabsGachaProps> = ({
    objects, lookup, userFerocity, excludedIds, userProgress, myResources,
    onUpdateResources, onUpdateProgress, onWriteTempt, initialTemptUuid, onBuySuccess
}) => {

    const [stage, setStage] = useState<'idle' | 'rolling' | 'result'>(initialTemptUuid ? 'result' : 'idle');
    const [resultUuid, setResultUuid] = useState<string | null>(initialTemptUuid || null);
    const [isBuying, setIsBuying] = useState(false);

    // --- REFS CHO ANIMATION ---
    const rootRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);
    const innerRingRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const diskRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const frameIds = useRef<number[]>([]);

    useEffect(() => {
        return () => frameIds.current.forEach(id => cancelAnimationFrame(id));
    }, []);

    // --- LOGIC ANIMATION BLACKHOLE ---
    const applyBlackHoleScale = (scale: number) => {
        if (!rootRef.current) return;
        rootRef.current.style.transform = `scale(${scale})`;
        if (coreRef.current) { coreRef.current.style.width = `${100 + (scale - 1) * 110}px`; coreRef.current.style.height = `${100 + (scale - 1) * 110}px`; }
        if (innerRingRef.current) { innerRingRef.current.style.width = `${125 + (scale - 1) * 145}px`; innerRingRef.current.style.height = `${125 + (scale - 1) * 145}px`; }
        if (glowRef.current) { glowRef.current.style.width = `${205 + (scale - 1) * 250}px`; glowRef.current.style.height = `${205 + (scale - 1) * 250}px`; }
        if (diskRef.current) { diskRef.current.style.width = `${220 + (scale - 1) * 300}px`; diskRef.current.style.height = `${76 + (scale - 1) * 100}px`; }
    };

    const resetBlackHole = () => {
        if (rootRef.current) { rootRef.current.classList.remove('rolling'); rootRef.current.style.transform = 'scale(1)'; }
        if (coreRef.current) { coreRef.current.style.width = '100px'; coreRef.current.style.height = '100px'; }
        if (innerRingRef.current) { innerRingRef.current.style.width = '125px'; innerRingRef.current.style.height = '125px'; }
        if (glowRef.current) { glowRef.current.style.width = '205px'; glowRef.current.style.height = '205px'; }
        if (diskRef.current) { diskRef.current.style.width = '220px'; diskRef.current.style.height = '76px'; }
        if (flashRef.current) { flashRef.current.style.animation = 'none'; void flashRef.current.offsetWidth; }
        particleRefs.current.forEach(p => { if (p) { p.style.transform = ''; p.style.opacity = ''; } });
    };

    const playAnimation = (): Promise<void> => {
        return new Promise(async (resolveMain) => {
            resetBlackHole();
            const profile = getRollColorFromTime();
            const expansion = createExpansionTimeline();

            if (rootRef.current) {
                rootRef.current.style.setProperty("--dino-bh-color", profile.color);
                rootRef.current.style.setProperty("--dino-bh-bright", profile.bright);
                rootRef.current.style.setProperty("--dino-bh-soft", profile.soft);
                rootRef.current.style.setProperty("--dino-bh-deep", profile.deep);
                rootRef.current.classList.add('rolling');
            }

            const totalExpDuration = expansion.timeline.reduce((s, e) => s + e.duration, 0);
            const suctionDuration = Math.min(1900, Math.max(1150, totalExpDuration));

            // 1. Hút hạt (Suction)
            particleRefs.current.forEach(particle => {
                if (!particle) return;
                const orbit = random(90, 135);
                const start = performance.now();
                const delay = random(0, suctionDuration * 0.28);
                const animateParticle = (now: number) => {
                    const elapsed = now - start - delay;
                    if (elapsed < 0) { frameIds.current.push(requestAnimationFrame(animateParticle)); return; }
                    const t = Math.min(elapsed / suctionDuration, 1);
                    const eased = Math.pow(t, 2.7);
                    const angle = t * (360 + random(40, 180));
                    const distance = orbit * (1 - eased);
                    particle.style.transform = `rotate(${angle}deg) translateX(${distance}px) scale(${1 - eased * 0.95})`;
                    particle.style.opacity = String(1 - Math.pow(t, 2.2));
                    if (t < 1) frameIds.current.push(requestAnimationFrame(animateParticle));
                };
                frameIds.current.push(requestAnimationFrame(animateParticle));
            });

            // 2. Timeline Scale
            await new Promise<void>(resolve => {
                let index = 0;
                const runNext = () => {
                    if (index >= expansion.timeline.length) { resolve(); return; }
                    const event = expansion.timeline[index];
                    const startTime = performance.now();
                    const step = (now: number) => {
                        const t = Math.min((now - startTime) / event.duration, 1);
                        let eased;
                        if (event.type === "jump") eased = t < 0.18 ? 0.04 * (t / 0.18) : 0.04 + 0.96 * Math.pow((t - 0.18) / 0.82, 0.28);
                        else eased = t * t * (3 - 2 * t);
                        applyBlackHoleScale(event.from + (event.to - event.from) * eased);
                        if (t < 1) frameIds.current.push(requestAnimationFrame(step));
                        else { applyBlackHoleScale(event.to); index++; runNext(); }
                    };
                    frameIds.current.push(requestAnimationFrame(step));
                };
                runNext();
            });

            // 3. Supernova Flash
            await new Promise<void>(resolve => {
                const flashDuration = randomInt(620, 900);
                if (flashRef.current) {
                    flashRef.current.style.animation = 'none'; void flashRef.current.offsetWidth;
                    flashRef.current.style.animation = `dinoBhFlash ${flashDuration}ms ease-out forwards`;
                }
                setTimeout(resolve, flashDuration * 0.72);
            });

            resolveMain();
        });
    };

    // --- LOGIC GACHA ---
    const handleRoll = async () => {
        if (stage === 'rolling') return;

        const cap = Math.max(userFerocity, 200);
        const availablePool = objects.filter(dino => {
            if (excludedIds.includes(dino.uuid)) return false;
            const maxEvo = dino.evolutions?.[3];
            if (!maxEvo) return false;
            const fero = Math.floor((maxEvo.damage || 0) + ((maxEvo.health || 0) / 3.2));
            return fero <= cap;
        });

        if (availablePool.length === 0) {
            alert("Pool Gacha is empty. No more suitable Dino.");
            return;
        }

        setStage('rolling');
        const roll = availablePool[Math.floor(Math.random() * availablePool.length)];

        await playAnimation();
        await onWriteTempt(roll.uuid);
        setResultUuid(roll.uuid);
        setStage('result');
    };

    const handleBuy = async () => {
        if (isBuying || !resultUuid) return;
        setIsBuying(true);

        const dino = objects.find(o => o.uuid === resultUuid);
        const hatchTime = Number(dino?.hatch_time_mins ?? 0);
        const costGolden = Number((hatchTime * 60 / 7).toFixed(2));

        let orbType = "red_orb";
        let costOrb = 15;
        if (dino?.buy_price_dna) {
            orbType = "purple_orb";
            costOrb = Math.floor(Math.sqrt(Number(dino.buy_price_dna)));
        } else {
             const rarity = String(dino?.rarity || "").toLowerCase().trim();
             switch (rarity) { case "common": costOrb = 15; break; case "rare": costOrb = 25; break; case "super-rare": case "super rare": costOrb = 40; break; case "legendary": costOrb = 55; break; case "tournament": costOrb = 70; break; case "boss": costOrb = 100; break; default: costOrb = 15; }
        }

        let newRes = { ...myResources };
        const currentGolden = newRes.elemental_time?.golden?.amount || 0;
        const currentOrb = newRes.orbs?.[orbType]?.amount || 0;

        if (currentGolden < costGolden || currentOrb < costOrb) {
            alert("Not enough resources to buy this Dino!");
            setIsBuying(false);
            return;
        }

        newRes.elemental_time.golden.amount = Number((currentGolden - costGolden).toFixed(2));
        newRes.orbs[orbType].amount = Number((currentOrb - costOrb).toFixed(2));
        onUpdateResources(newRes);

        let newProg = { ...userProgress };
        if (!newProg.owned_dinos[resultUuid]) newProg.owned_dinos[resultUuid] = { number: 0, rank: 0 };
        newProg.owned_dinos[resultUuid].number += 1;
        newProg.owned_dinos[resultUuid].rank = 1 + Math.floor(Math.log2(newProg.owned_dinos[resultUuid].number));
        onUpdateProgress(newProg);

        await onWriteTempt(null);
        alert(`Purchase successful: ${dino.name}!`);
        setIsBuying(false);

        // GỌI CALLBACK ĐỂ APP CHUYỂN HƯỚNG SANG THẺ CHI TIẾT
        onBuySuccess(resultUuid);
    };

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
            {/* GIAO DIỆN ROLLING (BLACKHOLE) */}
            <div style={{ display: stage === 'result' ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', flex: 1 }}>
                <div className="dino-gacha-stage" style={{ minHeight: '500px' }}>
                    <div className="dino-bh-root" ref={rootRef}>
                        <div className="dino-bh-glow" ref={glowRef}></div>
                        <div className="dino-bh-disk" ref={diskRef}></div>
                        <div className="dino-bh-orbit">
                            <div className="dino-bh-particle large" ref={el => { particleRefs.current[0] = el; }} style={{ left: '50%', top: '-4px', transform: 'translateX(-50%)' }}></div>
                            <div className="dino-bh-particle" ref={el => { particleRefs.current[1] = el; }} style={{ right: '4%', top: '35%' }}></div>
                            <div className="dino-bh-particle small" ref={el => { particleRefs.current[2] = el; }} style={{ left: '18%', bottom: '4%' }}></div>
                            <div className="dino-bh-particle" ref={el => { particleRefs.current[3] = el; }} style={{ left: '-3px', top: '58%' }}></div>
                            <div className="dino-bh-particle large" ref={el => { particleRefs.current[4] = el; }} style={{ right: '22%', bottom: '10%' }}></div>
                        </div>
                        <div className="dino-bh-orbit inner">
                            <div className="dino-bh-particle small" ref={el => { particleRefs.current[5] = el; }} style={{ left: '50%', top: '-4px', transform: 'translateX(-50%)' }}></div>
                            <div className="dino-bh-particle" ref={el => { particleRefs.current[6] = el; }} style={{ right: '0', top: '45%' }}></div>
                            <div className="dino-bh-particle small" ref={el => { particleRefs.current[7] = el; }} style={{ left: '15%', bottom: '3%' }}></div>
                            <div className="dino-bh-particle large" ref={el => { particleRefs.current[8] = el; }} style={{ left: '8%', top: '25%' }}></div>
                        </div>
                        <div className="dino-bh-orbit outer">
                            <div className="dino-bh-particle" ref={el => { particleRefs.current[9] = el; }} style={{ left: '50%', top: '-4px', transform: 'translateX(-50%)' }}></div>
                            <div className="dino-bh-particle small" ref={el => { particleRefs.current[10] = el; }} style={{ right: '5%', top: '50%' }}></div>
                            <div className="dino-bh-particle large" ref={el => { particleRefs.current[11] = el; }} style={{ left: '12%', bottom: '8%' }}></div>
                            <div className="dino-bh-particle" ref={el => { particleRefs.current[12] = el; }} style={{ left: '3%', top: '22%' }}></div>
                        </div>
                        <div className="dino-bh-inner-ring" ref={innerRingRef}></div>
                        <div className="dino-bh-core" ref={coreRef}></div>
                        <div className="dino-bh-flash" ref={flashRef}></div>
                    </div>
                </div>
                <button className="dino-gacha-button" onClick={handleRoll} disabled={stage === 'rolling'} style={{ opacity: stage === 'rolling' ? 0.55 : 1, cursor: stage === 'rolling' ? 'wait' : 'pointer' }}>
                    Gacha
                </button>
            </div>

            {/* GIAO DIỆN RESULT (THẺ MUA) */}
            {stage === 'result' && resultUuid && (() => {
                const dino = objects.find(o => o.uuid === resultUuid);
                if (!dino) return <div>Data error</div>;

                const userDinoData = userProgress.owned_dinos?.[resultUuid] || { number: 0, rank: 0 };
                const currentRank = Number(userDinoData.rank) || 0;
                const currentNumber = Number(userDinoData.number) || 0;
                const lowerIndex = currentRank - 1;
                const higherIndex = Math.floor(Math.log2(currentNumber + 1));
                const lowerEvoUrl = dino.evolutions?.[lowerIndex]?.image_url || null;
                const higherEvoUrl = dino.evolutions?.[higherIndex]?.image_url || null;

                const frameUrl = getImage(lookup, 'portrait_frames', dino.rarity, `https://cdn.paleo.gg/games/jwtg/images/portrait-frame/${dino.rarity}.png`);
                const classIconUrl = getImage(lookup, 'class_icons', dino.class, `https://cdn.paleo.gg/games/jwtg/images/class/${dino.class}.png`);
                const bgKey = `${dino.hybrid_type}_${dino.rarity}`;
                const cardBgUrl = getImage(lookup, 'card_backgrounds', bgKey, `https://cdn.paleo.gg/games/jwtg/images/card-bg/${dino.hybrid_type}/${dino.rarity}.png`);

                let baseDamage = 0; let baseHealth = 0;
                if (currentRank > 0 && dino.evolutions) {
                    const baseEvo = dino.evolutions.find((e: any) => e.level === currentRank * 10);
                    if (baseEvo) { baseDamage = baseEvo.damage || 0; baseHealth = baseEvo.health || 0; }
                }
                const baseFerocity = Math.floor(baseDamage + (baseHealth / 3.2));
                const targetEvo = dino.evolutions?.[higherIndex];
                const targetDamage = targetEvo?.damage || 0;
                const targetHealth = targetEvo?.health || 0;
                const targetFerocity = Math.floor(targetDamage + (targetHealth / 3.2));

                const hatchTimeFormatted = rutGonTime(Number(dino?.hatch_time_mins ?? 0) * 60, "seconds");
                const hatchTime = Number(dino?.hatch_time_mins ?? 0);
                const costGolden = Number((hatchTime * 60 / 7).toFixed(2));
                let orbType = "red_orb"; let costOrb = 15;
                if (dino?.buy_price_dna) { orbType = "purple_orb"; costOrb = Math.floor(Math.sqrt(Number(dino.buy_price_dna))); }
                else {
                    const rarity = String(dino?.rarity || "").toLowerCase().trim();
                    switch (rarity) { case "common": costOrb=15; break; case "rare": costOrb=25; break; case "super-rare": case "super rare": costOrb=40; break; case "legendary": costOrb=55; break; case "tournament": costOrb=70; break; case "boss": costOrb=100; break; default: costOrb=15;}
                }
                const goldenIconUrl = getImage(lookup, 'hybrid_types', 'speed', 'https://cdn.paleo.gg/games/jwtg/images/stats/speed.png');
                const orbIconUrl = orbType === "purple_orb" ? getImage(lookup, 'hybrid_types', 'hybrid', '') : getImage(lookup, 'hybrid_types', 'super-hybrid', '');

                const rarityMap: any = { tournament: "legendary", vip: "legendary", star: "legendary", toy: "legendary", "super-star": "legendary" };
                const displayRarity = (rarityMap[dino.rarity?.toLowerCase()] || dino.rarity || "").toUpperCase();

                const damageIcon = getImage(lookup, 'stats', 'damage', 'https://cdn.paleo.gg/games/jwtg/images/stats/damage.png');
                const healthIcon = getImage(lookup, 'stats', 'health', 'https://cdn.paleo.gg/games/jwtg/images/stats/health.png');
                const feroIcon = getImage(lookup, 'stats', 'ferocity', 'https://cdn.paleo.gg/games/jwtg/images/stats/ferocity.png');

                return (
                    <div className="dino-gacha-result" style={{ margin: '0 auto' }}>
                        <div className="dino-gacha-left-card">
                            <div style={{ width: '250px', height: '389px', position: 'relative', overflow: 'hidden', borderRadius: '2px', transform: 'scale(1)', transformOrigin: 'top left' }}>
                                <img src={cardBgUrl} width="250" height="389" style={{ position: 'absolute', top: 0, left: 0 }} />
                                <img src={dino.image_url} width="206" height="236" style={{ position: 'absolute', left: '23px', top: '29px', objectFit: 'contain' }} />
                                <div style={{ position: 'absolute', top: '44px', left: '7px', width: '37px', height: '135px', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'rotate(-90deg) translate(-50%,-50%) scaleX(0.72)', transformOrigin: '0 0', fontFamily: "Impact, 'Arial'", fontSize: '26px', lineHeight: 1, color: 'white', whiteSpace: 'nowrap', letterSpacing: '-0.4px', textShadow: '0 2px 0 rgba(0,0,0,0.9)' }}>
                                        {displayRarity}
                                    </div>
                                </div>
                                <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '70px', height: '28px', overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontFamily: "'Arial'", fontSize: '16px', color: 'black', textShadow: '0 1px 0 black', lineHeight: 1, whiteSpace: 'nowrap' }}>
                                        <img src={classIconUrl} width="23" height="20" style={{ flexShrink: 0, width: '23px', height: '20px' }} />
                                        <span style={{ marginLeft: '2px' }}>{(dino.name || "").toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="card-sparkle-layer" style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', left: '14%', top: '17%', width: '5px', height: '5px', borderRadius: '50%', background: 'white', boxShadow: '0 0 8px 3px rgba(255,255,255,0.95)', animation: 'cardSparkle1 2800ms ease-in-out infinite' }}></div>
                                    <div style={{ position: 'absolute', left: '78%', top: '20%', width: '3px', height: '3px', borderRadius: '50%', background: 'white', boxShadow: '0 0 7px 2px rgba(255,255,255,0.9)', animation: 'cardSparkle2 2800ms ease-in-out 800ms infinite' }}></div>
                                </div>
                                <div className="card-light-sweep" style={{ position: 'absolute', left: '-115%', top: '145%', width: '30%', height: '220%', zIndex: 40, pointerEvents: 'none', transform: 'rotate(-45deg)', transformOrigin: 'center center', background: 'linear-gradient(to right,rgba(255,255,255,0),rgba(255,255,255,0.18) 20%,rgba(255,255,255,0.95) 48%,rgba(255,255,255,0.18) 78%,rgba(255,255,255,0))', filter: 'blur(0.8px)', mixBlendMode: 'screen', opacity: 0, animation: 'cardLightSweep 7000ms linear infinite' }}></div>
                            </div>
                        </div>

                        <div className="dino-gacha-right-panel">
                            <div className="evo-chain-container">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <div className="evo-chain-box">
                                        {lowerEvoUrl ? <img className="evo-chain-img" src={lowerEvoUrl} /> : <div className="evo-fallback-black"></div>}
                                        <img className="evo-chain-frame" src={frameUrl} />
                                    </div>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#ccc', letterSpacing: '1px' }}>EVO {currentRank}</div>
                                </div>
                                <div className="evo-chain-link"></div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <div className="evo-chain-box">
                                        {higherEvoUrl ? <img className="evo-chain-img" src={higherEvoUrl} /> : <div className="evo-fallback-gold"></div>}
                                        <img className="evo-chain-frame" src={frameUrl} />
                                    </div>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffd700', letterSpacing: '1px' }}>EVO {higherIndex + 1}</div>
                                </div>
                            </div>

                            <div className="dino-gacha-stats-card">
                                <div className="dino-gacha-stats-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>STATS</span>
                                    <span className="dino-owned-badge" style={{ fontSize: '10px', background: 'rgba(255,255,255,0.15)', padding: '3px 8px', borderRadius: '12px', color: '#00e5ff', letterSpacing: '0.5px' }}>OWNED: {currentNumber}</span>
                                </div>
                                <div className="dino-gacha-stats">
                                    <div className="dino-gacha-stat">
                                        <img className="dino-gacha-stat-icon" src={damageIcon} />
                                        <div className="dino-gacha-stat-label">Damage</div>
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1, marginTop: '2px' }}>
                                            <span style={{ color: 'white', fontSize: '15px', fontWeight: 700 }}>{baseDamage}</span>
                                            <span className="dino-stat-flicker">+{targetDamage - baseDamage}</span>
                                        </div>
                                    </div>
                                    <div className="dino-gacha-stat">
                                        <img className="dino-gacha-stat-icon" src={healthIcon} />
                                        <div className="dino-gacha-stat-label">Health</div>
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1, marginTop: '2px' }}>
                                            <span style={{ color: 'white', fontSize: '15px', fontWeight: 700 }}>{baseHealth}</span>
                                            <span className="dino-stat-flicker">+{targetHealth - baseHealth}</span>
                                        </div>
                                    </div>
                                    <div className="dino-gacha-stat">
                                        <img className="dino-gacha-stat-icon" src={feroIcon} />
                                        <div className="dino-gacha-stat-label">Ferocity</div>
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1, marginTop: '2px' }}>
                                            <span style={{ color: 'white', fontSize: '15px', fontWeight: 700 }}>{baseFerocity}</span>
                                            <span className="dino-stat-flicker">+{targetFerocity - baseFerocity}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dino-gacha-costs">
                                <div className="dino-gacha-cost">
                                    <div className="dino-gacha-cost-label">Hatch Time</div>
                                    <div className="dino-gacha-cost-value">{hatchTimeFormatted}</div>
                                </div>
                            </div>

                            <button className="dino-buy-button" onClick={handleBuy} disabled={isBuying} style={{ opacity: isBuying ? 0.55 : 1, cursor: isBuying ? 'wait' : 'pointer' }}>
                                <div style={{ fontWeight: 800 }}>Buy</div>
                                <div style={{ fontSize: '13px', fontWeight: 'normal', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', opacity: 0.9 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><img src={goldenIconUrl} style={{ width: '16px', height: '16px', objectFit: 'contain' }} />{rutGonTime(Math.floor(costGolden),"minutes")}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><img src={orbIconUrl} style={{ width: '16px', height: '16px', objectFit: 'contain' }} /> {orbType === 'purple_orb' ? 'Purple' : 'Red'} Orb: {costOrb}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};
// ============================================================================
// [MODIFIED_END]
// ============================================================================