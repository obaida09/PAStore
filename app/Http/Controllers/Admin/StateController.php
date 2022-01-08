<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\StateDataTable;
use App\Http\Controllers\Controller;
use App\Models\State;
use App\Models\City;
use Illuminate\Http\Request;

class StateController extends Controller
{
    public function index(StateDataTable $state)
    {
      $title = 'Control State';
		  return $state->render('admin.states.index', compact('title'));
    }

    public function create()
    {
      $city = City::all();
      $title = 'Create State';
		  return view('admin.states.create', compact('city', 'title'));
    }

    public function store(Request $request)
    {
      $data = $this->validate(request(),
			[
				'state_name_ar' => 'required',
				'state_name_en' => 'required',
        'city_id'       => 'required|integer',
			]);

		State::create($data);
		return redirect()->route('state.index')->with('success','State delete successfully');
    }

    public function show(State $state)
    {
        //
    }

    public function edit($id)
    {
      $state = State::find($id);
      $city = City::all();
      $title   = 'State Edit';
      return view('admin.states.edit', compact('state', 'city', 'title'));
    }

    public function update(Request $request, $id)
    {
      $data = $this->validate(request(),
			[
				'state_name_ar' => 'required',
				'state_name_en' => 'required',
        'city_id'       => 'required|integer',
			]);

		State::where('id', $id)->update($data);
		  return redirect()->back()->with('success','State delete successfully');
    }

    public function destroy($id)
    {
      $state = State::find($id);
      $state->delete();
      return redirect()->route('state.index')->with('success','State delete successfully');
    }
}
