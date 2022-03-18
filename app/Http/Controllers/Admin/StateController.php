<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\StateDataTable;
use App\Http\Controllers\Controller;
use App\Models\State;
use App\Models\City;
use Illuminate\Http\Request;
use App\Http\Requests\StateRequest;

class StateController extends Controller
{
    public function index(StateDataTable $state)
    {
      $title = 'Control State';
      $city = City::all()->pluck('city_name_'.lang() , 'id');
		  return $state->render('admin.states.index', compact('title', 'city'));
    }

    public function store(StateRequest $request)
    {
      if ($request->ajax()) {
        State::create($request->all());
        return 'State Create successfully';
      }
      return abort('403');
    }

    public function edit($id)
    {
      $data = State::find($id);
      return response()->json($data);
    }

    public function update(StateRequest $request, $id)
    {
      if ($request->ajax()) {
        State::where('id', $id)->update($request->all());
        return 'State Update successfully';
      }
      return abort('403');
    }

    public function destroy(Request $request, $id)
    {
      if ($request->ajax()) {
        $city = State::find($id);
        $city->delete();
        return 'State Delete successfully';
      }
      return abort('403');
    }

    public function multi_delete(Request $request) {
      if ($request->ajax()) {
        $item = request('item');
        if ($item != null ) {
          if (is_array($item) && $item != null ) {
            State::destroy($item);
          } else {
            State::find($item)->delete();
          }
          return 'States Deleted successfully';
        }
      }
      return abort('403');
    }
}
