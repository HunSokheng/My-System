<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $list = Role::all();
        return response()->json([
            "success" => true,
            "list"    => $list,
            "message" => "Roles fetched successfully.",
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|boolean',
        ]);

        $role              = new Role();
        $role->name        = $request->name;
        $role->description = $request->description;
        $role->status      = $request->status;
        $role->save();

        return response()->json([
            "success" => true,
            "role"    => $role,
            "message" => "Role created successfully.",
        ], 201);
    }

    public function show(string $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                "success" => false,
                "message" => "Role not found.",
            ], 404);
        }
        return response()->json([
            "success" => true,
            "role"    => $role,
            "message" => "Role found successfully.",
        ]);
    }

    public function update(Request $request, string $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                "success" => false,
                "message" => "Role not found.",
            ], 404);
        }

        $request->validate([                   // ✅ Added validation
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|boolean',
        ]);

        $role->name        = $request->name;
        $role->description = $request->description;
        $role->status      = $request->status;
        $role->save();

        return response()->json([
            "success" => true,
            "role"    => $role,
            "message" => "Role updated successfully.",
        ]);
    }

    public function destroy(string $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                "success" => false,
                "message" => "Role not found.",
            ], 404);
        }

        $role->delete();
        return response()->json([
            "success" => true,
            "message" => "Role deleted successfully.",
        ]);
    }

    public function changeStatus(string $id)   // ✅ Fixed typo + implemented
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                "success" => false,
                "message" => "Role not found.",
            ], 404);
        }

        $role->status = $role->status ? 0 : 1; // ✅ Toggle status
        $role->save();

        return response()->json([
            "success" => true,
            "role"    => $role,
            "message" => "Status updated successfully.",
        ]);
    }
}