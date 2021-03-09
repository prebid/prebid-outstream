import { getOffset, getScrollTop, isOnScreen } from '../src/Utils';
jest.mock('../src/Logger');

describe('Test cases for Utils.js file', () => {
    describe('getScrollTop method', () => {
        test('it should return the value of pageYOffset', () => {
            global.pageYOffset = 10;

            let viewPortTop = getScrollTop();
            expect(viewPortTop).toEqual(10);
        });

        test('it should return the value of scrollTop', () => {
            (global as any).pageYOffset = undefined;
            document.body.scrollTop = 5;

            let viewPortTop = getScrollTop();
            expect(viewPortTop).toEqual(5);
        });
    });

    describe('getOffset method', () => {
        test('it should use pageXOffset and pageYOffset values in addition, if element is present', () => {
            global.pageYOffset = 10;
            global.pageXOffset = 100;
            const element = document.createElement('div');

            const getBoundingClientRectMock = jest
                .spyOn(element, 'getBoundingClientRect')
                .mockImplementation(() => ({
                    x: 851.671875,
                    y: 200.046875,
                    width: 8.34375,
                    height: 17,
                    top: 967.046875,
                    right: 860.015625,
                    bottom: 984.046875,
                    left: 851.671875,
                    toJSON: jest.fn()
                }));

            let obj = getOffset(element);
            expect(obj).toEqual({ top: 977.046875, left: 951.671875 });

            getBoundingClientRectMock.mockReset();
        });

        test('it should use scrollLeft and scrollTop values in addition, if element is present', () => {
            (global.pageYOffset as any) = undefined;
            (global.pageXOffset as any) = undefined;
            document.documentElement.scrollLeft = 1;
            document.documentElement.scrollTop = 2;
            const element = document.createElement('div');

            const getBoundingClientRectMock = jest
                .spyOn(element, 'getBoundingClientRect')
                .mockImplementation(() => ({
                    x: 851.671875,
                    y: 200.046875,
                    width: 8.34375,
                    height: 17,
                    top: 967.046875,
                    right: 860.015625,
                    bottom: 984.046875,
                    left: 851.671875,
                    toJSON: jest.fn()
                }));

            let obj = getOffset(element);
            expect(obj).toEqual({ top: 969.046875, left: 852.671875 });

            getBoundingClientRectMock.mockReset();
        });
    });

    describe('isOnScreen method', () => {
        test('it should return false, if element is not visible', () => {
            global.pageYOffset = 10;
            global.pageXOffset = 100;
            const element = document.createElement('div');
            const testId = 'dummy-testId';
            element.setAttribute('id', testId);
            document.body.appendChild(element);

            const getBoundingClientRectMock = jest
                .spyOn(element, 'getBoundingClientRect')
                .mockImplementation(() => ({
                    x: 851.671875,
                    y: 200.046875,
                    width: 8.34375,
                    height: 17,
                    top: 967.046875,
                    right: 860.015625,
                    bottom: 984.046875,
                    left: 851.671875,
                    toJSON: jest.fn()
                }));

            let isVisible = isOnScreen(testId);
            expect(isVisible).toBe(false);

            getBoundingClientRectMock.mockReset();
            document.body.innerHTML = '';
        });
    });
});
