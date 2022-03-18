<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\UserDataTable;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  public function index(UserDataTable $user)
  {
    $title = 'User Control';
    return $user->render('admin.users.index', compact('title'));
  }

  public function store(UserRequest $request)
  {
    $request['password'] = Hash::make($request->password);
    $validated = $request->safe()->except(['password_confirmation']);

    if ($request->ajax()) {
      User::create($validated);
      return 'User Create successfully';
    }
    return abort('403');
  }

  public function edit($id)
  {
    $data = User::find($id);
    return response()->json($data);
  }

  public function update(UserRequest $request, $id)
  {
    if($request->password !== null) {
      $request['password']  = Hash::make($request->password);
    }else{
      unset($request['password']);
    }
    $validated = $request->safe()->except(['password_confirmation']);

    if ($request->ajax()) {
      User::where('id', $id)->update($request->all());
      return 'User Update successfully';
    }
    return abort('403');
  }

  public function destroy(Request $request, $id)
  {

    if ($request->ajax()) {
      $user = User::find($id);
      $user->delete();
      return 'User Delete successfully';
    }
    return abort('403');
  }

  public function multi_delete(Request $request) {
    if ($request->ajax()) {
      $item = request('item');
      if ($item != null ) {
        if (is_array($item) && $item != null ) {
          User::destroy($item);
        } else {
          User::find($item)->delete();
        }
        return 'Users Deleted successfully';
      }
    }
    return abort('403');
  }
}
