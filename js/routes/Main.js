(function (App) {
  'use strict';

  /**
   * Router file for the SPA.
   */
  App.Routes.Main = Backbone.Router.extend({
    routes: {
      '': 'init'
    },

    init: function() {
      this.placesCollection = new App.Collections.Places();
      this.placeFormView = new App.Views.PlaceForm({
        collection: this.placesCollection
      });
      this.mapView = new App.Views.Map({
        collection: this.placesCollection
      });
    }

  });

  var route = new App.Routes.Main();

  if (!Backbone.History.started) {
    Backbone.history.start();
  }

}(App));
