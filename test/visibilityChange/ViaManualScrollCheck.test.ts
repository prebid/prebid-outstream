import { EventType } from '@testing-library/dom';
import { genericConfigurationWithDefaults } from '../../src/GenericConfiguration';
import '../../src/index';
import { OutStreamPlayerWindow } from '../../src/index';
import { Bid } from '../../src/types/bid';
import { domRect } from '../test-utility/DomRect';
import {
    assertPlayerNotInitialized,
    assertPlayerPaused,
    // assertPlayerPaused,
    assertPlayerStarted
} from '../test-utility/PlayerAssertions';
import { testForEachPlayer } from '../test-utility/TestForEachPlayer';

// silence the logger...
jest.mock('../../src/Logger');

declare const window: Window & OutStreamPlayerWindow;

const bid: Bid = {
    vastXml: 'vast xml'
};
const elementId = 'element-id';
const scrollTop = 0;
const screenHeight = 1000;
const elementHeight = 100;
const elementTop = 500;

const mockViewportHeight = (height: number) =>
    jest.spyOn(screen, 'availHeight', 'get').mockImplementation(() => height);

// A bit of cheaty: Instead of scrolling, alter only the screen height.
// Should work just as well, since it's all just math calculations.
const scrollOutOfViewport = () => {
    mockViewportHeight(elementTop / 2);
    window.dispatchEvent(new Event('scroll'));
};
const scrollIntoViewport = () => {
    mockViewportHeight(elementTop * 2);
    window.dispatchEvent(new Event('scroll'));
};

const createElement = (): HTMLElement => {
    const element = document.createElement('div');
    element.id = elementId;

    // jsdom does not have a rendering engine, and thus we must mock these implementation details
    element.getBoundingClientRect = () => domRect({ top: elementTop });
    jest.spyOn(element, 'clientHeight', 'get').mockImplementation(() => elementHeight);

    document.body.appendChild(element);
    return element;
};

// This is *just* to clean up event listeners on the window object (like scroll listeners)
// Not as easy as it sounds...
let cleanupWindowEventListeners: () => void;
const captureWindowEventListeners = () => {
    const capturedListeners: Map<EventType, Array<EventListenerOrEventListenerObject>> = new Map();
    const originalFunction = window.addEventListener;
    Object.assign(window, {
        addEventListener: (type: EventType, listener: EventListenerOrEventListenerObject) => {
            capturedListeners.set(type, [...(capturedListeners.get(type) || []), listener]);
            originalFunction(type, listener);
        }
    });
    // Return function to cleanup all listeners
    return () =>
        capturedListeners.forEach((listeners, type) =>
            listeners.forEach(listener => window.removeEventListener(type, listener))
        );
};

beforeEach(() => {
    process.env.VIEWABILITY_IMPLEMENTATION = 'MANUAL_SCROLL_CHECK';

    // Adjust screen size
    pageYOffset = scrollTop;
    jest.spyOn(screen, 'availHeight', 'get').mockImplementation(() => screenHeight);

    cleanupWindowEventListeners = captureWindowEventListeners();

    createElement();
});

afterEach(() => {
    document.body.innerHTML = '';
    cleanupWindowEventListeners();
});

testForEachPlayer(() => {
    test('The player should start immediately if the element is in the viewport in the beginning', async () => {
        scrollIntoViewport();
        window.outstreamPlayer!(bid, elementId, genericConfigurationWithDefaults({}));
        assertPlayerStarted();
    });

    test('The player should react accordingly to scroll events', async () => {
        scrollOutOfViewport();

        window.outstreamPlayer!(bid, elementId, genericConfigurationWithDefaults({}));

        // Player must not have been initialized yet as it is out of viewport
        assertPlayerNotInitialized();

        Array.from({ length: 5 }).forEach(() => {
            scrollIntoViewport();
            assertPlayerStarted();

            scrollOutOfViewport();
            assertPlayerPaused();
        });
    });
});
