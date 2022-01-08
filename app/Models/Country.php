<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
  use HasFactory;
  protected $fillable = [
		'country_name_ar',
		'country_name_en',
		'mob',
		'code',
		'logo',
	];

  public function city()
  {
    return $this->hasMany('App\Models\City');
  }

  public function mall()
  {
    return $this->hasMany('App\Models\Mall');
  }
}
