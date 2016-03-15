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
      this.collection.add(this.getPlaceObject());
    },

    /**
     * Return all the fields in the form as a simple JS object.
     * @return {Object} Simple representation of a Place as a JS object
     */
    getPlaceObject: function () {
      return {
        lat: this.$el.find('#lat').val(),
        lng: this.$el.find('#lng').val(),
        name: this.$el.find('#name').val()
      };
    },

    /**
     * Enable/disable the *Add* button if all the fields in the form were filled.
     */
    setButtonState: function () {
      var placeObject = this.getPlaceObject(),
        disabled = !(placeObject.lat && placeObject.lng && placeObject.name);

      this.$el.find('#add').prop('disabled', disabled);
    }

  });

}(App));
