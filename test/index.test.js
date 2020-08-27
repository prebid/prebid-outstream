var index = require('../src/index');
jest.mock('../src/Logger');
import OutstreamPlayer from '../src/OutstreamPlayer';
jest.mock('../src/OutstreamPlayer');

describe('Test cases for index.js file', () => {

    test('it should retun instance of OutstreamPlayer ', () => {
        let obj = outstreamPlayer();
        expect(obj).toBeInstanceOf(OutstreamPlayer);
    });
});