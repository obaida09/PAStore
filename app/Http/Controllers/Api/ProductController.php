<?php

namespace App\Http\Controllers\Api;

use App\Events\ProductViewEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ProductResource;
use App\Models\RatingProduct;
use Illuminate\Http\Request;
use App\Http\Traits\ApiTrait;
use App\Models\Product;

class ProductController extends Controller
{
  use ApiTrait;

  public function ratingProduct(Request $request)
  {
    $rating = RatingProduct::where('user_id',  auth()->user()->id)->where('product_id', $request->product_id)->first();

    $data = $this->validate(request(),
    [
      'product_id' => 'required|integer|max:12',
      'rating'     => 'required|in:1,2,3,4,5',
      'comment'    => 'required|max:1200',
    ]);

    $data['user_id'] = auth()->user()->id;

    if(!empty($rating)) {
      $rating->update($data);
    }else {
      RatingProduct::create($data);
    }
    return $this->sendResponse('', 'Product rating add successfully');
  }

  public function getProduct($id)
  {
    // $product = Product::find($id);
    $product = new ProductResource(Product::find($id));
    event(new ProductViewEvent($product->id));

    $data = [
      'product' => $product,
      // 'department' => $product->department()->department_name_en,
    ];
    return $this->sendResponse($data, 'Product get successfully');
    // return $this->sendResponse(ProductResource::collection($product), 'Product rating add successfully');
  }
}
