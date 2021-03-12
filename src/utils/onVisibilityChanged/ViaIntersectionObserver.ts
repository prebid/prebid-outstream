import { OnVisibilityChanged } from '.';

const isIntersectionObserverSupported = () =>
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;

/**
 * onVisibilityChange implementation using the browser's IntersectionObserver api.
 */
export const onVisibilityChangedViaIntersectionObserver: OnVisibilityChanged = (
    elementId,
    listener
) => {
    const element = document.getElementById(elementId);

    if (!element || !isIntersectionObserverSupported()) {
        return;
    }

    const callback: IntersectionObserverCallback = entries => {
        const isVisible = entries.some(entry => entry.isIntersecting);
        listener(isVisible);
    };

    const intersectionObserver = new IntersectionObserver(callback, {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });

    intersectionObserver.observe(element);
};
