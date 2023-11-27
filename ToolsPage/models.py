from django.db import models


class Idea(models.Model):
    author_name = models.CharField(max_length=100)
    idea_text = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
def like(self):
    self.likes += 1
    self.save()