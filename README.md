
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
Used sync rather than async.  Use Mocha for the test runner
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

## Add Bable.js support to the project
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register
```
Add the following to wdio.conf.js:
```
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        require: ['@babel/register']
    },
```

## Add babel.config.js file with default settings
```
module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: "current"
            }
        }]
    ]
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

## Add Page Objecct Support
Page object support comes out of the box with Webdriver.io v5.  Here is a basic setup.
* Page Objects stored in ./tests/pages/
* Page Object class files have the extention ".page.js"
* Page Objects are stateless, and return an instantiated object
* Spec are stored in ./tests/specs/
* Specs use the naming convention \[pageName\].specs.js
* Specs should be specific to the page being tested


### Page Objecct Base Class - tests/pages/page.js
```
export default class Page {

    open(path) {
        browser.url(path);
    }

    get title() {
        return browser.getTitle();
    }

}
```

### Add/Remove Elements Page Object - tests/pages/addRemoveElements.page.js
```
import Page from './page';

class AddRemoveElements extends Page {
    open() {
        super.open('add_remove_elements/');
    }

    get addElementButton() {
        return $('.example > button');
    }

    getDeleteButtons() {
        return $$('button=Delete');
    }
}

export default new AddRemoveElements();
```

### Add/Remove Elements Page Specs - ./test/specs/addRemoveElements.spec.js
```
import AddRemoveElements from '../pages/addRemoveElements.page';

describe('Add/Remove Elements Page', () => {
    beforeEach(() => {
        AddRemoveElements.open();
    });

    it('Should contain an Add Element button', () => {
        AddRemoveElements.addElementButton.should.exist;
    });
    
    it('Should add a Delete button to the page when Add Element button is clicked', () => {
        AddRemoveElements.addElementButton.click();
        AddRemoveElements.getDeleteButtons().length.should.be.equal(1);
    });

    it('Should allow multiple Delete buttons to be added', () => {

        for(let i = 0; i < 5; i++) {
            AddRemoveElements.addElementButton.click();
        }
        AddRemoveElements.getDeleteButtons().length.should.be.equal(5);
    });
});
```

## Add Allure Reports

### Install the Allure package
```
npm i -D @wdio/allure-reporter
```

### Install the Allure report generator
```
npm i -D allure-commandline
```

### Install the 'fs-extra' package to make copying directories eaiser
```
npm i -D fs-extra
```

### Add the following to wdio.conf.js
```
exports.config = {
    ...
    reporters: ['dot', ['Allure', {
        outputDir: 'allure-results',
    }]],
    ...

}
```

### Configure the ability to take screenshots when tests fail in wdio.conf.js
```
    afterTest: function (test) {
        if (test.error !== undefined) {
            browser.takeScreenshot();
        }
    },
```

### Add report generation to the onComplete hook in wdio.conf.js
```
exports.config = {
    ...
    onComplete: function(exitCode, config, capabilities, results) {
       const allure = require('allure-commandline');
        const fs = require('fs-extra');
        console.log("Allure Reporting: Copying run history from report folder to results folder");
        fs.ensureDirSync('allure/report/history');
        fs.copySync('allure/report/history', 'allure/results/history', {overwrite: true});

        console.log("Allure Reporting: Generating report");
        const generation = allure(['generate', 'allure/results', '-o', 'allure/report', '--clean' ]);
        generation.on('exit', function(exitCode) {
            console.log('Allure Reporting: Generation is finished with code:', exitCode);
        });
    },
    ...
}
```

### Use the allure-commandline tool to open the report
Run from the terminal (run using npx as the allure-commandline tool was installed locally as dev-dependency)
```
npx allure open allure/report
```


