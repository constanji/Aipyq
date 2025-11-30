import * as cheerio from 'cheerio';
import type { References, MediaReference } from './types';

export function processContent(
  html: string,
  markdown: string
): {
  markdown: string;
} & References {
  const linkMap = new Map<string, MediaReference>();
  const imageMap = new Map<string, MediaReference>();
  const videoMap = new Map<string, MediaReference>();
  const iframeMap = new Map<string, MediaReference>();

  const $ = cheerio.load(html, {
    xmlMode: false,
  });

  // Extract all media references
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href != null && href) {
      linkMap.set(href, {
        originalUrl: href,
        title: $(el).attr('title'),
        text: $(el).text().trim(),
      });
    }
  });

  $('img[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src != null && src) {
      imageMap.set(src, {
        originalUrl: src,
        title: $(el).attr('alt') ?? $(el).attr('title'),
      });
    }
  });

  // Handle videos (dedicated video elements and video platforms in iframes)
  $('video[src], iframe[src*="youtube"], iframe[src*="vimeo"]').each(
    (_, el) => {
      const src = $(el).attr('src');
      if (src != null && src) {
        videoMap.set(src, {
          originalUrl: src,
          title: $(el).attr('title'),
        });
      }
    }
  );

  // Handle all other generic iframes that aren't already captured as videos
  $('iframe').each((_, el) => {
    const src = $(el).attr('src');
    if (
      src != null &&
      src &&
      !src.includes('youtube') &&
      !src.includes('vimeo')
    ) {
      iframeMap.set(src, {
        originalUrl: src,
        title: $(el).attr('title'),
      });
    }
  });

  // Create lookup maps with indices
  const linkIndexMap = new Map<string, number>();
  const imageIndexMap = new Map<string, number>();
  const videoIndexMap = new Map<string, number>();
  const iframeIndexMap = new Map<string, number>();

  Array.from(linkMap.keys()).forEach((url, i) => linkIndexMap.set(url, i + 1));
  Array.from(imageMap.keys()).forEach((url, i) =>
    imageIndexMap.set(url, i + 1)
  );
  Array.from(videoMap.keys()).forEach((url, i) =>
    videoIndexMap.set(url, i + 1)
  );
  Array.from(iframeMap.keys()).forEach((url, i) =>
    iframeIndexMap.set(url, i + 1)
  );

  // Process the markdown
  let result = markdown;

  // Replace each URL one by one, starting with the longest URLs first to avoid partial matches
  const allUrls = [
    ...Array.from(imageMap.keys()).map((url) => ({
      url,
      type: 'image',
      idx: imageIndexMap.get(url),
    })),
    ...Array.from(videoMap.keys()).map((url) => ({
      url,
      type: 'video',
      idx: videoIndexMap.get(url),
    })),
    ...Array.from(iframeMap.keys()).map((url) => ({
      url,
      type: 'iframe',
      idx: iframeIndexMap.get(url),
    })),
    ...Array.from(linkMap.keys()).map((url) => ({
      url,
      type: 'link',
      idx: linkIndexMap.get(url),
    })),
  ].sort((a, b) => b.url.length - a.url.length);

  // Create a function to escape special characters in URLs for regex
  function escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Replace each URL in the markdown
  for (const { url, type, idx } of allUrls) {
    // Create a regex that captures URLs in markdown links
    const regex = new RegExp(`\\(${escapeRegex(url)}(?:\\s+"[^"]*")?\\)`, 'g');

    result = result.replace(regex, (match) => {
      // Keep any title attribute that might exist
      const titleMatch = match.match(/\s+"([^"]*)"/);
      const titlePart = titleMatch ? ` "${titleMatch[1]}"` : '';

      return `(${type}#${idx}${titlePart})`;
    });
  }

  iframeMap.clear();
  const links = Array.from(linkMap.values());
  linkMap.clear();
  const images = Array.from(imageMap.values());
  imageMap.clear();
  const videos = Array.from(videoMap.values());
  videoMap.clear();

  return {
    markdown: result,
    links,
    images,
    videos,
  };
}
