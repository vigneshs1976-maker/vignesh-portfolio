from django.contrib import admin
from .models import (
    Profile, SkillCategory, Project, Experience,
    Education, Certification, ContactMessage,
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'status', 'email', 'updated_at')

    fieldsets = (
        ('Identity', {'fields': ('name', 'role', 'eyebrow', 'pitch', 'status')}),
        ('Quick facts', {'fields': ('location', 'graduating', 'cgpa', 'focus_area')}),
        ('Contact', {'fields': ('email', 'phone', 'linkedin_url', 'github_url')}),
        ('About section', {'fields': ('about',)}),
        ('Resume', {'fields': ('resume_file',)}),
    )


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    ordering = ('order',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'order')
    ordering = ('order',)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'organization', 'date_range', 'order')
    ordering = ('order',)


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'date_range', 'order')
    ordering = ('order',)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'duration', 'order')
    ordering = ('order',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'is_read')
    list_filter = ('is_read',)
    readonly_fields = ('name', 'email', 'message', 'created_at')
    ordering = ('-created_at',)
