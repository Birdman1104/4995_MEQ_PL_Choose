export const testConfig = {
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
                value: 1,
                time: 0,
            },
            {
                value: 0.3,
                time: 1,
            },
        ],
        isStepped: false,
    },
    color: {
        list: [
            {
                value: 'fb1010',
                time: 0,
            },
            {
                value: 'f5b830',
                time: 1,
            },
        ],
        isStepped: false,
    },
    speed: {
        list: [
            {
                value: 200,
                time: 0,
            },
            {
                value: 100,
                time: 1,
            },
        ],
        isStepped: false,
    },
    startRotation: {
        min: -90,
        max: -90,
    },
    rotationSpeed: {
        min: 0,
        max: 0,
    },
    lifetime: {
        min: 1,
        max: 1,
    },
    frequency: 0.008,
    spawnChance: 1,
    particlesPerWave: 150,
    emitterLifetime: 0.31,
    maxParticles: 1000,
    pos: {
        x: 0,
        y: 0,
    },
    addAtBack: false,
    spawnType: 'rect',
    spawnRect: {
        x: -100,
        y: -25,
        w: 200,
        h: 50,
    },
};
