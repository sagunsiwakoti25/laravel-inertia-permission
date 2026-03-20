import { Head, useForm, usePage } from '@inertiajs/react';
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
import { Permission, singlePermission } from '@/types/role_permission';
import { update } from '@/actions/App/Http/Controllers/Settings/PasswordController';
import { destroy } from '@/actions/Laravel/Fortify/Http/Controllers/TwoFactorAuthenticationController';
import TablePagination from '@/components/table-pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permissions',
    },
];

export default function Permissions({permissions}: {permissions: Permission}) {


    const [openAddPermissionDialog, setOpenAddPermissionDialog] = useState(false);
    const [openEditPermissionDialog, setOpenEditPermissionDialog] = useState(false);

    const {flash} = usePage<{flash: {message?: string}}>().props;

    useEffect(() => {
        if(flash.message) {
            setOpenAddPermissionDialog(false);
            setOpenEditPermissionDialog(false);
            toast.success(flash.message);
        }
    }, [flash.message]);

    const {data, setData, post, put, delete:destroy, processing, errors, reset } = useForm({
        id: 0,
        name: '',
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        console.log('does it reach here');
        e.preventDefault();
        post('/permissions', {
            onSuccess: () => {
                reset('name');
            }
        });
    }

    function edit(permission: singlePermission) {
        setData('name', permission.name);
        setData('id', permission.id);
        setOpenEditPermissionDialog(true);
    }

    function deletePermission(permission: singlePermission) {
        if (confirm('Are you sure you want to delete this permission?')) {
            destroy(`/permissions/${permission.id}`);
        }
    }

    function update(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(`/permissions/${data.id}`, {
            onSuccess: () => {
            setOpenEditPermissionDialog(false);
            }
        });
    }

 

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className='flex items-center justify-between'>
                        <CardTitle>Permissions Management</CardTitle>
                        <CardAction>
                            <Button variant={'default'} onClick={() =>{
                                setOpenAddPermissionDialog(true);
                            }}>Add New</Button>
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <Table>
                            <TableHeader className='bg-slate-500 dark:bg-slate-700'>
                                <TableRow>
                                    <TableHead className='font-bold text-white'>ID</TableHead>
                                    <TableHead className='font-bold text-white'>Name</TableHead>
                                    <TableHead className='font-bold text-white'>Created At</TableHead>
                                    <TableHead className='font-bold text-white'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {permissions.data.map((permission, index) => (
                                    <TableRow key={permission.id} className='odd:bg-slate-100 dark:odd:bg-slate-800'>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{permission.name}</TableCell>
                                        <TableCell>{permission.created_at}</TableCell>
                                        <TableCell>
                                            <Button variant={'outline'} size={'sm'} onClick={() => edit(permission)}>Edit</Button>
                                            <Button variant={'destructive'} size={'sm'} className='ml-2' onClick={() => deletePermission(permission)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                               
                            </TableBody>
                        </Table>
                    </CardContent>
                    {
                        permissions.data.length > 0 ? (<TablePagination links={permissions.links} total={permissions.total} to={permissions.to} from={permissions.from} />) : (<div className='flex h-full items-center justify-center'>No Results Found</div>)
                    }

                </Card>

                {/* Add new permissions */}

                <Dialog open={openAddPermissionDialog} onOpenChange={setOpenAddPermissionDialog}>
                    <DialogContent className="sm:max-w-sm">
                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <DialogHeader>
                                <DialogTitle>Add New Permission</DialogTitle>
                            </DialogHeader>
                            <hr/>
                            <div className='grid gap-4'>
                                <div className='grid gap-3'>
                                    <Label htmlFor='name'>Permission Name</Label>
                                    <Input
                                        id='name'
                                        name='name'
                                        type='text'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        aria-invalid={!!errors.name}
                                    />
                                    <InputError message={errors.name} className='mt-2' />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">
                                    {processing ? <Loader2 className='animate-spin' /> : <span>Create</span>}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>



                {/* Edit Permissions */}

                <Dialog open={openEditPermissionDialog} onOpenChange={setOpenEditPermissionDialog}>
                    <DialogContent className="sm:max-w-sm">
                        <form onSubmit={update} className="flex flex-col gap-4">
                            <DialogHeader>
                                <DialogTitle>Edit Permission</DialogTitle>
                            </DialogHeader>
                            <hr/>
                            <div className='grid gap-4'>
                                <div className='grid gap-3'>
                                    <Label htmlFor='name'>Permission Name</Label>
                                    <Input
                                        id='name'
                                        name='name'
                                        type='text'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        aria-invalid={!!errors.name}
                                    />
                                    <InputError message={errors.name} className='mt-2' />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">
                                    {processing ? <Loader2 className='animate-spin' /> : <span>Update</span>}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
