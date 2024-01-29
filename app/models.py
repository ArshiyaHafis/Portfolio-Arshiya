from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    project_name = models.CharField(max_length=200)
    project_link = models.URLField(max_length=200)
    project_repo = models.URLField(max_length=200)
    project_image = models.ImageField(upload_to='images/')
    project_descp = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    class Meta:
        permissions = [
            ("create_project", "Can add project"),
            ("remove_project", "Can delete project"),
        ]

    def __str__(self):
        return self.project_name