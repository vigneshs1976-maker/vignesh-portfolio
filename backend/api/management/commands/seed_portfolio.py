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
                    'I build secure, full-stack web applications with Django, React.js, and MySQL,'
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
                    "I'm Vignesh Soma, a B.Tech graduate in Artificial Intelligence and Data Science (April 2026),"
" now starting my career as a Full Stack Web Developer. I'm early in my professional journey — but I've spent the last year building a solid,"
 "practical foundation through structured training,"
" hands-on projects, and a habit of learning by doing rather than just studying theory.",

"Alongside my degree, I completed dedicated full-stack training in Python, Django, React.js,"
 "and MySQL, and added several self-driven certifications to round out what my coursework didn't cover."
 "I've put that learning into real, working projects — a diary application with secure JWT-based authentication"
 "and real-time saving, and a deforestation-detection system that uses computer vision to flag environmental changes from satellite imagery —"
 "because I wanted proof, for myself and for anyone reviewing my work, that I can carry an idea through to finished software.",

"I'm now looking for a fresher or entry-level opportunity where I can keep learning from experienced developers while contributing real value from day one."
 "I pick things up quickly, I ask questions when I don't know something,"
 "and I'd rather build something imperfect and improve it than wait until I feel completely ready.",
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
            ('Tools & VCS', ['Git', 'GitHub', 'VS Code'], 5),
            ('Core Concepts', ['CRUD Operations', 'Data Privacy', 'Real-Time Systems'], 6),
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
                github_url='',
                order=1,
            ),
            
            dict(
                title='Leveraging Machine learning to combat deforestation and preserve biodiversity',
                tagline='AI-Powered Satellite Intelligence for Deforestation Detection.',
                icon='leaf',
                tech_stack=['Python', 'Django', 'TensorFlow', 'vision transformer', 'OpenCV', 'MySQL'],
                 bullets=[
                    "Designed and developed a scalable deforestation detection system using Python, Django, TensorFlow/Keras,"
                     "and Vision Transformer (ViT) to identify deforestation patterns from satellite imagery.",
                    "Integrated MySQL for user management and prediction history while implementing secure authentication," 
                    "image upload, and real-time inference through a responsive Django web interface.",
                    "Built an automated preprocessing and prediction pipeline using OpenCV,"
                    "achieving reliable multi-label classification of satellite images and providing actionable insights through visualization dashboards.",
                            ],
                            github_url='',
                            order=2,
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
                github_url='',
                order=3,
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
                date_range='Sept 2023 — Apr 2026',
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
                date_range='March 2020',
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
