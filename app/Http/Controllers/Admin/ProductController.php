<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\ProductDataTable;
use App\Http\Controllers\Controller;
use App\Models\Color;
use App\Models\ManuFacturers;
use App\Models\OtherData;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Size;
use App\Models\TradeMark;
use App\Models\Weight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
  public function index(ProductDataTable $product)
  {
    $title = 'Control Product';
    return $product->render('admin.products.index', compact('title'));
  }

    public function create()
    {
      $product = Product::create(['title' => '']);
      if (!empty($product)) {
        return redirect('admin/product/'.$product->id.'/edit');
      }
    }


    public function store(Request $request)
    {
      dd($request->all());
      $data = $this->validate(request(),
			[

			]);


      ProductImage::create([
        // 'product_id' => product->id;
      ]);
      return redirect()->route('product.index')->with('success','Product delete successfully');
    }

    public function show(Product $product)
    {
        //
    }


    public function edit($id)
    {
      $title = 'Create or Edit Products';
      $product = Product::find($id);
      $color = Color::get()->all();
      $tradeMark = TradeMark::get()->all();
      $manuFacturer = ManuFacturers::get()->all();
      return view('admin.products.product', get_defined_vars());
    }


    public function update(Request $request, $id)
    {
      $product = Product::find($id);
      $productImage = ProductImage::where('product_id', $id)->first();

      $data = $this->validate(request(),
			[
				'title'          => 'required',
				'content'        => 'required',
				'department_id'  => 'required|numeric',
				'trade_id'       => 'required|numeric',
				'manu_id'        => 'required|numeric',
				'color_id'       => 'sometimes|nullable|numeric',
				'size_id'        => 'sometimes|nullable|numeric',
				'size'           => 'sometimes|nullable',
				'currency_id'    => 'sometimes|nullable|numeric',
				'price'          => 'required|numeric',
				'stock'          => 'required|numeric',
				'start_at'       => 'required|date',
				'end_at'         => 'required|date',
				'start_offer_at' => 'sometimes|nullable|date',
				'end_offer_at'   => 'sometimes|nullable|date',
				'price_offer'    => 'sometimes|nullable|numeric',
				'weight'         => 'sometimes|nullable',
				'weight_id'      => 'sometimes|nullable|numeric',
				'status'         => 'sometimes|nullable|in:pending,refused,active',
				'reason'         => 'sometimes|nullable|numeric',
        'photo'          => 'image|mimes:jpeg,png,jpg,gif,svg'

			]);

      if($request->has('photo')) {

        foreach($request->file('photo') as $photo) {
          $newPhoto = time().$photo->getClientOriginalName();
          $photo->move('admin/uploads/product/pr'. $id . '/',$newPhoto);
          $newName = 'admin/uploads/product/pr' . $id . '/' .  $newPhoto;

          ProductImage::create([
            'product_id' => $product->id,
            'name' => $newName,
          ]);
        }
      }
      if($productImage == null) {
        return redirect()->back()->with('empty_img','This Field is required');
      }


      if (request()->has('input_value') && request()->has('input_key')) {

        $i          = 0;
        $other_data = '';
        OtherData::where('product_id', $id)->delete();
        foreach (request('input_key') as $key) {
          $data_value = !empty(request('input_value')[$i])?request('input_value')[$i]:'';
          OtherData::create([
              'product_id' => $id,
              'data_key'   => $key,
              'data_value' => $data_value,
          ]);
          $i++;
        }
        $data['other_data'] = rtrim($other_data, '|');
      }



		Product::where('id', $id)->update($data);

		return redirect()->back()->with('success','Product delete successfully');
    }


    public function destroy($id)
    {
      $product = Product::find($id);
      $product->delete();

      // Delete File Image
      Storage::deleteDirectory(public_path('uploads\product\pr'.$id));

      return redirect()->route('product.index')->with('success','Product delete successfully');
    }
}
