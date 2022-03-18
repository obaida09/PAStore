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

    Route::resource('admin'      , AdminController::class);
    Route::resource('user'       , UserController::class);
    Route::resource('country'    , CountryController::class);
    Route::resource('city'       , CityController::class);
    Route::resource('state'      , StateController::class);
    Route::resource('department' , DepartmentController::class);
    Route::resource('trademark'  , TradeMarkController::class);
    Route::resource('manufacture', ManuFacturersController::class);
    Route::resource('mall'       , MallController::class);
    Route::resource('color'      , ColorController::class);
    Route::resource('size'       , SizeController::class);
    Route::resource('weight'     , WeightController::class);
    Route::resource('product'    , ProductController::class);

    Route::get('settings', [App\Http\Controllers\Admin\SettingController::class, 'setting']);
    Route::post('settings', 'SettingController@setting_save')->name('admin.setting');

    Route::get('lang/{lang}', function ($lang) {
      session()->has('lang') ? session()->forget('lang') : '';
      $lang == 'ar' ? session()->put('lang', 'ar') : session()->put('lang', 'en');
      return back();
    });
    Route::any('admin/destroy/all'       , 'AdminController@multi_delete');
    Route::any('user/destroy/all'        , 'UserController@multi_delete');
    Route::any('country/destroy/all'     , 'CountryController@multi_delete');
    Route::any('city/destroy/all'        , 'cityController@multi_delete');
    Route::any('state/destroy/all'       , 'StateController@multi_delete');
    Route::any('department/destroy/all'  , 'DepartmentController@multi_delete');
    Route::any('trademark/destroy/all'   , 'TradeMarkController@multi_delete');
    Route::any('manufacture/destroy/all' , 'ManuFacturersController@multi_delete');
    Route::any('mall/destroy/all'        , 'MallController@multi_delete');
    Route::any('color/destroy/all'       , 'ColorController@multi_delete');
    Route::any('size/destroy/all'        , 'SizeController@multi_delete');
    Route::any('weight/destroy/all'      , 'WeightController@multi_delete');
    Route::any('product/destroy/all'     , 'ProductController@multi_delete');

    Route::any('logout', 'AdminAuth@logout')->name('admin.logout');
  });
});

