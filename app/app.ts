/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>


// <reference path="../models/Keyboard.ts" />
/// <reference path="../views/KeyboardView.ts" />
/// <reference path="../views/EditorView.ts" />

/// <reference path="../models/Legend.ts" />

/// <reference path="../models/HindiProcessor.ts" />


class HindiGuideApp extends Marionette.Application {
	

	sentenceTooltipTemplate: (data: any) => string;
	
	hindiProcessor: HindiProcessor = new HindiProcessor();

	editorRegion : Marionette.Region;
	legendRegion : Marionette.Region;
	lookupRegion : Marionette.Region;
	wordDetailsRegion : Marionette.Region;

	word: Word;
	editor: Editor;

	legend: Legend;

	constructor() {
		super();
		
		this.addRegions({ editorRegion: "#editorRegion" });
		this.addRegions({ lookupRegion: "#lookupRegion" });
		this.addRegions({ wordDetailsRegion: "#wordDetailsRegion" });
		this.addRegions({ legendRegion: "#legendRegion" });


		this.sentenceTooltipTemplate = _.template($('#sentenceTooltipTemplate').html());

	}

	onStart() {
		this.legend = new Legend(this.hindiProcessor);
		
		var view = new LegendView({ model: this.legend });
		this.legendRegion.show(view);

		var keyboardView = new KeyboardView();
		keyboardView.render();

		this.editor = new Editor(this.hindiProcessor);

		var editorView = new EditorView({model: this.editor});
		
		var editorInputView = new EditorInputView({el: $('#Editor'), model: this.editor });
		editorInputView.render();

		this.editorRegion.show(editorView);

	}


	populateSentencesFrame(){

		var tooltipHtml = this.sentenceTooltipTemplate({paragraphs: this.editor.paragraphs.models });

		$('#sentencesFrame').contents().find("body").html(tooltipHtml);

		$('#sentencesTextArea').val( this.editor.getContentAsText() );

	}

}			

$(
	() => 
	{
		var win: any = window;
		win.app = new HindiGuideApp();
		win.app.start(); 
	}
	);

