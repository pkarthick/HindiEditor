/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/jqueryui/jqueryui.d.ts" />

/// <reference path="../models/HindiProcessor.ts" />
/// <reference path="../models/Editor.ts" />
/// <reference path="../models/WordDetails.ts" />

/// <reference path="./WordDetailsView.ts" />


class EditorInputView extends Backbone.View<Editor>{

	lookupDictionary: { [hindiWord: string] : any } = {};
	
	constructor (options?: Backbone.ViewOptions<Editor> ) {

		super(options);

		this.delegateEvents({ 
			keydown: $.proxy( this.handleKeyDown, this),
			keyup: $.proxy( this.handleKeyUp, this),
			change: $.proxy( this.handleTextChange, this)
			});
	}

	handleTextChange(){
		this.processText();		
	}

	extractLast( term: string ) : string {
		return term.split( /\s+/ ).pop();
	}

	focus(){
		this.el.focus();
	}

	render() : Backbone.View<Editor> {
		this.initializeAutoComplete();
		return this;
	}

	processText(){

		var hindiWord = "";
		var text = this.getText();

		if( text != "" )
		{
			hindiWord = this.model.hindiProcessor.getHindiWord(text);
			var win: any = window;
			var currentWord = win.app.word;
			
			currentWord.hindiWord=hindiWord;
			currentWord.readable=text;
		}

		$("#englishWord").text(hindiWord);
	}

	handleKeyUp(event){
		this.processText();
	}

	handleKeyDown(event){

		var text = this.getText();

		if (event.keydown === $.ui.keyCode.ENTER || event.keyCode === $.ui.keyCode.SPACE) {
			
			if(text.length > 0){
				this.populateTransliteratedItem(text);
			}

			this.clear();
			this.$el.autocomplete( "close" ) ;
			return false;
			
		}
		else if (event.keyCode === $.ui.keyCode.ESCAPE)
		{
			this.clear();
			this.processText();
			return true;
		}
	}

	getText(): string{
		return this.$el.val();
	}

	setText(text: string): void{
		this.$el.val(text);
	}

	clear() : void{
		this.$el.val("");
		$("#englishWord").text( "" );
	}

	initializeAutoComplete() : void {
		
		this.$el
		.autocomplete({ source: $.proxy( this.populateSource, this ), 
			select: $.proxy( this.selectTransliteratedItem, this ),  
			change: $.proxy( this.onChange, this ),
			minLength: 1 });

	}

	onChange():void{
		this.$el.val("").css("top", 2).focus();
	}

	selectTransliteratedItem(event, ui): boolean{

		this.clear();

		this.populateTransliteratedItem(ui.item.value);
		event.preventDefault();

		return false;
	}


	populateMeaning(text: string, terminator: string=""): void
	{

		var win : any = window;

		var sentence = this.model.currentParagraph.currentSentence;

		var readable = text;
		var hindiWord = this.model.hindiProcessor.getHindiWord(text);

		if(this.model.hindiProcessor.isHindiWord(text))
		{
			hindiWord = text;
			readable = this.model.hindiProcessor.getReadableWord(hindiWord, false);
		}
		
		var meaning = "";

		var ajaxRequest : any = $.ajax({
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20google.translate%20where%20q%3D%22'+  encodeURI(hindiWord) +'%22%20and%20target%3D%22en%22%3B&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?',
			type: 'GET',
			async: false,
			dataType: 'jsonp'
			});



		var wordDetails = new WordDetails(); 

		var self = this;

		var currentWord = win.app.word;
		
		currentWord.hindiWord=hindiWord + terminator;
		currentWord.readable=readable + terminator;
		currentWord.details =wordDetails;
		wordDetails.word = currentWord;

		currentWord.selected = true;


		win.app.word.selected = false;
		
		if(sentence.currentWord == win.app.word) {
			sentence.nextWord();
		}


		win.app.word = sentence.currentWord;
		win.app.word.selected = true;

		sentence.hasWords = true; 

		$.when(ajaxRequest).then(function(res){ 
			var win : any = window;

			if(res.query.results)
			{
				meaning = res.query.results.json.sentences.trans;
	
				var defaultCategory = new Category( "Default" );
	
				wordDetails.selectedMeaning.text = meaning;
				wordDetails.selectedMeaning.selected = true;
	
				defaultCategory.meanings.add( wordDetails.selectedMeaning );
				
				wordDetails.categories.add( defaultCategory );
	
				if(res.query.results.json.dict)
				{
	
					var arr : any[] = res.query.results.json.dict;
	
					if( ! $.isArray(arr) )
					{
						arr = [];
						arr[0] = res.query.results.json.dict;
					}
	
					$.each( arr, 
						(index, value) => 
						{
							var meanings = value.entry;
							var category = value.pos;
	
							if( category == "" )
							category = "Others";
	
							wordDetails.categories.add( new Category( category, meanings ) );
						} 
						); 
				}
	
				var wordDetailsView = new WordDetailsView( {model: wordDetails} );
				win.app.wordDetailsRegion.show(wordDetailsView);

			}
		});

	}
	
	endsWith(text: string, suffix: string) : boolean{
		var lastIndex = text.lastIndexOf(suffix);
    return (lastIndex != -1) && (lastIndex + suffix.length == text.length);
	}


	populateTransliteratedItem(text: string): void{

		var win: any = window;

		text = text.trim();
		var terminator = text[text.length-1];

		if( this.endsWith(text, "||")  )
		{
			var currentWord = win.app.word;
			currentWord.hindiWord = "";
			currentWord.readable = "";

			this.model.nextParagraph();
		}
		else if( terminator == "|" || terminator == "?" || terminator == "!" || terminator == "." )
		{
			var prefixWord = text.substr(0, text.length-1);

			if(prefixWord.length > 0){
				this.populateMeaning(prefixWord, terminator);
				terminator = "";
			}

			var currentWord = win.app.word;
			currentWord.hindiWord = "";
			currentWord.readable = "";
			this.model.currentParagraph.currentSentence.terminator = terminator;
			this.model.currentParagraph.nextSentence();
		}
		else
		{
			this.populateMeaning(text);
		}

		win.app.populateSentencesFrame();

	}


	populateSource(request, response): void{

		var filterFunction = this.model.hindiProcessor.isHindiWord;

		var filteredItems: string[] = [];

		var term = request.term.trim();

		if( term.length > 0  ){

			var ajaxRequest : any = Backbone.ajax({
				url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.shabdkosh.com%2Futils%2Fautocomplete.php%3Flc%3Dhi%26query%3D' + encodeURI(term) +'%22%20&format=json&callback=?',
				type: 'GET',
				async: false,
				dataType: 'jsonp'

				});

			ajaxRequest.success( function(res) { 
				if(res && res.query && res.query.results){
					filteredItems =  $.parseJSON(res.query.results.body).suggestions.filter(filterFunction);
					response(filteredItems);
				} 
				});
		}
		else
		{
			this.clear();
		}
	}

}