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