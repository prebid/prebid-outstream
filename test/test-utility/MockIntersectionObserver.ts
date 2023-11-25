import { domRect } from './DomRect';

/**
 * jsdom has no built in intersection observer, and thus we are required to mock it for testing.
 *
 * Modified from source: https://stackoverflow.com/a/58651649/6419868
 *
 * @returns a promise that is resolved when the IntersectionObserver's constructor is called.
 *          The promise resolves with the callback method, that is passed to the constructor.
 */
export const mockIntersectionObserver = ({
    root = null,
    rootMargin = '',
    thresholds = [],
    disconnect = () => null,
    observe = () => null,
    takeRecords = () => [],
    unobserve = () => null
} = {}): Promise<{ triggerIntersection: (entries: IntersectionObserverEntry[]) => void }> => {
    return new Promise(resolve => {
        class IntersectionObserverMock implements IntersectionObserver {
            constructor(callback: IntersectionObserverCallback) {
                resolve({
                    triggerIntersection: (entries: IntersectionObserverEntry[]) =>
                        callback(entries, this)
                });
            }
            readonly root: Element | null = root;
            readonly rootMargin: string = rootMargin;
            readonly thresholds: ReadonlyArray<number> = thresholds;
            disconnect: () => void = disconnect;
            observe: (target: Element) => void = observe;
            takeRecords: () => IntersectionObserverEntry[] = takeRecords;
            unobserve: (target: Element) => void = unobserve;
        }

        Object.defineProperty(window, 'IntersectionObserver', {
            writable: true,
            configurable: true,
            value: IntersectionObserverMock
        });

        Object.defineProperty(window, 'IntersectionObserverEntry', {
            writable: true,
            configurable: true,
            value: {
                prototype: {
                    intersectionRatio: jest.fn()
                }
            }
        });
    });
};

export const intersectionObserverEntry = (
    entry: Partial<IntersectionObserverEntryInit>
): IntersectionObserverEntry => ({
    intersectionRatio: 1,
    isIntersecting: false,
    target: document.createElement('div'),
    time: 0,

    ...entry,

    boundingClientRect: domRect(entry.boundingClientRect),
    intersectionRect: domRect(entry.intersectionRect),
    rootBounds: domRect(entry.rootBounds || {}) || null
});
