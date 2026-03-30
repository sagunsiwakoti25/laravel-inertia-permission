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
import { User } from '@/types/users';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users({users}: {users: User}) {

    
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

    function deleteUser(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${id}`);
        }
    }
 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className='flex items-center justify-between'>
                        <CardTitle>Users Management</CardTitle>
                        <CardAction>
                            <Link href="/users/create">
                                <Button variant={'default'}>Create User</Button>
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
                                    <TableHead className='font-bold text-white'>Email</TableHead>
                                    <TableHead className='font-bold text-white'>Roles</TableHead>
                                    <TableHead className='font-bold text-white'>Created At</TableHead>
                                    <TableHead className='font-bold text-white'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.data.map((user, index) => (
                                    <TableRow key={user.id} className='odd:bg-slate-100 dark:odd:bg-slate-800'>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className='flex flex-wrap items-center gap-2'>
                                            {user.roles.map((role, roleIndex) => (
                                                <Badge
                                                    key={`role-${role}-user-${user.id}-index-${roleIndex}`}
                                                    variant={'outline'}
                                                    className='mr-1 mb-1'
                                                >
                                                    {role}
                                                </Badge>
                                            ))}
                                        </TableCell>
                                        <TableCell>{user.created_at}</TableCell>
                                        <TableCell>
                                            <Link href={`/users/${user.id}/edit`}>
                                                <Button variant={'outline'} size={'sm'}>Edit</Button>
                                            </Link>
                                            <Button variant={'destructive'} size={'sm'} className='ml-2' onClick={() => deleteUser(user.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                               
                            </TableBody>
                        </Table>
                    </CardContent>
                    {
                        users.data.length > 0 ? (<TablePagination links={users.links} total={users.total} to={users.to} from={users .from} />) : (<div className='flex h-full items-center justify-center'>No Results Found</div>)
                    }

                </Card>

            </div>
        </AppLayout>
    );
}
