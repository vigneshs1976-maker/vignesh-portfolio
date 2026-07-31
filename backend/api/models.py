from django.db import models


class Profile(models.Model):
    """
    Singleton-style model holding top-level identity, contact info, and
    hero copy. There should only ever be one row -- it's created/updated
    by the `seed_portfolio` management command.
    """
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=150)
    eyebrow = models.CharField(
        max_length=100, blank=True,
        help_text='Small label above the name, e.g. "// full-stack developer"'
    )
    pitch = models.TextField(help_text='One or two sentence hero tagline.')
    status = models.CharField(max_length=100, default='open_to_work')

    location = models.CharField(max_length=100)
    graduating = models.CharField(max_length=50, blank=True)
    cgpa = models.CharField(max_length=20, blank=True)
    focus_area = models.CharField(max_length=100, blank=True)

    email = models.EmailField()
    phone = models.CharField(max_length=20)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)

    about = models.JSONField(default=list, help_text='List of About-section paragraphs, in order.')
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class SkillCategory(models.Model):
    name = models.CharField(max_length=60)
    order = models.PositiveIntegerField(default=0)
    skills = models.JSONField(default=list, help_text='List of skill name strings, e.g. ["Python", "JavaScript"]')

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Skill categories'

    def __str__(self):
        return self.name


class Project(models.Model):
    ICON_CHOICES = [
        ('lock', 'Lock (security / auth)'),
        ('waveform', 'Waveform (audio / signal)'),
        ('leaf', 'Leaf (environment / ML)'),
    ]
    title = models.CharField(max_length=150)
    tagline = models.CharField(max_length=250)
    icon = models.CharField(max_length=20, choices=ICON_CHOICES, default='lock')
    tech_stack = models.JSONField(default=list, help_text='List of tech tag strings.')
    bullets = models.JSONField(default=list, help_text='List of description bullet strings.')
    github_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title


class Experience(models.Model):
    role = models.CharField(max_length=150)
    organization = models.CharField(max_length=150)
    date_range = models.CharField(max_length=100)
    bullets = models.JSONField(default=list)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Experience'

    def __str__(self):
        return f'{self.role} @ {self.organization}'


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    date_range = models.CharField(max_length=100)
    cgpa = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name_plural = 'Education'

    def __str__(self):
        return f'{self.degree} — {self.institution}'


class Certification(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=150)
    duration = models.CharField(max_length=50, blank=True, help_text='Optional, e.g. "19.5h"')
    certificate_url = models.URLField(blank=True, default='')
    order = models.PositiveIntegerField(default=0)
       
    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Messages submitted through the site's contact form."""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} <{self.email}> -- {self.created_at:%Y-%m-%d %H:%M}'
