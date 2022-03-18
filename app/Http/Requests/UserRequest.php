<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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

    protected function onCreate()
    {
        return [
            'name'     => ['required', 'string', 'max:20'],
            'email'    => ['required', 'email', 'max:255', 'unique:users'],
            'level'    => ['required', 'in:user,company,vendor'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    protected function onUpdate()
    {
        return [
            'name'     => ['required', 'string', 'max:20'],
            'level'    => ['required', 'in:user,company,vendor'],
            'password' => ['sometimes', 'nullable','min:8', 'confirmed'],
            'email'    => [
                'required', 'email', 'max:255',
                Rule::unique('users')->ignore($this->user),
            ],
        ];
    }


    public function rules()
    {
        return request()->isMethod('PUT') || request()->isMethod('patch') ?
        $this->onUpdate() : $this->onCreate();
    }
}
