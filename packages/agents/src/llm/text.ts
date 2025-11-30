export interface TextStreamOptions {
  minChunkSize?: number;
  maxChunkSize?: number;
  delay?: number;
  firstWordChunk?: boolean;
}

export type ProgressCallback = (chunk: string) => void;
export type PostChunkCallback = (chunk: string) => void;

export class TextStream {
  private text: string;
  private currentIndex: number;
  private minChunkSize: number;
  private maxChunkSize: number;
  private delay: number;
  private firstWordChunk: boolean;

  constructor(text: string, options: TextStreamOptions = {}) {
    this.text = text;
    this.currentIndex = 0;
    this.minChunkSize = options.minChunkSize ?? 4;
    this.maxChunkSize = options.maxChunkSize ?? 8;
    this.delay = options.delay ?? 20;
    this.firstWordChunk = options.firstWordChunk ?? true;
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private static readonly BOUNDARIES = new Set([
    ' ',
    '.',
    ',',
    '!',
    '?',
    ';',
    ':',
  ]);

  private findFirstWordBoundary(text: string, minSize: number): number {
    if (minSize >= text.length) return text.length;

    // Ensure we meet the minimum size first
    let pos = minSize;

    // Look forward until we find a boundary
    while (pos < text.length) {
      if (TextStream.BOUNDARIES.has(text[pos])) {
        return pos + 1; // Include the boundary character
      }
      pos++;
    }

    return text.length; // If no boundary found, return entire remaining text
  }

  async *generateText(
    signal?: AbortSignal,
    progressCallback?: ProgressCallback
  ): AsyncGenerator<string, void, unknown> {
    const { delay, minChunkSize, maxChunkSize } = this;

    while (this.currentIndex < this.text.length) {
      if (signal?.aborted === true) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));

      const remainingText = this.text.slice(this.currentIndex);
      let chunkSize: number;

      if (this.firstWordChunk) {
        chunkSize = this.findFirstWordBoundary(remainingText, minChunkSize);
      } else {
        const remainingChars = remainingText.length;
        chunkSize = Math.min(
          this.randomInt(minChunkSize, maxChunkSize + 1),
          remainingChars
        );
      }

      const chunk = this.text.slice(
        this.currentIndex,
        this.currentIndex + chunkSize
      );
      progressCallback?.(chunk);

      yield chunk;
      this.currentIndex += chunkSize;
    }
  }
}
