import { lego } from '@armathai/lego';
import { Howl } from 'howler';
import { BoardEvents, MainGameEvents, UIEvents } from './events/MainEvents';
import { SoundModelEvents } from './events/ModelEvents';
import { SoundState } from './models/SoundModel';
import { CLICK_SOUND } from './sounds/click';
import { ITEM_SOUND } from './sounds/itemPut';
import { swoosh } from './sounds/swoosh';

class SoundControl {
    private sounds: { [key: string]: Howl };
    private isMutedFromIcon = false;

    public constructor() {
        this.sounds = {};

        lego.event
            .on(MainGameEvents.MuteUpdate, this.focusChange, this)
            .on(SoundModelEvents.StateUpdate, this.onSoundStateUpdate, this)
            .on(BoardEvents.ZoneClicked, this.playClick, this)
            .on(BoardEvents.LockClick, this.playClick, this)
            .on(BoardEvents.OkClick, this.playOk, this)
            .on(BoardEvents.NoClick, this.playClick, this)
            .on(UIEvents.CardClick, this.playClick, this)
            .on(UIEvents.CarouselUpdate, this.playSwoosh, this);
    }

    public loadSounds(): void {
        this.sounds.click = new Howl({ src: CLICK_SOUND });
        this.sounds.item = new Howl({ src: ITEM_SOUND });
        this.sounds.swoosh = new Howl({ src: swoosh });
    }

    private playClick(): void {
        this.sounds.click.play();
    }

    private playOk(): void {
        this.sounds.item.play();
    }

    private playSwoosh(): void {
        this.sounds.swoosh.play();
    }

    private focusChange(outOfFocus: boolean): void {
        if (this.isMutedFromIcon) return;
        for (const [key, value] of Object.entries(this.sounds)) {
            value.volume(outOfFocus ? 0 : key === 'click' ? 0.9 : 1);
        }
    }

    private onSoundStateUpdate(state: SoundState): void {
        state === SoundState.On ? this.unmute() : this.mute();
    }

    private mute(): void {
        this.isMutedFromIcon = true;
        for (const [key, value] of Object.entries(this.sounds)) {
            value.volume(0);
        }
    }

    private unmute(): void {
        this.isMutedFromIcon = false;
        for (const [key, value] of Object.entries(this.sounds)) {
            value.volume(key === 'click' ? 0.9 : 1);
        }
    }
}

const SoundController = new SoundControl();
export default SoundController;
