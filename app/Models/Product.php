<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  use HasFactory;

  protected $fillable = [
		'title',
		'photo',
		'content',
		'department_id',
		'trade_id',
		'manu_id',
		'color_id',
		'size_id',
		'currency_id',
		'price',
		'stock',
		'start_at',
		'end_at',
		'start_offer_at',
		'end_offer_at',
		'price_offer',
		'other_data',
		'weight',
		'weight_id',
		'status',
		'reason',
	];

  // public function country()
  // {
  //   return $this->belongsTo('App\Models\Country');
  // }

  // public function country()
  // {
  //   return $this->belongsTo('App\Models\Country');
  // }

  // public function country()
  // {
  //   return $this->belongsTo('App\Models\Country');
  // }

  // public function country()
  // {
  //   return $this->belongsTo('App\Models\Country');
  // }

  public function product_image()
  {
    return $this->hasMany('App\Models\ProductImage');
  }

  public function other_data()
  {
    return $this->hasMany('App\Models\OtherData');
  }
}
