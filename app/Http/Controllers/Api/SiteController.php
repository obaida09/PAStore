<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Http\Traits\ApiTrait;

class SiteController extends Controller
{
    use ApiTrait;
    public function getSettings()
    {
     $data = Setting::get();
      return $this->sendResponse($data, 'Get Product\'s Setting successfully');
    }
}
