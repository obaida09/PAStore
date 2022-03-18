<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\CityDataTable;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Http\Requests\CityRequest;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CityController extends Controller
{

  public function index(CityDataTable $city)
  {
    $title = 'Control City';
    $country = Country::all()->pluck('country_name_'.lang() , 'id');
    return $city->render('admin.cities.index', compact('title', 'country'));
  }

  public function store(CityRequest $request)
  {
    if ($request->ajax()) {
      City::create($request->all());
      return 'City Create successfully';
    }
    return abort('403');
  }

  public function edit($id)
  {
    $data = City::find($id);
    return response()->json($data);
  }


  public function update(CityRequest $request, $id)
  {
    if ($request->ajax()) {
      City::where('id', $id)->update($request->all());
      return 'City Update successfully';
    }
    return abort('403');
  }


  public function destroy(Request $request, $id)
  {
    if ($request->ajax()) {
      $city = City::find($id);
      $city->delete();
      return 'City Delete successfully';
    }
    return abort('403');
  }

  public function multi_delete(Request $request)
  {
    if ($request->ajax()) {
      $item = request('item');
      if ($item != null ) {
        if (is_array($item) && $item != null ) {
          City::destroy($item);
        } else {
          City::find($item)->delete();
        }
        return 'Cities Deleted successfully';
      }
    }
    return abort('403');
  }
}
