"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sessionStarted_1 = require("./states/sessionStarted");
var AttendanceStats_1 = require("./directives/AttendanceStats");
var StartSessionButton_1 = require("./directives/StartSessionButton");
var teach_1 = require("./states/teach");
var teach_books_1 = require("./states/teach.books");
var teach_reader_1 = require("./states/teach.reader");
var reader_svg_1 = require("../reader/states/reader.svg");
var reader_html_1 = require("../reader/states/reader.html");
exports.default = angular.module('LearniApp.teach', [])
    .config(function ($stateProvider) {
    $stateProvider.state('teach', new teach_1.TeachState())
        .state('teach.books', new teach_books_1.TeachBooksState())
        .state('teach.reader', new teach_reader_1.TeachReaderState())
        .state('teach.reader.svg', new reader_svg_1.SvgReaderState())
        .state('teach.reader.html', new reader_html_1.HtmlReaderState())
        .state('sessionStarted', new sessionStarted_1.SessionStartedState());
})
    .component('startSessionButton', new StartSessionButton_1.StartSessionButton())
    .component('attendanceStats', new AttendanceStats_1.AttendanceStats()).name;
//# sourceMappingURL=index.js.map