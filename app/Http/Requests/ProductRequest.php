<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
    public function rules()
    {
        return [
            'title'          => 'required',
            'content'        => 'required',
            'department_id'  => 'required|numeric',
            'trade_id'       => 'required|numeric',
            'manu_id'        => 'required|numeric',
            'color_id'       => 'sometimes|nullable|numeric',
            'size_id'        => 'sometimes|nullable|numeric',
            'size'           => 'sometimes|nullable',
            'currency_id'    => 'sometimes|nullable|numeric',
            'price'          => 'required|numeric',
            'stock'          => 'required|numeric',
            'start_at'       => 'required|date',
            'end_at'         => 'required|date',
            'start_offer_at' => 'sometimes|nullable|date',
            'end_offer_at'   => 'sometimes|nullable|date',
            'price_offer'    => 'sometimes|nullable|numeric',
            'weight'         => 'sometimes|nullable',
            'weight_id'      => 'sometimes|nullable|numeric',
            'status'         => 'sometimes|nullable|in:pending,refused,active',
            'reason'         => 'sometimes|nullable|numeric',
            'photo'          => 'image'
        ];
    }
}
