export default async function handler(req, res) {
  const key1 = process.env.ANTHROPIC_API_KEY
  const key2 = process.env.VITE_ANTHROPIC_API_KEY
  
  return res.status(200).json({
    ANTHROPIC_API_KEY: key1 ? `${key1.substring(0,20)}... (len:${key1.length})` : 'MISSING',
    VITE_ANTHROPIC_API_KEY: key2 ? `${key2.substring(0,20)}... (len:${key2.length})` : 'MISSING',
  })
}
