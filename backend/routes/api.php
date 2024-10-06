<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PainController;
use App\Http\Controllers\PaintingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/paintine', [PainController::class, 'index']);
Route::get('/paintine/{id}', [PainController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post("paintine", [PainController::class, 'store']);
    Route::put("paintine/{id}", [PainController::class, 'update']);
    Route::delete("paintine/{id}", [PainController::class, 'destroy']);
});