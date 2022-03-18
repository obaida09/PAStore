<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductViews extends Model
{
  protected $fillable = [
    'product_id',
    'views_count',
  ];
  public function product()
  {
    return $this->belongsTo('App\Models\Product', 'product_id');
  }
}
