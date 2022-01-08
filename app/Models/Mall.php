<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mall extends Model
{
  use HasFactory;

  protected $fillable = [
    'name_ar',
    'name_en',
    'email',
    'mobile',
    'facebook',
    'country_id',
    'twitter',
    'address',
    'website',
    'contact_name',
    'lat',
    'lng',
    'icon',
  ];

  public function country()
  {
    return $this->belongsTo('App\Models\Country');
  }
}
