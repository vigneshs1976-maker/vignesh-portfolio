from rest_framework import serializers
from .models import (
    Profile, SkillCategory, Project, Experience,
    Education, Certification, ContactMessage,
)


class ProfileSerializer(serializers.ModelSerializer):
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'role', 'eyebrow', 'pitch', 'status',
            'location', 'graduating', 'cgpa', 'focus_area',
            'email', 'phone', 'linkedin_url', 'github_url',
            'about', 'resume_url',
        ]

    def get_resume_url(self, obj):
        request = self.context.get('request')
        if not obj.resume_file:
            return None
        url = '/api/resume/'
        return request.build_absolute_uri(url) if request else url


class SkillCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'skills']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'tagline', 'icon', 'tech_stack', 'bullets', 'github_url']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'role', 'organization', 'date_range', 'bullets']


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'date_range', 'cgpa']


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'title', 'issuer', 'duration']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError('Message should be at least 10 characters.')
        return value
