/// <reference types="react" />
import { SpringConfig } from '@react-spring/web';
interface SegmenterOptions {
    granularity?: 'grapheme' | 'word' | 'sentence';
    localeMatcher?: 'lookup' | 'best fit';
}
interface SegmentData {
    segment: string;
    index: number;
    input: string;
    isWordLike?: boolean;
}
interface Segments {
    [Symbol.iterator](): IterableIterator<SegmentData>;
}
interface IntlSegmenter {
    segment(input: string): Segments;
}
interface IntlSegmenterConstructor {
    new (locales?: string | string[], options?: SegmenterOptions): IntlSegmenter;
}
declare global {
    interface Intl {
        Segmenter: IntlSegmenterConstructor;
    }
}
interface SplitTextProps {
    text?: string;
    className?: string;
    delay?: number;
    animationFrom?: {
        opacity: number;
        transform: string;
    };
    animationTo?: {
        opacity: number;
        transform: string;
    };
    easing?: SpringConfig['easing'];
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
    onLetterAnimationComplete?: () => void;
    onLineCountChange?: (lineCount: number) => void;
}
declare const SplitText: React.FC<SplitTextProps>;
export default SplitText;
//# sourceMappingURL=SplitText.d.ts.map