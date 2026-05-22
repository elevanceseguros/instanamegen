import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GeneratorPage from './pages/GeneratorPage'

const CATEGORIES = [
  {
    slug: 'baby-names',
    title: 'Baby Name Generator',
    emoji: '👶',
    description: 'Find the perfect name for your baby. Browse thousands of unique, beautiful names for boys and girls.',
    prompt: 'Generate 20 unique and beautiful baby names. Mix classic and modern names. Include a short meaning or origin note for each name. Format: just the names, one per line, with a brief note in parentheses.',
    metaTitle: 'Baby Name Generator – 1000s of Unique Baby Names | InstaNameGen',
    metaDesc: 'Generate beautiful baby names instantly with AI. Boys, girls, and unique gender-neutral names with meanings. Free baby name generator.',
  },
  {
    slug: 'business-names',
    title: 'Business Name Generator',
    emoji: '💼',
    description: 'Generate creative, memorable business names for your startup or company in seconds.',
    prompt: 'Generate 20 creative and memorable business names. Make them brandable, unique, and professional. Mix different styles: some catchy, some professional, some creative. Format: just the names, one per line, with a brief description in parentheses of what kind of business it could suit.',
    metaTitle: 'Business Name Generator – Creative Company Names | InstaNameGen',
    metaDesc: 'Generate catchy, unique business names instantly with AI. Perfect for startups, small businesses, and entrepreneurs. Free business name generator.',
  },
  {
    slug: 'pet-names',
    title: 'Pet Name Generator',
    emoji: '🐾',
    description: 'Find the cutest and most unique names for your dog, cat, or any pet.',
    prompt: 'Generate 20 cute, fun and creative pet names. Include names suitable for dogs, cats, and other animals. Mix playful, funny, and adorable names. Format: just the names, one per line, with a brief note in parentheses about which type of pet it suits best.',
    metaTitle: 'Pet Name Generator – Cute Names for Dogs & Cats | InstaNameGen',
    metaDesc: 'Find the perfect name for your pet with our AI generator. Cute, funny, and unique names for dogs, cats, and more. Free pet name generator.',
  },
  {
    slug: 'fantasy-names',
    title: 'Fantasy Name Generator',
    emoji: '⚔️',
    description: 'Generate epic fantasy character names for games, stories, and RPGs.',
    prompt: 'Generate 20 epic fantasy character names suitable for RPGs, video games, and fantasy stories. Include a mix of elves, dwarves, humans, wizards and warriors. Make them sound mystical and memorable. Format: just the names, one per line, with a brief description in parentheses (race/class suggestion).',
    metaTitle: 'Fantasy Name Generator – RPG & Game Character Names | InstaNameGen',
    metaDesc: 'Generate epic fantasy character names for RPGs, DnD, video games, and stories. Elves, dwarves, wizards and more. Free fantasy name generator.',
  },
  {
    slug: 'username-generator',
    title: 'Username Generator',
    emoji: '🎮',
    description: 'Create cool, unique usernames for gaming, social media, and online platforms.',
    prompt: 'Generate 20 cool, unique usernames for gaming and social media. Mix different styles: some edgy, some funny, some professional. Make them memorable and easy to type. Avoid spaces and special characters. Format: just the usernames, one per line, with a brief vibe description in parentheses.',
    metaTitle: 'Username Generator – Cool Unique Usernames | InstaNameGen',
    metaDesc: 'Generate cool, unique usernames for gaming, Instagram, TikTok and more. AI-powered username ideas that are catchy and available-ready. Free username generator.',
  },
  {
    slug: 'band-names',
    title: 'Band Name Generator',
    emoji: '🎸',
    description: 'Discover unique band names for your music project or creative group.',
    prompt: 'Generate 20 unique and creative band names. Include a variety of styles: rock, indie, electronic, pop, metal, jazz. Make them memorable and evocative. Format: just the names, one per line, with a brief note in parentheses about what music genre it fits best.',
    metaTitle: 'Band Name Generator – Unique Music Group Names | InstaNameGen',
    metaDesc: 'Generate creative band names for rock, indie, pop, metal and more. AI-powered band name ideas for musicians and artists. Free band name generator.',
  },
]

export { CATEGORIES }

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home categories={CATEGORIES} />} />
        {CATEGORIES.map(cat => (
          <Route
            key={cat.slug}
            path={`/${cat.slug}`}
            element={<GeneratorPage category={cat} allCategories={CATEGORIES} />}
          />
        ))}
      </Routes>
    </Layout>
  )
}
