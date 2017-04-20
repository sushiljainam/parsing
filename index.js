/*
* @Author: Sushil Jain
* @Date:   2017-04-20 13:09:29
* @Last Modified by:   sushiljainam
* @Last Modified time: 2017-04-20 13:09:59
*/

var Parser = require("jison").Parser

var grammar = {
    "lex": {
        "rules": [
           ["\\s+", "/* skip whitespace */"],
           ["[0-9]+", "return 'NUMBER';"],
           ["Ex.", "return 'EXPENSE';"],
           ["In.", "return 'INCOME';"],
           ["[a-z]", "return 'WORD';"],
           ["[,]", "return 'COMMA';"]
        ]
    },

    "bnf": {
    "tran" :[ "EXPENSE entries", "INCOME entries" ],
    "entries" : [ "entries COMMA entry", "entries entry", "entry" ],
    "entry" :[ "words NUMBER", "NUMBER" ],
    "words" : ["words WORD", "WORD"],
    
    
        
    }
};

var parser = new Parser(grammar);
var parserSource = parser.generate();

console.log(parser.parse("Ex. 34"));
console.log(parser.parse("Ex. 34, 56"));
console.log(parser.parse("Ex. 34, soap 20"));
console.log(parser.parse("Ex. apple 34, soap 20"));
console.log(parser.parse("Ex. apple banan 34, soap 20"));
console.log(parser.parse("Ex. a 34, soap 20"));