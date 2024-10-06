<?php

namespace App\Http\Controllers;

use App\Models\PainTines;
use Illuminate\Http\Request;

class PainController extends Controller
{
    public function index()
    {
        try {
            $paintings = PainTines::all();
            return response()->json([
                'status' => 'success',
                'data' => $paintings
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // การตรวจสอบข้อมูลที่รับเข้ามา
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'artist_name' => 'required|string|max:255',
        'medium' => 'required|string|max:255',
        'style' => 'required|string|max:255',
        'year_created' => 'required',
        'dimensions' => 'nullable|string|max:255',
        'price' => 'nullable',
        'location' => 'nullable|string|max:255',
        'image_path' => 'nullable|string',
        'exhibition_date' => 'nullable',
        'gallery' => 'nullable|string|max:255',
        'is_sold' => 'boolean',
        'category' => 'nullable|string|max:255',
        'rating' => 'nullable',
    ]);

    try {
        // สร้างข้อมูลใหม่ในฐานข้อมูล
        $painting = PainTines::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $painting
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
}



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $painting = PainTines::findOrFail($id);
            return response()->json([
                'status' => 'success',
                'data' => $painting
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Painting not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    // การตรวจสอบข้อมูลที่รับเข้ามา
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'artist_name' => 'required|string|max:255',
        'medium' => 'required|string|max:255',
        'style' => 'required|string|max:255',
        'year_created' => 'required',
        'dimensions' => 'nullable|string|max:255',
        'price' => 'nullable',
        'location' => 'nullable|string|max:255',
        'image_path' => 'nullable|string',
        'exhibition_date' => 'nullable',
        'gallery' => 'nullable|string|max:255',
        'is_sold' => 'boolean',
        'category' => 'nullable|string|max:255',
        'rating' => 'nullable',
    ]);

    try {
        // หา record ตาม ID
        $painting = PainTines::findOrFail($id);
        
        // ทำการอัพเดทข้อมูล
        $painting->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $painting
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Painting not found'
        ], 404);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $painting = PainTines::findOrFail($id);
            $painting->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Painting deleted successfully'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Painting not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
