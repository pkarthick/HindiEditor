/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="../lib/typings/jasmine/jasmine.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../models/Hindiprocessor.ts/" />

describe("Hindi Readability", () => {

var processor = new HindiProcessor();

    it("People who know English can read Hindi", () => {
        
        var expected = processor.getReadableWord("सुन्दर");
        expect( expected ).toBe("sundar");

//इमली

    });

});


(function() {
    // from boot.js
    var env = jasmine.getEnv();

    var htmlReporter = new jasmine.HtmlReporter();
    env.addReporter(htmlReporter);

    var specFilter = new jasmine.HtmlSpecFilter();
    env.specFilter = function (spec) {
        return specFilter.matches(spec.getFullName());
    };

    var currentWindowOnload = window.onload;
    window.onload = function () {
        if (currentWindowOnload) {
            currentWindowOnload(null);
        }
        htmlReporter.initialize();
        env.execute();
    };

})();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;