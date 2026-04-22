export function Footer() {
  return (
    <footer className="bg-[#1B4332]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
              <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </div>
            <span className="text-sm font-bold text-white">CareerCompass</span>
          </div>
          <p className="text-xs text-green-300/70">Guiding university students towards their ideal professional future.</p>
        </div>

<p className="text-xs text-green-300/60">&copy; {new Date().getFullYear()} CareerCompass. All rights reserved.</p>
      </div>
    </footer>
  )
}
