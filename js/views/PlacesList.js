(function (App) {
  'use strict';

  /**
   * View component for the list of created places.
   */
  App.Views.PlacesList = Backbone.View.extend({
    el: '#PlacesList',
    events: {
      'click .delete': 'removePlace'
    },

    initialize: function () {
      this.template = $('#PlacesListTemplate').html();

      this.listenTo(this.collection, 'reset', this.render);
      // Wait until the model get its id.
      this.listenTo(this.collection, 'change:id', this.render);
      this.listenTo(this.collection, 'destroy', this.render);
    },

    render: function () {
      this.$el.html(Mustache.render(this.template, {
        places: this.collection.toJSON()
      }));
    },

    removePlace: function (event) {
      var id = $(event.currentTarget).data('id'),
        place = this.collection.get(id);

      place.destroy();
    }

  });

}(App));
