import { ColumnDef, SortingState } from '@tanstack/react-table';
type TableColumn<TData, TValue> = ColumnDef<TData, TValue> & {
    meta?: {
        size?: string | number;
        mobileSize?: string | number;
        minWidth?: string | number;
    };
};
interface DataTableProps<TData, TValue> {
    columns: TableColumn<TData, TValue>[];
    data: TData[];
    onDelete?: (selectedRows: TData[]) => Promise<void>;
    filterColumn?: string;
    defaultSort?: SortingState;
    columnVisibilityMap?: Record<string, string>;
    className?: string;
    pageSize?: number;
    isFetchingNextPage?: boolean;
    hasNextPage?: boolean;
    fetchNextPage?: (options?: unknown) => Promise<unknown>;
    enableRowSelection?: boolean;
    showCheckboxes?: boolean;
    onFilterChange?: (value: string) => void;
    filterValue?: string;
    isLoading?: boolean;
    enableSearch?: boolean;
}
export default function DataTable<TData, TValue>({ columns, data, onDelete, filterColumn, defaultSort, className, isFetchingNextPage, hasNextPage, fetchNextPage, enableRowSelection, showCheckboxes, onFilterChange, filterValue, isLoading, enableSearch, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DataTable.d.ts.map