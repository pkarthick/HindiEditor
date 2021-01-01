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


class WordDetails extends Backbone.Model
{

	get word() : Word{
    	return this.get('word');
    }	

    set word(value: Word) {
        this.set('word', value);
    }

    get selectedMeaning(): Meaning {
        return this.get('selectedMeaning');
    }

    set selectedMeaning(value: Meaning) {
        this.set('selectedMeaning', value);
    }

	get categories(): CategoryCollection {
        return this.get('categories');
    }

    set categories(value: CategoryCollection) {
        this.set('categories', value);
    }

	constructor() {
		super();
		this.selectedMeaning = new Meaning("", false);
		this.categories = new CategoryCollection();	
	 }

	}

	class Meaning extends Backbone.Model
	{

		get text(): string{
			return this.get('text');
		}

		set text(value: string) {
			this.set('text', value);
		}

		get selected(): boolean{
			return this.get('selected');
		}

		set selected(value: boolean) {
			this.set('selected', value);
		}

		constructor(text: string, selected: boolean=false) {
		    super();
		
			this.text = text;
		    this.selected = selected;

		     // Content
		}

	}

	class Category extends Backbone.Model
	{

		get categoryName(): string {
			return this.get('categoryName');
		}
		set categoryName(value: string) {
			this.set('categoryName', value);
		}

		meanings : MeaningCollection;

		constructor(categoryName: string, meanings: Array<string>=[]) {
			super();

			var self = this;

			this.categoryName = categoryName;
			this.meanings = new MeaningCollection();

			if($.isArray(meanings))
			{
				$.each(meanings, (i, m)=> self.addMeaning(m) );
			}
			else
			{
				var m : any = meanings;
				self.addMeaning(m.word); 
			}
			

		}

		addMeaning(text: string, selected:boolean = false){
			this.meanings.add( new Meaning(text, selected) );
		}

	}


	class CategoryCollection extends Backbone.Collection<Category>
	{



	}

	class MeaningCollection extends Backbone.Collection<Meaning>
	{



	}


