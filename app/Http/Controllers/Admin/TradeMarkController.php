<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\TradeMarkDataTable;
use App\Http\Controllers\Controller;
use App\Models\TradeMark;
use Illuminate\Http\Request;
use App\Http\Requests\TradeMarkRequest;

class TradeMarkController extends Controller
{

    public function index(TradeMarkDataTable $trademark)
    {
       $title = 'Control TradeMark';
		return $trademark->render('admin.trademarks.index', compact('title'));
    }


    public function create()
    {
      $title = 'Create TradeMark';
		return view('admin.trademarks.create', compact('title'));
    }


    public function store(TradeMarkRequest $request)
    {
      if ($request->ajax()) {
        TradeMark::create($request->all());
        return 'TradeMark Create successfully';
      }
      return abort('403');
    }

    
    public function edit($id)
    {
      $data = TradeMark::find($id);
      return response()->json($data);
    }

    public function update(TradeMarkRequest $request, $id)
    {
      if ($request->ajax()) {
      TradeMark::where('id', $id)->update($request->all());
      return 'TradeMark Update successfully';
    }
    return abort('403');
    }


    public function destroy($id)
    {
      if ($request->ajax()) {
        $trade = TradeMark::find($id);
        $trade->delete();
        return 'TradeMark Delete successfully';
      }
      return abort('403');
    }

    public function multi_delete() 
    {
      if ($request->ajax()) {
        $item = request('item');
        if ($item != null ) {
          if (is_array($item) && $item != null ) {
            TradeMark::destroy($item);
          } else {
            TradeMark::find($item)->delete();
          }
          return 'Cities Deleted successfully';
        }
      }
      return abort('403');
      }
}
