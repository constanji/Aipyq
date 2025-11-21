import { RefObject } from 'react';
type Handler = () => void;
export default function useOnClickOutside(ref: RefObject<HTMLElement>, handler: Handler, excludeIds: string[], customCondition?: (target: EventTarget | Element | null) => boolean): void;
export {};
//# sourceMappingURL=useOnClickOutside.d.ts.map