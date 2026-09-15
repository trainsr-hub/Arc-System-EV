// path: src/apps/arc-jurassic/components/tabs/RosterView.tsx
import React from 'react';

interface RosterViewProps {
    objects?: any[];
    lookup?: any;
    userProgress?: any;
    initialSelectedUuid?: string | null;
    onBack?: () => void;
}

export const RosterView: React.FC<RosterViewProps> = () => {
    return (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-2xl bg-[#0a080e]/40 border border-[#2d2438]/50 text-center">
            {/* Blank canvas reserved for Manager's vision */}
        </div>
    );
};
