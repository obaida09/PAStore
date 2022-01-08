<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Mail\AdminResetPassword;
use Carbon\Carbon;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AdminAuth extends Controller
{
  public function login() {

		return view('admin.login');
	}

	public function dologin(Request $request) {
    $validated = $request->validate([
      'email' => 'required|max:255|email',
      'password' => 'required',
    ]);

		$rememberme = request('rememberme') == 1 ? true:false;
		if (Auth::guard('admin')->attempt(['email' => $request->email, 'password' => $request->password], $rememberme)) {
			return redirect('admin/home');
		} else {
			session()->flash('error', trans('admin.inccorrect_information_login'));
      return redirect()->back()->withInput($request->only('email', 'remember'));
		}

	}

	public function logout() {
		Auth::guard('admin')->logout();
		return redirect('admin/login');
	}

  public function forgot_password() {
		return view('admin.forgot_password');
	}

	public function forgot_password_post(Request $request) {

    $validated = $request->validate([
      'email' => 'required|max:255|email',
    ]);

		$admin = Admin::where('email', request('email'))->first();
		if (!empty($admin)) {
			$token = app('auth.password.broker')->createToken($admin);
			$data  = DB::table('password_resets')->insert([
					'email'      => $admin->email,
					'token'      => $token,
					'created_at' => Carbon::now(),
			]);
      // return new AdminResetPassword(['data' => $admin, 'token' => $token]);

			Mail::to($admin->email)->send(new AdminResetPassword(['data' => $admin, 'token' => $token]));
			session()->flash('success', trans('admin.the_link_reset_sent'));

		}
    return back();
	}

  public function reset_password($token) {

	  $check_token = DB::table('password_resets')->where('token', $token)->where('created_at', '>', Carbon::now()->subHours(2))->first();

		if (!empty($check_token)) {
			return view('admin.reset_password', ['data' => $check_token]);
		} else {
      return redirect('admin/forgot/password');
		}

	}

  public function reset_password_final($token) {
    $this->validate(request(), [
      'password'           => 'required|min:8',
      'password_confirmed' => 'required',
		]);

	  $check_token = DB::table('password_resets')->where('token', $token)->where('created_at', '>', Carbon::now()->subHours(2))->first();

    if (!empty($check_token)) {
			$admin = DB::table('admins')->where('email', $check_token->email)->update([
        'email'    => $check_token->email,
        'password' => Hash::make(request('password')),
			]);

			DB::table('password_resets')->where('email', request('email'))->delete();
			Auth::guard('admin')->attempt(['email' => $check_token->email, 'password' => request('password')], false);
			return redirect('admin/home');
		} else {
			return redirect('admin/forgot/password');
		}
	}
}
