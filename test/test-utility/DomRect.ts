export const domRect = (domRect: Partial<DOMRectReadOnly> = {}): DOMRectReadOnly => ({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    toJSON: jest.fn(),
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    ...domRect
});
