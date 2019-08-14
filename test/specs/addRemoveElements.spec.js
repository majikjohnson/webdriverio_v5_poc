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