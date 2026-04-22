import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center">
      <div>
        <p className="text-6xl font-black text-gray-200">404</p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-gray-600">The page you are looking for does not exist or has been moved.</p>
      </div>
      <Link
        href="/dashboard"
        className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
      >
        Back to dashboard
      </Link>
    </div>
  )
}
