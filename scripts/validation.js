(function(window){
  'use strict';
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function(email){
      //return /.+@gmail\.com$/.test(email);
	return 1;
    },
    isDecaf: function(order, coffeeStrength){
      if(/(d|D)ecaf/.test(order) && coffeeStrength > 20) {
        return false;
      }else{
        return true;
      }
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
