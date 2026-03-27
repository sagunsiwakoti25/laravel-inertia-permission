import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { Loader, Loader2 } from 'lucide-react';
import { Permission, Role, RolePermission, singlePermission } from '@/types/role_permission';
import { update } from '@/actions/App/Http/Controllers/Settings/PasswordController';
import TablePagination from '@/components/table-pagination';
import permissions from '../permissions';
import { permission } from 'process';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Role',
        href: '/roles',
    },
];

export default function EditRole({ permissions, role }: { permissions: string[], role: RolePermission }) {

    const permissionList = role.permissions.map((perm) => perm.name);

    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: permissionList,
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        put(`/roles/${role.id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Edit Role</CardTitle>
                        <CardAction>
                            <Link href="/roles">
                                <Button variant="default">Go Back</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <Label htmlFor="name">Role Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    name="name"
                                    placeholder="Enter role name"
                                    aria-invalid={!!errors.name}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <Label htmlFor="permissions">Select Permissions</Label>

                           <div className="my-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {permissions.map((permission, index) => {
                                    const checkboxId = `permission-${index}`;

                                    return (
                                        <div key={checkboxId} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={checkboxId}
                                                value={permission}
                                                checked={data.permissions.includes(permission)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setData('permissions', [...data.permissions, permission]);
                                                    } else {
                                                        setData(
                                                            'permissions',
                                                            data.permissions.filter((p) => p !== permission)
                                                        );
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={checkboxId}>{permission}</Label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                            <div className="flex justify-end">
                                <Button size="lg" type="submit" disabled={processing}>
                                    Edit Role
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}