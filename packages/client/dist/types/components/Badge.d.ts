import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
interface BadgeProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
    icon?: LucideIcon;
    label: string;
    id?: string;
    isActive?: boolean;
    isEditing?: boolean;
    isDragging?: boolean;
    isAvailable: boolean;
    isInChat?: boolean;
    onBadgeAction?: () => void;
    onToggle?: () => void;
}
export default function Badge({ icon: Icon, label, id, isActive, isEditing, isDragging, isAvailable, isInChat, onBadgeAction, onToggle, className, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Badge.d.ts.map