/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>

/// <reference path="./LegendSectionView.ts" />

/// <reference path="../models/Legend.ts" />


class LegendView extends Marionette.CompositeView<LegendSection, LegendSectionView> {
    constructor(options?: any) {
        if (!options)
            options = {};

       options.className = "legendView";       
       options.template = _.template("");


		options.childView = LegendSectionView;
		options.collection = options.model.sections;
		options.childViewContainer = this.el;

        super(options);
    }
}
