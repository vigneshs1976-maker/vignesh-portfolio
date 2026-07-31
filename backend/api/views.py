from django.http import FileResponse, Http404
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    Profile, SkillCategory, Project, Experience,
    Education, Certification, ContactMessage,
)
from .serializers import (
    ProfileSerializer, SkillCategorySerializer, ProjectSerializer,
    ExperienceSerializer, EducationSerializer, CertificationSerializer,
    ContactMessageSerializer,
)


class ProfileView(APIView):
    """The single Profile row. GET only -- edit content via /admin/."""

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({'detail': 'No profile has been seeded yet.'}, status=404)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)


class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    """POST a message from the contact form. Stored in the DB and
    visible in /admin/ under Contact messages."""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


class PortfolioAggregateView(APIView):
    """
    Everything the frontend needs for the initial render, in one call,
    so the SPA does a single fetch on load instead of six.
    """

    def get(self, request):
        profile = Profile.objects.first()
        data = {
            'profile': ProfileSerializer(profile, context={'request': request}).data if profile else None,
            'skills': SkillCategorySerializer(SkillCategory.objects.all(), many=True).data,
            'projects': ProjectSerializer(Project.objects.all(), many=True).data,
            'experience': ExperienceSerializer(Experience.objects.all(), many=True).data,
            'education': EducationSerializer(Education.objects.all(), many=True).data,
            'certifications': CertificationSerializer(Certification.objects.all(), many=True).data,
        }
        return Response(data)


def resume_download(request):
    """
    Serves the resume PDF as a forced download.

    Implemented as a real endpoint (rather than a plain link to the media
    file) because the frontend and backend run on different localhost
    ports during development -- different origins -- and browsers ignore
    the HTML `download` attribute on cross-origin links. Setting
    Content-Disposition on the server side works regardless of origin.
    """
    profile = Profile.objects.first()
    if not profile or not profile.resume_file:
        raise Http404('No resume file has been uploaded yet.')
    return FileResponse(
        profile.resume_file.open('rb'),
        as_attachment=True,
        filename='Vignesh_Soma_Resume.pdf',
        content_type='application/pdf',
    )
