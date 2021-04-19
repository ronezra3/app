"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plan_1 = require("./states/plan");
var plan_books_1 = require("./states/plan.books");
var plan_reader_1 = require("./states/plan.reader");
var reader_svg_1 = require("../reader/states/reader.svg");
var reader_html_1 = require("../reader/states/reader.html");
exports.default = angular.module('LearniApp.plan', [])
    .config(function ($stateProvider) {
    $stateProvider.state('enrich', new plan_1.PlanState())
        .state('enrich.books', new plan_books_1.PlanBooksState())
        .state('enrich.reader', new plan_reader_1.PlanReaderState())
        .state('enrich.reader.svg', new reader_svg_1.SvgReaderState())
        .state('enrich.reader.html', new reader_html_1.HtmlReaderState());
}).name;
//# sourceMappingURL=index.js.map