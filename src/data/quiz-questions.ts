import { QuizQuestion } from '@/types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    index: 0,
    text: 'When faced with a complex problem, what approach do you naturally gravitate toward?',
    options: [
      { label: 'A', text: 'Analyze data and run experiments to find a solution', category: 'STEM' },
      { label: 'B', text: 'Brainstorm creative ideas and think outside the box', category: 'Creative' },
      { label: 'C', text: 'Organize resources and build a strategic plan', category: 'Business' },
      { label: 'D', text: 'Consult with people and seek collaborative solutions', category: 'Healthcare' },
    ],
  },
  {
    index: 1,
    text: 'Which type of work environment energizes you the most?',
    options: [
      { label: 'A', text: 'A lab or technical workspace with tools and equipment', category: 'STEM' },
      { label: 'B', text: 'A studio or open space where creativity flows freely', category: 'Creative' },
      { label: 'C', text: 'A fast-paced office where deals and decisions happen', category: 'Business' },
      { label: 'D', text: 'A classroom or training center where learning happens', category: 'Education' },
    ],
  },
  {
    index: 2,
    text: 'What motivates you most in your career aspirations?',
    options: [
      { label: 'A', text: 'Making scientific or technological breakthroughs', category: 'STEM' },
      { label: 'B', text: 'Creating work that moves or inspires people', category: 'Creative' },
      { label: 'C', text: 'Building something and achieving financial success', category: 'Business' },
      { label: 'D', text: 'Directly improving people\'s health and wellbeing', category: 'Healthcare' },
    ],
  },
  {
    index: 3,
    text: 'How do you prefer to spend your free time?',
    options: [
      { label: 'A', text: 'Building gadgets, coding projects, or solving puzzles', category: 'STEM' },
      { label: 'B', text: 'Drawing, writing, making music, or crafting', category: 'Creative' },
      { label: 'C', text: 'Networking, mentoring others, or starting side projects', category: 'Business' },
      { label: 'D', text: 'Volunteering in your community or helping those in need', category: 'PublicService' },
    ],
  },
  {
    index: 4,
    text: 'When working on a team, which role do you naturally fall into?',
    options: [
      { label: 'A', text: 'The technical expert who solves the hard problems', category: 'STEM' },
      { label: 'B', text: 'The creative visionary who generates fresh ideas', category: 'Creative' },
      { label: 'C', text: 'The organizer who keeps everything on track', category: 'Business' },
      { label: 'D', text: 'The builder or craftsperson who makes things work', category: 'SkilledTrades' },
    ],
  },
  {
    index: 5,
    text: 'Which subject area did you enjoy most in school?',
    options: [
      { label: 'A', text: 'Mathematics, Physics, Chemistry, or Computer Science', category: 'STEM' },
      { label: 'B', text: 'Art, Music, Literature, or Drama', category: 'Creative' },
      { label: 'C', text: 'Economics, Business Studies, or Accounting', category: 'Business' },
      { label: 'D', text: 'Biology, Health Sciences, or Psychology', category: 'Healthcare' },
    ],
  },
  {
    index: 6,
    text: 'What kind of impact do you most want your work to have?',
    options: [
      { label: 'A', text: 'Advance human knowledge and drive innovation', category: 'STEM' },
      { label: 'B', text: 'Shape culture and leave an artistic legacy', category: 'Creative' },
      { label: 'C', text: 'Create jobs and contribute to economic growth', category: 'Business' },
      { label: 'D', text: 'Educate the next generation and inspire lifelong learning', category: 'Education' },
    ],
  },
  {
    index: 7,
    text: 'Which statement best describes your ideal day at work?',
    options: [
      { label: 'A', text: 'Diagnosing problems and finding precise technical solutions', category: 'STEM' },
      { label: 'B', text: 'Bringing a creative vision to life from concept to completion', category: 'Creative' },
      { label: 'C', text: 'Managing projects and working with hands-on skilled work', category: 'SkilledTrades' },
      { label: 'D', text: 'Advocating for policy changes or serving the public interest', category: 'PublicService' },
    ],
  },
  {
    index: 8,
    text: 'How do you feel about working with data and numbers?',
    options: [
      { label: 'A', text: 'I love it — data tells compelling stories', category: 'STEM' },
      { label: 'B', text: 'I prefer qualitative insights over raw numbers', category: 'Creative' },
      { label: 'C', text: 'Numbers are key tools for business decisions', category: 'Business' },
      { label: 'D', text: 'I use them when needed but prefer human interactions', category: 'Healthcare' },
    ],
  },
  {
    index: 9,
    text: 'Which career path sounds most exciting to you?',
    options: [
      { label: 'A', text: 'AI researcher, civil engineer, or biomedical scientist', category: 'STEM' },
      { label: 'B', text: 'Graphic designer, filmmaker, or game developer', category: 'Creative' },
      { label: 'C', text: 'Entrepreneur, marketing director, or financial analyst', category: 'Business' },
      { label: 'D', text: 'Electrician, plumber, or industrial technician', category: 'SkilledTrades' },
    ],
  },
]
