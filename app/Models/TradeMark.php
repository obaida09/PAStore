<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TradeMark extends Model
{
  use HasFactory;

  protected $fillable = [
		'trade_name_ar',
		'trade_name_en',
		'logo',
	];
}
