/* Filename: collections/VirtualMachines */

define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
    var Flower = Backbone.Model.extend(
        {
            events: {
            },
            idAttribute: "Id",
            defaults: {
                Id: null,
                Name: null,
                Logo: null,
            },
            url: function () {
                return '/api/flowers/' +( (this.id != null) ? this.id : "");
            },
            initialize: function (parser) {
            }
        });
    return Flower;
});