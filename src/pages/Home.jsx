import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function Home({ categories }) {
  return (
    <>
      <Helmet>
        <title>InstaNameGen – Free AI Name Generator for Baby, Business, Pets & More</title>
        <meta name="description" content="Generate perfect names instantly with AI. Baby names, business names, pet names, fantasy character names, usernames and band names. Free, fast and creative." />
        <meta property="og:title" content="InstaNameGen – Free AI Name Generator" />
        <meta property="og:description" content="Generate perfect names instantly with AI. Baby names, business names, pet names, fantasy names and more." />
      </Helmet>

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-primary/20 border border-brand-primary/30 rounded-full px-4 py-1.5 text-sm text-brand-primary font-medium mb-6">
          ⚡ AI-Powered — Results in seconds
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Generate Perfect Names<br />
          <span className="text-brand-primary">Instantly with AI</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Baby names, business names, pet names, fantasy characters, usernames and band names. 
          Pick a category and get 20 unique names in seconds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/${cat.slug}`}
              className="bg-brand-card border border-white/10 rounded-2xl p-6 text-left 
                         hover:border-brand-primary/50 hover:bg-brand-primary/5 
                         transition-all duration-200 group"
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <h2 className="font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors">
                {cat.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">{cat.description}</p>
              <div className="mt-4 text-brand-primary text-sm font-medium flex items-center gap-1">
                Generate names <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: '🚀', title: 'Instant Results', desc: 'Get 20 unique names in under 3 seconds' },
            { icon: '🤖', title: 'AI-Powered', desc: 'Advanced AI trained on millions of names' },
            { icon: '🔄', title: 'Unlimited Generations', desc: 'Not happy? Generate again, for free' },
          ].map(f => (
            <div key={f.title} className="bg-brand-card border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-1">{f.title}</h3>
              <p className="text-white/50 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
