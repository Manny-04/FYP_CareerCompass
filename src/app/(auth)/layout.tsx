import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">CareerCompass</span>
        </Link>
        {children}
      </div>

      {/* Right panel — testimonial & preview */}
      <div className="hidden flex-1 flex-col items-center justify-center gap-10 bg-gradient-to-br from-green-50 via-green-100/50 to-emerald-50 px-10 lg:flex">
        {/* Testimonial */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-6 w-6 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <blockquote className="max-w-md text-xl font-semibold leading-relaxed text-gray-800">
            &quot;CareerCompass guided me to a path I never knew existed. The insights are incredible.&quot;
          </blockquote>
          <p className="mt-4 text-sm font-medium text-gray-600">Sarah Jenkins</p>
          <div className="mt-4 flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
          </div>
        </div>

        {/* Dashboard preview card */}
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                <svg className="h-4 w-4 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Welcome back</p>
                <p className="text-sm font-semibold text-gray-900">Alex Thompson</p>
              </div>
            </div>
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>

          <p className="mb-3 text-sm font-semibold text-gray-900">Your Career Roadmap</p>

          <div className="mb-3 rounded-xl border border-gray-100 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">&#127891;</span>
                <span className="text-sm font-medium text-gray-800">Skill Development</span>
              </div>
              <span className="text-sm font-bold text-green-600">75%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-3/4 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-100 p-3">
              <p className="text-xs text-gray-500">Matched Roles</p>
              <p className="text-lg font-bold text-gray-900">12</p>
              <p className="text-xs text-green-600">+3 this week</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-3">
              <p className="text-xs text-gray-500">Profile Strength</p>
              <p className="text-lg font-bold text-gray-900">Advanced</p>
              <p className="text-xs text-gray-500">Complete 2 more steps</p>
            </div>
          </div>

          <div className="rounded-xl bg-green-50 p-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-100">
                <svg className="h-3.5 w-3.5 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Analyze Market Trends</p>
                <p className="text-xs text-gray-500">Discover emerging skills in your target industry based on recent data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
