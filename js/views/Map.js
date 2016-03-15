(function (App, google) {
  'use strict';

  /**
   * View representation of the google maps component.
   */
  App.Views.Map = Backbone.View.extend({
    el: '#Map',

    initialize: function () {
      // Initialize the Google Map component.
      this.map = new google.maps.Map(this.$el.get(0), {
        center: new google.maps.LatLng(0, 0),
        zoom: 3
      });

      // Add a marker every time a new place is added.
      this.listenTo(this.collection, 'add', this.addMarker);

      this.centerMarkersOnMap();
    },

    /**
     * This method add a new market in the map, when a new model is added to the
     * collection of places.
     * @param {App.Models.Place} place Place model that was recently added to
     * the collection.
     */
    addMarker: function (place) {
      var marker = new google.maps.Marker({
        map: this.map,
        title: place.get('title'),
        position: new google.maps.LatLng(place.get('lat'), place.get('lng'))
      });

      place.set('marker', marker);

      this.centerMarkersOnMap();
    },

    /**
     * This method will adjust the map to fit all the markers in the screen at
     * once.
     */
    centerMarkersOnMap: function () {
      var latlngbounds = new google.maps.LatLngBounds();

      if (this.collection.length) {
        this.collection.each(function (model) {
          latlngbounds.extend(model.get('marker').position);
        });

        this.map.fitBounds(latlngbounds);
      }
    }

  });

}(App, google));
