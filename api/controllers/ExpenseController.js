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
      observations:req.param('expenseDescription'),
    }

    Expense.create(expenseObj, function (err, expense){
      if(err){
        console.log("Error: " + err);
        return res.redirect('/expense/new');
      }

      res.writeHead(200, {'content-type': 'text/html'});
      res.end(
        '<script>'+
        'alert(" ¡Egreso registrado! ");'+
        'window.location.replace("/expense/new");'+
        '</script>'
      );
      console.log("Egreso registrado");

    });
  },
	

};

