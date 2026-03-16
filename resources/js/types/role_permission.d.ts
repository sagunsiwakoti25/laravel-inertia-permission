import { Pagination } from "./pagination";

interface singlePermission {
    id: number;
    name: string;
    created_at: string;
}

export interface Permission extends Pagination{
    data: singlePermission[];
}