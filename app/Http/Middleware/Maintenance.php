<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;


class Maintenance
{

    public function handle(Request $request, Closure $next)
    {
      if(Setting::first()->status == 'close') {
        return redirect('maintenance');
      }else {
        return $next($request);
      }
    }
}
