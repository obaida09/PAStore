<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
      return [
        'name' => ['required', 'string', 'max:20'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:admins'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
      ];
    }

    public function messages()
    {
      return [
        'name.required' => 'Please: Write Your Name',
        'name.max' => 'Your Name Very Long',
        'email.required' => 'Please: Write Your Email',
      ];
    }
}
