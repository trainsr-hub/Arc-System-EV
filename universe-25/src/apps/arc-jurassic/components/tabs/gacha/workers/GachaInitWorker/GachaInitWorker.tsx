import React, { useState } from 'react';
import { GachaOutcomesWorker } from '../GachaOutcomesWorker/GachaOutcomesWorker';
import { GachaTopDinosWorker } from '../GachaTopDinosWorker/GachaTopDinosWorker';
import { ChevronDown } from 'lucide-react';
import type { GachaInitWorkerProps } from '../../types';
import './GachaInitWorker.css';

/**
 * Worker: GachaInitWorker
 * Responsibility: Renders the idle Gacha Nexus view:
 * - Left Side: Apex Vanguard (User's Top 3 Dinos) via GachaTopDinosWorker
 * - Center: Idle Black Hole Accretion Stage + Roll Wager Selector + Summon Button
 * - Right Side: Possible Outcomes Pool via GachaOutcomesWorker
 */
export const GachaInitWorker: React.FC<GachaInitWorkerProps> = ({
    possibleOutcomes,
    top3Dinos,
    top3Ferocity,
    lookup,
    cap,
    nextUnlock,
    dueDino,
    onStartSummon
}) => {
    // Multiplier state selected before rolling (Gamble Factor)
    const [multiplier, setMultiplier] = useState<number>(1);

    const multiplierOptions = [1, 2, 3, 4, 8, 16];

    return (
        <div className="gacha-init-worker-container">
            {/* Left Side: Apex Vanguard (Top 3 Dinos) Sub-Worker */}
            <GachaTopDinosWorker
                top3Dinos={top3Dinos}
                top3Ferocity={top3Ferocity}
                cap={cap}
                lookup={lookup}
            />

            {/* Right Side: Outcomes Panel Sub-Worker */}
            <GachaOutcomesWorker
                possibleOutcomes={possibleOutcomes}
                lookup={lookup}
                cap={cap}
                nextUnlock={nextUnlock}
            />

            {/* Center: Idle Black Hole Stage */}
            <div className="bh-idle-stage">
                <div className="bh-idle-hole">
                    <div className="bh-ring bh-ring-1" />
                    <div className="bh-ring bh-ring-2" />
                    <div className="bh-ring bh-ring-3" />
                    <div className="bh-ring bh-ring-4" />
                    <div className="bh-core" />
                </div>
            </div>

            {/* Center Bottom: Pre-Roll Multiplier Gamble Dropdown Selector */}
            <div className="gacha-multiplier-bar">
                <span className="gacha-multiplier-label">Roll Wager:</span>
                <div className="gacha-multiplier-select-wrapper">
                    <select
                        value={multiplier}
                        onChange={(e) => setMultiplier(Number(e.target.value))}
                        className="gacha-multiplier-select"
                        disabled={Boolean(dueDino)}
                    >
                        {multiplierOptions.map(m => (
                            <option key={m} value={m} className="bg-[#120f18] text-[#f5f0e8]">
                                {m}x Specimen Wager (x{m})
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="gacha-select-chevron" />
                </div>
            </div>

            {/* Summon Dinosaur Button with Selected Multiplier or Due Specimen Redirect */}
            <button
                type="button"
                className="dino-summon-button"
                onClick={() => onStartSummon(multiplier)}
                disabled={!dueDino && possibleOutcomes.length === 0}
            >
                {dueDino
                    ? '⚡ View Pending Due Specimen (Must Purchase)'
                    : possibleOutcomes.length === 0
                    ? 'No Dino in Ferocity Pool'
                    : multiplier > 1
                    ? `Summon ${multiplier}x Dinosaurs (Gacha Gamble)`
                    : 'Summon Dinosaur (Gacha)'}
            </button>
        </div>
    );
};
