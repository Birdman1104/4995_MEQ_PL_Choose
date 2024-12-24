import { CellScale } from '@armathai/pixi-grid';
import { isSquareLikeScreen, lp } from '../../utils';

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
                name: 'complete',
                scale: CellScale.showAll,
                bounds: { x: 0.3, y: 0.3, width: 0.4, height: 0.4 },
            },
            {
                name: 'intro',
                scale: CellScale.showAll,
                bounds: { x: 0.3, y: 0.3, width: 0.4, height: 0.4 },
            },
            {
                name: 'board',
                scale: CellScale.showAll,
                bounds: { x: 0.2, y: 0.2, width: 0.6, height: 0.6 },
            },
            {
                name: 'zone_1',
                scale: CellScale.showAll,
                bounds: { x: 0.3, y: 0.1, width: 0.6, height: 0.75 },
            },
            {
                name: 'zone_2',
                scale: CellScale.showAll,
                bounds: { x: 0.1, y: 0.15, width: 0.7, height: 0.7 },
            },
            {
                name: 'zone_3',
                scale: CellScale.showAll,
                bounds: { x: 0.1, y: 0, width: 0.6, height: 0.8 },
            },
            {
                name: 'zone_4',
                scale: CellScale.showAll,
                bounds: { x: 0.2, y: 0, width: 0.7, height: 0.8 },
            },
            {
                name: 'zone_5',
                scale: CellScale.showAll,
                bounds: { x: 0.15, y: -0.03, width: 0.7, height: 0.7 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    const isSquare = isSquareLikeScreen();

    const zone_5 = isSquare
        ? {
              name: 'zone_5',
              scale: CellScale.showAll,
              bounds: { x: -0.2, y: -0.2, width: 1.4, height: 1.1 },
          }
        : {
              name: 'zone_5',
              scale: CellScale.showAll,
              bounds: { x: -0.2, y: -0.3, width: 1.4, height: 1.3 },
          };
    const zone_1 = isSquare
        ? {
              name: 'zone_1',
              scale: CellScale.showAll,
              bounds: { x: 0.1625, y: -0.125, width: 1.1, height: 1.1 },
          }
        : {
              name: 'zone_1',
              scale: CellScale.showAll,
              bounds: { x: 0.15, y: -0.15, width: 1.3, height: 1.3 },
          };

    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'initial_cell',
                scale: CellScale.envelop,
                bounds: { x: 0.3, y: 0.3, width: 0.4, height: 0.4 },
            },
            {
                name: 'complete',
                scale: CellScale.showAll,
                bounds: { x: 0.15, y: 0.1, width: 0.7, height: 0.8 },
            },
            {
                name: 'intro',
                scale: CellScale.fit,
                bounds: { x: 0.125, y: 0.075, width: 0.8, height: 0.8 },
            },
            {
                name: 'board',
                scale: CellScale.showAll,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            zone_1,
            {
                name: 'zone_2',
                scale: CellScale.showAll,
                bounds: { x: -0.25, y: -0.15, width: 1.3, height: 1.3 },
            },
            {
                name: 'zone_3',
                scale: CellScale.showAll,
                bounds: { x: -0.45, y: -0.2, width: 1.2, height: 1.3 },
            },
            {
                name: 'zone_4',
                scale: CellScale.showAll,
                bounds: { x: -0.11, y: -0.2, width: 1.4, height: 1.3 },
            },
            zone_5,
        ],
    };
};
