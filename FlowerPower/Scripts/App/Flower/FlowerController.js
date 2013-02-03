define([
  "backbone",
  'Flower/FlowersCollection',
  'Flower/FlowerModel',
  'text!Flower/FlowerTemplate.html',
  'jquery',
  'jqueryui',
  'knockout',
  'knockback'
],
function (Backbone, FlowersCollection, FlowerModel, Template, a, b, ko) {
    console.log("FlowerController");
    var FlowerController = Backbone.View.extend(
            {
                initialize: function () {
                    var self = this;
                    self.buttons = {};
                    self.buttons.AddButton = "#add_button";
                    self.buttons.EditButton = "#edit_button";
                    self.buttons.DelButton = "#del_button";
                    self.el = $("#flowers");
                    self.el.html(Template);
                    self.collection = new FlowersCollection();
                    var view_model = {
                        check: function (data) {
                            $("#flower-id-" + self.selected).removeClass("selected_flower");
                            $("#flower-id-" + data.Id()).addClass("selected_flower");
                            self.selected = data.Id();
                        },
                        flowers: kb.collectionObservable(self.collection)
                    };
                    ko.applyBindings(view_model, $('#flower_placeholder')[0]);
                    self.collection.fetch({
                        success: function () {
                        }
                    });
                },
                render: function () {
                    var self = this;
                    $(self.buttons.AddButton).live("click", function () {
                        self.onAddButton();
                    });
                    $(self.buttons.EditButton).live("click", function () {
                        self.onEditButton();
                    });
                    $(self.buttons.DelButton).live("click", function () {
                        self.onDelButton();
                    });
                },
                remove: function () {
                    var self = this;
                    for (var i in self.buttons) {
                        $(self.buttons[i]).die();
                    }
                    self.selected = null;
                },

                onAddButton: function () {
                    var self = this;
                    var dialog = "#add_flower_dialog";

                    var dialogError = "#flower_error";
                    var model = new FlowerModel();
                    var view_model = kb.viewModel(model);
                    ko.applyBindings(view_model, $('#add_flower_dialog')[0]);
                    $(dialog).dialog({
                        title: "Add Flower",
                        width: 400,
                        height: 300,
                        close: function () {
                            $(this).dialog("destroy");
                        },
                        buttons: {
                            "Save": function () {
                                var dialog = this;
                                model.save({}, {
                                    success: function () {
                                        self.collection.add(model);
                                        $(dialog).dialog("destroy");
                                    },
                                    error: function () {
                                        $(dialogError).html("Failed to save the flower");
                                        $(dialogError).fadeOut(1500);
                                    }
                                });
                            },
                            Cancel: function () {
                                $(this).dialog("destroy");
                            }
                        }
                    });

                },
                onEditButton: function () {
                    var self = this;
                    var dialog = "#add_flower_dialog";

                    var dialogError = "#flower_error";
                    var model = self.collection.get(self.selected);
                    if (model) {
                        var view_model = kb.viewModel(model);
                        ko.applyBindings(view_model, $('#add_flower_dialog')[0]);
                        $(dialog).dialog({
                            title: "Add Flower",
                            width: 400,
                            height: 300,
                            close: function () {
                                $(this).dialog("destroy");
                            },
                            buttons: {
                                "Save": function () {
                                    var dialog = this;
                                    model.save({}, {
                                        success: function () {
                                            $(dialog).dialog("destroy");
                                        },
                                        error: function () {
                                            $(dialogError).html("Failed to save the flower");
                                            $(dialogError).fadeOut(1500);
                                        }
                                    });
                                },
                                Cancel: function () {
                                    $(this).dialog("destroy");
                                }
                            }
                        });
                    }
                },
                onDelButton: function () {
                    var self = this;
                    if (self.selected != null) {
                        var model = self.collection.get(self.selected);
                        if (model)
                            model.destroy({ id: 1, wait: true });
                    }
                }
            });


    return FlowerController;
});