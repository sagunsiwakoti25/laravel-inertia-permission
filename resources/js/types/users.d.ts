import { Pagination } from "./pagination";
import { singleRole } from "./role_permission";

export interface SingleUser {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles: string[];
}

export interface User extends Pagination{
    data: SingleUser[];
}
export interface UserRole extends SingleUser {
    roles: singleRole[];
}