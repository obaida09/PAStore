<?php

namespace App\Http\Traits;


trait ApiTrait
{
  public function sendResponse($result, $message, $code=200)
  {
    $response = [
      'success' => true,
      'code'    => $code,
      'data'    => $result,
      'message' => $message,
    ];
    return response()->json($response);
  }

  public function sendError($error, $code=404)
  {
    $response = [
      'success' => false,
      'code'    => $code,
      'data'    => $error,
    ];
    return response()->json($response);
  }
}
