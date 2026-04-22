import Link from 'next/link'

const steps = [
  { number: 1, title: 'Create your profile', description: 'Sign up and enter your academic background and basic details.', active: false },
  { number: 2, title: 'Take the career quiz', description: 'Complete our comprehensive personality and skills assessment.', active: true },
  { number: 3, title: 'Receive recommendations', description: 'Get your personalized career matches and actionable pathway plan.', active: false },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="mt-3 text-gray-500">Your journey to a fulfilling career starts here. Just three simple steps.</p>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-6 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gray-200 sm:block" />

          <div className="grid gap-10 sm:grid-cols-3">
            {steps.map(step => (
              <div key={step.number} className="relative flex flex-col items-center">
                <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                  step.active
                    ? 'bg-green-700 text-white'
                    : 'border-2 border-gray-300 bg-white text-gray-500'
                }`}>
                  {step.number}
                </div>
                <h3 className="mt-5 text-base font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Link href="/signup" className="mt-12 inline-flex rounded-full bg-green-700 px-8 py-3 text-sm font-semibold text-white hover:bg-green-800 transition-colors">
          Get Started Now
        </Link>
      </div>
    </section>
  )
}
