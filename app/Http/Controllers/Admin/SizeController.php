<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\SizeDataTable;
use App\Http\Controllers\Controller;
use App\Models\Size;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Requests\SizeRequest;

class SizeController extends Controller
{
  public function index(SizeDataTable $size)
  {
    $title = 'Control Size';
    $department = Department::all();
    return $size->render('admin.sizes.index', compact('title', 'department'));
  }


  public function store(SizeRequest $request)
  {
    if ($request->ajax()) {
      Size::create($request->all());
      return 'Size Create successfully';
    }
    return abort('403');
  }


  public function edit($id)
  {
    $data = Size::find($id);
    return response()->json($data);
  }


  public function update(SizeRequest $request, $id)
  {
    if ($request->ajax()) {
    Size::where('id', $id)->update($request->all());
    return 'Size Update successfully';
    }
    return abort('403');
  }


  public function destroy(request $request, $id)
  {
    if ($request->ajax()) {
      $size = Size::find($id);
      $size->delete();
      return 'Size Delete successfully';
    }
    return abort('403');
  }

  public function multi_delete(request $request) 
  {
  if ($request->ajax()) {
    $item = request('item');
    if ($item != null ) {
      if (is_array($item) && $item != null ) {
        Size::destroy($item);
      } else {
        Size::find($item)->delete();
      }
      return 'Sizes Deleted successfully';
    }
  }
  return abort('403');
  }
}
