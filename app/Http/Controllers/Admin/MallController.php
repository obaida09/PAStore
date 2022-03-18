<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\MallDataTable;
use App\Http\Controllers\Controller;
use App\Models\Mall;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Http\Requests\MallRequest;

class MallController extends Controller
{
  public function index(MallDataTable $mall)
  {
    $title = 'Control Mall';
    $country = Country::all()->pluck('country_name_'.lang() , 'id');
    return $mall->render('admin.malls.index', compact('title', 'country'));
  }

  public function store(MallRequest $request)
  {
    if ($request->ajax()) {
      Mall::create($request->all());
      return 'Mall Create successfully';
    }
    return abort('403');
  }

  public function edit($id)
  {
    $data = Mall::find($id);
    return response()->json($data);
  }


  public function update(MallRequest $request, $id)
  {
    if ($request->ajax()) {
      Mall::where('id', $id)->update($request->all());
      return 'Mall Update successfully';
    }
    return abort('403');
  }


  public function destroy(Request $request, $id)
  {
    if ($request->ajax()) {
      $mall = Mall::find($id);
      $mall->delete();
      return 'Mall Delete successfully';
    }
    return abort('403');
  }

  public function multi_delete(Request $request) 
  {
    if ($request->ajax()) {
      $item = request('item');
      if ($item != null ) {
        if (is_array($item) && $item != null ) {
          Mall::destroy($item);
        } else {
          Mall::find($item)->delete();
        }
        return 'Cities Deleted successfully';
      }
    }
    return abort('403');
  }
}
