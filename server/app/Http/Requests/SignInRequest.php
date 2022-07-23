<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignInRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize () {
        return TRUE;
    }

    public function rules () {
        return [
            'email'    => 'required|email',
            'password' => 'required',
        ];
    }
}
