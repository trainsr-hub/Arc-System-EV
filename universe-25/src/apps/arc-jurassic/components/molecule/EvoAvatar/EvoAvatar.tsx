import React from 'react';

interface EvoAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    imageUrl?: string | null;
    frameUrl: string;
    isUnlocked?: boolean;
    showLockOverlay?: boolean;
    fallbackType?: 'black' | 'gold' | null;
    borderRadius?: string;
}

export const EvoAvatar = React.forwardRef<HTMLDivElement, EvoAvatarProps>(({
    size = 72,
    imageUrl,
    frameUrl,
    isUnlocked = true,
    showLockOverlay = true,
    fallbackType = null,
    borderRadius = '10px',
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
                borderRadius,
                overflow: 'hidden',
                ...style
            }}
            {...rest}
        >
            {/* Dino Image or Fallback */}
            {imageUrl ? (
                <img loading="lazy" src={imageUrl} width={size} height={size} style={{ position: 'absolute', bottom: 0, left: 0, objectFit: 'contain', ...filterStyle }} alt="Evo Image" />
            ) : (
                fallbackType === 'black' ? (
                    <div className="evo-fallback-black" style={{ position: 'absolute', inset: '6%', borderRadius, background: '#080808' }}></div>
                ) : fallbackType === 'gold' ? (
                    <div className="evo-fallback-gold" style={{ position: 'absolute', inset: '6%', borderRadius, background: 'radial-gradient(circle at 35% 35%, #fffacd, #ffd700 45%, #b8860b 80%)' }}></div>
                ) : null
            )}

            {/* Rarity Frame */}
            <img loading="lazy" src={frameUrl} width={size} height={size} style={{ position: 'absolute', bottom: 0, left: 0, objectFit: 'contain', ...filterStyle, pointerEvents: 'none' }} alt="Frame" />

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
