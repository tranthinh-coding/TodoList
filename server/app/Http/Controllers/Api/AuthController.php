<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\PersonalAccessToken;

class AuthController extends Controller {
    private static function jsonResponse (array $data, int $status = 200, array $headers = [], int $options = 0): JsonResponse {
        return response()->json($data, $status, $headers, $options);
    }

    /**
     * @param LoginRequest $request
     *
     * @return JsonResponse
     */
    public function handleLogin (LoginRequest $request): JsonResponse {
        $user = User::query()
                    ->where('email', $request->get('email'))
                    ->firstOrFail();
        if (! $user || ! Hash::check($request->get('password'), $user['password'])) {
            return self::jsonResponse(['This email or password is incorrect']);
        }
        $token = $user->createToken('authToken')->plainTextToken;
        return self::jsonResponse([
            'message'      => 'Login Success',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'status_code'  => 200,
            'user'         => $user,
        ]);
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function handleLogout (Request $request): JsonResponse {
        // merge token if array length < 2 => $token cannot assign
        [$tokenId, $token] = array_merge(explode('|', $request->bearerToken()), ['']);
        if (!$tokenId) {
            return self::jsonResponse(['message' => 'You\'re not login']);
        }

        $userId = PersonalAccessToken::getUserId($tokenId, $token);
        if (! $userId) {
            return self::jsonResponse([
                'message' => 'Token is invalid',
            ]);
        }

        PersonalAccessToken::removeAllTokenUser($userId);
        return self::jsonResponse([
            'message' => 'You have been logged out',
        ]);
    }

    /**
     * @param RegisterRequest $request
     *
     * @return JsonResponse
     */
    public function handleRegister (RegisterRequest $request): JsonResponse {
        $remember_token = $request->get('remember') ? Str::random(10) : NULL;
        $user = User::query()->create([
            'name'           => $request->get('name'),
            'email'          => $request->get('email'),
            'password'       => Hash::make($request->get('password')),
            'remember_token' => $remember_token,
        ]);
        if (!$user) {
            return self::jsonResponse(['Register failed'], 406);
        }
        $token = $user->createToken('authToken')->plainTextToken;
        return self::jsonResponse([
            'message'      => 'Register Success',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'status_code'  => 201,
            'user'         => $user,
        ], 201);
    }
}
