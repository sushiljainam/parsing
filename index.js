/*
* @Author: Sushil Jain
* @Date:   2017-04-20 13:09:29
* @Last Modified by:   sushiljainam
* @Last Modified time: 2017-04-20 16:05:31
*/

var Parser = require("jison").Parser

var grammar = {
		"lex": {
				"rules": [
					["\\s+", "/* skip whitespace */"],
					["([0-9]{2}[/][0-9]{2}[/][0-9]{4})", "return 'DATE';"],
					["([0-9]?[0-9][:][0-9]{2}[ ](AM|PM))", "return 'TIME';"],
					["[0-9]+", "return 'NUMBER';"],
					["Ex.", "return 'EXPENSE';"],
					["In.", "return 'INCOME';"],
					["[a-zA-Z]+", "return 'WORD';"],
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
			["EXPENSE entries", "$$ = {type: 'EXPENSE', entries: $2};"],
			["INCOME entries", "$$ = {type: 'INCOME', entries: $2};"] ],
		"entries" : [ 
			["entries COMMA entry", "($1).push($3); $$ = $1;"  ],
			// ["entries entry",],
			[ "entry", "$$ = [$1]"] ],
		"entry" :[ 
			["words NUMBER words", "$$ = {amount: $2, title: $1, comments: $3};"],
			["words NUMBER", "$$ = {amount: $2, title: $1};"],
			["NUMBER", "$$ = {amount: $1};"] ],
		"words" : [ 
			["words WORD", "$$ = ''+$1+' '+$2"],
			["WORD", "$$ = $1"] ],
		}
};

var parser = new Parser(grammar);
var parserSource = parser.generate();

// console.log(parser.parse("Ex. 34"));
// console.log(parser.parse("Ex. 34, 56"));
// console.log(parser.parse("Ex. soap rajan 20"));
// console.log(parser.parse("Ex. bpple 34, soap 20"));
// console.log(parser.parse("Ex. apple banan 34, soap 20"));
// console.log(parser.parse("Ex.  34, soap 20"));
var r = parser.parse("30/06/2016, 6:58 PM - sushil kumar jain: Ex. Riksha 10, bus 23, auto 30, paratha canteen 15, chips dew 32, auto return 20, bus 27, parathe lunch 40, mosami juice 20");
console.log(r.meta, r.trans.type)
for (var i = 0; i < r.trans.entries.length; i++) {
	console.log(r.trans.entries[i])
};


"30/06/2016, 12:29 AM - sushil kumar jain: Ex. Hair cut and trim 60"
"30/06/2016, 6:58 PM - sushil kumar jain: Ex. Riksha 10, bus 23, auto 30, paratha canteen 15, chips dew 32, auto return 20, bus 27, parathe lunch 40, mosami juice 20 "
"01/07/2016, 8:45 PM - sushil kumar jain: Ex. Mangi shake and lassi evening 40"
"03/07/2016, 3:01 AM - sushil kumar jain: Ex. Lunch nan paneer 80 also of arshpreet"
"20/06/2016, 6:07 PM - sushil kumar jain: Ex. Puri 10"
"20/06/2016, 6:08 PM - sushil kumar jain: Ex. Tanga 10"
"20/06/2016, 6:08 PM - sushil kumar jain: Ex. Paranthe 40"
"20/06/2016, 10:11 PM - sushil kumar jain: Ex. Mango shake 20"
"20/06/2016, 10:11 PM - sushil kumar jain: Ex. Sim aircel 100"
"21/06/2016, 7:31 PM - sushil kumar jain: Ex. Tanga 10"
"21/06/2016, 7:31 PM - sushil kumar jain: Ex. Paranthe 40"
"22/06/2016, 12:58 PM - sushil kumar jain: Ex. Puri 10"
"22/06/2016, 12:58 PM - sushil kumar jain: Ex. Kachori 15"
"22/06/2016, 6:59 PM - sushil kumar jain: Ex. Paranthe paneer 60"
"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Tiffin 55"
"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Nan panerr thali at thela 40"
"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Shikanji 10"
"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Tiffin 110"
"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Room rent umesh ji 1000"
"23/06/2016, 9:21 PM - sushil kumar jain: Ex. Banana shake 20"
"23/06/2016, 9:22 PM - sushil kumar jain: Ex. Room rent umesh ji more 1000 from ATM"