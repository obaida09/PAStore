<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\DataTables\CountryDataTable;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Http\Requests\CountryRequest;

class CountryController extends Controller
{

  public function index(CountryDataTable $country) {
    $title = 'Control Country';
		return $country->render('admin.countries.index', compact('title'));
	}

	public function store(CountryRequest $request) {
    if ($request->ajax()) {
      Country::create($request->all());
      return 'Country Create successfully';
    }
    return abort('403');
	}


	public function edit($id) {
		$data = Country::find($id);
    return response()->json($data);
	}


  public function update(CountryRequest $request, $id)
  {
		if ($request->ajax()) {
			Country::where('id', $id)->update($request->all());
		return 'Country Update successfully';
    }
    return abort('403');
	}


  public function destroy(Request $request, $id)
  {
		if ($request->ajax()) {
			$country = Country::find($id);
			$country->delete();
      return 'Country Delete successfully';
    }
    return abort('403');
  }

	public function multi_delete(Request $request) {
		if ($request->ajax()) {
      $item = request('item');
      if ($item != null ) {
        if (is_array($item) && $item != null ) {
          Country::destroy($item);
        } else {
          Country::find($item)->delete();
        }
        return 'Countries Deleted successfully';
      }
    }
    return abort('403');
	}
}
