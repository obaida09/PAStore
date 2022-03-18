<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    // return parent::toArray($request);
    return [
      'id'         => $this->id,
      'title'      => $this->title,
      'photo'      => $this->photo,
      'price'      => $this->price,
      'stock'      => $this->stock,
      'startAt'    => $this->start_at,
      'endAt'      => $this->end_at,
      'startOffer' => $this->start_offer_at,
      'weight'     => $this->weight,
      'status'     => $this->status,
      'reason'     => $this->reason,
      'createdAt'  => $this->created_at->format('H'),
      'updatedAt'  => $this->updated_at->format('H'),

      'Relations' => [
        'department_name' => $this->department->department_name_en,
        'tradeMark_name'  => $this->tradeMark,
        'manuFacture_name'  => $this->manuFacture,
      ]
    ];
  }
}
