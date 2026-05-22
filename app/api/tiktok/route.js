// app/api/tiktok/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing TikTok video URL' }, { status: 400 });
  }

  try {
    // Fetch the oEmbed data from TikTok
    const oEmbedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await fetch(oEmbedUrl, {
      next: { revalidate: 86400 } // Cache results for 24 hours to stay lightning fast
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from TikTok');
    }

    const data = await response.json();

    // Return just the essential thumbnail metadata
    return NextResponse.json({
      thumbnail_url: data.thumbnail_url,
      title: data.title,
      author_name: data.author_name
    });
  } catch (error) {
    console.error('TikTok oEmbed error:', error);
    return NextResponse.json({ error: 'Failed to process video metadata' }, { status: 500 });
  }
}