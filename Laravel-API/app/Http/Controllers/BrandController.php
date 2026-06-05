<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand; // ✅ Added

class BrandController extends Controller
{
    public function index()
    {
        $list = Brand::all();
        return response()->json([
            "success" => true,
            "list"    => $list,
            "message" => "Brand fetched successfully.",
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'code'   => 'required|string|unique:brands,code',
            'status' => 'required|boolean',
        ]);

        $brand              = new Brand();
        $brand->name        = $request->name;
        $brand->description = $request->description;
        $brand->status      = $request->status;
        $brand->code        = $request->code;
        $brand->save(); // ✅ Fixed

        return response()->json([
            "success" => true,
            "brand"   => $brand, // ✅ Fixed
            "message" => "Brand created successfully.",
        ], 201);
    }

    public function show(string $id)
    {
        $brand = Brand::find($id); // ✅ Fixed
        if (!$brand) {
            return response()->json([
                "success" => false,
                "message" => "Brand not found.", // ✅ Fixed
            ], 404);
        }
        return response()->json([
            "success" => true,
            "brand"   => $brand, // ✅ Fixed
            "message" => "Brand found successfully.",
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'code'   => 'required|string|unique:brands,code,' . $id,
            'status' => 'required|boolean',
        ]);

        $brand = Brand::find($id); // ✅ Fixed casing
        if (!$brand) {
            return response()->json([
                "success" => false,
                "message" => "Brand not found.",
            ], 404);
        }

        $brand->name        = $request->name;
        $brand->description = $request->description;
        $brand->status      = $request->status;
        $brand->code        = $request->code;
        $brand->save();

        return response()->json([
            "success" => true,
            "brand"   => $brand,
            "message" => "Brand updated successfully.",
        ], 200);
    }

    public function destroy(string $id)
    {
        $brand = Brand::find($id); // ✅ Fixed casing
        if (!$brand) {
            return response()->json([
                "success" => false,
                "message" => "Brand not found.",
            ], 404);
        }

        $brand->delete();
        return response()->json([
            "success" => true,
            "message" => "Brand deleted successfully.",
        ], 200);
    }
}
