<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
  use HasFactory;

  protected $fillable = [
    'name_ar',
    'name_en',
    'department_id',
    'is_public',
  ];

  public function department()
  {
    return $this->belongsTo('App\Models\Department');
  }
}
