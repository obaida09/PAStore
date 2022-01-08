<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
  use HasFactory;

  protected $fillable = [
		'department_name_ar',
		'department_name_en',
		'icon',
		'description',
		'keyword',
		'parent',
	];

  public function parents()
  {
    return $this->hasOne('App\Models\Department', 'id', 'parent');
  }

}
