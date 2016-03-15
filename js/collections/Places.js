(function (App) {
  'use strict';

  /**
   * Representation of the collection of places created by the user.
   */
  App.Collections.Places = Backbone.Collection.extend({
    model: App.Models.Place,
    localStorage: new Backbone.LocalStorage("backbone-maps")
  });

}(App));
