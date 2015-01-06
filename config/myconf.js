//*******************************************************

var systemDate = new Date();

var day 	= systemDate.getDate();
var month 	= systemDate.getMonth()+1;
var year 	= systemDate.getFullYear();

if(day<9){
	day = '0' + day;
}
if(month<9){
	month = '0' + month;
}
//***************************************************



module.exports.myconf = {
    //urlRoot: 'http://onerp.apocalipsisnutrition.com/',
    urlRoot: 'http://localhost:1337/',
    //dirRoot: '/home/apocali2/onerp/',
    dirRoot: '/home/daniel/Workspace/2014/Orange/OrangeApp/',

    systemDate : {
    	day: day,
    	month: month,
    	year: year,
    }
};