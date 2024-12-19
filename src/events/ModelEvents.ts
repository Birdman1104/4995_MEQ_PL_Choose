export const AdModelEvents = {
    StatusUpdate: 'AdModelStatusUpdate',
    CtaUpdate: 'AdModelCtaUpdate',
    SoundUpdate: 'AdModelSoundUpdate',
    HintUpdate: 'AdModelHintUpdate',
};

export const BoardModelEvents = {
    StateUpdate: 'BoardModelStateUpdate',
    ZonesUpdate: 'BoardModelZonesUpdate',
    SelectedZoneNumberUpdate: 'BoardModelSelectedZoneNumberUpdate',
    SelectedZoneUpdate: 'BoardModelSelectedZoneUpdate',
};

export const CtaModelEvents = { VisibleUpdate: 'CtaModelVisibleUpdate' };

export const GameModelEvents = {
    StateUpdate: 'GameModelStateUpdate',
    IsTutorialUpdate: 'GameModelIsTutorialUpdate',
    BoardUpdate: 'GameModelBoardUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate', AdUpdate: 'HeadModelAdUpdate' };

export const HintModelEvents = { StateUpdate: 'HintModelStateUpdate', VisibleUpdate: 'HintModelVisibleUpdate' };

export const SoundModelEvents = { StateUpdate: 'SoundModelStateUpdate' };

export const ZoneModelEvents = { TypeUpdate: 'ZoneModelTypeUpdate', CompletedUpdate: 'ZoneModelCompletedUpdate' };
