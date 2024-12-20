import { lp } from '../../utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'slider_show',
                bounds: { x: 0.1, y: 0.7, width: 0.8, height: 0.3 },
            },
            {
                name: 'slider_hide',
                bounds: { x: 0.1, y: 1, width: 0.8, height: 0.3 },
            },
        ],
    };
};

const getUIGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'slider_show',
                bounds: { x: 0.01, y: 0.7, width: 0.98, height: 0.3 },
            },
            {
                name: 'slider_hide',
                bounds: { x: 0.1, y: 1, width: 0.8, height: 0.3 },
            },
        ],
    };
};
