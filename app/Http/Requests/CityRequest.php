<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CityRequest extends FormRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    // protected function onCreate()
    // {
    //     return [
    //         'city_name_ar' => 'required',
    //         'city_name_en' => 'required',
    //         'country_id'   => 'required|integer',
    //     ];
    // }

    public function rules()
    {
        return [
            'city_name_ar' => 'required',
            'city_name_en' => 'required',
            'country_id'   => 'required|integer',
        ];
    }
}
