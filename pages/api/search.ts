import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error?: string;
  [key: string]: any; 
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { q, count, offset } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Query is required' });
  }
  
  try {
    const apiKey = process.env.BING_API_KEY;
    if (typeof apiKey !== 'string') {
      throw new Error('BING_API_KEY is not properly configured');
    }
    
    let queryParams = `q=${encodeURIComponent(q)}`;
    const responseFilter = 'webpages,images,videos,RelatedSearches';
    queryParams += `&responseFilter=${responseFilter}`;
    
    queryParams += `&SafeSearch=Strict`;

    if (typeof count === 'string') queryParams += `&count=${count}`;
    if (typeof offset === 'string') queryParams += `&offset=${offset}`;
    
    const url = `https://api.bing.microsoft.com/v7.0/search?${queryParams}`;
    const response = await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
