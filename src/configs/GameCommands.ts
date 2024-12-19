import Head from '../models/HeadModel';

export const onZoneClickedCommand = (zoneNumber: number) => {
    Head.gameModel?.board?.selectZone(zoneNumber);
};

export const onCardClickCommand = (uuid: string) => {
    Head.gameModel?.board?.updateSelectedItem(uuid);
};
