/// <reference types="react" />
import type { TFile } from 'librechat-data-provider';
import type { ExtendedFile } from '~/common';
export default function FileIcon({ file, fileType, }: {
    file?: Partial<ExtendedFile | TFile>;
    fileType: {
        fill: string;
        paths: React.FC;
        title: string;
    };
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FileIcon.d.ts.map