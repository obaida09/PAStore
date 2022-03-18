<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\DataTables\ManuFacturersDataTable;
use App\Models\ManuFacturers;
use Illuminate\Http\Request;
use App\Http\Requests\ManufacturesRequest;

class ManuFacturersController extends Controller
{

  public function index(ManuFacturersDataTable $mf)
  {
    $title = 'Control ManuFacturers';
    return $mf->render('admin.manufactures.index', compact('title'));
  }

  public function store(ManufacturesRequest $request)
  {
    if ($request->ajax()) {
      ManuFacturers::create($request->all());
      return 'ManuFacturers Create successfully';
    }
    return abort('403');
  }


  public function edit($id) {
    $data = ManuFacturers::find($id);
    return response()->json($data);
	}


  public function update(ManufacturesRequest $request, $id)
  {
    if ($request->ajax()) {
      ManuFacturers::where('id', $id)->update($request->all());
      return 'ManuFacturers Update successfully';
    }
    return abort('403');
	}


  public function destroy(Request $request, $id)
  {
     if ($request->ajax()) {
      $mf = ManuFacturers::find($id);
      $mf->delete();
      return 'ManuFacturers Delete successfully';
    }
    return abort('403');
  }

  public function multi_delete(Request $request) {

    if ($request->ajax()) {
      $item = request('item');
      if ($item != null ) {
        if (is_array($item) && $item != null ) {
          ManuFacturers::destroy($item);
        } else {
          ManuFacturers::find($item)->delete();
        }
        return 'ManuFactures Deleted successfully';
      }
    }
    return abort('403');
  }
}
