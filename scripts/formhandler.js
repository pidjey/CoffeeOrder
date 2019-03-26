(function(window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector){
    if(!selector)
    {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};
      console.log($(this));
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data)
      .then(function(){
        this.reset();
        this.elements[0].focus();
      }.bind(this));

    });
  };

  FormHandler.prototype.addInputHandler = function(fn){
    console.log("Setting input handler for form");
    this.$formElement.on('input', '[name="emailAddress"]', function(event){
      var emailAddress = event.target.value;
      var message = '';
      if(fn(emailAddress)){
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email Address!';
        event.target.setCustomValidity(message);
      }
    });
  }

  FormHandler.prototype.addDecafValidity = function(fn){
    console.log('Setting onchange handler for range');
    this.$formElement.on('input', '[name="strength"]', function(event){
      event.preventDefault();
      var orderInput = this.$formElement.find('input[name="coffee"]');
      var order = orderInput.val();
      var strength = event.target.value;

      var message = '';
      console.log('strength: ' + fn(order, strength) );
      if(fn(order, strength)){
        event.target.setCustomValidity('');
        orderInput[0].setCustomValidity('');
      } else {
        message = ' didn\'t you ask for a decaf coffee?';
        event.target.setCustomValidity(message);
      }

    }.bind(this));

    this.$formElement.on('input', '[name="coffee"]', function(event){
      event.preventDefault();
      var strengthInput = this.$formElement.find('input[name=strength]');
      var strength = strengthInput.val();
      var order = event.target.value;

      var message = '';
      console.log('coffee: ' + fn(order, strength) );
      if(fn(order, strength)){
        event.target.setCustomValidity('');
        strengthInput[0].setCustomValidity('');
      }else{
        message = ' didn\'t you ask for a decaf coffee?';
        event.target.setCustomValidity(message);
      }
    }.bind(this));
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window)
