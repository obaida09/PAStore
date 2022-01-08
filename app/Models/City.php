<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
      'city_name_ar',
      'city_name_en',
      'country_id',
    ];

    public function country()
    {
      return $this->belongsTo('App\Models\Country');
    }

    public function state()
    {
      return $this->hasMany('App\Models\State');
    }
}
