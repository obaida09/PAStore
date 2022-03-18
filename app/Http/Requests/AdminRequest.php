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

    protected function onCreate()
    {
        return [
          'name' => ['required', 'string', 'max:20'],
          'email' => ['required', 'string', 'email', 'max:255', 'unique:admins'],
          'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    protected function onUpdate()
    {
        return [
            'name'     => ['required', 'string', 'max:20'],
            'password' => ['sometimes', 'nullable','min:8', 'confirmed'],
            'email'    => [
                'required', 'email', 'max:255',
                Rule::unique('admins')->ignore($this->admin),
            ],
        ];
    }


    public function rules()
    {
        return request()->isMethod('PUT') || request()->isMethod('patch') ?
        $this->onUpdate() : $this->onCreate();
    }
}
