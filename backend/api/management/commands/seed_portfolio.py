from django.core.management.base import BaseCommand
from django.conf import settings
import os

from api.models import (
    Profile, SkillCategory, Project, Experience,
    Education, Certification,
)


class Command(BaseCommand):
    help = 'Seeds the database with Vignesh Soma\'s portfolio content. Safe to re-run.'

    def handle(self, *args, **options):
        self.seed_profile()
        self.seed_skills()
        self.seed_projects()
        self.seed_experience()
        self.seed_education()
        self.seed_certifications()
        self.stdout.write(self.style.SUCCESS('Portfolio content seeded successfully.'))

    def seed_profile(self):
        profile, _ = Profile.objects.update_or_create(
            id=1,
            defaults=dict(
                name='Vignesh Soma',
                role='Full Stack Web Developer',
                eyebrow='// full-stack developer',
                pitch=(
                    'I build secure, full-stack web applications — and occasionally '
                    'teach machines to catch a fake voice.'
                ),
                status='open_to_work',
                location='Hyderabad, India',
                graduating='April 2026',
                cgpa='7.88 / 10.0',
                focus_area='Full Stack Development',
                email='vigneshs1976@gmail.com',
                phone='+91-7981735076',
                linkedin_url='https://linkedin.com/in/vignesh-soma-75b3a8298',
                github_url='https://github.com/vigneshs1976-maker',
                about=[
                    "I'm a final-year B.Tech student in Artificial Intelligence and Data "
                    "Science at Vignan Institute of Technology and Science, Hyderabad, "
                    "graduating in April 2026. Alongside my degree, I completed structured "
                    "full-stack training at Teks Academy, where I built production-style web "
                    "applications using Python, Django, React.js, and MySQL.",

                    "I care about clean, secure code — REST APIs with proper authentication, "
                    "databases that scale, and interfaces that feel effortless to use. When a "
                    "problem calls for it, I bring in machine learning too, like the real-time "
                    "deepfake audio detector I built using MFCC features and an LSTM network.",

                    "Right now, I'm looking for a Full Stack Web Developer role at a product "
                    "or service-based company where I can keep building and keep learning.",
                ],
            )
        )

        # Point resume_file at the PDF that already ships in media/resumes/.
        # We set .name directly rather than calling .save() -- the file is
        # already sitting at its final destination, so asking Django's
        # storage to "save" it there again would just trigger its
        # collision-avoidance renaming and create a new duplicate copy
        # every time this command is re-run.
        resume_relative_path = 'resumes/Vignesh_Soma_Resume.pdf'
        resume_path = os.path.join(settings.MEDIA_ROOT, resume_relative_path)
        if os.path.exists(resume_path) and profile.resume_file.name != resume_relative_path:
            profile.resume_file.name = resume_relative_path
            profile.save(update_fields=['resume_file'])

    def seed_skills(self):
        categories = [
            ('Languages', ['Python', 'JavaScript'], 1),
            ('Frontend', ['React.js', 'HTML5', 'CSS3', 'Responsive Design'], 2),
            ('Backend', ['Django', 'REST APIs', 'JWT Authentication', 'MVC Architecture'], 3),
            ('Databases', ['SQL', 'MySQL'], 4),
            ('AI / ML', ['MFCC Feature Extraction', 'LSTM', 'Streamlit', 'Speaker Verification'], 5),
            ('Tools & VCS', ['Git', 'GitHub', 'VS Code'], 6),
            ('Core Concepts', ['CRUD Operations', 'Data Privacy', 'Real-Time Systems'], 7),
        ]
        for name, skills, order in categories:
            SkillCategory.objects.update_or_create(
                name=name, defaults=dict(skills=skills, order=order)
            )

    def seed_projects(self):
        projects = [
            dict(
                title='Diary Web Application',
                tagline='A private, full-stack journal with secure auth and real-time saves.',
                icon='lock',
                tech_stack=['Django', 'React.js', 'MySQL', 'JWT', 'REST API'],
                bullets=[
                    'Designed and developed a full-stack diary web application with secure '
                    'user authentication using JWT and protected REST API endpoints.',
                    'Implemented full CRUD operations with real-time updates, auto-save, and '
                    'search functionality backed by a MySQL relational database.',
                    'Built a responsive, mobile-first UI in React.js for a smooth experience '
                    'across devices, enforcing data privacy at both the API and database layers.',
                ],
                github_url='https://github.com/vigneshs1976-maker',
                order=1,
            ),
            dict(
                title='AI-Powered Real-Time Deepfake Audio Detection',
                tagline='Catching AI-generated voices with MFCC features and an LSTM classifier.',
                icon='waveform',
                tech_stack=['Python', 'LSTM', 'MFCC', 'Streamlit'],
                bullets=[
                    'Engineered a deepfake audio detection pipeline using MFCC feature '
                    'extraction fed into an LSTM-based neural network for speaker '
                    'verification and AI-generated voice classification.',
                    'Deployed an interactive Streamlit interface supporting live voice '
                    'recording, waveform similarity comparison, and instant detection feedback.',
                    'Enabled robust speaker verification by comparing voice embeddings against '
                    'stored profiles, reducing false-acceptance rates for AI-synthesized audio.',
                ],
                github_url='https://github.com/vigneshs1976-maker',
                order=2,
            ),
        ]
        for p in projects:
            Project.objects.update_or_create(title=p['title'], defaults=p)

    def seed_experience(self):
        Experience.objects.update_or_create(
            role='Full Stack Web Development Trainee',
            organization='Teks Academy',
            defaults=dict(
                date_range='2025 — 2026 · Course-Based Industry Training',
                bullets=[
                    'Developed responsive front-end web pages using HTML, CSS, JavaScript, '
                    'and React.js, applying component-based architecture and state '
                    'management best practices.',
                    'Built RESTful APIs with Django and integrated them with MySQL for '
                    'efficient backend data handling, storage, and retrieval.',
                    'Gained hands-on exposure to the full software development lifecycle — '
                    'from UI design through API development to database optimization.',
                ],
                order=1,
            )
        )

    def seed_education(self):
        education = [
            dict(
                degree='B.Tech, Artificial Intelligence and Data Science',
                institution='Vignan Institute of Technology and Science, Hyderabad',
                date_range='Nov 2023 — Apr 2026',
                cgpa='CGPA: 7.8 / 10.0',
                order=1,
            ),
            dict(
                degree='Diploma, Electrical & Electronics Engineering',
                institution='TKR College of Engineering and Technology, Hyderabad',
                date_range='Jun 2020 — May 2023',
                cgpa='CGPA: 7.0 / 10.0',
                order=2,
            ),
            dict(
                degree='Secondary School Certificate (SSC)',
                institution='Brilliant Grammar High School',
                date_range='May 2020',
                cgpa='CGPA: 10.0 / 10.0',
                order=3,
            ),
        ]
        for e in education:
            Education.objects.update_or_create(degree=e['degree'], defaults=e)

    def seed_certifications(self):
        certs = [
            dict(title='Full Stack Web Development Using Python', issuer='Teks Academy', duration='', order=1),
            dict(title='Python Essentials with Django', issuer='TASK — Telangana Academy for Skill & Knowledge', duration='', order=2),
            dict(title='Frontend Development with HTML5 & CSS3', issuer='TASK — Telangana Academy for Skill & Knowledge', duration='', order=3),
            dict(title='Become a Full Stack Web Developer: Beginner to Advanced', issuer='Udemy', duration='19.5h', order=4),
            dict(title='Complete Web Developer Bootcamp: Beginner to Advanced', issuer='Udemy', duration='41h', order=5),
            dict(title='Intro to Django for Web Development: A Crash Course', issuer='Udemy', duration='', order=6),
        ]
        for c in certs:
            Certification.objects.update_or_create(title=c['title'], defaults=c)
