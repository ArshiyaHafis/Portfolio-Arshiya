from django.shortcuts import render
from .models import Project
from .forms import ProjectForm
# Create your views here.
def home(request):
    return render(request, 'home.html')

def get_project(request):
    # project_data = Project.objects.all().order_by('project_name')
    # main = {'projects': project_data, }
    # return render(request, 'project.html', main)
    return render(request, 'project.html')


def post_project(request):
    form = ProjectForm()
    print("post project")
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        # print(form)
        if form.is_valid():
            print("saved")
            prj = form.save()
            prj.user = request.user
            prj.save()
            return render(request, 'add_project.html', {'msg': 'Project added successfully'})
        else:
            print("not valid", form.errors.as_data())
            return render(request, 'add_project.html', {'msg': 'Form invalid : '+form.errors.as_data()})
    context = {'form': form}
    return render(request, 'add_project.html', context)


def delete_project(request, name, id):
    print(name)
    print(id)
    project_set = Project.objects.filter(
        project_name=name, user=request.user, id=id)
    if (project_set.count() == 0):
        print("yes")
        return render(request, 'main.html', {'msg': 'not available for deletion'})
    print(project_set)
    project_set.delete()
    return render(request, 'main.html', {'msg': 'deleted successfully'})


def update_project(request, name, id):
    form = ProjectForm()
    print("update project")
    if request.method == 'POST':
        project_set = Project.objects.filter(
            project_name=name, user=request.user, id=id)
        project_set.delete()
        form = ProjectForm(request.POST, request.FILES)
        # print(form)
        if form.is_valid():
            print("saved")
            prj = form.save()
            prj.user = request.user
            prj.save()
            return render(request, 'main.html', {'msg': 'Updated Succesfully'})
        else:
            print("not valid", form.errors.as_data())
            return render(request, 'main.html', {'msg': form.errors.as_data()})
    context = {'form': form}
    return render(request, 'add_project.html', context)


def get_blog(request):
    return render(request, 'blog.html')