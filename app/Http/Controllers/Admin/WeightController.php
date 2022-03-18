<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\WeightDataTable;
use App\Http\Controllers\Controller;
use App\Models\Weight;
use Illuminate\Http\Request;
use App\Http\Requests\WeightRequest;

class WeightController extends Controller
{
  public function index(WeightDataTable $weight)
  {
    $title = 'Control Weight';
    return $weight->render('admin.weights.index', compact('title'));
  }


  public function store(WeightRequest $request)
  {
    if ($request->ajax()) {
      Weight::create($request->all());
      return 'Weight Create successfully';
    }
    return abort('403');
  }


  public function edit($id)
  {
    $data = Weight::find($id);
    return response()->json($data);
  }


  public function update(WeightRequest $request, $id)
  {
    if ($request->ajax()) {
      Weight::where('id', $id)->update($request->all());
      return 'Weight Update successfully';
    }
    return abort('403');
  }


  public function destroy(request $request, $id)
  {
    if ($request->ajax()) {
      $Weight = Weight::find($id);
      $Weight->delete();
      return 'Weight Delete successfully';
    }
    return abort('403');
  }

  public function multi_delete(request $request) 
  {
    if ($request->ajax()) {
      $item = request('item');
      if ($item != null ) {
        if (is_array($item) && $item != null ) {
          Weight::destroy($item);
        } else {
          Weight::find($item)->delete();
        }
        return 'weights Deleted successfully';
      }
    }
    return abort('403');
  }
}
