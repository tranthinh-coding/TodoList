<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest {
    public function authorize (): bool {
        return TRUE;
    }

    public function rules (): array {
        return [
            'email'    => 'required|email',
            'password' => 'required',
        ];
    }
}
