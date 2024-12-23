import { AdStatus } from '../models/AdModel';
import { BoardState } from '../models/BoardModel';
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

export const shortVersionCompleteGuard = (): boolean => {
    return (
        GAME_CONFIG.version === GV.short && Head.gameModel?.board?.zones.filter((zone) => zone.completed).length === 1
    );
};

export const longVersionCompleteGuard = (): boolean => {
    return GAME_CONFIG.version === GV.long && Head.gameModel?.board?.state === BoardState.Complete;
};
