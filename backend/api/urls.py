from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'skills', views.SkillCategoryViewSet, basename='skillcategory')
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'experience', views.ExperienceViewSet, basename='experience')
router.register(r'education', views.EducationViewSet, basename='education')
router.register(r'certifications', views.CertificationViewSet, basename='certification')

urlpatterns = [
    path('portfolio/', views.PortfolioAggregateView.as_view(), name='portfolio-aggregate'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('resume/', views.resume_download, name='resume-download'),
    path('contact/', views.ContactMessageCreateView.as_view(), name='contact-create'),
    path('', include(router.urls)),
]
