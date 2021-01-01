/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../models/ModelBase.ts" />

/// <reference path="../models/HindiProcessor.ts" />
/// <reference path="./LegendView.ts" />

class KeyboardView extends Marionette.ItemView<Backbone.Model>{

	constructor(options?: any) {
		if (!options)
		options = {};

		options.events = {
			'mouseenter': this.onMouseEnter,
			'mouseleave': this.onMouseLeave
		};

		options.el = "#keyboardContainer";
		options.template = false;

		super(options);

	}

	onMouseEnter(){
		$('#legendRegion').show();		
	}

	onMouseLeave(){
		$('#legendRegion').hide();	
	}


}
