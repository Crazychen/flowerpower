/* Filename: collections/VirtualMachines */

define([
  'jquery',
  'underscore',
  'backbone',
  'Flower/FlowerModel'
], function ($, _, Backbone, Model) {
    var Flowers = Backbone.Collection.extend({
        parse: function (resp, xhr) {
            return resp;
        },
        url: function () {
            return '/api/flowers'
        },

        model: Model,

        initialize: function () {
        }
        , comparator: function (model1, model2) {
            return (model1.get("Id") > model2.get("Id")) ? -1 : 1;
        }
    });

    return Flowers;
});