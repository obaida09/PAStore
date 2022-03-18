<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth as FacadesJWTAuth;
use App\Http\Traits\ApiTrait;

class Jwt
{
  use ApiTrait;

  public function handle(Request $request, Closure $next)
  {
    try {
      $user = FacadesJWTAuth::parseToken()->authenticate();
    } catch (Exception $e) {

      if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
        return $this->sendError('Token is Invalid', '', '401');
      } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
        return $this->sendError('Token is Expired', '', '403');
      } else {
        return $this->sendError('Authorization Token not found', '', '404');
      }
    }
    return $next($request);
  }
}
