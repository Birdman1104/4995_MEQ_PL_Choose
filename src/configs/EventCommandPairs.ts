import { lego } from '@armathai/lego';
import { BoardEvents, MainGameEvents, SoundEvents, TakeMe, UIEvents } from '../events/MainEvents';
import { AdModelEvents, BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import {
    onAdStatusUpdateCommand,
    onBoardStateUpdateCommand,
    onGameStateUpdateCommand,
    onMainViewReadyCommand,
    onSoundToggleCommand,
    resizeCommand,
    takeToStoreCommand,
} from './Commands';
import {
    onCardClickCommand,
    onCarouselUpdateCommand,
    onLockClickCommand,
    onNoClickCommand,
    onOkClickCommand,
    onZoneClickedCommand,
} from './GameCommands';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: AdModelEvents.StatusUpdate,
        command: onAdStatusUpdateCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: onGameStateUpdateCommand,
    },
    {
        event: MainGameEvents.Resize,
        command: resizeCommand,
    },
    {
        event: TakeMe.ToStore,
        command: takeToStoreCommand,
    },
    {
        event: SoundEvents.SoundToggle,
        command: onSoundToggleCommand,
    },
    {
        event: BoardEvents.ZoneClicked,
        command: onZoneClickedCommand,
    },
    {
        event: UIEvents.CardClick,
        command: onCardClickCommand,
    },
    {
        event: BoardEvents.LockClick,
        command: onLockClickCommand,
    },
    {
        event: BoardModelEvents.StateUpdate,
        command: onBoardStateUpdateCommand,
    },
    {
        event: BoardEvents.OkClick,
        command: onOkClickCommand,
    },
    {
        event: BoardEvents.NoClick,
        command: onNoClickCommand,
    },

    {
        event: UIEvents.CarouselUpdate,
        command: onCarouselUpdateCommand,
    },
]);
