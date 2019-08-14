describe('Visual Regression test', () => {
    beforeEach(() => {
        browser.url('https://www.google.com');
    });
    
    it('should capture a screenshot', () => {
        $('input[name="q"]').setValue("SSE");
        browser.keys('Enter');
        browser.saveScreen('Google_SSE')
    });

    it.only('should compare to the baseline', () => {
        $('input[name="q"]').setValue("OVO");
        browser.keys('Enter');
        browser.checkScreen('Google_SSE').should.be.equal(0);
    });

});