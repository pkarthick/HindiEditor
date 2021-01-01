/// <reference path="../lib/typings/backbone/backbone.d.ts" />

class Keyboard extends Backbone.Model {
	
	message: string;


	collection : KeyboardCollection;

	constructor(attributes?: any, options?: any) {
		super(attributes,options);
	}
}

class KeyboardCollection extends Backbone.Collection<Keyboard> {

}