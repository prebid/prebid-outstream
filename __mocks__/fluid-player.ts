import fluidPlayer, { FluidPlayer } from 'fluid-player';

/**
 * Mocks the fluid-player library.
 * Just as the library, it creates a DOM element if used and has
 * appropriate function implementations for testing.
 */

export const fakeFluidPlayerTestId = 'fake-fluid-player';

const eventListeners: Map<string, Function> = new Map();

export const on = jest.fn((event, callback) => eventListeners.set(event, callback));
export const play = jest.fn(() => eventListeners.get('playing')?.());
export const pause = jest.fn(() => eventListeners.get('pause')?.());

const mock = jest.fn<FluidPlayer, Parameters<typeof fluidPlayer>>(id => {
    const parent = document.getElementById(id);

    const fakeVideoElement = document.createElement('div');
    fakeVideoElement.setAttribute('data-testid', fakeFluidPlayerTestId);
    parent?.appendChild(fakeVideoElement);

    return {
        play,
        pause,
        on
    };
});

export default mock;
