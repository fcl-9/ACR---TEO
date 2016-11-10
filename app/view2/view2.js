'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .controller('View2Ctrl', ["Products","$routeParams", function(Products,$routeParams) {
      var product_id = $routeParams.product_id;
      var product;
      console.log(Products);
      Products.forEach(function(item, index){
        console.log(item);
        if(item.id == product_id) {
          product = item;
        }
      });
      this.product = product;
      console.log(product);
      this.new_review = '';
      this.addReview = function () {
        product.reviews.push(this.new_review);
        this.new_review = '';
      }
    }]);