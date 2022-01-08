<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\ColorDataTable;
use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
  public function index(ColorDataTable $color)
  {
    $title = 'Control Color';
    return $color->render('admin.colors.index', compact('title'));
  }


    public function create()
    {
      $title = 'Create Color';
		  return view('admin.colors.create', compact('title'));
    }


    public function store(Request $request)
    {
      $data = $this->validate(request(),
			[
				'name_ar' => 'required',
				'name_en' => 'required',
        'color' => 'required',
			]);

		Color::create($data);
		return redirect()->route('color.index')->with('success','Color delete successfully');
    }

    public function show(Color $color)
    {
        //
    }


    public function edit($id)
    {
    $color = Color::find($id);
		$title   = 'City Edit';
		return view('admin.colors.edit', compact('color', 'title'));
    }


    public function update(Request $request, $id)
    {
      $data = $this->validate(request(),
			[
				'name_ar' => 'required',
				'name_en' => 'required',
        'color' => 'required',
			]);

		Color::where('id', $id)->update($data);
		return redirect()->back()->with('success','Color delete successfully');
    }


    public function destroy($id)
    {
      $color = Color::find($id);
      $color->delete();
      return redirect()->route('color.index')->with('success','Color delete successfully');
    }
}
