<?php

use App\Http\Controllers\MessagerController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Broadcast::routes(['middleware' => 'auth:api']); 
Route::prefix('user')->group(function() {
    Route::post('/login', [UserController::class, 'login'])->name('api.user.login');
    Route::post('/register', [UserController::class, 'register'])->name('api.user.register');
});

Route::middleware('auth:api')->group(function() {
    Route::prefix('user')->group(function() {
        Route::get('/self', [UserController::class, 'self'])->name('api.user.self');
        Route::get('/list', [UserController::class, 'list'])->name('api.user.list');
    });

    Route::prefix('messager')->group(function() {
        Route::get('/user-chat/{id}', [MessagerController::class, 'userChat'])->name('api.messager.userChat');
        Route::post('/sending', [MessagerController::class, 'sending'])->name('api.messager.sending');
    });
});