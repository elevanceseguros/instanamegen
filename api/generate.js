export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' })
    }

    const text = data.content?.[0]?.text || ''
    const names = text.split('\n').filter(line => line.trim().length > 0)

    return res.status(200).json({ names })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
