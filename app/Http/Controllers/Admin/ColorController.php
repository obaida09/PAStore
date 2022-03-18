<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\ColorDataTable;
use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;
use App\Http\Requests\ColorRequest;

class ColorController extends Controller
{
  public function index(ColorDataTable $color)
  {
    $title = 'Control Color';
    return $color->render('admin.colors.index', compact('title'));
  }


  public function store(ColorRequest $request)
  {
    if ($request->ajax()) {
      Color::create($request->all());
      return 'Color Create successfully';
    }
    return abort('403');
  }

  
  public function edit($id)
  {
    $data = Color::find($id);
    return response()->json($data);
  }


  public function update(ColorRequest $request, $id)
  {
    if ($request->ajax()) {
      Color::where('id', $id)->update($request->all());
      return 'Color Update successfully';
    }
    return abort('403');
  }


  public function destroy(Request $request, $id)
  {
    if ($request->ajax()) {
      $color = Color::find($id);
      $color->delete();
      return 'Color Delete successfully';
    }
    return abort('403');
  }

  public function multi_delete(Request $request) 
  {
    if ($request->ajax()) {
      $item = request('item');
      if ($item != null ) {
        if (is_array($item) && $item != null ) {
          Color::destroy($item);
        } else {
          Color::find($item)->delete();
        }
        return 'Cities Deleted successfully';
      }
    }
    return abort('403');
  }
}
