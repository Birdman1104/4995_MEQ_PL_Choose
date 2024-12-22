import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'initial_cell',
                scale: CellScale.envelop,
                bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
            {
                name: 'intro',
                scale: CellScale.fit,
                bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
            {
                name: 'board',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'zone_1',
                scale: CellScale.fit,
                bounds: { x: 0, y: -0.25, width: 1.2, height: 1.4 },
            },
            {
                name: 'zone_2',
                scale: CellScale.fit,
                bounds: { x: -0.25, y: -0.25, width: 1.4, height: 1.4 },
            },
            {
                name: 'zone_3',
                scale: CellScale.fit,
                bounds: { x: -0.35, y: -0.3, width: 1.5, height: 1.4 },
            },
            {
                name: 'zone_4',
                scale: CellScale.fit,
                bounds: { x: -0.2, y: -0.3, width: 1.4, height: 1.4 },
            },
            {
                name: 'zone_5',
                scale: CellScale.fit,
                bounds: { x: -0.2, y: -0.4, width: 1.4, height: 1.4 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };

    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'initial_cell',
                scale: CellScale.none,
                bounds: { x: 0.3, y: 0.4, width: 0.4, height: 0.2 },
            },
            {
                name: 'intro',
                scale: CellScale.fit,
                bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
            {
                name: 'board',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'zone_1',
                scale: CellScale.fit,
                bounds: { x: -0.1, y: -0.1, width: 1.4, height: 1.3 },
            },
            {
                name: 'zone_2',
                scale: CellScale.fit,
                bounds: { x: -0.25, y: -0.075, width: 1.4, height: 1.3 },
            },
            {
                name: 'zone_3',
                scale: CellScale.fit,
                bounds: { x: -0.4, y: -0.1, width: 1.4, height: 1.3 },
            },
            {
                name: 'zone_4',
                scale: CellScale.fit,
                bounds: { x: -0.2, y: -0.125, width: 1.4, height: 1.3 },
            },
            {
                name: 'zone_5',
                scale: CellScale.fit,
                bounds: { x: -0.2, y: -0.2, width: 1.4, height: 1.3 },
            },
        ],
    };
};
