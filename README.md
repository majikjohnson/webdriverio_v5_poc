
--Initiate Git Repo
git init
touch README.md
git add README.md
git commit

--create .gitignore file
touch .gitignore

--add node_modules/ to .gitignore

--initiate a node project
npm init //This creates package.json

--install webdriver.io command line
npm i --save-dev @wdio/cli

--Configure webdriver.io
./node_modules/.bin/wdio config (using sync rather than asyn)

--add folder for test specs
mkdir -p ./test/specs

--add basic.js file for quick test
touch ./test/specs/basic.js

const assert = require('assert');

describe('The Internet Homepage', () => {
    it('should have the correct title', () => {
        browser.url('https://the-internet.herokuapp.com')
        const title = browser.getTitle();
        assert.strictEqual(title, 'The Internet');
    });
});

--run test to make sure it works
./node_modules/.bin/wdio wdio.conf.js

--install chai package
npm i --save-dev chai

--add chai Should to global context in wdio.conf.js

 before: function (capabilities, specs) {
        var chai = require('chai');
        global.expect = chai.expect;
        chai.Should();
    }

--Add test to basic.js to ensure that chai works.

 it('Should work with Chai library', () => {
        browser.url('https://the-internet.herokuapp.com');
        browser.getTitle().should.be.equal('The Internet');
    });

--Add visual regression package
npm install --save-dev wdio-image-comparison-service

--Add visual regression configuration to wdio.conf.js (instantiate the plugin)
const { join } = require('path');

exports.config {
    ...
    services: ['chromedriver', [
        'image-comparison', {
             baselineFolder: join(process.cwd(), './test/visual/baseline/'),
            formatImageName: '{tag}-{logName}-{width}x{height}',
            screenshotPath: join(process.cwd(), './test/visual/'),
            savePerInstance: true,
            autoSaveBaseline: true,
            blockOutStatusBar: true,
            blockOutToolBar: true,
        }],
    ],
    ...
}

--Add folder structure to hold screenshot
Actual/Diff - test/visual/
Baseline - test/visual/baseline/

--Add test to check that visual regression package is working correctly (in test/visual/VRTestRunner.js)

describe('Visual Regression test', () => {
    beforeEach(() => {
        browser.url('https://www.google.com');
    });

    it('should compare to the baseline', () => {
        $('input[name="q"]').setValue("SSE");
        browser.keys('Enter');
        browser.checkScreen('Google_SSE').should.be.equal(0);
    });

});

