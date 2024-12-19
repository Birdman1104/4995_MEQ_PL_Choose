import Head from '../models/HeadModel';

export const onZoneClickedCommand = (zoneNumber: number) => {
    Head.gameModel?.board?.selectZone(zoneNumber);
};
