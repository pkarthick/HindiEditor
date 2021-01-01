/// <reference path="../lib/typings/backbone/backbone.d.ts" />
// class ModelBase extends Backbone.Model {
// 	
// 	message: string;
// 
// 
// 	collection : ModelBaseCollection;
// 
// 	constructor(attributes?: any, options?: any) {
// 		super(attributes,options);
// 	}
// }
// 
// class ModelBaseCollection extends Backbone.Collection<Keyboard> {
// 
// } 
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Models;
(function (Models) {
    var HindiLetter = (function (_super) {
        __extends(HindiLetter, _super);
        function HindiLetter(attributes, options) {
            _super.call(this);
        }
        HindiLetter.prototype.defaults = function () {
            return {
                letter: "", readable: ""
            };
        };
        return HindiLetter;
    })(Backbone.Model);
    Models.HindiLetter = HindiLetter;
})(Models || (Models = {}));
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/underscore/underscore.d.ts" />
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="./HindiLetter.ts/" />
var HindiProcessor = (function (_super) {
    __extends(HindiProcessor, _super);
    function HindiProcessor() {
        _super.call(this);
        this.vowels = {
            "अ": ["a"],
            "आ": ["aa", "A"],
            "इ": ["i"],
            "ई": ["ee", "I"],
            "उ": ["u"],
            "ऊ": ["oo", "U"],
            "ऋ": ["R"],
            "ए": ["e"],
            "ऐ": ["ai"],
            "ओ": ["o"],
            "औ": ["au"],
            "अं": ["aM"],
            "आः": ["aha"],
            "अँ": ["a~M"]
        };
        this.baseConsanants = {
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
        this.extensibleLetters = {
            "": ["a"],
            "्": [""],
            "ा": ["aa", "A"],
            "ि": ["i"],
            "ी": ["ee", "I"],
            "ु": ["u"],
            "ू": ["oo", "U"],
            "े": ["e"],
            "ै": ["ai"],
            "ो": ["o"],
            "ौ": ["au"],
            "ृ": ["ru"],
            "ः": ["aha"],
        };
        this.miscLetters = {
            "़": [""],
            "ॄ": [""],
            "ं": ["M"],
            "ँ": ["~M"],
            "॑": ["'"],
            "॒": ["_"],
            "॓": ["`"],
            "॔": ["!`"],
            "ॠ": ["rī"],
            "ऌ": ["li"],
            "ॡ": ["lī"],
            " । ": ["|"],
            " ॥ ": ["||"],
            "ऽ": [""],
            "॰": [""],
            "ॐ": ["om"] //om		
        };
        this.readableToHindiMap = {};
        this.hindiToReadableMap = {};
        this.consanantsArray = {};
        // Content
        this.populateVowels();
        this.populateMiscallenous();
        this.populateConsanants();
    }
    HindiProcessor.prototype.populateReadableMap = function (readable, letter) { this.readableToHindiMap[readable] = letter; };
    HindiProcessor.prototype.populateHindiMap = function (readable, letter) { this.hindiToReadableMap[letter] = readable; };
    HindiProcessor.prototype.populateVowels = function () {
        var _this = this;
        _.each(this.vowels, function (readableArray, letter) {
            _.each(readableArray, function (readable) {
                _this.populateHindiMap(readable, letter);
                _this.populateReadableMap(readable, letter);
            });
        });
    };
    HindiProcessor.prototype.populateConsanants = function () {
        var _this = this;
        _.each(this.baseConsanants, function (baseConsanantReadableArray, baseConsanant) {
            var derivedConsanants = [];
            var baseReadable = baseConsanantReadableArray[0];
            _.each(baseConsanantReadableArray, function (baseConsanantReadable) {
                _.each(_this.extensibleLetters, function (extensibleLetterReadableArray, extensibleLetter) {
                    _.each(extensibleLetterReadableArray, function (extensibleLetterReadable) {
                        var letter = baseConsanant + extensibleLetter;
                        var readable = baseReadable + extensibleLetterReadable;
                        _this.populateHindiMap(readable, letter);
                        _this.populateReadableMap(readable, letter);
                        derivedConsanants.push({ readable: readable, letter: letter });
                    });
                });
            });
            _this.consanantsArray[baseConsanant] = derivedConsanants;
        });
    };
    HindiProcessor.prototype.populateMiscallenous = function () {
        var _this = this;
        _.each(this.miscLetters, function (readableArray, letter) {
            _.each(readableArray, function (readable) {
                _this.populateHindiMap(readable, letter);
                _this.populateReadableMap(readable, letter);
            });
        });
    };
    HindiProcessor.prototype.getLastMatch = function (word) {
        var match = new Match();
        if (word.length > 1) {
            for (var i = 0; i < word.length; i++) {
                var sub = word.substr(0, i + 1);
                var letter = this.readableToHindiMap[sub];
                var secondary = null;
                if (!letter && i > 0) {
                    secondary = this.extensibleLetters[sub];
                    if (secondary) {
                        letter = this.readableToHindiMap[sub.substr(0, sub.length - 1)] + this.extensibleLetters[word.substr(sub.length - 1)];
                    }
                }
                if (letter) {
                    match.letter = letter;
                    match.sub = sub;
                    match.found = true;
                    match.index = i + 1;
                    continue;
                }
            }
        }
        else {
            var letter = this.readableToHindiMap[word];
            if (letter) {
                match.letter = letter;
                match.sub = word;
                match.found = true;
                match.index = 1;
            }
        }
        return match;
    };
    HindiProcessor.prototype.getHindiWord = function (englishWord) {
        var hindiWord = "";
        var match = this.getLastMatch(englishWord);
        while (match.found) {
            hindiWord += match.letter;
            if (match.index < englishWord.length) {
                englishWord = englishWord.substr(match.index);
            }
            else if (match.sub == englishWord) {
                englishWord = "";
                break;
            }
            match = this.getLastMatch(englishWord);
        }
        if (englishWord.length > 0) {
            return hindiWord + englishWord;
        }
        var c = hindiWord[hindiWord.length - 1];
        if (c == "्")
            hindiWord = hindiWord.substr(0, hindiWord.length - 1);
        return hindiWord;
    };
    HindiProcessor.prototype.getReadableWord = function (hindiWord, skipPostfixProcessing) {
        if (skipPostfixProcessing === void 0) { skipPostfixProcessing = true; }
        var readable = "";
        for (var i = 0; i < hindiWord.length; i++) {
            var c = hindiWord.substr(i, 1);
            if (c == "।" || c == "्" || c == "ा" || c == "ि" || c == "ी" || c == "ु" || c == "ू" || c == "ृ" || c == "े" || c == "ै" || c == "ो" || c == "ौ") {
                readable = readable.substr(0, readable.length - 1);
                if (c != "्")
                    readable += this.extensibleLetters[c][0];
            }
            else {
                readable += this.hindiToReadableMap[c];
            }
        }
        if (!skipPostfixProcessing) {
            if (readable.length >= 2 && readable.charAt(readable.length - 1) == 'a' && readable.charAt(readable.length - 2) != 'a') {
                readable = readable.substr(0, readable.length - 1);
            }
        }
        return readable;
    };
    HindiProcessor.prototype.isHindiWord = function (word) {
        if (word) {
            for (var i = 0; i < word.length; i++) {
                if (word.charCodeAt(i) < 256)
                    return false;
            }
            return true;
        }
    };
    return HindiProcessor;
})(Backbone.Model);
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/underscore/underscore.d.ts" />
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="./HindiProcessor.ts/" />
var Legend = (function (_super) {
    __extends(Legend, _super);
    function Legend(processor) {
        _super.call(this);
        this.sections = new LegendSectionCollection();
        var vowelsSection = new LegendSection(processor.vowels, "lavender");
        this.sections.add(vowelsSection);
        var consanantsSection = new LegendSection(processor.baseConsanants, "hotpink");
        this.sections.add(consanantsSection);
        var miscLettersSection = new LegendSection(processor.miscLetters, "lightslateblue");
        this.sections.add(miscLettersSection);
        var extensibleLettersSection = new LegendSection(processor.extensibleLetters, "oliverdrab");
        this.sections.add(extensibleLettersSection);
    }
    return Legend;
})(Backbone.Model);
var LegendSection = (function (_super) {
    __extends(LegendSection, _super);
    function LegendSection(letterTypes, color) {
        var _this = this;
        _super.call(this);
        this.colorCode = color;
        this.items = new LegendItemCollection();
        _.each(letterTypes, function (readableArray, letter) {
            _this.items.add(new LegendItem(letter, readableArray));
        });
    }
    return LegendSection;
})(Backbone.Model);
var LegendSectionCollection = (function (_super) {
    __extends(LegendSectionCollection, _super);
    function LegendSectionCollection() {
        _super.apply(this, arguments);
    }
    return LegendSectionCollection;
})(Backbone.Collection);
var LegendItem = (function (_super) {
    __extends(LegendItem, _super);
    function LegendItem(letter, readables) {
        _super.call(this);
        // Content
        this.letter = letter;
        this.readables = readables;
    }
    Object.defineProperty(LegendItem.prototype, "letter", {
        get: function () {
            return this.get('letter');
        },
        set: function (value) {
            this.set('letter', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LegendItem.prototype, "readables", {
        get: function () {
            return this.get('readables');
        },
        set: function (value) {
            this.set('readables', value);
        },
        enumerable: true,
        configurable: true
    });
    return LegendItem;
})(Backbone.Model);
var LegendItemCollection = (function (_super) {
    __extends(LegendItemCollection, _super);
    function LegendItemCollection() {
        _super.apply(this, arguments);
    }
    return LegendItemCollection;
})(Backbone.Collection);
var Editor = (function (_super) {
    __extends(Editor, _super);
    function Editor(hindiProcessor) {
        _super.call(this);
        this.hindiProcessor = hindiProcessor;
        this.paragraphs = new Backbone.Collection();
        this.nextParagraph();
    }
    Editor.prototype.nextParagraph = function () {
        if (this.currentParagraph)
            this.currentParagraph.currentSentence.currentWord.selected = false;
        this.currentParagraph = new Paragraph();
        this.paragraphs.add(this.currentParagraph);
    };
    Editor.prototype.getContentAsText = function () {
        var text = this.paragraphs.reduce(function (paragraphsText, paragraph) { return paragraphsText + paragraph.getAllSentences() + "\n\n"; }, "");
        return text;
    };
    return Editor;
})(Backbone.Model);
var Paragraph = (function (_super) {
    __extends(Paragraph, _super);
    function Paragraph() {
        _super.call(this);
        this.sentences = new Backbone.Collection();
        this.nextSentence();
    }
    Paragraph.prototype.nextSentence = function () {
        if (this.currentSentence) {
            this.currentSentence.currentWord.selected = false;
        }
        this.currentSentence = new Sentence();
        this.currentSentence.paragraph = this;
        this.sentences.add(this.currentSentence);
    };
    Paragraph.prototype.getAllSentences = function () {
        var sentence = this.sentences.reduce(function (sentencesText, sentence) { return sentencesText + sentence.allWords; }, "").trim();
        sentence += "\n" + this.sentences.reduce(function (sentencesText, sentence) { return sentencesText + sentence.allReadableWords; }, "").trim();
        sentence += "\n" + this.sentences.reduce(function (sentencesText, sentence) { return sentencesText + sentence.allWordsMeaning; }, "").trim();
        sentence += "\n" + this.sentences.reduce(function (sentencesText, sentence) { return sentencesText + " " + sentence.meaning; }, "").trim();
        return sentence;
    };
    return Paragraph;
})(Backbone.Model);
var Sentence = (function (_super) {
    __extends(Sentence, _super);
    function Sentence() {
        _super.call(this);
        this.set({ hasWords: false });
        this.words = new Backbone.Collection();
        this.meaning = "";
        this.terminator = "।";
        this.nextWord();
    }
    Object.defineProperty(Sentence.prototype, "paragraph", {
        get: function () {
            return this.get('paragraph');
        },
        set: function (value) {
            this.set('paragraph', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sentence.prototype, "hasWords", {
        get: function () {
            return this.get('hasWords');
        },
        set: function (value) {
            this.set('hasWords', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sentence.prototype, "meaning", {
        get: function () {
            return this.get('meaning');
        },
        set: function (value) {
            this.set('meaning', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sentence.prototype, "terminator", {
        get: function () {
            return this.get('terminator');
        },
        set: function (value) {
            this.set('terminator', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sentence.prototype, "allWords", {
        get: function () {
            var sentence = "";
            if (this.words.length > 0) {
                sentence = this.words.reduce(function (sentence, word) { return sentence + " " + word.hindiWord; }, "");
                return sentence.trim() + this.terminator + " ";
            }
            return sentence;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sentence.prototype, "allWordsMeaning", {
        get: function () {
            var sentence = "";
            if (this.words.length > 0) {
                sentence = this.words.reduce(function (sentence, word) { return sentence + " " + word.details.selectedMeaning.text; }, "");
                return sentence.trim() + this.terminator + " ";
            }
            return sentence;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sentence.prototype, "allReadableWords", {
        get: function () {
            var sentence = "";
            if (this.words.length > 0) {
                sentence = this.words.reduce(function (sentence, word) { return sentence + " " + word.readable; }, "");
                return sentence.trim() + this.terminator + " ";
            }
            return sentence;
        },
        enumerable: true,
        configurable: true
    });
    Sentence.prototype.nextWord = function () {
        this.currentWord = new Word("", "", new WordDetails());
        this.currentWord.sentence = this;
        this.currentWord.selected = true;
        this.words.add(this.currentWord);
        var win = window;
        win.app.word = this.currentWord;
    };
    return Sentence;
})(Backbone.Model);
var Word = (function (_super) {
    __extends(Word, _super);
    function Word(hindiWord, readable, details) {
        _super.call(this);
        this.selected = false;
        this.hindiWord = hindiWord;
        this.readable = readable;
        // Content
        this.details = details;
        this.details.word = this;
        this.speakerUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + this.hindiWord + "&tl=hi&total=1&idx=0&textlen=" + this.hindiWord.length + "&client=t&prev=input";
    }
    Object.defineProperty(Word.prototype, "sentence", {
        get: function () {
            return this.get('sentence');
        },
        set: function (value) {
            this.set('sentence', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Word.prototype, "selected", {
        get: function () {
            return this.get('selected');
        },
        set: function (value) {
            this.set('selected', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Word.prototype, "position", {
        get: function () {
            return this.get('position');
        },
        set: function (value) {
            this.set('position', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Word.prototype, "details", {
        get: function () {
            return this.get('details');
        },
        set: function (value) {
            this.set('details', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Word.prototype, "readable", {
        get: function () {
            return this.get('readable');
        },
        set: function (value) {
            this.set('readable', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Word.prototype, "hindiWord", {
        get: function () {
            return this.get('hindiWord');
        },
        set: function (value) {
            this.set('hindiWord', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Word.prototype, "speakerUrl", {
        get: function () {
            return this.get('speakerUrl');
        },
        set: function (value) {
            this.set('speakerUrl', value);
        },
        enumerable: true,
        configurable: true
    });
    return Word;
})(Backbone.Model);
var Models;
(function (Models) {
    var HindiWord = (function () {
        function HindiWord(word) {
        }
        HindiWord.prototype.process = function () {
        };
        return HindiWord;
    })();
    Models.HindiWord = HindiWord;
})(Models || (Models = {}));
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard(attributes, options) {
        _super.call(this, attributes, options);
    }
    return Keyboard;
})(Backbone.Model);
var KeyboardCollection = (function (_super) {
    __extends(KeyboardCollection, _super);
    function KeyboardCollection() {
        _super.apply(this, arguments);
    }
    return KeyboardCollection;
})(Backbone.Collection);
var Match = (function () {
    function Match() {
    }
    return Match;
})();
// class WordDetailsVM extends Backbone.Model
// {
// 	get details() : WordDetails{
//     	return this.get('details');
//     }	
//     set details(value: WordDetails) {
//         this.set('details', value);
//     }	
//     constructor() {
//         super();
//          // Content
//          this.details = new WordDetails();
//     }
// }
var WordDetails = (function (_super) {
    __extends(WordDetails, _super);
    function WordDetails() {
        _super.call(this);
        this.selectedMeaning = new Meaning("", false);
        this.categories = new CategoryCollection();
    }
    Object.defineProperty(WordDetails.prototype, "word", {
        get: function () {
            return this.get('word');
        },
        set: function (value) {
            this.set('word', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordDetails.prototype, "selectedMeaning", {
        get: function () {
            return this.get('selectedMeaning');
        },
        set: function (value) {
            this.set('selectedMeaning', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordDetails.prototype, "categories", {
        get: function () {
            return this.get('categories');
        },
        set: function (value) {
            this.set('categories', value);
        },
        enumerable: true,
        configurable: true
    });
    return WordDetails;
})(Backbone.Model);
var Meaning = (function (_super) {
    __extends(Meaning, _super);
    function Meaning(text, selected) {
        if (selected === void 0) { selected = false; }
        _super.call(this);
        this.text = text;
        this.selected = selected;
        // Content
    }
    Object.defineProperty(Meaning.prototype, "text", {
        get: function () {
            return this.get('text');
        },
        set: function (value) {
            this.set('text', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Meaning.prototype, "selected", {
        get: function () {
            return this.get('selected');
        },
        set: function (value) {
            this.set('selected', value);
        },
        enumerable: true,
        configurable: true
    });
    return Meaning;
})(Backbone.Model);
var Category = (function (_super) {
    __extends(Category, _super);
    function Category(categoryName, meanings) {
        if (meanings === void 0) { meanings = []; }
        _super.call(this);
        var self = this;
        this.categoryName = categoryName;
        this.meanings = new MeaningCollection();
        if ($.isArray(meanings)) {
            $.each(meanings, function (i, m) { return self.addMeaning(m); });
        }
        else {
            var m = meanings;
            self.addMeaning(m.word);
        }
    }
    Object.defineProperty(Category.prototype, "categoryName", {
        get: function () {
            return this.get('categoryName');
        },
        set: function (value) {
            this.set('categoryName', value);
        },
        enumerable: true,
        configurable: true
    });
    Category.prototype.addMeaning = function (text, selected) {
        if (selected === void 0) { selected = false; }
        this.meanings.add(new Meaning(text, selected));
    };
    return Category;
})(Backbone.Model);
var CategoryCollection = (function (_super) {
    __extends(CategoryCollection, _super);
    function CategoryCollection() {
        _super.apply(this, arguments);
    }
    return CategoryCollection;
})(Backbone.Collection);
var MeaningCollection = (function (_super) {
    __extends(MeaningCollection, _super);
    function MeaningCollection() {
        _super.apply(this, arguments);
    }
    return MeaningCollection;
})(Backbone.Collection);
/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>
/// <reference path="../models/Legend.ts" />
var LegendItemView = (function (_super) {
    __extends(LegendItemView, _super);
    function LegendItemView(options) {
        if (!options)
            options = {};
        options.template = "#legendItemViewTemplate";
        options.className = "legendItem";
        options.events = { "click": this.onClickEvent };
        _super.call(this, options);
    }
    LegendItemView.prototype.onClickEvent = function () {
        alert('legendItem clicked');
    };
    return LegendItemView;
})(Marionette.ItemView);
/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>
/// <reference path="./LegendItemView.ts" />
/// <reference path="../models/Legend.ts" />
var LegendSectionView = (function (_super) {
    __extends(LegendSectionView, _super);
    function LegendSectionView(options) {
        if (!options)
            options = {};
        options.className = "legendSection";
        options.template = _.template("");
        options.childView = LegendItemView;
        options.collection = options.model.items;
        options.childViewContainer = this.el;
        _super.call(this, options);
    }
    return LegendSectionView;
})(Marionette.CompositeView);
/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>
/// <reference path="./LegendSectionView.ts" />
/// <reference path="../models/Legend.ts" />
var LegendView = (function (_super) {
    __extends(LegendView, _super);
    function LegendView(options) {
        if (!options)
            options = {};
        options.className = "legendView";
        options.template = _.template("");
        options.childView = LegendSectionView;
        options.collection = options.model.sections;
        options.childViewContainer = this.el;
        _super.call(this, options);
    }
    return LegendView;
})(Marionette.CompositeView);
/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../models/ModelBase.ts" />
/// <reference path="../models/HindiProcessor.ts" />
/// <reference path="./LegendView.ts" />
var KeyboardView = (function (_super) {
    __extends(KeyboardView, _super);
    function KeyboardView(options) {
        if (!options)
            options = {};
        options.events = {
            'mouseenter': this.onMouseEnter,
            'mouseleave': this.onMouseLeave
        };
        options.el = "#keyboardContainer";
        options.template = false;
        _super.call(this, options);
    }
    KeyboardView.prototype.onMouseEnter = function () {
        $('#legendRegion').show();
    };
    KeyboardView.prototype.onMouseLeave = function () {
        $('#legendRegion').hide();
    };
    return KeyboardView;
})(Marionette.ItemView);
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="../models/WordDetails.ts" />
var WordDetailsView = (function (_super) {
    __extends(WordDetailsView, _super);
    function WordDetailsView(options) {
        if (!options)
            options = {};
        options.template = "#wordDetailsViewTemplate";
        options.className = "wordDetailsView";
        options.childView = CategoryView;
        options.collection = options.model.categories;
        options.childViewContainer = this.el;
        _super.call(this, options);
    }
    return WordDetailsView;
})(Marionette.CompositeView);
var CategoryView = (function (_super) {
    __extends(CategoryView, _super);
    function CategoryView(options) {
        if (!options)
            options = {};
        options.className = 'categoryView';
        options.template = "#categoryViewTemplate";
        options.childView = MeaningView;
        options.collection = options.model.meanings;
        options.childViewContainer = this.el;
        this.categoryViewTemplate = _.template($('#categoryViewTemplate').html());
        _super.call(this, options);
    }
    return CategoryView;
})(Marionette.CompositeView);
var MeaningView = (function (_super) {
    __extends(MeaningView, _super);
    function MeaningView(options) {
        if (!options)
            options = {};
        options.className = 'meaningView';
        options.template = _.template(options.model.text);
        options.modelEvents = {
            "change:selected": this.onModelChange
        };
        options.events = {
            "click": this.onClick
        };
        this.sentenceTooltipTemplate = _.template($('#sentenceTooltipTemplate').html());
        _super.call(this, options);
    }
    MeaningView.prototype.onModelChange = function () {
        var win = window;
        if (win.app.word.details.selectedMeaning != this.model) {
            win.app.word.details.selectedMeaning.selected = false;
            win.app.word.details.selectedMeaning = this.model;
        }
        win.app.populateSentencesFrame();
        this.render();
    };
    MeaningView.prototype.onDomRefresh = function () {
        if (this.model.selected)
            this.$el.addClass("selected");
        else
            this.$el.removeClass("selected");
    };
    MeaningView.prototype.onClick = function () {
        this.model.selected = !this.model.selected;
    };
    return MeaningView;
})(Marionette.ItemView);
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="../models/HindiProcessor.ts" />
/// <reference path="../models/Editor.ts" />
/// <reference path="../models/WordDetails.ts" />
/// <reference path="./WordDetailsView.ts" />
var EditorInputView = (function (_super) {
    __extends(EditorInputView, _super);
    function EditorInputView(options) {
        _super.call(this, options);
        this.lookupDictionary = {};
        this.delegateEvents({
            keydown: $.proxy(this.handleKeyDown, this),
            keyup: $.proxy(this.handleKeyUp, this),
            change: $.proxy(this.handleTextChange, this)
        });
    }
    EditorInputView.prototype.handleTextChange = function () {
        this.processText();
    };
    EditorInputView.prototype.extractLast = function (term) {
        return term.split(/\s+/).pop();
    };
    EditorInputView.prototype.focus = function () {
        this.el.focus();
    };
    EditorInputView.prototype.render = function () {
        this.initializeAutoComplete();
        return this;
    };
    EditorInputView.prototype.processText = function () {
        var hindiWord = "";
        var text = this.getText();
        if (text != "") {
            hindiWord = this.model.hindiProcessor.getHindiWord(text);
            var win = window;
            var currentWord = win.app.word;
            currentWord.hindiWord = hindiWord;
            currentWord.readable = text;
        }
        $("#englishWord").text(hindiWord);
    };
    EditorInputView.prototype.handleKeyUp = function (event) {
        this.processText();
    };
    EditorInputView.prototype.handleKeyDown = function (event) {
        var text = this.getText();
        if (event.keydown === $.ui.keyCode.ENTER || event.keyCode === $.ui.keyCode.SPACE) {
            if (text.length > 0) {
                this.populateTransliteratedItem(text);
            }
            this.clear();
            this.$el.autocomplete("close");
            return false;
        }
        else if (event.keyCode === $.ui.keyCode.ESCAPE) {
            this.clear();
            this.processText();
            return true;
        }
    };
    EditorInputView.prototype.getText = function () {
        return this.$el.val();
    };
    EditorInputView.prototype.setText = function (text) {
        this.$el.val(text);
    };
    EditorInputView.prototype.clear = function () {
        this.$el.val("");
        $("#englishWord").text("");
    };
    EditorInputView.prototype.initializeAutoComplete = function () {
        this.$el
            .autocomplete({ source: $.proxy(this.populateSource, this),
            select: $.proxy(this.selectTransliteratedItem, this),
            change: $.proxy(this.onChange, this),
            minLength: 1 });
    };
    EditorInputView.prototype.onChange = function () {
        this.$el.val("").css("top", 2).focus();
    };
    EditorInputView.prototype.selectTransliteratedItem = function (event, ui) {
        this.clear();
        this.populateTransliteratedItem(ui.item.value);
        event.preventDefault();
        return false;
    };
    EditorInputView.prototype.populateMeaning = function (text, terminator) {
        if (terminator === void 0) { terminator = ""; }
        var win = window;
        var sentence = this.model.currentParagraph.currentSentence;
        var readable = text;
        var hindiWord = this.model.hindiProcessor.getHindiWord(text);
        if (this.model.hindiProcessor.isHindiWord(text)) {
            hindiWord = text;
            readable = this.model.hindiProcessor.getReadableWord(hindiWord, false);
        }
        var meaning = "";
        var ajaxRequest = $.ajax({
            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20google.translate%20where%20q%3D%22' + encodeURI(hindiWord) + '%22%20and%20target%3D%22en%22%3B&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?',
            type: 'GET',
            async: false,
            dataType: 'jsonp'
        });
        var wordDetails = new WordDetails();
        var self = this;
        var currentWord = win.app.word;
        currentWord.hindiWord = hindiWord + terminator;
        currentWord.readable = readable + terminator;
        currentWord.details = wordDetails;
        wordDetails.word = currentWord;
        currentWord.selected = true;
        win.app.word.selected = false;
        if (sentence.currentWord == win.app.word) {
            sentence.nextWord();
        }
        win.app.word = sentence.currentWord;
        win.app.word.selected = true;
        sentence.hasWords = true;
        $.when(ajaxRequest).then(function (res) {
            var win = window;
            if (res.query.results) {
                meaning = res.query.results.json.sentences.trans;
                var defaultCategory = new Category("Default");
                wordDetails.selectedMeaning.text = meaning;
                wordDetails.selectedMeaning.selected = true;
                defaultCategory.meanings.add(wordDetails.selectedMeaning);
                wordDetails.categories.add(defaultCategory);
                if (res.query.results.json.dict) {
                    var arr = res.query.results.json.dict;
                    if (!$.isArray(arr)) {
                        arr = [];
                        arr[0] = res.query.results.json.dict;
                    }
                    $.each(arr, function (index, value) {
                        var meanings = value.entry;
                        var category = value.pos;
                        if (category == "")
                            category = "Others";
                        wordDetails.categories.add(new Category(category, meanings));
                    });
                }
                var wordDetailsView = new WordDetailsView({ model: wordDetails });
                win.app.wordDetailsRegion.show(wordDetailsView);
            }
        });
    };
    EditorInputView.prototype.endsWith = function (text, suffix) {
        var lastIndex = text.lastIndexOf(suffix);
        return (lastIndex != -1) && (lastIndex + suffix.length == text.length);
    };
    EditorInputView.prototype.populateTransliteratedItem = function (text) {
        var win = window;
        text = text.trim();
        var terminator = text[text.length - 1];
        if (this.endsWith(text, "||")) {
            var currentWord = win.app.word;
            currentWord.hindiWord = "";
            currentWord.readable = "";
            this.model.nextParagraph();
        }
        else if (terminator == "|" || terminator == "?" || terminator == "!" || terminator == ".") {
            var prefixWord = text.substr(0, text.length - 1);
            if (prefixWord.length > 0) {
                this.populateMeaning(prefixWord, terminator);
                terminator = "";
            }
            var currentWord = win.app.word;
            currentWord.hindiWord = "";
            currentWord.readable = "";
            this.model.currentParagraph.currentSentence.terminator = terminator;
            this.model.currentParagraph.nextSentence();
        }
        else {
            this.populateMeaning(text);
        }
        win.app.populateSentencesFrame();
    };
    EditorInputView.prototype.populateSource = function (request, response) {
        var filterFunction = this.model.hindiProcessor.isHindiWord;
        var filteredItems = [];
        var term = request.term.trim();
        if (term.length > 0) {
            var ajaxRequest = Backbone.ajax({
                url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.shabdkosh.com%2Futils%2Fautocomplete.php%3Flc%3Dhi%26query%3D' + encodeURI(term) + '%22%20&format=json&callback=?',
                type: 'GET',
                async: false,
                dataType: 'jsonp'
            });
            ajaxRequest.success(function (res) {
                if (res && res.query && res.query.results) {
                    filteredItems = $.parseJSON(res.query.results.body).suggestions.filter(filterFunction);
                    response(filteredItems);
                }
            });
        }
        else {
            this.clear();
        }
    };
    return EditorInputView;
})(Backbone.View);
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="../models/HindiProcessor.ts" />
/// <reference path="./EditorInputView.ts" />
var EditorView = (function (_super) {
    __extends(EditorView, _super);
    function EditorView(options) {
        if (!options)
            options = {};
        options.className = "editorView";
        options.template = _.template("");
        options.childView = ParagraphView;
        options.collection = options.model.paragraphs;
        options.childViewContainer = this.el;
        _super.call(this, options);
    }
    return EditorView;
})(Marionette.CompositeView);
var ParagraphView = (function (_super) {
    __extends(ParagraphView, _super);
    function ParagraphView(options) {
        if (!options)
            options = {};
        options.className = "paragraphView";
        options.template = _.template("<div />");
        options.childView = SentenceView;
        options.collection = options.model.sentences;
        options.childViewContainer = this.el;
        options.collectionEvents = {
            add: this.onAddSentence,
            remove: this.onRemoveSentence
        };
        _super.call(this, options);
    }
    ParagraphView.prototype.onAddSentence = function () {
        var win = window;
        win.app.populateSentencesFrame();
    };
    ParagraphView.prototype.onRemoveSentence = function () {
        var win = window;
        win.app.populateSentencesFrame();
    };
    return ParagraphView;
})(Marionette.CompositeView);
var SentenceView = (function (_super) {
    __extends(SentenceView, _super);
    function SentenceView(options) {
        if (!options)
            options = {};
        options.className = "sentenceView";
        options.template = "#sentenceViewTemplate";
        options.childView = WordView;
        options.collection = options.model.words;
        options.childViewContainer = this.el;
        this.ui = { "speakerButton": ".sspeaker" };
        options.events = {
            "mouseover .sinfo": this.onMouseOver,
            "mouseleave .sinfo": this.onMouseLeave,
            "click @ui.speakerButton": this.onSpeakerClick
        };
        options.modelEvents = {
            "change:meaning": this.onMeaningChange
        };
        options.collectionEvents = {
            add: this.onAddWord,
            remove: this.onRemoveWord
        };
        this.sentenceTooltipTemplate = _.template($('#sentenceTooltipTemplate').html());
        _super.call(this, options);
        this.setVisibility();
    }
    SentenceView.prototype.onRemoveWord = function () {
        this.setVisibility();
        this.getMeaning();
        this.render();
        var win = window;
        win.app.populateSentencesFrame();
    };
    SentenceView.prototype.onMeaningChange = function () {
        var win = window;
        win.app.populateSentencesFrame();
    };
    SentenceView.prototype.getMeaning = function () {
        var sentence = this.model;
        if (this.model.words.length > 0) {
            var ajaxRequest = $.ajax({
                url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20google.translate%20where%20q%3D%22' + encodeURI(this.model.allWords) + '%22%20and%20target%3D%22en%22%3B&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?',
                type: 'GET',
                async: false,
                dataType: 'jsonp'
            });
            $.when(ajaxRequest).then(function (res) {
                var meaning = res.query.results.json.sentences.trans;
                sentence.set({ meaning: meaning });
            });
        }
        else {
            sentence.set({ meaning: "" });
        }
    };
    SentenceView.prototype.onDomRefresh = function () {
        var self = this;
        $(".sentenceView").sortable({
            containment: "parent",
            cursor: "move",
            helper: "clone",
            forceHelperSize: true,
            update: function (event, ui) {
                var cid = ui.item.get(0).id;
                var pos = self.$(".wordView").parent("div [id]").map(function () { return this.id; }).toArray().indexOf(cid);
                var model = self.collection.get(cid);
                self.collection.remove(model);
                self.collection.add(model, { at: pos });
                var win = window;
                win.app.populateSentencesFrame();
            }
        });
        $(".sentenceView").disableSelection();
    };
    SentenceView.prototype.setVisibility = function () {
        if (this.model.words.length > 0) {
            this.$el.show();
        }
        else {
            this.$el.hide();
        }
    };
    SentenceView.prototype.onAddWord = function () {
        this.setVisibility();
        this.getMeaning();
        var win = window;
        win.app.populateSentencesFrame();
    };
    SentenceView.prototype.onMouseOver = function () {
        this.showTooltip();
    };
    SentenceView.prototype.onMouseLeave = function () {
        this.hideTooltip();
    };
    SentenceView.prototype.showTooltip = function () {
        var tooltipHtml = this.sentenceTooltipTemplate(this.model);
        $('#sentenceContainer').html(tooltipHtml);
        $('#TooltipContainer').html(tooltipHtml).addClass('Tooltip').show().position({
            of: this.$el,
            my: 'left top',
            at: 'left+2 bottom+2',
            collision: 'flip flip'
        });
    };
    SentenceView.prototype.hideTooltip = function () {
        $('#TooltipContainer').hide();
    };
    SentenceView.prototype.onSpeakerClick = function () {
        var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + this.model.allWords + "&tl=hi&total=1&idx=0&textlen=" + this.model.allWords.length + "&client=t&prev=input";
        var win = window;
        if (win.HTMLAudioElement) {
            var snd = new Audio('');
            if (snd.canPlayType('audio/mp3')) {
                snd = new Audio(url);
            }
            snd.play();
        }
        else {
            alert('HTML5 Audio is not supported by your browser!');
        }
    };
    return SentenceView;
})(Marionette.CompositeView);
var WordView = (function (_super) {
    __extends(WordView, _super);
    function WordView(options) {
        if (!options)
            options = {};
        options.template = "#wordViewTemplate";
        options.modelEvents = { change: this.onChange };
        this.ui = { "deleteButton": ".remove", "speakerButton": ".wspeaker" };
        options.events = {
            "mouseover .wordView": this.onMouseOver,
            "mouseleave .wordView": this.onMouseLeave,
            "click": this.onWordSelect,
            "click @ui.speakerButton": this.onSpeakerClick,
            "click @ui.deleteButton": this.onDeleteClick
        };
        _super.call(this, options);
        this.wordTooltipTemplate = _.template($('#wordTooltipTemplate').html());
    }
    WordView.prototype.onWordSelect = function () {
        var win = window;
        if (win.app.word)
            win.app.word.selected = false;
        this.model.selected = true;
        win.app.word = this.model;
        win.app.editor.currentParagraph = this.model.sentence.paragraph;
        win.app.editor.currentParagraph.currentSentence = this.model.sentence;
        $('#Editor').val(this.model.readable);
        if (this.model.hindiWord != "") {
            var wordDetailsView = new WordDetailsView({ model: this.model.details });
            win.app.wordDetailsRegion.show(wordDetailsView);
            win.app.wordDetailsRegion.$el.show();
        }
        else {
            win.app.wordDetailsRegion.$el.hide();
        }
        $('#Editor').focus();
    };
    WordView.prototype.onSpeakerClick = function () {
        var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + this.model.hindiWord + "&tl=hi&total=1&idx=0&textlen=" + this.model.hindiWord.length + "&client=t&prev=input";
        var win = window;
        if (win.HTMLAudioElement) {
            var snd = new Audio('');
            if (snd.canPlayType('audio/mp3')) {
                snd = new Audio(url);
            }
            snd.play();
        }
        else {
            alert('HTML5 Audio is not supported by your browser!');
        }
    };
    WordView.prototype.onDeleteClick = function () {
        var hasOneItem = this.model.collection.length == 1;
        this.model.collection.remove(this.model);
        if (hasOneItem && !this.model.collection && this.model.sentence.collection.length > 1)
            this.model.sentence.collection.remove(this.model.sentence);
        this.$el.remove();
        $('#TooltipContainer').hide();
    };
    WordView.prototype.onDomRefresh = function () {
        this.el.id = this.model.cid;
        this.$el.find(".wspeaker").hide();
        this.$el.find(".remove").hide();
    };
    WordView.prototype.onChange = function () {
        this.render();
    };
    WordView.prototype.onMouseOver = function () {
        if (this.model.hindiWord != "") {
            this.$el.find(".wspeaker").show();
            this.$el.find(".remove").show();
            this.showTooltip();
        }
        else if (this.model.hindiWord == "" && this.model.sentence.words.length == 1 && this.model.sentence.collection.length > 1) {
            this.$el.find(".remove").show();
        }
        return true;
    };
    WordView.prototype.onMouseLeave = function () {
        this.$el.find(".wspeaker").hide();
        this.$el.find(".remove").hide();
        this.hideTooltip();
        return true;
    };
    WordView.prototype.showTooltip = function () {
        var tooltipHtml = this.wordTooltipTemplate(this.model);
        $('#TooltipContainer').html(tooltipHtml).addClass('Tooltip').show().position({
            of: this.$el,
            my: 'left top',
            at: 'left+2 bottom+2',
            collision: 'flip flip'
        });
    };
    WordView.prototype.hideTooltip = function () {
        $('#TooltipContainer').hide();
    };
    return WordView;
})(Marionette.ItemView);
/// <reference path="../lib/typings/jquery/jquery.d.ts"/>
/// <reference path="../lib/typings/underscore/underscore.d.ts"/>
/// <reference path="../lib/typings/backbone/backbone.d.ts"/>
/// <reference path="../lib/typings/marionette/marionette.d.ts"/>
// <reference path="../models/Keyboard.ts" />
/// <reference path="../views/KeyboardView.ts" />
/// <reference path="../views/EditorView.ts" />
/// <reference path="../models/Legend.ts" />
/// <reference path="../models/HindiProcessor.ts" />
var HindiGuideApp = (function (_super) {
    __extends(HindiGuideApp, _super);
    function HindiGuideApp() {
        _super.call(this);
        this.hindiProcessor = new HindiProcessor();
        this.addRegions({ editorRegion: "#editorRegion" });
        this.addRegions({ lookupRegion: "#lookupRegion" });
        this.addRegions({ wordDetailsRegion: "#wordDetailsRegion" });
        this.addRegions({ legendRegion: "#legendRegion" });
        this.sentenceTooltipTemplate = _.template($('#sentenceTooltipTemplate').html());
    }
    HindiGuideApp.prototype.onStart = function () {
        this.legend = new Legend(this.hindiProcessor);
        var view = new LegendView({ model: this.legend });
        this.legendRegion.show(view);
        var keyboardView = new KeyboardView();
        keyboardView.render();
        this.editor = new Editor(this.hindiProcessor);
        var editorView = new EditorView({ model: this.editor });
        var editorInputView = new EditorInputView({ el: $('#Editor'), model: this.editor });
        editorInputView.render();
        this.editorRegion.show(editorView);
    };
    HindiGuideApp.prototype.populateSentencesFrame = function () {
        var tooltipHtml = this.sentenceTooltipTemplate({ paragraphs: this.editor.paragraphs.models });
        $('#sentencesFrame').contents().find("body").html(tooltipHtml);
        $('#sentencesTextArea').val(this.editor.getContentAsText());
    };
    return HindiGuideApp;
})(Marionette.Application);
$(function () {
    var win = window;
    win.app = new HindiGuideApp();
    win.app.start();
});
