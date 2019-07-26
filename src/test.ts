// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

const context = require.context('../src/app/core', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

const context2 = require.context('../src/app/recipes/recipe-details', true, /\.spec\.ts$/);
// And load the modules.
context2.keys().map(context2);

// const context3 = require.context('../src/app/shared/search-box', true, /\.spec\.ts$/);
// // And load the modules.
// context3.keys().map(context3);

const context4 = require.context('../src/app/recipes', false, /\.spec\.ts$/);
// And load the modules.
context4.keys().map(context4);



// ORIGINAL !!!
// // Then we find all the tests.
// const context = require.context('./', true, /\.spec\.ts$/);
// // And load the modules.
// context.keys().map(context);
