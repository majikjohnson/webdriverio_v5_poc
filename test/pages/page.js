export default class Page {

    open(path) {
        browser.url(path);
    }

    get title() {
        return browser.getTitle();
    }

}