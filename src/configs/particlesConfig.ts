import { EmitterConfig } from 'pixi-particles';

export const getSplashParticlesConfig = (x: number, y: number, w: number, h: number, color: string): EmitterConfig => {
    return {
        alpha: {
            list: [
                {
                    value: 0.8,
                    time: 0,
                },
                {
                    value: 0.1,
                    time: 1,
                },
            ],
            isStepped: false,
        },
        scale: {
            list: [
                {
                    value: 0.7,
                    time: 0,
                },
                {
                    value: 0.7,
                    time: 1,
                },
            ],
            isStepped: false,
        },
        color: {
            list: [
                {
                    value: color,
                    time: 0,
                },
                {
                    value: 'ffffff',
                    time: 1,
                },
            ],
            isStepped: false,
        },
        speed: {
            list: [
                {
                    value: 100,
                    time: 0,
                },
                {
                    value: 50,
                    time: 1,
                },
            ],
            isStepped: false,
        },
        startRotation: {
            min: 0,
            max: 360,
        },
        rotationSpeed: {
            min: 0,
            max: 0,
        },
        lifetime: {
            min: 0.76,
            max: 0.76,
        },
        frequency: 0.008,
        spawnChance: 1,
        particlesPerWave: 3,
        emitterLifetime: 0.31,
        maxParticles: 1000,
        pos: {
            x: 0,
            y: 0,
        },
        addAtBack: false,
        spawnType: 'rect',
        spawnRect: {
            x,
            y,
            w,
            h,
        },
    };
};

export const circleParticleConfig = {
    lifetime: {
        min: 0.7,
        max: 0.7,
    },
    frequency: 0.008,
    emitterLifetime: 0.31,
    particlesPerWave: 1,
    maxParticles: 60,
    addAtBack: false,
    pos: {
        x: 0,
        y: 0,
    },
    alpha: {
        list: [
            {
                time: 0,
                value: 0.05,
            },
            {
                time: 0.5,
                value: 0.2,
            },
            {
                time: 1,
                value: 0.05,
            },
        ],
        isStepped: false,
    },
    speed: {
        list: [
            {
                time: 0,
                value: 70,
            },
            {
                time: 1,
                value: 20,
            },
        ],
    },
    scale: {
        list: [
            {
                time: 0,
                value: 1,
            },
            {
                time: 1,
                value: 0.7,
            },
        ],
    },
    color: {
        list: [
            {
                time: 0,
                value: '702ab5',
            },
            {
                time: 0.5,
                value: 'b52ab3',
            },
            {
                time: 1,
                value: '2aa7b5',
            },
        ],
    },
    // startRotation: {
    //     min: 0,
    //     max: 360,
    // },
    spawnType: 'ring',
    spawnCircle: {
        x: 0,
        y: 0,
        r: 30,
        minR: 25,
    },
};
