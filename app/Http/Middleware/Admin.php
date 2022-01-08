<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next = null, $guard = null)
    {
      // dd(auth()->guard('admin')->check());
      if (Auth::guard($guard)->check()) {
        return $next($request);
        // return redirect('home');
      }else {
        return redirect('admin/login');
      }

    }
}
