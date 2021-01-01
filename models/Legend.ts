/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/underscore/underscore.d.ts" />
/// <reference path="../lib/typings/backbone/backbone.d.ts" />

/// <reference path="./HindiProcessor.ts/" />

class Legend extends Backbone.Model {

	sections: LegendSectionCollection;
	
	constructor(processor: HindiProcessor) {
		super();

		this.sections = new LegendSectionCollection();

		var vowelsSection = new LegendSection(processor.vowels, "lavender");
		this.sections.add( vowelsSection );

		var consanantsSection = new LegendSection(processor.baseConsanants, "hotpink");
		this.sections.add( consanantsSection );

		var miscLettersSection = new LegendSection(processor.miscLetters, "lightslateblue" );
		this.sections.add( miscLettersSection );

		var extensibleLettersSection = new LegendSection(processor.extensibleLetters, "oliverdrab");
		this.sections.add( extensibleLettersSection );

	}


}

class LegendSection extends Backbone.Model{

	items : LegendItemCollection;
	colorCode: string;

	constructor( letterTypes: { [l: string] : Array<string> }, color: string) {
		super();

		this.colorCode = color;

		this.items = new LegendItemCollection();

		_.each(letterTypes, (readableArray, letter) => {

			this.items.add(new LegendItem(letter, readableArray));

			});

	}

}

class LegendSectionCollection extends Backbone.Collection<LegendSection>{


}

class LegendItem extends Backbone.Model{

	get letter(): string {
        return this.get('letter');
    }
    set letter(value: string) {
        this.set('letter', value);
    }
    set readables(value: Array<string>) {
        this.set('readables', value);
    }
    get readables(): Array<string> {
        return this.get('readables');
    }

	constructor(letter: string, readables: Array<string>) {
		super();

	     // Content
	     this.letter = letter;
	     this.readables = readables;

	 }

	}

	class LegendItemCollection extends Backbone.Collection<LegendItem>{


	}
