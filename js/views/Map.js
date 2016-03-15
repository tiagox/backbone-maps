(function (App, google) {
  'use strict';

  /**
   * View representation of the google maps component.
   */
  App.Views.Map = Backbone.View.extend({
    el: '#Map',

    initialize: function () {
      this.map = new google.maps.Map(this.$el.get(0), {
        center: {lat: 34.397, lng: 50.644},
        zoom: 8
      });

      var marker = new google.maps.Marker({
        position: {lat: 34.397, lng: 50.644},
        map: this.map,
        title: 'Hello World!'
      });

      this.listenTo(this.collection, 'add', function (model) {
        console.log(model.toJSON());
      });
    }

  });

}(App, google));
