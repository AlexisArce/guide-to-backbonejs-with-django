from django.shortcuts import get_object_or_404
from djangorestframework import views
from polls.models import Poll

class PollResults (views.View):

    def get(self, request, poll_id):
        poll = get_object_or_404(Poll.objects.all(), pk=poll_id)
        results = {
            'question': poll.question,
            'choices': [{
                'id': choice.id,
                'choice': choice.choice,
                'votes': choice.votes
            } for choice in poll.choice_set.all()]
        }
        return results

poll_results_view = PollResults.as_view()
