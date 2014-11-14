/**
 * ExpenseController
 *
 * @description :: Server-side logic for managing expenses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

'new': function (req, res, next) {
	res.view();
},


create: function (req, res, next) {
//console.log(req.params.all());
    var expenseObj = {
      firstName:   req.param('firstName'),
      lastName:    req.param('lastName'),
      moneyOutput: req.param('moneyOutput'),
    }

    Expense.create(expenseObj, function (err, expense){
      if(err){
        console.log("Error: " + err);
        return res.redirect('/expense/new/');
      } 
      res.redirect('/expense/new/');
      console.log("Egreso registrado");
    });
},
	


};

