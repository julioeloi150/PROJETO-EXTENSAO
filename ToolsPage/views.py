from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Idea
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json


def index(request):
    return render(request, 'ToolsPage/index.html')


def submit_idea(request):
    if request.method == 'POST':
        author_name = request.POST.get('author_name')
        idea_text = request.POST.get('idea_text')

        if author_name and idea_text:
            idea = Idea.objects.create(
                author_name=author_name,
                idea_text=idea_text,
                created_at=datetime.now(),
            )
            return redirect('thank-you')

    return HttpResponse('Erro ao enviar a ideia.')


def thank_you(request):
    return render(request, 'ToolsPage/obg.html')

def create_idea_api(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        author_name = data.get('author_name')
        idea_text = data.get('idea_text')
        
        idea = Idea.objects.create(author_name=author_name, idea_text=idea_text)

        return JsonResponse({'success': True, 'message': 'Ideia criada com sucesso!'})

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})


def list_ideia(request):
    ideias = Idea.objects.all()
    return render(request, 'ToolsPage/idea_list.html', {'ideias': ideias})

def like_idea(request, idea_id):
    idea = get_object_or_404(Idea, id=idea_id)
    idea.likes += 1
    idea.save()
    return JsonResponse({'likes': idea.likes})

@require_POST
@csrf_exempt
def like_idea_popup(request, idea_id):
    idea = get_object_or_404(Idea, id=idea_id)
    idea.likes += 1
    idea.save()
    return JsonResponse({'likes': idea.likes})
