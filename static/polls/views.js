var Polls = Polls || {};

(function(P, $) {

  P.PollView = Backbone.View.extend({
    initialize: function() {
      this.voteFormView = new P.VoteFormView({model: this.model, app: this.options.app});
      this.resultsView = new P.ResultsView({model: this.model, app: this.options.app});
    },

    showVoteForm: function() {
      this.hideResults();
      this.voteFormView.$el.show();
      this.voteFormView.render();
    },

    hideVoteForm: function() {
      this.voteFormView.$el.hide();
    },

    showResults: function() {
      this.hideVoteForm();
      this.resultsView.$el.show();
      this.resultsView.render();
    },

    hideResults: function() {
      this.resultsView.$el.hide();
    }
  });


  P.VoteFormView = Backbone.View.extend({
    el: '#id_vote_form',

    events: {
      'submit': 'onSubmit'
    },

    onSubmit: function(evt) {
      evt.preventDefault();

      var $choice = this.$('input[type="radio"]:checked'),
          choiceId = $choice.val();

      this.model.recordVote(choiceId);
      this.options.app.navigate('polls/' + this.model.id + '/results/', {trigger: true});
    }
  });


  P.ResultsView = Backbone.View.extend({
    el: '#id_results_box',

    events: {
      'click a': 'onLinkClicked'
    },

    initialize: function() {
      this.results = this.model;
      this.results.on('change', this.onResultsChange, this);
    },

    onLinkClicked: function(evt) {
      evt.preventDefault();
      this.options.app.navigate($(evt.target).attr('href'), {trigger: true});
    },

    onResultsChange: function() {
      this.render();
    },

    render: function() {
      var self = this,
          choices = self.results.get('choices'),
          totalVotes = _.sum(_.pluck(choices, 'votes')),
          maxWidth = $(window).width();

      _.each(choices, function(choice) {
        var $count = self.$('#id_choice_' + choice.id + '_bar .count'),
            $bar = self.$('#id_choice_' + choice.id + '_bar .on'),
            share = choice.votes / totalVotes;

        $count.html(choice.votes);
        $bar.animate({'width': maxWidth * share}, 800);
      });

      return this;
    }
  });

})(Polls, jQuery);
