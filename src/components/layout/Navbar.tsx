import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">CareerCompass</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900">How It Works</Link>
          <Link href="/#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">Career Explorer</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900">Login</Link>
          <Link href="/signup" className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 transition-colors">
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}
