<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\WeightDataTable;
use App\Http\Controllers\Controller;
use App\Models\Weight;
use Illuminate\Http\Request;

class WeightController extends Controller
{
  public function index(WeightDataTable $weight)
  {
    $title = 'Control Weight';
    return $weight->render('admin.weights.index', compact('title'));
  }


    public function create()
    {
      $title = 'Create Weight';
		  return view('admin.weights.create', compact('title'));
    }


    public function store(Request $request)
    {
      $data = $this->validate(request(),
			[
        'name_ar'       => 'required',
        'name_en'       => 'required',
			]);

		Weight::create($data);
		return redirect()->route('weight.index')->with('success','Country delete successfully');
    }

    public function show(Weight $weight)
    {
        //
    }


    public function edit($id)
    {
    $weight = Weight::find($id);
		$title   = 'Size Edit';
		return view('admin.weights.edit', compact('weight', 'title'));
    }


    public function update(Request $request, $id)
    {
      $data = $this->validate(request(),
			[
        'name_ar'       => 'required',
        'name_en'       => 'required',
			]);

		Weight::where('id', $id)->update($data);
		return redirect()->back()->with('success','Country delete successfully');
    }


    public function destroy($id)
    {
      $weight = Weight::find($id);
      $weight->delete();
      return redirect()->route('weight.index')->with('success','Country delete successfully');
    }
}
