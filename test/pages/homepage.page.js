import Page from './page';

class Homepage extends Page {
    open() {
        super.open('/');
    }
}

export default new Homepage();