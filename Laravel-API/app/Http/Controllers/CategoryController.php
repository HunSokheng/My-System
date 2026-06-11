<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $list = Category::all();
        return response()->json([
            "success" => true,
            "list"    => $list,
            "message" => "Category fetched successfully.",
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'code'   => 'required|string|unique:categories,code',
            'status' => 'required|boolean',
        ]);

        $category              = new Category();
        $category->name        = $request->name;
        $category->description = $request->description;
        $category->status      = $request->status;
        $category->code        = $request->code;
        $category->save();

        return response()->json([
            "success"  => true,
            "category" => $category,
            "message"  => "Category created successfully.",
        ], 201);
    }

    public function show(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                "success" => false,
                "message" => "Category not found.",
            ], 404);
        }
        return response()->json([
            "success"  => true,
            "category" => $category,
            "message"  => "Category retrieved successfully.",
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'code'   => 'required|string|unique:categories,code,' . $id,
            'status' => 'required|boolean',
        ]);

        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                "success" => false,
                "message" => "Category not found.",
            ], 404);
        }

        $category->name        = $request->name;
        $category->description = $request->description;
        $category->status      = $request->status;
        $category->code        = $request->code;
        $category->save();

        return response()->json([
            "success"  => true,
            "category" => $category,
            "message"  => "Category updated successfully.",
        ], 200);
    }

    public function destroy(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                "success" => false,
                "message" => "Category not found.",
            ], 404);
        }

        $category->delete();

        return response()->json([
            "success" => true,
            "message" => "Category deleted successfully.",
        ], 200);
    }
}
