<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
  use HasFactory;

  protected $fillable = [
    'sitename_ar',
    'sitename_en',
    'logo',
    'icon',
    'email',
    'main_lang',
    'description',
    'keywords',
    'status',
    'message_maintenance',
  ];
}
