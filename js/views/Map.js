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

      // Display all the stored markers.
      this.listenTo(this.collection, 'reset', this.addAllMarkers);
      // Add a marker every time a new place is added.
      this.listenTo(this.collection, 'change:id', this.addMarker);
      // Remove the marker when the user delete
      this.listenTo(this.collection, 'destroy', this.removeMarker);
    },

    /**
     * This method will generate all the markers for every place in the
     * collection.
     */
    addAllMarkers: function () {
      var view = this;

      this.collection.each(function (place) {
        var marker = view.createMarker(place);
        place.set('marker', marker);
      });

      this.centerMarkersOnMap();
    },

    /**
     * This method saves a new marker based on a recently created place.
     * @param {App.Models.Place} place Place model that was recently added to
     * the collection.
     */
    addMarker: function (place) {
      var marker = this.createMarker(place);

      place.set('marker', marker);

      this.centerMarkersOnMap();
    },

    /**
     * This method creates a marker and place it in the map.
     * @param {App.Models.Place} place Place model that was recently added to
     * the collection.
     * @return {google.maps.Marker} The created marker object.
     */
    createMarker: function (place) {
      return new google.maps.Marker({
        map: this.map,
        title: place.get('title'),
        position: new google.maps.LatLng(place.get('lat'), place.get('lng'))
      });
    },

    removeMarker: function (place) {
      place.get('marker').setMap(null);

      this.centerMarkersOnMap();
    },

    /**
     * This method will adjust the map to fit all the markers in the screen at
     * once.
     */
    centerMarkersOnMap: function () {
      var latlngbounds = new google.maps.LatLngBounds();

      if (this.collection.length) {
        this.collection.each(function (place) {
          latlngbounds.extend(place.get('marker').position);
        });

        this.map.fitBounds(latlngbounds);
      } else {
        this.map.setCenter(new google.maps.LatLng(0, 0));
        this.map.setZoom(3);
      }
    }

  });

}(App, google));
