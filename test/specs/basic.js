const assert = require('assert');

describe('The Internet Homepage', () => {
    it('should have the correct title', () => {
        browser.url('https://the-internet.herokuapp.com')
        const title = browser.getTitle();
        assert.strictEqual(title, 'The Internet');
    });
});