<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    //index method
    public function index()
    {
        $permissions = Permission::latest()->paginate(5);
        $permissions->getCollection()->transform(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
                'created_at' => $permission->created_at->format('d-m-Y'),
            ];
        });
        return Inertia::render('permissions/index', [
            'permissions' => $permissions
        ]);
    }

    //store method
    public function store(Request $request)
    {
       Permission::create($request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name'],
        ]));

        return redirect()->route('permissions.index')->with('message', 'Permission created successfully.');
    }

    public function update(Request $request, Permission $permission)
    {
        $permission->update($request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name,' . $permission->id],
        ]));

        return redirect()->route('permissions.index')->with('message', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()->route('permissions.index')->with('message', 'Permission deleted successfully.');
    }
}
