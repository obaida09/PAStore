<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\DataTables\CountryDataTable;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
  public function index(CountryDataTable $country) {
    $title = 'Control Country';
		return $country->render('admin.countries.index', compact('title'));
	}


	public function create() {
    $title = 'Create Country';
		return view('admin.countries.create', compact('title'));
	}


	public function store() {

		$data = $this->validate(request(),
			[
				'country_name_ar' => 'required',
				'country_name_en' => 'required',
				'mob'             => 'required',
				'code'            => 'required',
				// 'logo'            => 'required|'.v_image(),
			]);

		// if (request()->hasFile('logo')) {
		// 	$data['icon'] = up()->upload([
		// 			'file'        => 'logo',
		// 			'path'        => 'countries',
		// 			'upload_type' => 'single',
		// 			'delete_file' => '',
		// 		]);
		// }

		Country::create($data);

		return redirect()->route('country.index')->with('success','Country delete successfully');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id) {
		//
	}


	public function edit($id) {
		$country = Country::find($id);
		$title   = trans('admin.edit');
		return view('admin.countries.edit', compact('country', 'title'));
	}


  public function update(Request $request, $id)
  {

		$data = $this->validate(request(),
			[
				'country_name_ar' => 'required',
				'country_name_en' => 'required',
				'mob'             => 'required',
				'code'            => 'required',
				// 'logo'            => 'sometimes|nullable|'.v_image(),
			]);

		// if (request()->hasFile('logo')) {
		// 	$data['logo'] = up()->upload([
		// 			'file'        => 'logo',
		// 			'path'        => 'countries',
		// 			'upload_type' => 'single',
		// 			'delete_file' => Country::find($id)->logo,
		// 		]);
		// }

		Country::where('id', $id)->update($data);
		return redirect()->back()->with('success','Country delete successfully');
	}


  public function destroy($id)
  {
    $country = Country::find($id);
    $country->delete();
    return redirect()->route('country.index')->with('success','Country delete successfully');
  }

	public function multi_delete() {
		if (is_array(request('item'))) {
			foreach (request('item') as $id) {
				$countries = Country::find($id);
				// Storage::delete($countries->logo);
				$countries->delete();
			}
		} else {
			$countries = Country::find(request('item'));
			// Storage::delete($countries->logo);
			$countries->delete();
		}

		return redirect('admin.countries')->with('success','Country delete successfully');
	}
}
