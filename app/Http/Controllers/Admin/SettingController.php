<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
  public function setting() {
    $title = 'Admin Settings';
		return view('admin.settings', compact('title'));
	}

	public function setting_save() {
		$data = $this->validate(request(),
		[
			'sitename_ar' => 'required',
			'sitename_en' => 'required',
		]);

		// if (request()->hasFile('logo')) {
		// 	$data['logo'] = up()->upload([
		// 			'file'        => 'logo',
		// 			'path'        => 'settings',
		// 			'upload_type' => 'single',
		// 			'delete_file' => setting()->logo,
		// 		]);
		// }

		// if (request()->hasFile('icon')) {
		// 	$data['icon'] = up()->upload([
		// 			'file'        => 'icon',
		// 			'path'        => 'settings',
		// 			'upload_type' => 'single',
		// 			'delete_file' => setting()->icon,
		// 		]);
		// }
		Setting::create($data);
		session()->flash('success', trans('admin.updated_record'));
		return redirect('admin/settings');
	}

}
