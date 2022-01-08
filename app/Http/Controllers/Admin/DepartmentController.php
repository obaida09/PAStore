<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $title = 'Create Department';
      return view('admin.departments.index', compact('title'));
    }


    public function create()
    {
      $title = 'Create Department';
      return view('admin.departments.create', compact('title'));
    }


    public function store(Request $request)
    {
      $data = $this->validate(request(),
			[
				'department_name_ar' => 'required',
				'department_name_en' => 'required',
				'parent'      => 'sometimes|nullable|numeric',
				'description' => 'sometimes|nullable',
				'keyword'     => 'sometimes|nullable',
				// 'icon'        => 'sometimes|nullable|',
			]);

		// if (request()->hasFile('logo')) {
		// 	$data['logo'] = up()->upload([
		// 			'file'        => 'logo',
		// 			'path'        => 'countries',
		// 			'upload_type' => 'single',
		// 			'delete_file' => '',
		// 		]);
		// }

		Department::create($data);

		return redirect()->route('department.index')->with('success','Country delete successfully');
    }


    public function show(Department $department)
    {
        //
    }


    public function edit($id) {
      $department = Department::find($id);
      $title      = 'admin.edit';
      return view('admin.departments.edit', compact('department', 'title'));
    }


    public function update(Request $request, $id)
    {

      $data = $this->validate(request(),
			[
				'department_name_ar' => 'required',
				'department_name_en' => 'required',
				'parent'      => 'sometimes|nullable|numeric',
				'description' => 'sometimes|nullable',
				'keyword'     => 'sometimes|nullable',
				// 'icon'        => 'sometimes|nullable|',
			]);

      // if (request()->hasFile('icon')) {
      //   $data['icon'] = up()->upload([
      //       'file'        => 'icon',
      //       'path'        => 'departments',
      //       'upload_type' => 'single',
      //       'delete_file' => Department::find($id)->icon,
      //     ]);
      // }

    Department::where('id', $id)->update($data);
		return redirect()->back()->with('success','Department Updated successfully');
    }


    public function destroy($id)
    {
      $Department = Department::find($id);
      $Department->delete();
      return redirect()->route('department.index')->with('success','Department delete successfully');
    }
}
