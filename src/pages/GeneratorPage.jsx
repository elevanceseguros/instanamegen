import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXX'

function AdBanner({ slot, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    try {
      if (window.adsbygoogle && ref.current) {
        window.adsbygoogle.push({})
      }
    } catch (e) {}
  }, [])
  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

function InterstitialAd({ onClose }) {
  const [countdown, setCountdown] = useState(5)
  useEffect(() => {
    if (countdown === 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-brand-card border border-white/20 rounded-2xl p-6 max-w-md w-full text-center">
        <p className="text-white/40 text-xs mb-2 uppercase tracking-wider">Advertisement</p>
        <div className="bg-brand-dark rounded-xl h-48 flex items-center justify-center mb-4 border border-white/10">
          <AdBanner slot={import.meta.env.VITE_ADSENSE_INTERSTITIAL_SLOT || '1234567890'} />
        </div>
        <button
          onClick={countdown === 0 ? onClose : undefined}
          disabled={countdown > 0}
          className={`btn-primary w-full ${countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {countdown > 0 ? `Wait ${countdown}s...` : '✓ See Your Names'}
        </button>
      </div>
    </div>
  )
}

export default function GeneratorPage({ category, allCategories }) {
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAd, setShowAd] = useState(false)
  const [pendingNames, setPendingNames] = useState([])
  const [generationCount, setGenerationCount] = useState(0)
  const [copied, setCopied] = useState(null)
  const [keyword, setKeyword] = useState('')

  const generateNames = async (skipAd = false) => {
    if (loading) return

    // Show interstitial ad every 2 generations
    if (!skipAd && generationCount > 0 && generationCount % 2 === 0) {
      setLoading(true)
      const result = await fetchNames()
      setPendingNames(result)
      setLoading(false)
      setShowAd(true)
      return
    }

    setLoading(true)
    const result = await fetchNames()
    setNames(result)
    setGenerationCount(c => c + 1)
    setLoading(false)
  }

  const fetchNames = async () => {
    try {
      const keywordNote = keyword ? ` The user wants names related to or inspired by: "${keyword}".` : ''
      const prompt = `${category.prompt}${keywordNote} Return ONLY the names and notes, no intro text, no numbering, no extra explanation.`

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'API error')

      return data.names || []
    } catch (e) {
      return [`Error: ${e.message}. Please try again.`]
    }
  }

  const handleAdClose = () => {
    setShowAd(false)
    setNames(pendingNames)
    setPendingNames([])
    setGenerationCount(c => c + 1)
  }

  const copyName = (name) => {
    const cleanName = name.split('(')[0].trim()
    navigator.clipboard.writeText(cleanName)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  const otherCategories = allCategories.filter(c => c.slug !== category.slug).slice(0, 4)

  return (
    <>
      <Helmet>
        <title>{category.metaTitle}</title>
        <meta name="description" content={category.metaDesc} />
        <meta property="og:title" content={category.metaTitle} />
        <meta property="og:description" content={category.metaDesc} />
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous"></script>
      </Helmet>

      {showAd && <InterstitialAd onClose={handleAdClose} />}

      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16">
        {/* Top Ad Banner */}
        <AdBanner slot={import.meta.env.VITE_ADSENSE_TOP_SLOT || '0987654321'} className="mb-8 rounded-xl" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{category.emoji}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{category.title}</h1>
          <p className="text-white/60">{category.description}</p>
        </div>

        {/* Input + Button */}
        <div className="bg-brand-card border border-white/10 rounded-2xl p-6 mb-6">
          <label className="block text-sm text-white/60 mb-2">
            Optional: add a keyword or theme to personalize your results
          </label>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generateNames()}
              placeholder={`e.g. "nature", "strong", "funny"...`}
              className="w-full bg-brand-dark border border-white/20 rounded-xl px-4 py-3 
                         text-white placeholder-white/30 focus:outline-none focus:border-brand-primary/60
                         transition-colors"
            />
            <button
              onClick={() => generateNames()}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Generating...
                </span>
              ) : names.length > 0 ? '🔄 Generate More' : '⚡ Generate Names'}
            </button>
          </div>
        </div>

        {/* Results */}
        {names.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-white/80">
                {names.length} names generated
              </h2>
              <span className="text-white/40 text-sm">Click a name to copy</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {names.map((name, i) => (
                <button
                  key={i}
                  onClick={() => copyName(name)}
                  className="name-card text-left"
                >
                  {copied === name ? (
                    <span className="text-green-400 font-medium">✓ Copied!</span>
                  ) : (
                    <span>{name}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {names.length === 0 && !loading && (
          <div className="text-center py-16 text-white/30">
            <div className="text-6xl mb-4">{category.emoji}</div>
            <p className="text-lg">Hit the button above to generate your names!</p>
          </div>
        )}

        {/* Middle Ad Banner */}
        {names.length > 0 && (
          <AdBanner slot={import.meta.env.VITE_ADSENSE_MIDDLE_SLOT || '1122334455'} className="mb-8 rounded-xl" />
        )}

        {/* Other categories */}
        <div className="mt-10">
          <h3 className="font-bold text-lg mb-4 text-white/80">Try Other Generators</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherCategories.map(cat => (
              <Link
                key={cat.slug}
                to={`/${cat.slug}`}
                className="bg-brand-card border border-white/10 rounded-xl p-3 text-center
                           hover:border-brand-primary/40 transition-all"
              >
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <div className="text-xs text-white/60">{cat.title.replace(' Generator', '').replace(' Names', '')}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Ad Banner */}
        <AdBanner slot={import.meta.env.VITE_ADSENSE_BOTTOM_SLOT || '5544332211'} className="mt-8 rounded-xl" />
      </div>
    </>
  )
}
