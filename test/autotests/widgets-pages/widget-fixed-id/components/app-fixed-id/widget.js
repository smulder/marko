var expect = require('chai').expect;

module.exports = {
    onMount: function() {
        this.name = 'app-fixed-id';
        window.appFixedId = this;
    },
    testGetWidget: function() {
        var helloWidget = this.getWidget('hello');
        expect(helloWidget != null).to.equal(true);
    },
    testGetEl: function() {
        var wrapperEl = this.getEl('wrapper');
        expect(wrapperEl != null).to.equal(true);
    }
};