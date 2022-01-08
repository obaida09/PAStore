<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\CityDataTable;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use Illuminate\Http\Request;

class CityController extends Controller
{

  public function index(CityDataTable $city)
  {
    $title = 'Control City';
    return $city->render('admin.cities.index', compact('title'));
  }


    public function create()
    {
      $country = Country::all();
      $title = 'Create City';
		  return view('admin.cities.create', compact('country', 'title'));
    }


    public function store(Request $request)
    {
      $data = $this->validate(request(),
			[
				'city_name_ar' => 'required',
				'city_name_en' => 'required',
        'country_id'   => 'required|integer',
			]);

		City::create($data);
		return redirect()->route('city.index')->with('success','Country delete successfully');
    }

    public function show(City $city)
    {
        //
    }


    public function edit($id)
    {
    $city = City::find($id);
    $country = Country::all();
		$title   = 'City Edit';
		return view('admin.cities.edit', compact('city', 'country', 'title'));
    }


    public function update(Request $request, $id)
    {
      $data = $this->validate(request(),
			[
				'city_name_ar' => 'required',
				'city_name_en' => 'required',
        'country_id'   => 'required|integer',
			]);

		City::where('id', $id)->update($data);
		return redirect()->back()->with('success','Country delete successfully');
    }


    public function destroy($id)
    {
      $city = City::find($id);
      $city->delete();
      return redirect()->route('city.index')->with('success','Country delete successfully');
    }

    public function multi_delete() {

      if(request('item') != null){
        if (is_array(request('item'))) {
          City::destroy(request('item'));
        } else {
          City::find(request('item'))->delete();
        }
      }
      return redirect('admin/city')->with('success', __('admin.deleted_record'));
    }
}
