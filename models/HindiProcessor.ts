/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/underscore/underscore.d.ts" />
/// <reference path="../lib/typings/backbone/backbone.d.ts" />

/// <reference path="./Match.ts/" />
/// <reference path="./HindiLetter.ts/" />


class HindiProcessor extends Backbone.Model {

	vowels : { [l: string] : Array<string> } = 
	{

		"अ": ["a"], //a
	    "आ": [ "aa", "A"], //aa
	    "इ": ["i"], //i	
	    "ई": ["ee", "I"], //ee
	    "उ": ["u"], //u
	    "ऊ": ["oo", "U"], //oo
	    "ऋ": ["R"], //ri
	    "ए": ["e"], //ae
	    "ऐ": ["ai"], //ai
	    "ओ": ["o"], //o
	    "औ": ["au"], //au
	    "अं": ["aM"], //am
	    "आः": ["aha"], //aha
	    "अँ": ["a~M"]

	};

	baseConsanants : { [l: string] : Array<string> } = {

		"क": ["k"],
		"ख": ["kh"],
		"ग": ["g"],
		"घ": ["gh"],
		"ङ": ["NG"],
		"च": ["ch"],
		"छ": ["Ch"],
		"ज": ["j"],
		"झ": ["z"],
		"ञ": ["NY"],
		"ट": ["T"],
		"ठ": ["Th"],
		"ड": ["D"],
		"ढ": ["Dh"],
		"ण": ["N"],
		"त": ["t"],
		"थ": ["th"],
		"द": ["d"],
		"ध": ["dh"],
		"न": ["n"],
		"प": ["p"],
		"फ": ["f", "ph"],
		"ब": ["b"],
		"भ": ["bh"],
		"म": ["m"],
		"य": ["y"],
		"र": ["r"],
		"ल": ["l"],
		"ळ": ["L"],
		"ऴ": ["LL"],
		"व": ["v", "w"],
		"श": ["sh"],
		"ष": ["Sh"],
		"स": ["s"],
		"ह": ["h"],
		"क्ष": ["x"],
		"त्र": ["tr"],
		"ज्ञ": ["jNY", "Jh"],
		"द्": ["ddh"],
		"क़": ["K"],
		"ख़": ["Kh"],
		"ग़": ["G"],
		"ज़": ["Z"],
		"ड़": ["DD"],
		"ढ़": ["DH"],
		"फ़": ["F"],
		"य़": ["Y"],
		"ऩ": ["NN"]

	};

	extensibleLetters : { [letter: string] : Array<string> } = 
	{

		"": ["a"],
	    "्": [""], //virama
	    "ा": ["aa", "A"], //a
	    "ि": ["i"], //i
	    "ी": ["ee","I"], //ee
	    "ु": ["u"], //u
	    "ू": ["oo", "U"], //oo
	    "े": ["e"], //ae
	    "ै": ["ai"], //ai
	    "ो": ["o"], //o
	    "ौ": ["au"], //au

	    "ृ": ["ru"], //ru
	    
	    "ः": ["aha"], //visarga aha


	};

	miscLetters : { [letter: string] : Array<string> } = 
	{
	    "़": [""], //nukta dot below
	    "ॄ": [""], 
	    
	    
	    "ं": ["M"], //anusvara am
	    "ँ": ["~M"], //candra bindu

	    "॑": ["'"], //udatta
	    "॒": ["_"], //anudatta
	    "॓": ["`"], //accent grave
	    "॔": ["!`"], //accent aigu 
	    "ॠ": ["rī"], //rī
	    "ऌ": ["li"], //li
	    "ॡ": ["lī"], //lī

	    " । ": ["|"], //danda
	    " ॥ ": ["||"], //double danda
	    "ऽ": [""], //avagraha
	    "॰": [""], //
	    "ॐ": ["om"] //om		
	};

	readableToHindiMap : { [letter: string] : string } = {

	};

	hindiToReadableMap : { [letter: string] : string } = {

	};

	consanantsArray : { [l: string] : Array<Models.IHindiLetter> } = {
	};

	constructor() {
		super();

	     // Content
	     
	     this.populateVowels();
	     this.populateMiscallenous();
	     this.populateConsanants();
	 }

	 populateReadableMap(readable, letter) { this.readableToHindiMap[readable] = letter; }
	 populateHindiMap(readable, letter) { this.hindiToReadableMap[letter] = readable; }

	 populateVowels(){
	 	_.each(this.vowels, (readableArray, letter) => {

	 		_.each(readableArray, (readable) => {

	 			this.populateHindiMap(readable, letter);
	 			this.populateReadableMap(readable, letter)

	 			});

	 		});
	 }

	 populateConsanants(){


	 	_.each(this.baseConsanants, (baseConsanantReadableArray, baseConsanant) => {

	 		var derivedConsanants = [];

	 		var baseReadable = baseConsanantReadableArray[0];

	 		_.each(baseConsanantReadableArray, (baseConsanantReadable) => {

	 			_.each(this.extensibleLetters, (extensibleLetterReadableArray, extensibleLetter) => {

	 				_.each(extensibleLetterReadableArray, (extensibleLetterReadable) => {

	 					var letter = baseConsanant + extensibleLetter;
	 					var readable = baseReadable + extensibleLetterReadable;

	 					this.populateHindiMap(readable, letter);
	 					this.populateReadableMap(readable, letter);

	 					derivedConsanants.push({readable: readable, letter:letter});

	 					});
	 				});
	 			});

	 		this.consanantsArray[baseConsanant] = derivedConsanants;

	 		});

	 }

	 populateMiscallenous(){
	 	_.each(this.miscLetters, (readableArray, letter) => {

	 		_.each(readableArray, (readable) => {

	 			this.populateHindiMap(readable, letter);
	 			this.populateReadableMap(readable, letter)

	 			});

	 		});
	 }

	 getLastMatch(word: string) : Match {

	 	var match = new Match();

	 	if(word.length > 1)
	 	{
	 		for(var i=0; i < word.length; i++){
	 			var sub = word.substr(0, i+1);
	 			var letter = this.readableToHindiMap[sub];

	 			var secondary = null;

	 			if( !letter && i > 0 ){
	 				secondary = this.extensibleLetters[sub];
	 				if(secondary){
	 					letter = this.readableToHindiMap[sub.substr(0, sub.length-1)] + this.extensibleLetters[word.substr(sub.length-1)];
	 				}
	 			}

	 			if( letter ){
	 				match.letter = letter;
	 				match.sub = sub;
	 				match.found = true;
	 				match.index = i+1;
	 				continue;
	 			}

	 		}
	 	}
	 	else
	 	{
	 		var letter = this.readableToHindiMap[word];
	 		if( letter ){
	 			match.letter = letter;
	 			match.sub = word;
	 			match.found = true;
	 			match.index = 1;
	 		}
	 	}

	 	return match;

	 }


	 getHindiWord(englishWord: string): string{

	 	var hindiWord: string = "";

	 	var match = this.getLastMatch(englishWord);

	 	while(match.found)
	 	{
	 		hindiWord += match.letter;

	 		if( match.index < englishWord.length)
	 		{
	 			englishWord = englishWord.substr(match.index);

	 		}
	 		else if(match.sub == englishWord)
	 		{
	 			englishWord = "";
	 			break;
	 		}

	 		match = this.getLastMatch( englishWord );

	 	}

	 	if(englishWord.length > 0){
	 		return hindiWord + englishWord;
	 	}

	 	var c = hindiWord[hindiWord.length-1];
	 	
	 	if(c == "्")
	 	hindiWord = hindiWord.substr(0, hindiWord.length-1);

	 	return hindiWord;

	 }


	 getReadableWord(hindiWord: string, skipPostfixProcessing: boolean = true): string
	 {

	 	var readable: string = "";

	 	for(var i=0; i < hindiWord.length; i++)
	 	{
	 		var c = hindiWord.substr(i,1);

	 		if(c == "।" || c == "्" || c == "ा" || c == "ि" || c == "ी" || c == "ु" || c == "ू" || c == "ृ" || c == "े" || c == "ै" || c == "ो" || c == "ौ")
	 		{
	 			readable = readable.substr(0, readable.length - 1);

	 			if(c != "्")
	 			readable += this.extensibleLetters[c][0];

	 		}
	 		else
	 		{
	 			readable += this.hindiToReadableMap[c];	
	 		}
	 		
	 	}

	 	if( !skipPostfixProcessing )
	 	{
	 		if( readable.length >=2 && readable.charAt(readable.length-1) == 'a' && readable.charAt(readable.length-2) != 'a' )
	 		{
	 			readable = readable.substr(0, readable.length - 1);
	 		}
	 	}

	 	return readable;

	 }

	 isHindiWord(word: string): boolean
	 {
	 	if(word)
	 	{
	 		for(var i=0; i < word.length; i++)
	 		{
	 			if(word.charCodeAt(i)<256)
	 			return false;
	 		} 

	 		return true; 
	 	}
	 }

	}


