<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\UserDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule as ValidationRule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UserDataTable $user)
    {
      $title = 'User Control';
      $last_15_days = User::where('created_at','>=',Carbon::now()->subdays(4))->get(['name','created_at']);

      return $user->render('admin.users.index', compact('title', 'last_15_days'));
    }

    public function create()
    {
      $title = 'Create User';
      return view('admin.users.create', compact('title'));
    }

    public function store(Request $request)
    {

      $this->validate($request, [
        'name'     => ['required', 'string', 'max:20'],
        'email'    => ['required', 'email', 'max:255', 'unique:users'],
        'level'    => ['required', 'in:user,company,vendor'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
      ]);


      User::create([
        'name' => $request->name ,
        'email' => $request->email ,
        'level' => $request->level ,
        'password' => Hash::make($request->password ),
      ]);


      return redirect()->route('user.index')->with('success','User Added Successful');
    }


    public function show($id)
    {
        //
    }

    public function edit($id)
    {
      $user  = User::find($id);
      $title  = __('admin.edit');
      return view('admin.users.edit', compact('user', 'title'));
    }

    public function update(Request $request, $id)
    {
      $user = User::find($id);

      // dd($request->all());
      $data = $this->validate($request, [
        'name'     => ['required', 'string', 'max:20'],
        // 'level'    => ['required', 'in:user,company,vendor'],
        'password' => ['sometimes', 'nullable','min:8', 'confirmed'],
        'email'    => [
          'required','email','max:255',
          ValidationRule::unique('users')->ignore($id),
      ],
      ]);

      if($request->password !== null) {
        $user->password  = Hash::make($request->password );
      }

      User::where('id', $id)->update($data);

      return redirect()->back()->with('succeed', 'Profile Update Successful');
    }

    public function destroy($id)
    {
      $user = User::find($id);
      $user->delete();
      return redirect()->route('user.index')->with('success','User delete successfully');
    }
}
