/* eslint-disable no-console */
// processWikipedia.ts
import * as fs from 'fs';
import * as path from 'path';
import { processContent } from './content';

/**
 * Process a Wikipedia article (HTML and Markdown) and create a referenced version
 */
async function processWikipediaArticle(): Promise<void> {
  try {
    console.log('Starting Wikipedia article processing...');

    // Define file paths - adapt these to your specific file locations
    const htmlPath = path.resolve('./test.html');
    const markdownPath = path.resolve('./test.md');
    const outputPath = path.resolve('./output.md');

    // Check if input files exist
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`Wikipedia HTML file not found at ${htmlPath}`);
    }

    if (!fs.existsSync(markdownPath)) {
      throw new Error(`Wikipedia Markdown file not found at ${markdownPath}`);
    }

    console.log('Reading Wikipedia article files...');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const markdown = fs.readFileSync(markdownPath, 'utf-8');

    // Extract article title for logging
    const titleMatch = /<h1[^>]*>([^<]+)<\/h1>/i.exec(html);
    const articleTitle = titleMatch
      ? titleMatch[1].trim()
      : 'Wikipedia article';

    console.log(`Processing "${articleTitle}"...`);

    // Measure processing time
    const startTime = process.hrtime();

    // Process content
    const result = processContent(html, markdown);

    // Calculate processing time
    const elapsed = process.hrtime(startTime);
    const timeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;

    // Generate reference appendix
    const appendix = generateReferenceAppendix(result);

    // Create complete output with the processed content and appendix
    const completeOutput = result.markdown + appendix;

    // Write to output file
    fs.writeFileSync(outputPath, completeOutput);

    // Print processing statistics
    console.log('\nWikipedia article processing complete! ✓');
    console.log('-'.repeat(60));
    console.log(`Article: ${articleTitle}`);
    console.log(`Processing time: ${timeInMs.toFixed(2)}ms`);
    console.log('Media references replaced:');
    console.log(`  - Links: ${result.links.length}`);
    console.log(`  - Images: ${result.images.length}`);
    console.log(`  - Videos: ${result.videos.length}`);
    console.log(
      `  - Total: ${result.links.length + result.images.length + result.videos.length}`
    );
    console.log(`Output saved to: ${outputPath}`);
    console.log('-'.repeat(60));

    // Print sample of the transformation
    const sampleLines = result.markdown.split('\n').slice(0, 10).join('\n');
    console.log('\nSample of transformed content:');
    console.log('-'.repeat(30));
    console.log(sampleLines);
    console.log('-'.repeat(30));
    console.log('... (continued in output file)');
  } catch (error) {
    console.error('Error processing Wikipedia article:', error);
    process.exit(1);
  }
}

/**
 * Generate a comprehensive reference appendix with all media links
 */
function generateReferenceAppendix(result: {
  links: Array<{ originalUrl: string; title?: string; text?: string }>;
  images: Array<{ originalUrl: string; title?: string }>;
  videos: Array<{ originalUrl: string; title?: string }>;
}): string {
  let appendix = '\n\n' + '---'.repeat(10) + '\n\n';
  appendix += '# References\n\n';

  if (result.links.length > 0) {
    appendix += '## Links\n\n';
    result.links.forEach((link, index) => {
      // Clean and format text for display
      let displayText = '';
      if (link.text != null && link.text.trim()) {
        // Limit length for very long link text
        let cleanText = link.text.trim();
        if (cleanText.length > 50) {
          cleanText = cleanText.substring(0, 47) + '...';
        }
        displayText = ` - "${cleanText}"`;
      }

      appendix += `**link#${index + 1}**: ${link.originalUrl}${displayText}\n\n`;
    });
  }

  if (result.images.length > 0) {
    appendix += '## Images\n\n';
    result.images.forEach((image, index) => {
      const displayTitle =
        image.title != null && image.title.trim()
          ? ` - ${image.title.trim()}`
          : '';
      appendix += `**image#${index + 1}**: ${image.originalUrl}${displayTitle}\n\n`;
    });
  }

  if (result.videos.length > 0) {
    appendix += '## Videos\n\n';
    result.videos.forEach((video, index) => {
      const displayTitle =
        video.title != null && video.title.trim()
          ? ` - ${video.title.trim()}`
          : '';
      appendix += `**video#${index + 1}**: ${video.originalUrl}${displayTitle}\n\n`;
    });
  }

  // Add a category breakdown to show what types of links were found
  const totalRefs =
    result.links.length + result.images.length + result.videos.length;

  appendix += '## Summary\n\n';
  appendix += `Total references: **${totalRefs}**\n\n`;
  appendix += `- Links: ${result.links.length}\n`;
  appendix += `- Images: ${result.images.length}\n`;
  appendix += `- Videos: ${result.videos.length}\n`;

  return appendix;
}

// Using async IIFE to allow for better error handling
(async (): Promise<void> => {
  try {
    await processWikipediaArticle();
  } catch (error) {
    console.error('Unhandled error:', error);
    process.exit(1);
  }
})();
