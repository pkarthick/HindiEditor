/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="../models/HindiProcessor.ts" />
/// <reference path="./EditorInputView.ts" />

class EditorView extends Marionette.CompositeView<Editor, ParagraphView>{


	constructor (options?: any ) {
		if (!options)
		options = {};

		options.className = "editorView";
		options.template = _.template("");

		options.childView = ParagraphView;
		options.collection = options.model.paragraphs;
		options.childViewContainer = this.el;

		super(options);

	}
}

class ParagraphView extends Marionette.CompositeView<Paragraph, SentenceView>{


	constructor (options?: any ) {
		if (!options)
		options = {};

		options.className = "paragraphView";
		options.template = _.template("<div />");
		options.childView = SentenceView;
		options.collection = options.model.sentences;
		options.childViewContainer = this.el;

		options.collectionEvents = {
			add : this.onAddSentence,
			remove: this.onRemoveSentence
		};

		super(options);

	}

	onAddSentence(){

		var win: any = window;

		win.app.populateSentencesFrame();
	}

	onRemoveSentence(){

		var win: any = window;

		win.app.populateSentencesFrame();
	}

}

class SentenceView extends Marionette.CompositeView<Sentence, WordView>{

	sentenceTooltipTemplate: (data: any) => string;

	constructor (options?: any ) {
		if (!options)
		options = {};

		options.className = "sentenceView";
		options.template = "#sentenceViewTemplate";
		options.childView = WordView;
		options.collection = options.model.words;
		options.childViewContainer = this.el;

		this.ui = { "speakerButton" : ".sspeaker" };

		options.events = { 
			"mouseover .sinfo": this.onMouseOver, 
			"mouseleave .sinfo": this.onMouseLeave,
			"click @ui.speakerButton": this.onSpeakerClick 
		};

		options.modelEvents = {

			"change:meaning" : this.onMeaningChange

		};

		options.collectionEvents = {
			add : this.onAddWord,
			remove: this.onRemoveWord
		};

		this.sentenceTooltipTemplate = _.template($('#sentenceTooltipTemplate').html());

		super(options);


		this.setVisibility();

	}

	onRemoveWord(){
		this.setVisibility();
		this.getMeaning();
		this.render();

		var win: any = window;

		win.app.populateSentencesFrame();
	}

	onMeaningChange(){

		var win: any = window;

		win.app.populateSentencesFrame();

	}

	getMeaning(){
		var sentence = this.model;

		if(this.model.words.length > 0)
		{
			var ajaxRequest : any = $.ajax({
				url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20google.translate%20where%20q%3D%22'+  encodeURI(this.model.allWords) +'%22%20and%20target%3D%22en%22%3B&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?',
				type: 'GET',
				async: false,
				dataType: 'jsonp'
				});

			$.when(ajaxRequest).then(function(res) {
				var meaning = res.query.results.json.sentences.trans;
				sentence.set({ meaning: meaning });
				});
		}
		else
		{
			sentence.set({ meaning: "" });
		}

	}

	onDomRefresh(){

		var self = this;

		$( ".sentenceView" ).sortable(

		{
			containment: "parent",
			cursor: "move",
			helper: "clone",
			forceHelperSize: true,
			update: function( event, ui ){

				var cid = ui.item.get(0).id;

				var pos = self.$(".wordView").parent("div [id]").map(function(){return this.id;}).toArray().indexOf(cid);

				var model = self.collection.get(cid);

				self.collection.remove(model);
				self.collection.add( model, {at: pos} );

				var win: any = window;

				win.app.populateSentencesFrame();

			}
		}
		);

		$( ".sentenceView" ).disableSelection();
	}

	setVisibility(){

		if(this.model.words.length > 0)
		{
			this.$el.show();
		}
		else
		{
			this.$el.hide();	
		}
	}

	onAddWord(){

		this.setVisibility();

		this.getMeaning();

		var win: any = window;

		win.app.populateSentencesFrame();


	}

	onMouseOver(){
		
		this.showTooltip();
	}

	onMouseLeave(){
		
		this.hideTooltip();
	}

	showTooltip(){
		var tooltipHtml = this.sentenceTooltipTemplate( this.model );

		$('#sentenceContainer').html(tooltipHtml);

		$('#TooltipContainer').html(tooltipHtml).addClass('Tooltip').show().position({
			of: this.$el,
			my: 'left top',
			at: 'left+2 bottom+2',
			collision: 'flip flip'
			});
	}

	hideTooltip(){
		$('#TooltipContainer').hide();
	}

	onSpeakerClick(){

		var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + this.model.allWords + "&tl=hi&total=1&idx=0&textlen=" + this.model.allWords.length + "&client=t&prev=input";

		var win : any = window;

		if (win.HTMLAudioElement) {
			var snd = new Audio('');

			if(snd.canPlayType('audio/mp3')) {
				snd = new Audio(url);
			}

			snd.play();
		}
		else {
			alert('HTML5 Audio is not supported by your browser!');
		}

	}

}

class WordView extends Marionette.ItemView<Word>{

	wordTooltipTemplate: (data: any) => string;

	constructor (options?: any ) {
		if (!options)
		options = {};

		options.template = "#wordViewTemplate";

		options.modelEvents = { change: this.onChange };

		this.ui = { "deleteButton": ".remove", "speakerButton" : ".wspeaker" };

		options.events = {
			"mouseover .wordView": this.onMouseOver, 
			"mouseleave .wordView": this.onMouseLeave, 
			"click": this.onWordSelect,
			"click @ui.speakerButton": this.onSpeakerClick, 
			"click @ui.deleteButton": this.onDeleteClick 
		};

		super(options);


		this.wordTooltipTemplate = _.template($('#wordTooltipTemplate').html());

	}

	onWordSelect(){
		var win: any = window;

		if(win.app.word)
		win.app.word.selected = false;
		this.model.selected = true;

		win.app.word = this.model;

		win.app.editor.currentParagraph = this.model.sentence.paragraph;
		win.app.editor.currentParagraph.currentSentence = this.model.sentence;

		$('#Editor').val(this.model.readable);

		if( this.model.hindiWord != "" )
		{
			var wordDetailsView = new WordDetailsView( {model: this.model.details} );
			win.app.wordDetailsRegion.show(wordDetailsView);
			win.app.wordDetailsRegion.$el.show();
		}
		else
		{
			win.app.wordDetailsRegion.$el.hide();
		}

		$('#Editor').focus();

	}

	onSpeakerClick(){

		var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + this.model.hindiWord + "&tl=hi&total=1&idx=0&textlen=" + this.model.hindiWord.length + "&client=t&prev=input";

		var win : any = window;

		if (win.HTMLAudioElement) {
			var snd = new Audio('');

			if(snd.canPlayType('audio/mp3')) {
				snd = new Audio(url);
			}

			snd.play();
		}
		else {
			alert('HTML5 Audio is not supported by your browser!');
		}

	}

	onDeleteClick(){

		var hasOneItem = this.model.collection.length == 1;

		this.model.collection.remove(this.model);
		
		if(hasOneItem && !this.model.collection && this.model.sentence.collection.length > 1)
		this.model.sentence.collection.remove(this.model.sentence);
		
		this.$el.remove();
		$('#TooltipContainer').hide();
		
	}

	onDomRefresh(){
		this.el.id = this.model.cid;
		this.$el.find(".wspeaker").hide();
		this.$el.find(".remove").hide();
	}
	
	onChange(){
		this.render();
	}

	onMouseOver(){
		
		if(this.model.hindiWord != "") {
			this.$el.find(".wspeaker").show();
			this.$el.find(".remove").show();
			this.showTooltip();
		}
		else if(this.model.hindiWord == "" && this.model.sentence.words.length == 1 && this.model.sentence.collection.length > 1){
			this.$el.find(".remove").show();

		}
		return true;
	}

	onMouseLeave(){
		this.$el.find(".wspeaker").hide();
		this.$el.find(".remove").hide();
		this.hideTooltip();
		return true;
	}

	showTooltip(){
		var tooltipHtml = this.wordTooltipTemplate( this.model );

		$('#TooltipContainer').html(tooltipHtml).addClass('Tooltip').show().position({
			of: this.$el,
			my: 'left top',
			at: 'left+2 bottom+2',
			collision: 'flip flip'
			});
	}

	hideTooltip(){
		$('#TooltipContainer').hide();
	}

}