<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;
    protected $fillable = [
      'state_name_ar',
      'state_name_en',
      'city_id',
    ];

    public function city()
    {
      return $this->belongsTo('App\Models\City');
    }
}
