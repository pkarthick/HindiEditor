/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>

/// <reference path="./LegendItemView.ts" />

/// <reference path="../models/Legend.ts" />


class LegendSectionView extends Marionette.CompositeView<LegendItem, LegendItemView> {
    constructor(options?: any) {
        if (!options)
            options = {};

        options.className = "legendSection";
        options.template = _.template("");

		options.childView = LegendItemView;
		options.collection = options.model.items;
		options.childViewContainer = this.el;

        super(options);
        
    }
}
