import { genericConfigurationWithDefaults } from '../../src/GenericConfiguration';
import '../../src/index';
import { OutStreamPlayerWindow } from '../../src/index';
import { Bid } from '../../src/types/bid';
import {
    assertPlayerNotInitialized,
    assertPlayerPaused,
    assertPlayerStarted
} from '../test-utility/PlayerAssertions';
import {
    intersectionObserverEntry,
    mockIntersectionObserver
} from '../test-utility/MockIntersectionObserver';
import { testForEachPlayer } from '../test-utility/TestForEachPlayer';

// silence the logger...
jest.mock('../../src/Logger');

declare const window: Window & OutStreamPlayerWindow;

const elementId = 'element-id';
const bid: Bid = {
    vastXml: 'vast xml'
};

beforeEach(() => {
    process.env.VIEWABILITY_IMPLEMENTATION = 'INTERSECTION_OBSERVER';
    document.body.innerHTML = `<div id="${elementId}" />`;
});

afterEach(() => {
    document.body.innerHTML = '';
});

testForEachPlayer(() => {
    test('The player should react accordingly to the intersection observer', async () => {
        const intersectionObserverConstructorPromise = mockIntersectionObserver();

        window.outstreamPlayer!(bid, elementId, genericConfigurationWithDefaults({}));

        const { triggerIntersection } = await intersectionObserverConstructorPromise;

        // Player must not initialize before the intersection observer callback
        assertPlayerNotInitialized();

        Array.from({ length: 5 }).forEach(() => {
            triggerIntersection([intersectionObserverEntry({ isIntersecting: true })]);
            assertPlayerStarted();

            triggerIntersection([intersectionObserverEntry({ isIntersecting: false })]);
            assertPlayerPaused();
        });
    });
});
