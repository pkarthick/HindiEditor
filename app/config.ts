/// <reference path="./scripts/typings/jquery/jquery.d.ts" />
/// <reference path="./scripts/typings/require/require.d.ts" />
/// <reference path="./app.ts" />
/// <reference path="./HindiLib.ts" />

require.config({
    baseUrl: 'scripts',

    paths: {
        'jquery': 'scripts/jquery',
        'underscore': 'scripts/underscore',
        'backbone': 'scripts/backbone'
    },

    shim: {
        jquery: {
            exports: '$'
        },

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

