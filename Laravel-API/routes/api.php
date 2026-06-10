<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;

// Auth route
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Role routes
Route::get("/roles",        [RoleController::class, "index"]);
Route::get("/roles/{id}",   [RoleController::class, "show"]);
Route::post("/roles",       [RoleController::class, "store"]);
Route::put("/roles/{id}",   [RoleController::class, "update"]);
Route::delete("/roles/{id}",[RoleController::class, "destroy"]);
Route::apiResource("categories", CategoryController::class);
Route::apiResource("products", ProductController::class);
Route::apiResource("brands", BrandController::class);

// Test routes (remove in production)
// Route::get('/products', function () {
//     $products = [
//         ['id' => 1, 'name' => 'Product-1', 'price' => 90.32],
//         ['id' => 2, 'name' => 'Product-2', 'price' => 76.32],
//     ];
//     return response()->json([
//         'message' => 'Successfully',
//         'data'    => $products
//     ], 200);
// });
