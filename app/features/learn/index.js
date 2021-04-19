"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var learn_1 = require("./states/learn");
var learn_books_1 = require("./states/learn.books");
var learn_reader_1 = require("./states/learn.reader");
var reader_svg_1 = require("../reader/states/reader.svg");
var reader_html_1 = require("../reader/states/reader.html");
exports.default = angular.module('LearniApp.learn', [])
    .config(function ($stateProvider) {
    $stateProvider.state('learn', new learn_1.LearnState())
        .state('learn.books', new learn_books_1.LearnBooksState())
        .state('learn.reader', new learn_reader_1.LearnReaderState())
        .state('learn.reader.svg', new reader_svg_1.SvgReaderState())
        .state('learn.reader.html', new reader_html_1.HtmlReaderState());
}).name;
//# sourceMappingURL=index.js.map