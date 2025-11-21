declare const VARIANTS: {
    readonly default: {
        readonly gap: 5;
        readonly speed: 35;
        readonly colors: "#f8fafc,#f1f5f9,#cbd5e1";
        readonly noFocus: false;
    };
    readonly blue: {
        readonly gap: 10;
        readonly speed: 25;
        readonly colors: "#e0f2fe,#7dd3fc,#0ea5e9";
        readonly noFocus: false;
    };
    readonly yellow: {
        readonly gap: 3;
        readonly speed: 20;
        readonly colors: "#fef08a,#fde047,#eab308";
        readonly noFocus: false;
    };
    readonly pink: {
        readonly gap: 6;
        readonly speed: 80;
        readonly colors: "#fecdd3,#fda4af,#e11d48";
        readonly noFocus: true;
    };
};
interface PixelCardProps {
    variant?: keyof typeof VARIANTS;
    gap?: number;
    speed?: number;
    colors?: string;
    noFocus?: boolean;
    className?: string;
    progress?: number;
    randomness?: number;
    width?: string;
    height?: string;
}
export default function PixelCard({ variant, gap, speed, colors, noFocus, className, progress, randomness, width, height, }: PixelCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PixelCard.d.ts.map