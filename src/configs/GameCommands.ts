import { lego } from '@armathai/lego';
import { BoardState } from '../models/BoardModel';
import Head from '../models/HeadModel';
import { setBoardStateCommand } from './Commands';

export const onZoneClickedCommand = (zoneNumber: number) => {
    Head.gameModel?.board?.selectZone(zoneNumber);
};

export const onCardClickCommand = (uuid: string) => {
    Head.gameModel?.board?.updateSelectedItem(uuid);
};

export const onLockClickCommand = () => {
    lego.command.payload(BoardState.ClickOnRoom).execute(setBoardStateCommand);
};

export const onOkClickCommand = (uuid: string) => {
    Head.gameModel?.board?.acceptOkClick(uuid);
};
