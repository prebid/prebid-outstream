import { queryByTestId, getByTestId } from '@testing-library/dom';
import { getSelectedPlayer } from '../../src/PlayerFactory';
import { fakeFluidPlayerTestId, play, pause, on } from '../../__mocks__/fluid-player';

/**
 * These are needed in many tests.
 */

export const assertPlayerNotInitialized = () => {
    const selectedPlayer = getSelectedPlayer();

    switch (selectedPlayer) {
        case 'FLUID_PLAYER':
            expect(queryByTestId(document.body, fakeFluidPlayerTestId)).toBeFalsy();
            expect(play).not.toHaveBeenCalled();
            expect(pause).not.toHaveBeenCalled();
            expect(on).not.toHaveBeenCalled();
            break;
        case 'VIDEO_JS':
            // TODO as VIDEO_JS is not implemented yet.
            break;
        default:
            throw `assertPlayerNotInitialized not implemented for ${selectedPlayer}`;
    }
};

export const assertPlayerStarted = () => {
    const selectedPlayer = getSelectedPlayer();

    switch (selectedPlayer) {
        case 'FLUID_PLAYER':
            expect(getByTestId(document.body, fakeFluidPlayerTestId)).toBeTruthy();
            expect(play).toHaveBeenCalled();
            play.mockClear();
            break;
        case 'VIDEO_JS':
            // TODO as VIDEO_JS is not implemented yet.
            break;
        default:
            throw `assertPlayerStarted not implemented for ${selectedPlayer}`;
    }
};

export const assertPlayerPaused = () => {
    const selectedPlayer = getSelectedPlayer();

    switch (selectedPlayer) {
        case 'FLUID_PLAYER':
            expect(getByTestId(document.body, fakeFluidPlayerTestId)).toBeTruthy();
            expect(pause).toHaveBeenCalled();
            pause.mockClear();
            break;
        case 'VIDEO_JS':
            // TODO as VIDEO_JS is not implemented yet.
            break;
        default:
            throw `assertPlayerPaused not implemented for ${selectedPlayer}`;
    }
};
