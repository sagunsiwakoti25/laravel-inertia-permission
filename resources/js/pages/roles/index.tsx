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
import { toast } from 'sonner';
import { Permission, Role, singlePermission } from '@/types/role_permission';
import { update } from '@/actions/App/Http/Controllers/Settings/PasswordController';
import TablePagination from '@/components/table-pagination';
import permissions from '../permissions';
import { permission } from 'process';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Roles({roles}: {roles: Role}) {

    
    const page = usePage<{flash: {message?: string}}>();
    const {flash} = page.props;

     useEffect(() => {
        if (!flash.message) {
            return;
        }
        toast.success(flash.message, {
            id: `roles-flash-${page.url}-${flash.message}`,
        });
    }, [page.url, flash.message]);

    function deleteRole(id: number) {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(`/roles/${id}`);
        }
    }
 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className='flex items-center justify-between'>
                        <CardTitle>Roles Management</CardTitle>
                        <CardAction>
                            <Link href="/roles/create">
                                <Button variant={'default'}>Create Role</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <Table>
                            <TableHeader className='bg-slate-500 dark:bg-slate-700'>
                                <TableRow>
                                    <TableHead className='font-bold text-white'>ID</TableHead>
                                    <TableHead className='font-bold text-white'>Name</TableHead>
                                    <TableHead className='font-bold text-white'>Permissions</TableHead>
                                    <TableHead className='font-bold text-white'>Created At</TableHead>
                                    <TableHead className='font-bold text-white'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {roles.data.map((role, index) => (
                                    <TableRow key={role.id} className='odd:bg-slate-100 dark:odd:bg-slate-800'>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{role.name}</TableCell>
                                        <TableCell className='flex flex-wrap items-center gap-2'>
                                            {role.permissions.map((perm, permIndex) => (
                                                <Badge
                                                    key={`role-${role.id}-perm-${permIndex}-${perm}`}
                                                    variant={'outline'}
                                                    className='mr-1 mb-1'
                                                >
                                                    {perm}
                                                </Badge>
                                            ))}
                                        </TableCell>
                                        <TableCell>{role.created_at}</TableCell>
                                        <TableCell>
                                            <Link href={`/roles/${role.id}/edit`}>
                                                <Button variant={'outline'} size={'sm'}>Edit</Button>
                                            </Link>
                                            <Button variant={'destructive'} size={'sm'} className='ml-2' onClick={() => deleteRole(role.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                               
                            </TableBody>
                        </Table>
                    </CardContent>
                    {
                        roles.data.length > 0 ? (<TablePagination links={roles.links} total={roles.total} to={roles.to} from={roles .from} />) : (<div className='flex h-full items-center justify-center'>No Results Found</div>)
                    }

                </Card>

            </div>
        </AppLayout>
    );
}
