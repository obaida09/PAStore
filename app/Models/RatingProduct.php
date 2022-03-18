<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingProduct extends Model
{
  use HasFactory;

  protected $table = 'rating_productss';


  protected $fillable = [
    'user_id',
    'product_id',
    'rating',
    'comment',
  ];

  public function user()
  {
    return $this->belongsTo('App\Models\User');
  }

  public function product()
  {
    return $this->belongsTo('App\Models\Product');
  }
}
