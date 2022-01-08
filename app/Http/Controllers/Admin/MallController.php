<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\MallDataTable;
use App\Http\Controllers\Controller;
use App\Models\Mall;
use App\Models\Country;
use Illuminate\Http\Request;

class MallController extends Controller
{
  public function index(MallDataTable $mall)
  {
    $title = 'Control Mall';
    return $mall->render('admin.malls.index', compact('title'));
  }


  public function create()
  {
    $title = 'Create Mall';
    $country = Country::all();
    return view('admin.malls.create', compact('country', 'title'));
  }


  public function store(Request $request)
  {
    $data = $this->validate(
      request(),
      [
        'name_ar'      => 'required',
        'name_en'      => 'required',
        'mobile'       => 'required|numeric',
        'email'        => 'required|email',
        'address'      => 'sometimes|nullable',
        'facebook'     => 'sometimes|nullable|url',
        'twitter'      => 'sometimes|nullable|url',
        'website'      => 'sometimes|nullable|url',
        'contact_name' => 'sometimes|nullable|string',
        'lat'          => 'sometimes|nullable',
        'lng'          => 'sometimes|nullable',
        'country_id'   => 'required|integer',
        // 'logo'            => 'required|'.v_image(),
      ]
    );

    Mall::create($data);
    return redirect()->route('mall.index')->with('success', 'Mall delete successfully');
  }


  public function show(Mall $Mall)
  {
    //
  }


  public function edit($id)
  {
    $mall = Mall::find($id);
    $country = Country::all();
    $title   = trans('admin.edit');
    return view('admin.malls.edit', compact('mall', 'country', 'title'));
  }


  public function update(Request $request, $id)
  {

    $data = $this->validate(
      request(),
      [
        'name_ar'      => 'required',
        'name_en'      => 'required',
        'mobile'       => 'required|numeric',
        'email'        => 'required|email',
        'address'      => 'sometimes|nullable',
        'facebook'     => 'sometimes|nullable|url',
        'twitter'      => 'sometimes|nullable|url',
        'website'      => 'sometimes|nullable|url',
        'contact_name' => 'sometimes|nullable|string',
        'lat'          => 'sometimes|nullable',
        'lng'          => 'sometimes|nullable',
        'country_id'   => 'required|integer',
        // 'logo'            => 'sometimes|nullable|'.v_image(),
      ]
    );


    Mall::where('id', $id)->update($data);
    return redirect()->back()->with('success', 'Mall delete successfully');
  }


  public function destroy($id)
  {
    $mall = Mall::find($id);
    $mall->delete();
    return redirect()->route('mall.index')->with('success', 'Mall delete successfully');
  }
}
