<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\AdminDataTable;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Http\Requests\AdminRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule as ValidationRule;

class AdminController extends Controller
{
  public function index(AdminDataTable $admin)
  {
    $title = 'Admin Control';
    return $admin->render('admin.admins.index', compact('title'));
  }

  public function create()
  {
    return view('admin.admins.create');
  }

  public function store(AdminRequest $request)
  {
    $request['password'] = Hash::make($request->password);
    $validated = $request->safe()->except(['password_confirmation']);

    if ($request->ajax()) {
      Admin::create($validated);
      return 'Admin Create successfully';
    }
    return abort('403');
   
  }

  public function show($id)
  {
    //
  }

  public function edit($id)
  {
    $admin  = Admin::find($id);
    $title  = __('admin.edit');
    return view('admins.edit', compact('admin', 'title'));
  }

  public function update(AdminRequest $request, $id)
  {
    $admin = Admin::find($id);

    $this->validate($request, [
      'name' => ['required', 'string', 'max:20'],
      'password' => ['sometimes', 'nullable', 'min:8', 'confirmed'],
      'email' => [
        'required', 'email', 'max:255',
        ValidationRule::unique('admins')->ignore($id),
      ],
    ]);

    if ($request->password !== null) {
      $admin->password  = Hash::make($request->password);
    }

    Admin::where('id', $id)->update([
      'name' => $request->name,
      'email' => $request->email,
      'password' => $admin->password,
    ]);

    return redirect()->back()->with('succeed', 'Profile Update Successful');
  }

  public function destroy($id)
  {
    $admin = Admin::find($id);
    $admin->delete();
    return redirect()->route('admin.index')->with('success', 'User delete successfully');
  }

  public function multi_delete()
  {

    if (is_array(request('item'))) {
      Admin::destroy(request('item'));
    } else {
      Admin::find(request('item'))->delete();
    }

    return redirect()->route('admin.index')->with('success', 'User delete successfully');
  }
}
