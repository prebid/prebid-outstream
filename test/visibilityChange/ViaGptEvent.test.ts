import { genericConfigurationWithDefaults } from '../../src/GenericConfiguration';
import '../../src/index';
import { OutStreamPlayerWindow } from '../../src/index';
import logger from '../../src/Logger';
import { Bid } from '../../src/types/bid';
import {
    assertPlayerNotInitialized,
    assertPlayerPaused,
    assertPlayerStarted
} from '../test-utility/PlayerAssertions';
import { testForEachPlayer } from '../test-utility/TestForEachPlayer';

// silence the logger...
jest.mock('../../src/Logger');

declare const window: Window &
    OutStreamPlayerWindow & {
        googletag?: googletag.Googletag;
    };

const elementId = 'element-id';
const bid: Bid = {
    vastXml: 'vast xml'
};

// Dirtily mocks only the necessary slotVisibilityChanged event and returns a function to trigger it.
type GptEventTrigger = (event: Partial<googletag.events.SlotVisibilityChangedEvent>) => void;
const mockGptEvent = (): Promise<{
    triggerEvent: GptEventTrigger;
}> =>
    new Promise(
        resolve =>
            (window.googletag = ({
                pubads: () => ({
                    addEventListener: jest.fn(
                        (
                            eventType,
                            listener: (event: googletag.events.SlotVisibilityChangedEvent) => void
                        ) =>
                            eventType === 'slotVisibilityChanged' &&
                            resolve({ triggerEvent: listener as GptEventTrigger })
                    )
                })
            } as any) as googletag.Googletag)
    );

// Just a type cast
const gptSlot = (slot: Partial<googletag.Slot>): googletag.Slot => slot as googletag.Slot;

const scrollOutOfViewport = (triggerGptEvent: GptEventTrigger, slotElementId = elementId) => {
    triggerGptEvent({
        slot: gptSlot({ getSlotElementId: () => slotElementId }),
        inViewPercentage: 0
    });
};
const scrollIntoViewport = (triggerGptEvent: GptEventTrigger, slotElementId = elementId) => {
    triggerGptEvent({
        slot: gptSlot({ getSlotElementId: () => slotElementId }),
        inViewPercentage: 1
    });
};

beforeEach(() => {
    process.env.VIEWABILITY_IMPLEMENTATION = 'GPT_EVENT';
    document.body.innerHTML = `<div id="${elementId}" />`;
});

afterEach(() => {
    document.body.innerHTML = '';
    window.googletag = undefined;
});

testForEachPlayer(() => {
    test(`The player should react accordingly to gpt events, which are aimed at the video player's slot`, async () => {
        const gptEventRegisteredPromise = mockGptEvent();

        window.outstreamPlayer!(bid, elementId, genericConfigurationWithDefaults({}));

        const { triggerEvent } = await gptEventRegisteredPromise;

        // Player must not initialize before the gpt event
        assertPlayerNotInitialized();

        Array.from({ length: 5 }).forEach(() => {
            scrollIntoViewport(triggerEvent);
            assertPlayerStarted();

            scrollOutOfViewport(triggerEvent);
            assertPlayerPaused();
        });
    });

    test(`The player should *not* react at all to gpt events, which are not aimed at the player's slot`, async () => {
        const gptEventRegisteredPromise = mockGptEvent();

        window.outstreamPlayer!(bid, elementId, genericConfigurationWithDefaults({}));

        const { triggerEvent } = await gptEventRegisteredPromise;

        Array.from({ length: 5 }).forEach(() => {
            scrollIntoViewport(triggerEvent, 'incorrect-slot-id');
            scrollOutOfViewport(triggerEvent, 'incorrect-slot-id');
        });

        assertPlayerNotInitialized();
    });

    test('The player should log an error if googletag is not provided', () => {
        window.outstreamPlayer!(bid, elementId, genericConfigurationWithDefaults({}));
        expect(
            (logger.error as jest.Mock).mock.calls.some((call: string[]) =>
                call[0].includes('window.googletag is not defined')
            )
        ).toBeTruthy();
        assertPlayerNotInitialized();
    });
});
