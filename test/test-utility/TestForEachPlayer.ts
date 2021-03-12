import { allPlayerTypes } from '../../src/PlayerFactory';

/**
 * Used to run tests for each supported video player.
 */
export const testForEachPlayer = (fn: () => void) => {
    describe.each(allPlayerTypes)('with player %s', playerType => {
        beforeEach(() => {
            process.env.SELECTED_PLAYER = playerType;
        });

        fn();
    });
};
