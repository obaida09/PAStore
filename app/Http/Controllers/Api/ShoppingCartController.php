<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\ApiTrait;

class ShoppingCartController extends Controller
{
  use ApiTrait;

  public function store(Request $request)
  {
    $product = Product::find($request->product_id);

    $data = Validator::make($request->all(), [
      'product_id' => 'required|integer|max:12',
      'quantity'   => 'required|integer|max:100',
      'weight'     => 'required|max:100',
    ]);

    if ($data->fails()) {
      return $this->sendError($data->errors(), 400);
    }

    if(empty($product)) {
      return $this->sendError('Product not found', 404);
    }

    Cart::add(
      $product->id,
      $product->title,
      $request->quantity,
      $product->price,
      $request->weight,
    );
    return $this->sendResponse('', 'Product add to cart successfully');
  }

  public function showCart()
  {
    $data = [
      'product'    => Cart::content(),
      'weight'     => Cart::weight(),
      'count'      => Cart::count(),
      'totalPrice' => Cart::total(),
    ];
    return $this->sendResponse($data, 'Get Product\'s cart successfully');
  }

  public function removeProductCart($row_id)
  {
    Cart::remove($row_id);
    return $this->sendResponse('', 'deleted product from cart successfully');
  }

  public function deleteCart()
  {
    Cart::destroy();
    return $this->sendResponse('', 'deleted cart successfully');
  }
}

