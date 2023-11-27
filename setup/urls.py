from django.contrib import admin
from django.urls import path
from ToolsPage.views import index, submit_idea, thank_you, create_idea_api, list_ideia, like_idea, like_idea_popup

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", index, name="index"),
    path('api/ideas/', create_idea_api, name='create-idea-api'),
    path("submit_idea/", submit_idea, name="submit-idea"),
    path("thank_you/", thank_you, name="thank-you"),
    path('ideas/', list_ideia, name='ideas'),
    path('like-idea/<int:idea_id>/', like_idea, name='like-idea'),
    path('like-idea-popup/<int:idea_id>/', like_idea_popup, name='like-idea-popup'),
]
