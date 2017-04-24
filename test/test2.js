/*
* @Author: Sushil Jain
* @Date:   2017-04-24 12:58:35
* @Last Modified by:   sushiljainam
* @Last Modified time: 2017-04-24 16:52:25
*/

var parser = require("../index").parser;


var testData = { strings: [
	"30/06/2016, 12:29 AM - sushil kumar jain: Ex. Hair cut and trim 60",
	"30/06/2016, 6:58 PM - sushil kumar jain: Ex. Riksha 10, bus 23, auto 30, paratha canteen 15, chips dew 32, auto return 20, bus 27, parathe lunch 40, mosami juice 20 ",
	"01/07/2016, 8:45 PM - sushil kumar jain: Ex. Mangi shake and lassi evening 40",
	"03/07/2016, 3:01 AM - sushil kumar jain: Ex. Lunch nan paneer 80 also of arshpreet",
	"20/06/2016, 6:07 PM - sushil kumar jain: Ex. Puri 10",
	"20/06/2016, 6:08 PM - sushil kumar jain: Ex. Tanga 10",
	"20/06/2016, 6:08 PM - sushil kumar jain: Ex. Paranthe 40",
	"20/06/2016, 10:11 PM - sushil kumar jain: Ex. Mango shake 20",
	"20/06/2016, 10:11 PM - sushil kumar jain: Ex. Sim aircel 100",
	"21/06/2016, 7:31 PM - sushil kumar jain: Ex. Tanga 10",
	"21/06/2016, 7:31 PM - sushil kumar jain: Ex. Paranthe 40",
	"22/06/2016, 12:58 PM - sushil kumar jain: Ex. Puri 10",
	"22/06/2016, 12:58 PM - sushil kumar jain: Ex. Kachori 15",
	"22/06/2016, 6:59 PM - sushil kumar jain: Ex. Paranthe paneer 60",
	"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Tiffin 55",
	"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Nan panerr thali at thela 40",
	"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Shikanji 10",
	"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Tiffin 110",
	"23/06/2016, 7:59 PM - sushil kumar jain: Ex. Room rent umesh ji 1000",
	"23/06/2016, 9:21 PM - sushil kumar jain: Ex. Banana shake 20",
	"23/06/2016, 9:22 PM - sushil kumar jain: Ex. Room rent umesh ji more 1000 from ATM"
	]};

var output = {objects: []};
for (var i = 0; i < testData.strings.length; i++) {
	output.objects.push(parser.parse(testData.strings[i]));
};

output.rawData = JSON.stringify(output.objects);

calculateTotalForTrans();

// console.log(JSON.stringify(output.objects));

// start analyzing and create reports
// 
// records for a date
// records for a month
// records for an author
// records for a particular "area of expense"
// get total for date/author/string
// e.g. total("room rent")
// e.g. total("umesh")
// e.g. total("tiffin")
// e.g. total("shake")
// 
// group by date
// group by "meta.by"
// count frequencies on various aspects

output.reports = {};

function freqOfAny (output, keyRepo, from) {
	output.reports[keyRepo] = [];
	for (var i = 0; i < output.objects.length; i++) {
		var n = getValue(output.objects[i], from);
		var flag = false;
		for (var j = 0; j < output.reports[keyRepo].length; j++) {
			var m = output.reports[keyRepo][j].value;
			if(m==n){
				output.reports[keyRepo][j].count++; flag = true; 
				output.reports[keyRepo][j].refs.push(i);
				output.reports[keyRepo][j].total.expense += output.objects[i].trans.type=="EXPENSE" ? output.objects[i].trans.total : 0;
				output.reports[keyRepo][j].total.income += output.objects[i].trans.type=="INCOME" ? output.objects[i].trans.total : 0;
				break;
			}
		};
		if(!flag){
			var toPush = {value: n, count: 1, refs: [i], total: {}};
			toPush.total.expense = output.objects[i].trans.type=="EXPENSE" ? output.objects[i].trans.total : 0;
			toPush.total.income = output.objects[i].trans.type=="INCOME" ? output.objects[i].trans.total : 0;
			output.reports[keyRepo].push(toPush);
		}
	};
}

var freqOfAuthor = freqOfAny.bind(null, output, 'authors', 'meta.by');
var freqOfDates = freqOfAny.bind(null, output, 'dates', 'meta.at.date');
freqOfAuthor(output)
freqOfDates(output)
console.log(JSON.stringify(output.reports));

function getValue (obj, deep) {
	var t = deep.split('.'); var i=0;
	while(/*typeof obj == 'object' &&*/ i<t.length){
		obj = obj[t[i++]];
	}
	return obj;
}


function calculateTotalForTrans () {
	for (var i = 0; i < output.objects.length; i++) {
		output.objects[i].trans.total = 0;
		for (var j = 0; j < output.objects[i].trans.entries.length; j++) {
			output.objects[i].trans.total += parseInt(output.objects[i].trans.entries[j].amount);
		};
	};
}
