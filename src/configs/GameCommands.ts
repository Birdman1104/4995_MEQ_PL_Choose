import { lego } from '@armathai/lego';
import { BoardState } from '../models/BoardModel';
import Head from '../models/HeadModel';
import { restartHintCommand, setBoardStateCommand, takeToStoreCommand } from './Commands';
import { clickedReachedGuard } from './Guards';

export const onZoneClickedCommand = (zoneNumber: number) => {
    lego.command

        .guard(clickedReachedGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(clickedReachedGuard))
        .payload(zoneNumber)
        .execute(selectZoneCommand)

        .guard(lego.not(clickedReachedGuard))
        .execute(incrementClicksCommand);
};

const selectZoneCommand = (zoneNumber: number) => {
    Head.gameModel?.board?.selectZone(zoneNumber);
};

export const onCardClickCommand = (uuid: string) => {
    lego.command

        .guard(clickedReachedGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(clickedReachedGuard))
        .execute(incrementClicksCommand)

        .guard(lego.not(clickedReachedGuard))
        .execute(restartHintCommand)

        .guard(lego.not(clickedReachedGuard))
        .payload(uuid)
        .execute(updateSelectedItem);
};

const updateSelectedItem = (uuid: string) => {
    Head.gameModel?.board?.updateSelectedItem(uuid);
};

export const onLockClickCommand = () => {
    lego.command

        .guard(clickedReachedGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(clickedReachedGuard))
        .execute(incrementClicksCommand)

        .guard(lego.not(clickedReachedGuard))
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
        .guard(lego.not(clickedReachedGuard))
        .execute(restartHintCommand)

        .guard(clickedReachedGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(clickedReachedGuard))
        .execute(incrementClicksCommand);
};

export const incrementClicksCommand = () => {
    Head.gameModel?.incrementClicks();
};
