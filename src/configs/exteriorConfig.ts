import { Point } from 'pixi.js';
import { Images } from '../assets';

export const EXTERIOR_ITEMS = [
    {
        item: 'emptyFence',
        config: {
            texture: Images['exterior/empty_fence'],
            position: new Point(-179, 141),
        },
    },
    {
        item: 'fullFence',
        config: {
            texture: Images['exterior/full_fence'],
            position: new Point(-179, 100),
        },
    },
];
