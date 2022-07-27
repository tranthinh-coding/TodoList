<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Models\PersonalAccessToken;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public static function login (Request $request): JsonResponse {
        /**
         * With remember_token
         */
        if ($request->remember_token) {
            $user = User::query()->where('remember_token', $request->remember_token)->first();
            if (!$user) {
                return Response::json([
                    'message' => 'Something went wrong',
                ]);
            }
            return Response::json([
                $request->device_name => $user->createToken($request->device_name)->plainTextToken,
                'email'               => $user->email,
                'name'                => $user->name,
            ]);
        }

        /**
         * With password
         */
        $validator = Validator::make($request->only(['email', 'password', 'device_name']), [
            'email'       => 'required|email',
            'password'    => 'required',
            'device_name' => 'required',
        ]);

        if ($validator->fails()) {
            return Response::json($validator->errors());
        }

        $user = User::query()->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return Response::json(['message' => 'This email or password is incorrect'], 422);
        }
        return Response::json([
            $request->device_name => $user->createToken($request->device_name)->plainTextToken,
            'email'               => $user->email,
            'name'                => $user->name,
        ]);
    }

    public static function createToken (Request $request): JsonResponse {
        return Response::json([
            $request->device_name => $$request->user()->createToken($request->device_name)->plainTextToken,
        ]);
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public static function logout (Request $request): JsonResponse {
        $user = $request->user();
        PersonalAccessToken::removeAllTokenUser($user->id);
        return Response::json(['message' => 'You have been logged out',]);
    }

    /**
     * @param RegisterRequest $request
     *
     * @return JsonResponse
     */
    public static function register (RegisterRequest $request): JsonResponse {
        $remember_token = $request->remember ? Str::random(10) : NULL;
        $user           = User::query()->create([
            'name'           => $request->get('name'),
            'email'          => $request->get('email'),
            'password'       => Hash::make($request->get('password')),
            'remember_token' => $remember_token,
        ]);
        return Response::json([
            $request->device_name => $user->createToken($request->device_name)->plainTextToken,
            'email'               => $user->email,
            'name'                => $user->name,
        ]);
    }
}
