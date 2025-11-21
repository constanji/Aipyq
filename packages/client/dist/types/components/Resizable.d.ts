/// <reference types="react" />
import * as ResizablePrimitive from 'react-resizable-panels';
declare const ResizablePanelGroup: ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => import("react/jsx-runtime").JSX.Element;
declare const ResizablePanel: import("react").ForwardRefExoticComponent<Omit<import("react").HTMLAttributes<HTMLObjectElement | HTMLElement | HTMLAnchorElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLLinkElement | HTMLMapElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement>, "id" | "onResize"> & {
    className?: string | undefined;
    collapsedSize?: number | undefined;
    collapsible?: boolean | undefined;
    defaultSize?: number | undefined;
    id?: string | undefined;
    maxSize?: number | undefined;
    minSize?: number | undefined;
    onCollapse?: ResizablePrimitive.PanelOnCollapse | undefined;
    onExpand?: ResizablePrimitive.PanelOnExpand | undefined;
    onResize?: ResizablePrimitive.PanelOnResize | undefined;
    order?: number | undefined;
    style?: object | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<ResizablePrimitive.ImperativePanelHandle>>;
declare const ResizableHandle: ({ withHandle, className, ...props }: Omit<import("react").HTMLAttributes<keyof HTMLElementTagNameMap>, "id" | "onFocus" | "onBlur" | "onClick" | "onPointerDown" | "onPointerUp"> & {
    className?: string | undefined;
    disabled?: boolean | undefined;
    hitAreaMargins?: ResizablePrimitive.PointerHitAreaMargins | undefined;
    id?: string | null | undefined;
    onBlur?: (() => void) | undefined;
    onClick?: (() => void) | undefined;
    onDragging?: ResizablePrimitive.PanelResizeHandleOnDragging | undefined;
    onFocus?: (() => void) | undefined;
    onPointerDown?: (() => void) | undefined;
    onPointerUp?: (() => void) | undefined;
    style?: import("react").CSSProperties | undefined;
    tabIndex?: number | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: import("react").ReactNode;
} & {
    withHandle?: boolean | undefined;
}) => import("react/jsx-runtime").JSX.Element;
declare const ResizableHandleAlt: ({ withHandle, className, ...props }: Omit<import("react").HTMLAttributes<keyof HTMLElementTagNameMap>, "id" | "onFocus" | "onBlur" | "onClick" | "onPointerDown" | "onPointerUp"> & {
    className?: string | undefined;
    disabled?: boolean | undefined;
    hitAreaMargins?: ResizablePrimitive.PointerHitAreaMargins | undefined;
    id?: string | null | undefined;
    onBlur?: (() => void) | undefined;
    onClick?: (() => void) | undefined;
    onDragging?: ResizablePrimitive.PanelResizeHandleOnDragging | undefined;
    onFocus?: (() => void) | undefined;
    onPointerDown?: (() => void) | undefined;
    onPointerUp?: (() => void) | undefined;
    style?: import("react").CSSProperties | undefined;
    tabIndex?: number | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: import("react").ReactNode;
} & {
    withHandle?: boolean | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export { ResizablePanelGroup, ResizablePanel, ResizableHandle, ResizableHandleAlt };
//# sourceMappingURL=Resizable.d.ts.map