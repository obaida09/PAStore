<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManuFacturers extends Model
{
  use HasFactory;

  protected $fillable = [
		'name_ar',
		'name_en',
		'email',
		'mobile',
		'facebook',
		'twitter',
		'address',
		'website',
		'contact_name',
		'lat',
		'lng',
		'icon',
	];
}
