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
import { Permission, Role, singlePermission } from '@/types/role_permission';
import { update } from '@/actions/App/Http/Controllers/Settings/PasswordController';
import TablePagination from '@/components/table-pagination';
import permissions from '../permissions';
import { permission } from 'process';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create User',
        href: '/users/create',
    },
];

export default function CreateUser({ roles }: { roles: string[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        roles: [] as string[],
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        post('/users');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Create User</CardTitle>
                        <CardAction>
                            <Link href="/users">
                                <Button variant="default">Go Back</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    name="name"
                                    placeholder="Enter user name"
                                    aria-invalid={!!errors.name}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    name="email"
                                    placeholder="Enter user email"
                                    aria-invalid={!!errors.email}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(event) => setData('password', event.target.value)}
                                    name="password"
                                    placeholder="Enter user password"
                                    aria-invalid={!!errors.password}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <Label htmlFor="roles">Select Roles</Label>

                            <div className="my-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                    {roles.map((role) => (
                                        <div key={role} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={role}
                                                value={role}
                                                checked={data.roles.includes(role)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setData('roles', [...data.roles, role]);
                                                    } else {
                                                        setData(
                                                            'roles',
                                                            data.roles.filter((r) => r !== role)
                                                        );
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={role}>{role}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button size="lg" type="submit" disabled={processing}>
                                    Create User
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}