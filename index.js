/*
* @Author: Sushil Jain
* @Date:   2017-04-20 13:09:29
* @Last Modified by:   sushiljainam
* @Last Modified time: 2017-04-20 14:56:10
*/

var Parser = require("jison").Parser

var grammar = {
		"lex": {
				"rules": [
					["\\s+", "/* skip whitespace */"],
					["[0-9]+", "return 'NUMBER';"],
					["Ex.", "return 'EXPENSE';"],
					["In.", "return 'INCOME';"],
					["[a-z]+", "return 'WORD';"],
					["[,]", "return 'COMMA';"]
				]
		},

		"bnf": {
		"tran" :[ 
			["EXPENSE entries", "return {type: 'EXPENSE', entries: $2};"],
			["INCOME entries", "return {type: 'INCOME', entries: $2};"] ],
		"entries" : [ 
			["entries COMMA entry", "($1).push($3); $$ = $1;"  ],
			// ["entries entry",],
			[ "entry", "$$ = [$1]"] ],
		"entry" :[ 
			["words NUMBER", "$$ = {amount: $2, title: $1};"],
			["NUMBER", "$$ = {amount: $1};"] ],
		"words" : [ 
			["words WORD", "$$ = ''+$1+' '+$2"],
			["WORD", "$$ = $1"] ],
		}
};

var parser = new Parser(grammar);
var parserSource = parser.generate();

console.log(parser.parse("Ex. 34"));
console.log(parser.parse("Ex. 34, 56"));
console.log(parser.parse("Ex. soap rajan 20"));
console.log(parser.parse("Ex. bpple 34, soap 20"));
console.log(parser.parse("Ex. apple banan 34, soap 20"));
console.log(parser.parse("Ex.  34, soap 20"));