<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'maintenance'], function () {
  Route::get('home3', function () {
    return view('front.index');
  });
});

Route::get('maintenance', function () {

  if(Setting::first()->status == 'open') {
    return redirect('home3');
  }

  return view('maintenance');
});
