(function (App) {
  'use strict';

  /**
   * View representation of the google maps component.
   */
  App.Views.PlacesList = Backbone.View.extend({
    el: '#PlacesList',

    initialize: function () {
      this.template = $('#PlacesListTemplate').html();

      this.listenTo(this.collection, 'add', this.render);

      this.render();
    },

    render: function () {
      this.$el.html(Mustache.render(this.template, {
        places: this.collection.toJSON()
      }));
    }

  });

}(App));
