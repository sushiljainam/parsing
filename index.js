/*
* @Author: Sushil Jain
* @Date:   2017-04-20 13:09:29
* @Last Modified by:   sushiljainam
* @Last Modified time: 2017-04-24 13:12:24
*/

var Parser = require("jison").Parser

var grammar = {
		"lex": {
				"rules": [
					["\\s+", "/* skip whitespace */"],
					["([0-9]{2}[/][0-9]{2}[/][0-9]{2,4})", "return 'DATE';"],
					["([0-9]?[0-9][:][0-9]{2}[ ](AM|PM))", "return 'TIME';"],
					["\\s[0-9]+\\s", "return 'NUMBER';"],
					["Due", "return 'DUE';"],
					["Ex.", "return 'EXPENSE';"],
					["In.", "return 'INCOME';"],
					["[a-zA-Z.]+", "return 'WORD';"],
					["[,]", "return 'COMMA';"],
					["[-]", "return 'HYPHEN';"],
					["[:]", "return 'COLON';"]
				]
		},

		"bnf": {
		"fullTran" :[
			["meta COLON tran", "return {meta: $1, trans: $3}"]],
		"meta": [
			["at HYPHEN by", "$$ = {at: $1, by: $3}"]],
		"at": [
			["DATE COMMA TIME", "$$ = {date: $1, time: $3}"]],
		"by": [
			["words", "$$ = $1;"]],
		"tran" :[ 
			["DUE entries", "$$ = {type: 'DUE', entries: $2};"],
			["EXPENSE entries", "$$ = {type: 'EXPENSE', entries: $2};"],
			["INCOME entries", "$$ = {type: 'INCOME', entries: $2};"] ],
		"entries" : [ 
			["entries COMMA entry", "($1).push($3); $$ = $1;"  ],
			// ["entries entry",],
			[ "entry", "$$ = [$1]"] ],
		"entry" :[ 
			["words NUMBER words", "$$ = {amount: $2, title: $1, comments: $3};"],
			["words NUMBER", "$$ = {amount: $2, title: $1};"],
			["NUMBER", "$$ = {amount: $1, title:'untitled'};"] ],
		"words" : [ 
			["words WORD", "$$ = ''+$1+' '+$2"],
			["WORD", "$$ = $1"] ],
		}
};

var parser = new Parser(grammar);
// var parserSource = parser.generate(); // what does it do


// example: use it like this
// var r = parser.parse("string");

// export it
module.exports.parser = parser;
