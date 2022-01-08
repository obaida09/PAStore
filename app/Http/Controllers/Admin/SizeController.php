<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\SizeDataTable;
use App\Http\Controllers\Controller;
use App\Models\Size;
use App\Models\Department;
use Illuminate\Http\Request;

class SizeController extends Controller
{
  public function index(SizeDataTable $size)
  {
    $title = 'Control Size';
    return $size->render('admin.sizes.index', compact('title'));
  }


    public function create()
    {
      $department = Department::all();
      $title = 'Create Size';
		  return view('admin.sizes.create', compact('department', 'title'));
    }


    public function store(Request $request)
    {
      $data = $this->validate(request(),
			[
        'name_ar'       => 'required',
        'name_en'       => 'required',
        'department_id' => 'required|numeric',
        'is_public'     => 'required|in:yes,no',
			]);

		Size::create($data);
		return redirect()->route('size.index')->with('success','Country delete successfully');
    }

    public function show(Size $size)
    {
        //
    }


    public function edit($id)
    {
    $size = Size::find($id);
    $department = Department::all();
		$title   = 'Size Edit';
		return view('admin.sizes.edit', compact('size', 'department', 'title'));
    }


    public function update(Request $request, $id)
    {
      $data = $this->validate(request(),
			[
        'name_ar'       => 'required',
        'name_en'       => 'required|min:8',
        'department_id' => 'required|numeric',
        'is_public'     => 'required|in:yes,no',
			]);

		Size::where('id', $id)->update($data);
		return redirect()->back()->with('success','Country delete successfully');
    }


    public function destroy($id)
    {
      $size = Size::find($id);
      $size->delete();
      return redirect()->route('size.index')->with('success','Country delete successfully');
    }
}
