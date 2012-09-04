from djangorestframework import resources
from polls.models import Poll

class PollResource (resources.ModelResource):
    model = Poll
    fields = ('id', 'question', 'choices')
    exclude = ()

    def choices(self, poll):
        return [{
                    'id': choice.id,
                    'choice': choice.choice,
                    'votes': choice.votes
                } for choice in poll.choice_set.all()]
