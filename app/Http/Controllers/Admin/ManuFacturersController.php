<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\DataTables\ManuFacturersDataTable;
use App\Models\ManuFacturers;
use Illuminate\Http\Request;

class ManuFacturersController extends Controller
{

  public function index(ManuFacturersDataTable $mf)
  {
    $title = 'Control ManuFacturers';
    return $mf->render('admin.manufactures.index', compact('title'));
  }


  public function create()
  {
    $title = 'Create ManuFacturers';
    return view('admin.manufactures.create', compact('title'));
  }


  public function store(Request $request)
  {
      $data = $this->validate(request(),
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
      // 'logo'            => 'required|'.v_image(),
    ]);


  ManuFacturers::create($data);

  return redirect()->route('manufacture.index')->with('success','ManuFacturers delete successfully');
  }


    public function show(ManuFacturers $manuFacturers)
    {
        //
    }


  public function edit($id) {
		$mf = ManuFacturers::find($id);
		$title   = trans('admin.edit');
		return view('admin.manufactures.edit', compact('mf', 'title'));
	}


  public function update(Request $request, $id)
  {

		$data = $this->validate(request(),
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
				// 'logo'            => 'sometimes|nullable|'.v_image(),
			]);


		ManuFacturers::where('id', $id)->update($data);
		return redirect()->back()->with('success','ManuFacturers delete successfully');
	}


  public function destroy($id)
  {
    $mf = ManuFacturers::find($id);
    $mf->delete();
    return redirect()->route('manufacture.index')->with('success','ManuFacturers delete successfully');
  }
}
