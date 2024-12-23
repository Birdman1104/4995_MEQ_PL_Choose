export const AdModelEvents = {
    StatusUpdate: 'AdModelStatusUpdate',
    CtaUpdate: 'AdModelCtaUpdate',
    SoundUpdate: 'AdModelSoundUpdate',
    HintUpdate: 'AdModelHintUpdate',
    Inactivity5sUpdate: 'AdModelInactivity5sUpdate',
    Inactivity10sUpdate: 'AdModelInactivity10sUpdate',
    Inactivity15sUpdate: 'AdModelInactivity15sUpdate',
};

export const BoardModelEvents = {
    StateUpdate: 'BoardModelStateUpdate',
    ZonesUpdate: 'BoardModelZonesUpdate',
    SelectedZoneNumberUpdate: 'BoardModelSelectedZoneNumberUpdate',
    SelectedZoneUpdate: 'BoardModelSelectedZoneUpdate',
    MoneyUpdate: 'BoardModelMoneyUpdate',
    ProgressUpdate: 'BoardModelProgressUpdate',
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

export const ZoneModelEvents = {
    CompletedUpdate: 'ZoneModelCompletedUpdate',
    SelectedItemUpdate: 'ZoneModelSelectedItemUpdate',
};
