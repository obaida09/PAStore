<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Traits\ApiTrait;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
  use ApiTrait;

  public function login(Request $request)
  {
    $myTTL = 120;
    $data = Validator::make($request->all(), [
      'email' => 'required|email',
      'password' => 'required|string|min:6',
    ]);

    if ($data->fails()) {
      return $this->sendError($data->errors(), $data->errors(), 400);
    }

    if (JWTAuth::attempt($data->validated())) {
      $user = Auth::user();

      request(['remember_me']) == true ?  $myTTL =  10080 : false;

      JWTAuth::factory()->setTTL($myTTL);
      $token = JWTAuth::fromUser($user);
      $success['name'] = $user->name;
      $success['token'] = $token;
      $success['expire_token'] = $myTTL;

      return $this->sendResponse($success, 'User successfully signed in');
    } else {
      return $this->sendError('Please Check your Auth', ['error' => 'Unauthorised']);
    }
  }

  public function register(Request $request)
  {

    $data = $this->validate($request, [
      'name' => 'required|string|between:2,100',
      'email' => 'required|string|email|max:100|unique:users',
      'password' => 'required|min:6',
    ]);

    // if ($data->fails()) {
    //   return $this->sendError('Please validate error', $data->errors(), 400);
    // }

    $data['password'] =  Hash::make($request->password);
    $user = User::create($data);

    // make token
    $token = JWTAuth::fromUser($user);
    $success['name'] = $user->name;
    $success['email'] = $user->email;
    $success['token'] = $token;

    return $this->sendResponse($success, 'User successfully registered');
  }

  public function logout()
  {
    auth()->logout();

    return response()->json(['message' => 'User successfully signed out']);
  }

  // public function refresh()
  // {
  //   return $this->createNewToken(auth()->refresh());
  // }

  public function userProfile()
  {
    return session()->all();
    return response()->json(auth()->user());
  }

  protected function createNewToken($token)
  {
    // return response()->json([
    //   'access_token' => $token,
    //   'token_type' => 'bearer',
    //   'expires_in' => auth()->factory()->getTTL() * 60,
    //   'user' => auth()->user()
    // ]);
  }
}
