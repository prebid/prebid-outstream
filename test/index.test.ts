import '../src/index';
jest.mock('../src/Logger');
import { genericConfigurationWithDefaults } from '../src/GenericConfiguration';
import OutstreamPlayer from '../src/OutstreamPlayer';
import { OutStreamPlayerWindow } from '../src/index';
jest.mock('../src/OutstreamPlayer');

declare const window: Window & OutStreamPlayerWindow;

describe('Test cases for index.js file', () => {
    test('it should retun instance of OutstreamPlayer ', () => {
        let obj = window.outstreamPlayer!({}, '', genericConfigurationWithDefaults({}));
        expect(obj).toBeInstanceOf(OutstreamPlayer);
    });
});
