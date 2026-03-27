import { Pagination } from "./pagination";

interface singlePermission {
    id: number;
    name: string;
    created_at: string;
}

interface singleRole {
    id: number;
    name: string;
    permissions: string[];
    created_at: string;
}

export interface Permission extends Pagination{
    data: singlePermission[];
}

export interface Role extends Pagination{
    data: singleRole[];
}

export interface RolePermission {
    id: number;
    name: string;
    permissions: singlePermission[];
    created_at: string;
}