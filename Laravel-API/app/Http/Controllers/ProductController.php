<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     **/
        public function index()
    {
        return Product::with(['category', 'brand'])->get();
    }

    /**
     * Store a newly created resource in storage.
     **/
        public function store(Request $request)
    {
    // form data // file image
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'brand_id'    => 'required|exists:brands,id',
            'product_name'=> 'required|string',
            'description' => 'nullable|string',
            'quantity'    => 'required|numeric',
            'image'       => 'nullable|image|mimes:jpeg,png,gif|max:2048',
            'status'      => 'boolean'
        ]);

        $req_data = $request->all();
        $product = Product::create($req_data);
        return response()->json([
            "success"  => true,
            "category" => $product,
            "message"  => "Product created successfully"
        ]);
    }

    /**
     * Display the specified resource.
     **/
    public function show(string $id)
    {
        $product = Product::find($id);
                if (!$product) {
                    return response()->json([
                        "success" => false,
                        "message" => "Product not found.",
                    ], 404);
                }
                return response()->json([
                    "product" => $product,
                    "message"  => "Product retrieved successfully.",
                ]);
    }

    /**
     * Update the specified resource in storage.
     **/

    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        if(!$product) {
            return response()->json([
                "message" => "Product not found."
            ], 404);
        }
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'brand_id'    => 'required|exists:brands,id',
            'product_name'=> 'required|string',
            'description' => 'nullable|string',
            'quantity'    => 'required|numeric',
            'image'       => 'nullable|image|mimes:jpeg,png,gif|max:2048',
            'status'      => 'boolean'
        ]);;
        $data = $request->all();
        $product->update($data);
        return response()->json([
           "success" => true,
           "product" => $product,
           "message" =>"Product update successfully."
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
    **/
    public function destroy(string $id)
    {
        $product = Product::find($id);
                        if (!$product) {
                            return response()->json([
                                "success" => false,
                                "message" => "Product not found.",
                            ], 404);
                        }

                        $product->delete();

                        return response()->json([
                            "success" => true,
                            "message" => "Product deleted successfully.",
                        ], 200);
    }
}
