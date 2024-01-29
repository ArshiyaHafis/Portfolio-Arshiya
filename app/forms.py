from django.forms import ModelForm
from .models import Project
from django import forms

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ('project_name', 'project_link', 'project_repo',
                  'project_image', 'project_descp',)