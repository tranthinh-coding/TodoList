<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller {
    public function handleSignIn (SignInRequest $request): JsonResponse {
        return response()->json('done', 200);
    }

    public function handleSignOut (Request $request): JsonResponse {
        return response()->json('done', 200);
    }

    public function handleSignUp (SignUpRequest $request): JsonResponse {
        $userData = [
            'name'           => $request['name'],
            'email'          => $request['email'],
            'password'       => Hash::make($request['password']),
            'remember_token' => Str::random(10),
        ];

        $inserted = DB::table('users')->insert($userData);

        $message = $inserted ? 'Sign Up Successfully' : 'Cannot Sign Up';

        return response()->json([
            'message' => $message,
        ], 201);
    }
}
