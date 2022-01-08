<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class HomeController extends Controller
{
        /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('admin:admin');
    }

    /**
     * where('created_at','>=',Carbon::now()->subdays(60))->get(['name','created_at'])
     *
     * where('last_login_at', '>=', new DateTime('-1 months'))->get()
     * Show the application dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
      $user = User::get();
      $userLastMonth = User::where('created_at','<=',Carbon::now()->subdays(30))->get(['name','created_at']);
        return view('admin.home', get_defined_vars());
    }
}
