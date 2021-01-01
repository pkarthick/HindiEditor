class Editor extends Backbone.Model 
{

	paragraphs: Backbone.Collection<Paragraph>;

	currentParagraph: Paragraph;

	constructor(public hindiProcessor: HindiProcessor) 
	{
		super();

		this.paragraphs = new Backbone.Collection<Paragraph>();
		this.nextParagraph();
	}

	nextParagraph(){
		
		if(this.currentParagraph)
		this.currentParagraph.currentSentence.currentWord.selected = false;

		this.currentParagraph = new Paragraph();
		this.paragraphs.add(this.currentParagraph);
	}

	getContentAsText(){
		var text = this.paragraphs.reduce(function(paragraphsText, paragraph){ return paragraphsText + paragraph.getAllSentences() + "\n\n"; }, "");
		return text;
	}

}

class Paragraph extends Backbone.Model 
{

	sentences: Backbone.Collection<Sentence>;

	currentSentence: Sentence;

	constructor() 
	{
		super();

		this.sentences = new Backbone.Collection<Sentence>();
		this.nextSentence();
	}

	nextSentence(){

		if(this.currentSentence){
			this.currentSentence.currentWord.selected = false;
		}

		this.currentSentence = new Sentence();
		this.currentSentence.paragraph = this;
		this.sentences.add(this.currentSentence);
	}

	getAllSentences(): string{

		var sentence = this.sentences.reduce(function(sentencesText, sentence){ return sentencesText + sentence.allWords ; }, "").trim();
		sentence += "\n" + this.sentences.reduce(function(sentencesText, sentence){ return sentencesText + sentence.allReadableWords ; }, "").trim();
		sentence += "\n" + this.sentences.reduce(function(sentencesText, sentence){ return sentencesText + sentence.allWordsMeaning ; }, "").trim();
		sentence += "\n" + this.sentences.reduce(function(sentencesText, sentence){ return sentencesText  + " " + sentence.meaning; }, "").trim();

		return sentence;

	}

}

class Sentence extends Backbone.Model
{

	get paragraph(): Paragraph{
		return this.get('paragraph');
	}

	set paragraph(value: Paragraph) {
		this.set('paragraph', value);
	}

	words: Backbone.Collection<Word>;

	currentWord: Word;

	get hasWords() : boolean{
		return this.get('hasWords');
	}

	set hasWords(value: boolean){
		this.set('hasWords', value);
	}

	get meaning(): string{
		return this.get('meaning');
	}

	set meaning(value: string) {
		this.set('meaning', value);
	}

	get terminator(): string{
		return this.get('terminator');
	}

	set terminator(value: string) {
		this.set('terminator', value);
	}

	get allWords(): string{
		var sentence = "";
		if(this.words.length > 0)
		{
			sentence = this.words.reduce(function(sentence, word){ return sentence + " " + word.hindiWord; }, "");
			return sentence.trim() + this.terminator + " ";
		}
		return sentence;
	}

	get allWordsMeaning(): string{
		var sentence = "";
		if(this.words.length > 0)
		{
			sentence = this.words.reduce(function(sentence, word){ return sentence + " " + word.details.selectedMeaning.text; }, "");

			return sentence.trim() + this.terminator + " ";
		}
		return sentence;
	}

	get allReadableWords(): string{
		var sentence = "";
		if(this.words.length > 0)
		{
			sentence = this.words.reduce(function(sentence, word){ return sentence + " " + word.readable; }, "");
			return sentence.trim() + this.terminator + " ";
		}
		return sentence;
	}

	constructor() {
		super();
		this.set({hasWords: false});
		this.words = new Backbone.Collection<Word>();
		this.meaning = "";
		this.terminator = "।";
		this.nextWord();	   	
	}

	nextWord(){
		this.currentWord = new Word("", "", new WordDetails());
		this.currentWord.sentence = this;
		this.currentWord.selected = true;
		this.words.add(this.currentWord);

		var win: any = window;
		win.app.word = this.currentWord;

	}

}

class Word extends Backbone.Model
{

	get sentence(): Sentence{
		return this.get('sentence');
	}

	set sentence(value: Sentence) {
		this.set('sentence', value);
	}

	get selected(): boolean{
		return this.get('selected');
	}

	set selected(value: boolean) {
		this.set('selected', value);
	}

	get position(): number{
		return this.get('position');
	}

	set position(value: number) {
		this.set('position', value);
	}

	get details() : WordDetails{
		return this.get('details');
	}

	set details(value: WordDetails) {
		this.set('details', value);
	}

	get readable() : string{
		return this.get('readable');
	}

	set readable(value: string) {
		this.set('readable', value);
	}

	get hindiWord() : string{
		return this.get('hindiWord');
	}	

	set hindiWord(value: string) {
		this.set('hindiWord', value);

	}

	get speakerUrl() : string{
		return this.get('speakerUrl');
	}

	set speakerUrl(value: string) {
		this.set('speakerUrl', value);
	}


	constructor(hindiWord: string, readable: string, details: WordDetails) {
		super();

		this.selected = false;
		this.hindiWord = hindiWord;
		this.readable = readable;

	     // Content
	     this.details = details;

	     this.details.word = this;

	     this.speakerUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + this.hindiWord + "&tl=hi&total=1&idx=0&textlen=" + this.hindiWord.length + "&client=t&prev=input";
	 }

	}


