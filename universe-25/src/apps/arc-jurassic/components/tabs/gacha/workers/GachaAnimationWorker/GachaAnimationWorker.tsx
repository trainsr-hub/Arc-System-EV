import React, { useEffect, useRef } from 'react';
import type { GachaAnimationWorkerProps } from '../../types';
import './GachaAnimationWorker.css';

/**
 * Worker: GachaAnimationWorker
 * Responsibility: Universal Plug-and-Play HTML Animation Player.
 * Executes any standalone .html animation file seamlessly without artificial box borders,
 * adapting transparently to any background theme.
 */
export const GachaAnimationWorker: React.FC<GachaAnimationWorkerProps> = ({
    animationSrc,
    onComplete
}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (
                event.data?.type === 'GACHA_ANIMATION_COMPLETE' ||
                event.data === 'GACHA_ANIMATION_COMPLETE'
            ) {
                onComplete();
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [onComplete]);

    return (
        <div className="gacha-animation-worker-container">
            <iframe
                ref={iframeRef}
                src={animationSrc}
                title="Gacha Animation Stage"
                className="gacha-animation-worker-iframe"
                sandbox="allow-scripts allow-same-origin"
                allowTransparency={true}
            />
        </div>
    );
};
