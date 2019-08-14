
## Initiate Git Repo
```
git init
touch README.md
git add README.md
git commit -m "Initial Commit"
```
## Create .gitignore file and add node_modules
touch .gitignore < node_modules/

## Initiate a node project
This will create package.json
```
npm init
```

## Install webdriver.io command line
```
npm i --save-dev @wdio/cli
```

## Configure webdriver.io
Used sync rather than async
```
./node_modules/.bin/wdio config
```

## Add folder for test specs
```
mkdir -p ./test/specs
```

## Add basic.js file for quick test
```
touch ./test/specs/basic.js
```
Test Code:
```
const assert = require('assert');

describe('The Internet Homepage', () => {
    it('should have the correct title', () => {
        browser.url('https://the-internet.herokuapp.com')
        const title = browser.getTitle();
        assert.strictEqual(title, 'The Internet');
    });
});
```

## Run test in basic.js to make sure framework works
```
./node_modules/.bin/wdio wdio.conf.js
```

## Install chai package
```
npm i --save-dev chai
```

## Add chai Should to global context
Add the following to wdio.conf.js within before hook
```
 before: function (capabilities, specs) {
        var chai = require('chai');
        global.expect = chai.expect;
        chai.Should();
}
```

## Add test to basic.js to ensure that chai works
```
 it('Should work with Chai library', () => {
        browser.url('https://the-internet.herokuapp.com');
        browser.getTitle().should.be.equal('The Internet');
    });
```

## Add visual regression package
```
npm install --save-dev wdio-image-comparison-service
```

## Add visual regression configuration to wdio.conf.js (instantiate the plugin)
```
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
```

## Add folder structure to hold screenshot
Actual/Diff:
```
mkdir ./test/visual
```
Baseline:
```
mkdir ./test/visual/baseline
```

## Add test to check that visual regression package is working correctly (in test/visual/VRTestRunner.js)
```
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
```
