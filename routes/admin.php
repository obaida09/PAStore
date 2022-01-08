<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::view('/wizard', 'wizard');

Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function () {

  Config::set('auth.defines', 'admin');

  Route::get('login', 'AdminAuth@login')->name('login');
  Route::post('login', 'AdminAuth@dologin')->name('log');
  Route::get('forgot/password', 'AdminAuth@forgot_password')->name('forgot_password');
  Route::post('forgot/password', 'AdminAuth@forgot_password_post');
  Route::get('reset/password/{token}', 'AdminAuth@reset_password');
  Route::post('reset/password/{token}', 'AdminAuth@reset_password_final');

  Route::group(['middleware' => 'admin:admin'], function () {
    Route::get('/home', [App\Http\Controllers\Admin\HomeController::class, 'index'])->name('home');

    Route::resource('admin', 'AdminController');
    Route::resource('user', 'UserController');
    Route::resource('country', 'CountryController');
    Route::resource('city', 'CityController');
    Route::resource('state', 'StateController');
    Route::resource('department', 'DepartmentController');
    Route::resource('trademark', 'TradeMarkController');
    Route::resource('manufacture', 'ManuFacturersController');
    Route::resource('mall', 'MallController');
    Route::resource('color', 'ColorController');
    Route::resource('size', 'SizeController');
    Route::resource('weight', 'WeightController');
    Route::resource('product', 'ProductController');

    Route::get('settings', 'SettingController@setting');
    Route::post('settings', 'SettingController@setting_save');

    Route::get('lang/{lang}', function ($lang) {

      session()->has('lang') ? session()->forget('lang') : '';

      $lang == 'ar' ? session()->put('lang', 'ar') : session()->put('lang', 'en');

      return back();
    });
    Route::any('admin/destroy/all', 'AdminController@multi_delete');
    Route::any('city/destroy/all', 'cityController@multi_delete');

    Route::any('logout', 'AdminAuth@logout')->name('admin.logout');
  });
});
