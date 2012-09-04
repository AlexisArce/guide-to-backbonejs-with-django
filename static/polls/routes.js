var Polls = Polls || {};

(function(P, $) {

  P.Workflow = Backbone.Router.extend({
    initialize: function(options) {
      this.results = new P.Results(options.initialResults);
      this.results.url = options.resultsUrl;

      // Create the app views
    },

    routes: {
      '/polls/:id/':         'showPoll',
      '/polls/:id/results/': 'showResults'
    },

    showPoll: function(id) {
      // Tell the app view to show the poll form
    },

    showResults: function(id) {
      // Tell the app view to show the results
    }

  });

})(Polls, jQuery);
