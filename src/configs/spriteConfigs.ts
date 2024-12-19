import { Point } from 'pixi.js';
import { Images } from '../assets';

export const getFurnitureSpriteConfig = (texture: string, x: number, y: number): SpriteConfig => {
    return {
        texture,
        anchor: new Point(0.5, 0.5),
        position: new Point(x, y),
    };
};

export const getLineSpriteConfig = (zoneNumber): SpriteConfig => {
    return { texture: Images[`lines/line${zoneNumber}`], anchor: new Point(0.5, 0.5) };
};

export const plusSpriteConfig: SpriteConfig = {
    texture: Images['ui/plus'],
    anchor: new Point(0.5, 0.5),
    scale: new Point(0.75, 0.75),
};

export const getArrowConfig = (side: 'left' | 'right') => {
    return {
        texture: Images['ui/arrow'],
        anchor: new Point(0.5, 0.5),
        position: new Point(200 * (side === 'left' ? -1 : 1), 0),
        scale: new Point(1 * (side === 'left' ? 1 : -1), 1),
    };
};

export const cardBkgSpriteConfig = {
    texture: Images['ui/choice_bg'],
    scale: new Point(1.5, 1.5),
    anchor: new Point(0.5, 0.5),
};

export const moneySpriteConfig = {
    texture: Images['ui/money'],
    anchor: new Point(0.5, 0.5),
    position: new Point(-25, 37),
    scale: new Point(0.6, 0.6),
};

export const getItemSpriteConfig = (texture: string): SpriteConfig => {
    return {
        texture,
        anchor: new Point(0.5, 0.5),
        position: new Point(0, -20),
    };
};
