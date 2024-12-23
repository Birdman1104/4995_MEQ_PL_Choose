export const GV = {
    short: 'short', // 2 clicks
    long: 'long',
};

export const GAME_CONFIG = Object.freeze({
    HintOnIdle: 2, // Seconds
    Hint: true,
    Sound: true,

    IdleTime: -1, // Seconds. Если игрок бездействует столько секунд,игра идет в стор

    // Параметры для разных версий
    version: GV.long,
    // version: 'long',
});

export const DEFAULT_FONT = 'Arial';
