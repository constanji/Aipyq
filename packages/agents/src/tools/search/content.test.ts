/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// content.test.ts
import * as fs from 'fs';
import { processContent } from './content';

describe('Link Processor', () => {
  afterAll(() => {
    if (fs.existsSync('./temp.html')) {
      fs.unlinkSync('./temp.html');
    }
    if (fs.existsSync('./temp.md')) {
      fs.unlinkSync('./temp.md');
    }
  });
  // Basic functionality tests
  test('should replace basic links with references', () => {
    const html = `
      <p>Test with <a href="https://example.com/link" title="Example">a link</a></p>
      <p>And an <img src="https://example.com/img.jpg" alt="image"></p>
      <p>Plus a <video src="https://example.com/video.mp4"></video></p>
    `;

    const markdown = `
      Test with [a link](https://example.com/link "Example")
      And an ![image](https://example.com/img.jpg)
      Plus a [video](https://example.com/video.mp4)
    `;

    const result = processContent(html, markdown);

    expect(result.links.length).toBe(1);
    expect(result.images.length).toBe(1);
    expect(result.videos.length).toBe(1);
    expect(result.markdown).toContain('link#1');
    expect(result.markdown).toContain('image#1');
    expect(result.markdown).toContain('video#1');
  });

  // Edge case tests
  test('should handle links with parentheses and special characters', () => {
    const html = `
      <a href="https://example.com/page(1).html" title="Parens">Link with parens</a>
      <a href="https://example.com/path?query=test&param=value">Link with query</a>
    `;

    const markdown = `
      [Link with parens](https://example.com/page(1).html "Parens")
      [Link with query](https://example.com/path?query=test&param=value)
    `;

    const result = processContent(html, markdown);

    expect(result.links.length).toBe(2);
    expect(result.markdown).toContain('link#1');
    expect(result.markdown).toContain('link#2');
  });

  // Performance test with large files
  test('should process large files efficiently', () => {
    const html = fs.readFileSync('src/tools/search/test.html', 'utf-8');
    const markdown = fs.readFileSync('src/tools/search/test.md', 'utf-8');

    // const largeHtml = generateLargeHtml(1000); // 1000 links
    // fs.writeFileSync('./temp.html', largeHtml);

    // const largeMd = generateLargeMarkdown(1000); // 1000 links
    // fs.writeFileSync('./temp.md', largeMd);

    // const html = fs.readFileSync('./temp.html', 'utf-8');
    // const markdown = fs.readFileSync('./temp.md', 'utf-8');

    // Measure time taken to process
    const startTime = process.hrtime();
    const result = processContent(html, markdown);
    const elapsed = process.hrtime(startTime);
    const timeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;

    console.log(
      `Processed ${result.links.length} links, ${result.images.length} images, and ${result.videos.length} videos in ${timeInMs.toFixed(2)}ms`
    );

    // Basic validations for large file processing
    expect(result.links.length).toBeGreaterThan(0);
    expect(result.markdown).toContain('link#');

    // Check if all links were replaced (sample check)
    expect(result.markdown).not.toContain('https://example.com/link');
  });

  // Memory usage test
  test('should have reasonable memory usage', () => {
    const html = fs.readFileSync('src/tools/search/test.html', 'utf-8');
    const markdown = fs.readFileSync('src/tools/search/test.md', 'utf-8');

    const beforeMem = process.memoryUsage();
    processContent(html, markdown);
    const afterMem = process.memoryUsage();

    const heapUsed = (afterMem.heapUsed - beforeMem.heapUsed) / 1024 / 1024; // MB

    console.log(`Memory used: ${heapUsed.toFixed(2)} MB`);

    // This is a loose check - actual thresholds depend on your environment
    expect(heapUsed).toBeLessThan(100); // Should use less than 100MB additional heap
  });

  // Real-world file test (if available)
  test('should process real-world Wikipedia content', () => {
    // Try to find real-world test files if they exist
    const wikiHtml = 'src/tools/search/test.html';
    const wikiMd = 'src/tools/search/test.md';

    if (fs.existsSync(wikiHtml) && fs.existsSync(wikiMd)) {
      const html = fs.readFileSync(wikiHtml, 'utf-8');
      const markdown = fs.readFileSync(wikiMd, 'utf-8');

      const result = processContent(html, markdown);

      console.log(
        `Processed ${result.links.length} Wikipedia links, ${result.images.length} images, and ${result.videos.length} videos`
      );

      expect(result.links.length).toBeGreaterThan(10); // Wikipedia articles typically have many links
      expect(result.markdown).not.toMatch(/\]\(https?:\/\/[^\s")]+\)/); // No regular URLs should remain
    } else {
      console.log('Wikipedia test files not found, skipping this test');
    }
  });
});

// Helper function to generate large HTML test data
function generateLargeHtml(linkCount: number): string {
  let html = '<html><body>';

  for (let i = 1; i <= linkCount; i++) {
    html += `<p>Paragraph ${i} with <a href="https://example.com/link${i}" title="Link ${i}">link ${i}</a>`;

    if (i % 10 === 0) {
      html += ` and <img src="https://example.com/image${i / 10}.jpg" alt="Image ${i / 10}">`;
    }

    if (i % 50 === 0) {
      html += ` and <video src="https://example.com/video${i / 50}.mp4" title="Video ${i / 50}"></video>`;
    }

    html += '</p>';
  }

  html += '</body></html>';
  return html;
}

/** Helper function to generate large Markdown test data  */
function generateLargeMarkdown(linkCount: number): string {
  let markdown = '# Test Document\n\n';

  for (let i = 1; i <= linkCount; i++) {
    markdown += `Paragraph ${i} with [link ${i}](https://example.com/link${i} "Link ${i}")`;

    if (i % 10 === 0) {
      markdown += ` and ![Image ${i / 10}](https://example.com/image${i / 10}.jpg)`;
    }

    if (i % 50 === 0) {
      markdown += ` and [Video ${i / 50}](https://example.com/video${i / 50}.mp4 "Video ${i / 50}")`;
    }

    markdown += '\n\n';
  }

  return markdown;
}
