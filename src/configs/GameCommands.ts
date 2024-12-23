import { lego } from '@armathai/lego';
import { BoardState } from '../models/BoardModel';
import Head from '../models/HeadModel';
import { restartHintCommand, setBoardStateCommand, takeToStoreCommand } from './Commands';
import { lastRoomGuard, shortVersionCompleteGuard } from './Guards';

export const onZoneClickedCommand = (zoneNumber: number) => {
    lego.command

        .guard(shortVersionCompleteGuard)
        .execute(takeToStoreCommand)

        .guard(lastRoomGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(shortVersionCompleteGuard))
        .payload(zoneNumber)
        .execute(selectZoneCommand);
};

const selectZoneCommand = (zoneNumber: number) => {
    Head.gameModel?.board?.selectZone(zoneNumber);
};

export const onCardClickCommand = (uuid: string) => {
    lego.command

        .guard(shortVersionCompleteGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(shortVersionCompleteGuard))
        .execute(restartHintCommand)

        .guard(lego.not(shortVersionCompleteGuard))
        .payload(uuid)
        .execute(updateSelectedItem);
};

const updateSelectedItem = (uuid: string) => {
    Head.gameModel?.board?.updateSelectedItem(uuid);
};

export const onLockClickCommand = () => {
    lego.command

        .guard(shortVersionCompleteGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(shortVersionCompleteGuard))
        .payload(BoardState.ClickOnRoom)
        .execute(setBoardStateCommand);
};

export const onOkClickCommand = (uuid: string) => {
    Head.gameModel?.board?.acceptOkClick(uuid);
};
export const onNoClickCommand = () => {
    Head.gameModel?.board?.noClick();
};

export const onCarouselUpdateCommand = () => {
    lego.command
        .guard(lego.not(shortVersionCompleteGuard))
        .execute(restartHintCommand)

        .guard(shortVersionCompleteGuard)
        .execute(takeToStoreCommand);
};
