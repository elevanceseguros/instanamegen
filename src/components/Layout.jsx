import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🚀</span>
            <span className="font-extrabold text-xl tracking-tight">
              Insta<span className="text-brand-primary">Name</span>Gen
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <Link to="/baby-names" className="hover:text-white transition-colors">Baby Names</Link>
            <Link to="/business-names" className="hover:text-white transition-colors">Business</Link>
            <Link to="/pet-names" className="hover:text-white transition-colors">Pet Names</Link>
            <Link to="/fantasy-names" className="hover:text-white transition-colors">Fantasy</Link>
            <Link to="/username-generator" className="hover:text-white transition-colors">Username</Link>
            <Link to="/band-names" className="hover:text-white transition-colors">Band Names</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-white/10 py-8 px-6 mt-16">
        <div className="max-w-5xl mx-auto text-center text-white/40 text-sm">
          <p className="mb-3">
            <span className="font-semibold text-white/60">InstaNameGen</span> — AI-powered name generator for every need
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/baby-names" className="hover:text-white/70 transition-colors">Baby Names</Link>
            <Link to="/business-names" className="hover:text-white/70 transition-colors">Business Names</Link>
            <Link to="/pet-names" className="hover:text-white/70 transition-colors">Pet Names</Link>
            <Link to="/fantasy-names" className="hover:text-white/70 transition-colors">Fantasy Names</Link>
            <Link to="/username-generator" className="hover:text-white/70 transition-colors">Username Generator</Link>
            <Link to="/band-names" className="hover:text-white/70 transition-colors">Band Names</Link>
          </div>
          <p className="mt-4">© {new Date().getFullYear()} InstaNameGen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
