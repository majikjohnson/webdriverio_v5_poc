import Homepage from '../pages/homepage.page';

describe('The Internet Homepage', () => {
    beforeEach(function() {
        Homepage.open();
    });

    it('has the correct title', () => {
        Homepage.title.should.be.equal('The Internet');
    });
});