var Polls = Polls || {};

(function(P, $) {

  P.Workflow = Backbone.Router.extend({
    initialize: function(options) {
      this.results = new P.Results(options.initialResults);
      this.results.url = options.resultsUrl;

      this.pollView = new P.PollView({
        model: this.results,
        app: this
      });
    },

    routes: {
      'polls/:id/':         'showVoteForm',
      'polls/:id/results/': 'showResults'
    },

    showVoteForm: function(id) {
      this.pollView.showVoteForm();
    },

    showResults: function(id) {
      this.pollView.showResults();
    }

  });

})(Polls, jQuery);
