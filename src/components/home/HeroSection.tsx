import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-700 px-8 py-16 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Discover the Right Career Path for You
            </h1>
            <p className="mt-5 text-base leading-relaxed text-green-100">
              Take our intelligent assessment to receive personalized career recommendations and a structured roadmap based on your unique personality.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-800 shadow-sm hover:bg-gray-50 transition-colors">
                Start Assessment
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="/#features" className="inline-flex items-center rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white hover:border-white/70 transition-colors">
                Explore Paths
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/20 bg-green-600 sm:h-80 sm:w-80">
              <Image
                src="/student.png"
                alt="Student"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                <svg className="h-4 w-4 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Career Match</p>
                <p className="text-xs font-bold text-gray-900">98% Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
