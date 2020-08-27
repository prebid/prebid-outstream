import utils  from '../src/Utils';
jest.mock('../src/Logger');

describe('Test cases for Utils.js file', () => {

    describe('getScrollTop method', () => {

        test('it should return the value of pageYOffset', () => {
            global.pageYOffset = 10;

            let viewPortTop = utils.getScrollTop();
            expect(viewPortTop).toEqual(10);
        });

        test('it should return the value of scrollTop', () => {
            global.pageYOffset = undefined;
            document.body.scrollTop = 5;

            let viewPortTop = utils.getScrollTop();
            expect(viewPortTop).toEqual(5);
        });
    });


    describe('getOffset method', () => {

        test('it should return pageXOffset and pageYOffset values, if element is not present', () => {
            global.pageYOffset = 10;
            global.pageXOffset = 100;

            let obj = utils.getOffset();
            expect(obj).toEqual({top: 10, left: 100});
        });

        test('it should return scrollLeft and scrollTop values, if element is not present', () => {
            global.pageYOffset = undefined;
            global.pageXOffset = undefined;
            document.documentElement.scrollLeft = 50;
            document.documentElement.scrollTop = 5;

            let obj = utils.getOffset();
            expect(obj).toEqual({top: 5, left: 50});
        });

        test('it should use pageXOffset and pageYOffset values in addition, if element is present', () => {
            global.pageYOffset = 10;
            global.pageXOffset = 100;
            const element = document.createElement('div');

            element.getBoundingClientRect = jest.fn(() => ({
                x: 851.671875,
                y: 200.046875,
                width: 8.34375,
                height: 17,
                top: 967.046875,
                right: 860.015625,
                bottom: 984.046875,
                left: 851.671875,
            }));

            let obj = utils.getOffset(element);
            expect(obj).toEqual({top: 977.046875, left: 951.671875});

            element.getBoundingClientRect.mockReset();
        });

        test('it should use scrollLeft and scrollTop values in addition, if element is present', () => {
            global.pageYOffset = undefined;
            global.pageXOffset = undefined;
            document.documentElement.scrollLeft = 1;
            document.documentElement.scrollTop = 2;
            const element = document.createElement('div');

            element.getBoundingClientRect = jest.fn(() => ({
                x: 851.671875,
                y: 200.046875,
                width: 8.34375,
                height: 17,
                top: 967.046875,
                right: 860.015625,
                bottom: 984.046875,
                left: 851.671875,
            }));

            let obj = utils.getOffset(element);
            expect(obj).toEqual({top: 969.046875, left: 852.671875});

            element.getBoundingClientRect.mockReset();
        });
    });


    describe('isOnScreen method', () => {

        test('it should return false, if element ID is not provided', () => {
            let isVisible = utils.isOnScreen();
            expect(isVisible).toBe(false);
        });

        test('it should return false, if element is not visible', () => {
            global.pageYOffset = 10;
            global.pageXOffset = 100;
            const element = document.createElement('div');
            const testId = "dummy-testId";
            element.setAttribute("id", testId);
            document.body.appendChild(element);

            element.getBoundingClientRect = jest.fn(() => ({
                x: 851.671875,
                y: 200.046875,
                width: 8.34375,
                height: 17,
                top: 967.046875,
                right: 860.015625,
                bottom: 984.046875,
                left: 851.671875,
            }));

            let isVisible = utils.isOnScreen(testId);
            expect(isVisible).toBe(false);

            element.getBoundingClientRect.mockReset();
            document.body.innerHTML = '';
        });
    });
});