import { AdStatus } from '../models/AdModel';
import Head from '../models/HeadModel';
import { GAME_CONFIG, GV } from './GameConfig';

export const hintParamGuard = (): boolean => {
    return GAME_CONFIG.Hint;
};

export const hintModelGuard = (): boolean => {
    return !!Head.ad?.hint;
};

export const soundParamGuard = (): boolean => {
    return GAME_CONFIG.Sound;
};

export const soundModelGuard = (): boolean => {
    return !!Head.ad?.sound;
};

export const ctaModelGuard = (): boolean => {
    return !!Head.ad?.cta;
};

export const ctaVisibleGuard = (): boolean => {
    return !!Head.ad?.cta?.visible;
};

export const adStatusCtaGuard = (): boolean => {
    return Head.ad?.status === AdStatus.Cta;
};

export const gameModelGuard = (): boolean => {
    return !!Head.gameModel;
};

export const isTutorialModeGuard = (): boolean => {
    return !!Head.gameModel?.isTutorial;
};

export const clickedReachedGuard = (): boolean => {
    return GAME_CONFIG.version === GV.short && Head.gameModel?.madeClicks === 2;
};

export const lastRoomGuard = (): boolean => {
    console.warn(Head.gameModel?.board?.zones.filter((zone) => zone.completed).length === 4);

    return (
        GAME_CONFIG.version === GV.long && Head.gameModel?.board?.zones.filter((zone) => zone.completed).length === 4
    );
};
