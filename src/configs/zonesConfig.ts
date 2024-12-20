import { LockArea } from '../views/Lock';

export const ZONES_POSITIONS = [
    { x: -95, y: -30 }, // big wall
    { x: 33, y: -48 }, // square wall
    { x: 138, y: 5 }, // small wall
    { x: -25, y: 25 }, // small floor
    { x: 10, y: 80 }, // big floor
];

export const ITEMS_CONFIG = {
    zone_1_1: { x: 0, y: 0, price: 2000 },
    zone_1_2: { x: 0, y: 25, price: 1200 },
    zone_1_3: { x: 0, y: 25, price: 1500 },
    zone_1_4: { x: 0, y: 10, price: 1300 },
    zone_1_5: { x: 5, y: 35, price: 1600 },

    zone_2_1: { x: 0, y: 0, price: 100 },
    zone_2_2: { x: 0, y: 0, price: 150 },
    zone_2_3: { x: 0, y: 10, price: 175 },
    zone_2_4: { x: 0, y: 0, price: 130 },
    zone_2_5: { x: 0, y: 0, price: 200 },

    zone_3_1: { x: 0, y: 0, price: 100 },
    zone_3_2: { x: 0, y: 0, price: 50 },
    zone_3_3: { x: -10, y: 15, price: 150 },
    zone_3_4: { x: -10, y: 20, price: 125 },
    zone_3_5: { x: -10, y: 15, price: 75 },

    zone_4_1: { x: 0, y: -15, price: 200 },
    zone_4_2: { x: 10, y: -25, price: 250 },
    zone_4_3: { x: 0, y: 0, price: 175 },
    zone_4_4: { x: 0, y: -15, price: 150 },
    zone_4_5: { x: 0, y: -10, price: 225 },

    zone_5_1: { x: 0, y: -20, price: 520 },
    zone_5_2: { x: 0, y: -10, price: 600 },
    zone_5_3: { x: 0, y: -10, price: 700 },
    zone_5_4: { x: 0, y: -10, price: 750 },
    zone_5_5: { x: 0, y: -10, price: 800 },
};

export const LOCKS = [
    { x: -10, y: 30, area: LockArea.MainRoom },
    { x: 160, y: -110, area: LockArea.Storage },
    { x: -290, y: -80, area: LockArea.Lock1 },
    { x: -140, y: -150, area: LockArea.Lock2 },
    { x: 0, y: -220, area: LockArea.Lock3 },
];

export const ButtonPositions = {
    1: { x: 0, y: 90 },
    2: { x: 0, y: 70 },
    3: { x: 0, y: 70 },
    4: { x: 0, y: 50 },
    5: { x: 0, y: 50 },
};

export const ZONE_HIT_AREA = {
    1: [-85, -10, 80, -90, 80, 10, -80, 90],
    2: [-44, -68, 40, -30, 40, 68, -44, 30],
    3: [-10, -50, 10, -45, 10, 55, -10, 45],
    4: [-60, 10, 20, -30, 60, -10, -10, 30],
    5: [-100, 10, 20, -50, 100, -10, -10, 50],
};
