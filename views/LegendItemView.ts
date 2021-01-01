/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>

/// <reference path="../models/Legend.ts" />


class LegendItemView extends Marionette.ItemView<LegendItem> {
    constructor(options?: any) {
        if (!options)
            options = {};

        options.template = "#legendItemViewTemplate";
        options.className = "legendItem";
        options.events = { "click": this.onClickEvent };
        
        super(options);

    }

    onClickEvent() {
        alert('legendItem clicked');
    }

}

