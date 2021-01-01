/// <reference path="../lib/typings/backbone/backbone.d.ts" />


module Models {

	export interface IHindiLetter{
		letter : string;
		readable: string;
	}

	export class HindiLetter extends Backbone.Model implements IHindiLetter{

		letter: string;
		readable: string;


		defaults(){
			return {
				letter : "", readable: ""
			}
		}

		constructor(attributes?: any, options?: any) {
			super();
		}
	}

}
