<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

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

Route::prefix('v1')
     ->group(function () {
         Route::post('/login', [AuthController::class, 'handleLogin']);
         Route::post('/register', [AuthController::class, 'handleRegister']);
         Route::post('/logout', [AuthController::class, 'handleLogout']);
     });
