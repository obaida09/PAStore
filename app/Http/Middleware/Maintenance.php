<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use App\Http\Traits\ApiTrait;

class Maintenance
{
  use ApiTrait;
    public function handle(Request $request, Closure $next)
    {
      if(1==1) {
        return $this->sendError('Maintenance is Invalid', '', '401');
      }else {
        return $next($request);
      }
    }
}
