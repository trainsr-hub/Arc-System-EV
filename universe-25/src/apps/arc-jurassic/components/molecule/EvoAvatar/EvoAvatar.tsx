import React from 'react';

interface EvoAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    imageUrl?: string | null;
    frameUrl: string;
    isUnlocked?: boolean;
    showLockOverlay?: boolean;
    fallbackType?: 'black' | 'gold' | null;
}

export const EvoAvatar = React.forwardRef<HTMLDivElement, EvoAvatarProps>(({
    size = 72,
    imageUrl,
    frameUrl,
    isUnlocked = true,
    showLockOverlay = true,
    fallbackType = null,
    style,
    className = '',
    ...rest
}, ref) => {

    const filterStyle = isUnlocked ? {} : { filter: 'brightness(0.4) grayscale(0.8)' };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                position: 'relative',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                ...style
            }}
            {...rest}
        >
            {/* Dino Image or Fallback */}
            {imageUrl ? (
                <img loading="lazy" src={imageUrl} width={size} height={size} style={{ position: 'absolute', bottom: 0, left: 0, ...filterStyle }} alt="Evo Image" />
            ) : (
                fallbackType === 'black' ? (
                    <div className="evo-fallback-black" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '83%', height: '83%' }}></div>
                ) : fallbackType === 'gold' ? (
                    <div className="evo-fallback-gold" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '83%', height: '83%' }}></div>
                ) : null
            )}

            {/* Rarity Frame */}
            <img loading="lazy" src={frameUrl} width={size} height={size} style={{ position: 'absolute', bottom: 0, left: 0, ...filterStyle, pointerEvents: 'none' }} alt="Frame" />

            {/* Lock Icon */}
            {(!isUnlocked && showLockOverlay) && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, pointerEvents: 'none', fontSize: `${Math.max(16, size * 0.38)}px` }}>
                    🔒
                </div>
            )}
        </div>
    );
});

EvoAvatar.displayName = 'EvoAvatar';
