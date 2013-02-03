define([
  // Application.
  "App",
  'backbone',
  'Flower/FlowerController',
  'jquery',
],

function (app, Backbone, FlowerController) {
    var Router = Backbone.Router.extend({
        routes: {
            "/": "index",
            "": "index",
            "#": "index",
            "flowers": "index",
            "placeholder": "placeholder",
            "enviroment": "enviroment",
            "trees": "trees",
            "gardens": "gardens",
            "details": "details",
        },
        placeholder: function () {
            var self = this;
            self._showOperationMenu(103);
            var placeholder = "#placeholders";
            self._showPlaceholder(placeholder);
        },
        enviroment: function () {
            var self = this;
            self._showOperationMenu(155);
            var placeholder = "#enviroment";
            self._showPlaceholder(placeholder);
        },
        trees: function () {
            var self = this;
            self._showOperationMenu(207);
            var placeholder = "#trees";
            self._showPlaceholder(placeholder);
        },
        gardens: function () {
            var self = this;
            self._showOperationMenu(260);
            var placeholder = "#gardens";
            self._showPlaceholder(placeholder);
        },
        details: function () {
            var self = this;
            var menuOperation = "#menu_operation";
            $(menuOperation).hide();
            var placeholder = "#details";
            self._showPlaceholder(placeholder);
        },
        index: function () {
            var self = this;
            self._showOperationMenu(51);
            var placeholder = "#flowers";
            self._showPlaceholder(placeholder);
            $(".flower-menu a").css("z-index", 0);
            $(".link").removeClass("selected");
            $(".flower-menu a").addClass("selected");
            $(".flower-menu a").css("z-index", 100);
            var controller = new FlowerController();
            self._initController(controller);
        },
        _showOperationMenu: function (offset) {
            var menuOperation = "#menu_operation";
            $(menuOperation).show();
            $(menuOperation).css("margin-top", offset + "px");
        },
        _showPlaceholder: function (placeholder) {
            var self = this;
            $(placeholder).parent().children().hide();
            $(placeholder).show();
        },
        _initController: function (controller) {
            var self = this;
            if (self.controller && self.controller.remove)
                self.controller.remove();
            controller.render();
            self.controller = controller;
        }

    });

    return Router;

});