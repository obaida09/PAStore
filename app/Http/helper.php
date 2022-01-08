<?php

use App\Models\Department;

if (!function_exists('lang')) {
	function lang() {
		if (session()->has('lang')) {
			return session('lang');
		} else {
			return 'en';
		}
	}
}

if (!function_exists('active_menu')) {
	function active_menu($link) {
		if (preg_match('/'.$link.'/i', Request::segment(2))) {
			return ['menu-open', 'active bg-gradient-primary', 'display:block'];
      false;
		}else {
			return ['', '', ''];
		}
	}
}

if (!function_exists('direction')) {
	function direction() {
		if (session()->has('lang')) {
			if (session('lang') == 'ar') {
				return 'rtl';
			} else {
				return 'ltr';
			}
		} else {
			return 'ltr';
		}
	}
}



if (!function_exists('date')) {
	function date($model) {
		function(City $City) {
      return $City->created_at->toFormattedDateString() ;
    };
	}
}


// I use this function in department index to get the data in jstree json
if (!function_exists('load_dep')) {
	function load_dep($select = null, $dep_hide = null) {

		$departments = Department::selectRaw('department_name_en as text')
			->selectRaw('id as id')
			->selectRaw('parent as parent')
			->get(['text', 'parent', 'id']);
		$dep_arr = [];
		foreach ($departments as $department) {
			$list_arr             = [];
			$list_arr['icon']     = '';
			$list_arr['li_attr']  = '';
			$list_arr['a_attr']   = '';
			$list_arr['children'] = [];

			if (null !== $select and $select == $department->id) {
				$list_arr['state'] = [
					'opened'   => true,
					'selected' => true,
					'disabled' => false,
				];
			}

			if (null !== $dep_hide and $dep_hide == $department->id) {
				$list_arr['state'] = [
					'opened'   => false,
					'selected' => false,
					'disabled' => true,
					'hidden'   => true,
				];
			}

			$list_arr['id']     = $department->id;
			$list_arr['parent'] = $department->parent > 0?$department->parent:'#';
			$list_arr['text']   = $department->text;
			array_push($dep_arr, $list_arr);
		}

		return json_encode($dep_arr, JSON_UNESCAPED_UNICODE);
	}
}





// Scan Mall Id Exists

// if (!function_exists('check_mall')) {
// 	function check_mall($id, $pid) {
// 		return \App\Models\MallProduct::where('product_id', $pid)->where('mall_id', $id)->count() > 0?true:false;
// 	}
// }
