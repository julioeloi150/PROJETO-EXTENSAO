from rest_framework import serializers
from .models import Idea
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Model


class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ()