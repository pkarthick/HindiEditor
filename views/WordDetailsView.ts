/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/jqueryui/jqueryui.d.ts" />

/// <reference path="../models/WordDetails.ts" />


class WordDetailsView extends Marionette.CompositeView<WordDetails, CategoryView>{

	constructor (options?: any ) {
		if (!options)
		options = {};

		options.template = "#wordDetailsViewTemplate";
		options.className = "wordDetailsView";

		options.childView = CategoryView;
		options.collection = options.model.categories;
		options.childViewContainer = this.el;

		super(options);

	}

}

class CategoryView extends Marionette.CompositeView<Category, MeaningView>{

	categoryViewTemplate: (data: any) => string;

	constructor (options?: any ) {
		if (!options)
		options = {};

		options.className = 'categoryView';

		options.template = "#categoryViewTemplate";
		options.childView = MeaningView;
		options.collection = options.model.meanings;
		options.childViewContainer = this.el;

		this.categoryViewTemplate = _.template($('#categoryViewTemplate').html());

		super(options);

	}

}

class MeaningView extends Marionette.ItemView<Meaning>{


	sentenceTooltipTemplate: (data: any) => string;
	meaningViewTemplate: (data: any) => string;

	constructor (options?: any ) {
		if (!options)
		options = {};

		options.className = 'meaningView';
		options.template = _.template( options.model.text );

		options.modelEvents = {
			"change:selected" : this.onModelChange
		};

		options.events = { 
			"click": this.onClick 
		};

		this.sentenceTooltipTemplate = _.template($('#sentenceTooltipTemplate').html());

		super(options);

	}

	onModelChange(){
		
		var win: any = window;
		
		if(win.app.word.details.selectedMeaning != this.model)
		{
			win.app.word.details.selectedMeaning.selected = false;
			win.app.word.details.selectedMeaning = this.model;
		}

		win.app.populateSentencesFrame();

		this.render();

	}

	onDomRefresh(){
		
		if(this.model.selected)
		this.$el.addClass("selected");
		else
		this.$el.removeClass("selected");
	}

	onClick(){

		this.model.selected = !this.model.selected;
		
	}

	

}

