(function (App) {
  'use strict';

  /**
   * View representation of the google maps component.
   */
  App.Views.PlaceForm = Backbone.View.extend({
    el: '#PlaceForm',
    events: {
      'click #add': 'addPlace',
      'blur input': 'setButtonState'
    },

    initialize: function () {
      this.setButtonState();
    },

    /**
     * Adds a new Place to the collection Places from the data filled in the form.
     */
    addPlace: function () {
      var newPlace = new this.collection.model(this.getPlaceObject());

      this.collection.add(newPlace);

      newPlace.save({ marker: null });
    },

    /**
     * Return all the fields in the form as a simple JS object.
     * @return {Object} Simple representation of a Place as a JS object
     */
    getPlaceObject: function () {
      var rawLat = this.$el.find('#lat').val(),
        rawLng = this.$el.find('#lng').val();

      return {
        lat: rawLat.length? parseFloat(rawLat) : null,
        lng: rawLng.length? parseFloat(rawLng) : null,
        title: this.$el.find('#title').val()
      };
    },

    /**
     * Enable/disable the *Add* button if all the fields in the form were filled.
     */
    setButtonState: function () {
      var placeObject = this.getPlaceObject(),
        disabled = !(placeObject.lat !== null && placeObject.lng !== null && placeObject.title);

      this.$el.find('#add').prop('disabled', disabled);
    }

  });

}(App));
