<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\TradeMarkDataTable;
use App\Http\Controllers\Controller;
use App\Models\TradeMark;
use Illuminate\Http\Request;

class TradeMarkController extends Controller
{

    public function index(TradeMarkDataTable $trademark)
    {
       $title = 'Control TradeMark';
		return $trademark->render('admin.trademarks.index', compact('title'));
    }


    public function create()
    {
      $title = 'Create TradeMark';
		return view('admin.trademarks.create', compact('title'));
    }


    public function store(Request $request)
    {
      $data = $this->validate(request(),
			[
				'trade_name_ar' => 'required',
				'trade_name_en' => 'required',
				// 'logo'            => 'required|'.v_image(),
			]);

		// if (request()->hasFile('logo')) {
		// 	$data['icon'] = up()->upload([
		// 			'file'        => 'logo',
		// 			'path'        => 'countries',
		// 			'upload_type' => 'single',
		// 			'delete_file' => '',
		// 		]);
		// }

		TradeMark::create($data);

		return redirect()->route('trademark.index')->with('success','TradeMark delete successfully');
    }


    public function show(TradeMark $tradeMark)
    {
        //
    }


    public function edit($id)
    {
      $trademark = TradeMark::find($id);
		$title   = trans('admin.edit');
		return view('admin.trademarks.edit', compact('trademark', 'title'));
    }

    public function update(Request $request, $id)
    {
      $data = $this->validate(request(),
			[
				'trade_name_ar' => 'required',
				'trade_name_en' => 'required',
				// 'logo'            => 'required|'.v_image(),
			]);

		// if (request()->hasFile('logo')) {
		// 	$data['logo'] = up()->upload([
		// 			'file'        => 'logo',
		// 			'path'        => 'countries',
		// 			'upload_type' => 'single',
		// 			'delete_file' => TradeMark::find($id)->logo,
		// 		]);
		// }

		TradeMark::where('id', $id)->update($data);
		return redirect()->back()->with('success','TradeMark delete successfully');
    }


    public function destroy($id)
    {
      $trademark = TradeMark::find($id);
      $trademark->delete();
      return redirect()->route('trademark.index')->with('success','TradeMark delete successfully');
    }
}
