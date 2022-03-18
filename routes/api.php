<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
  'middleware' => 'api',
  'namespace' => 'Api'

], function () {
  // Route::post('/login', [AuthController::class, 'login']);
  // Route::post('/register', [AuthController::class, 'register']);
  // Route::post('/logout', [AuthController::class, 'logout']);
  // // Route::post('/refresh', [AuthController::class, 'refresh']);

  Route::post('register', 'AuthController@register');
  Route::post('login', 'AuthController@login');

  Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('product/{id}', 'ProductController@getProduct');
    Route::get('show-cart', 'ShoppingCartController@showCart');
    Route::get('site-sttings', 'SiteController@getSettings');
    Route::post('rating', 'ProductController@ratingProduct');
    Route::post('add-to-cart', 'ShoppingCartController@store');
    Route::post('remove-product-cart/{row_id}', 'ShoppingCartController@removeProductCart');
    Route::post('delete-cart', 'ShoppingCartController@deleteCart');
  });
});
