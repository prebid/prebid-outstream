export const play = jest.fn();
export const pause = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        play: play,
        pause: pause
    };
});

export default mock;
