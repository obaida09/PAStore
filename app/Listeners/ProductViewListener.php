<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Session;
use App\Events\ProductViewEvent;
use App\Models\ProductViews;

class ProductViewListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(ProductViewEvent $event)
    {
      $id = $event->product_id;
      $productViews = ProductViews::where('product_id', $id)->first();
      $key = 'product-'. $id;

      if(!Session::has($key))
      {
        if(empty($productViews)) {
          ProductViews::create([
            'product_id'  => $id,
            'views_count' => 1,
          ]);
        }else {
          $productViews->views_count++;
          $productViews->save();
        }
        Session::put($key, $id);
      }
    }
}
