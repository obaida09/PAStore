<?php

namespace App\Http\Livewire;

use App\Models\TradeMark as ModelsTradeMark;
use Livewire\Component;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\NumberColumn;
use Mediconesystems\LivewireDatatables\DateColumn;

class Trademark extends LivewireDatatable
{
  /* Start Variables Define */

  public $model = ModelsTradeMark::class;

  public function columns()
  {
    return [
      NumberColumn::name('id')
          ->label('ID')
          ->sortBy('id'),

      Column::name('trade_name_en')
          ->label('Name')
          ->searchable(),

      Column::name('trade_name_ar')
          ->label('Creation Date')
  ];
  }


  public $trade_name_ar= 'dafas', $trade_name_en, $modal_id, $num=3, $title;
  public $updateMode = false;

  /* End Variables Define */

  // protected $listeners = ['confirm' => 'incrementPostCount'];

  // public function incrementPostCount()
  // {
  //     dd('$this->postCount = Post::count()');
  // }

  protected $rules = [
    'trade_name_ar' => 'required',
    'trade_name_en' => 'required',
    // 'logo'            => 'required|'.v_image(),
  ];

  public function store()
  {

    $data = $this->validate();

    // if (request()->hasFile('logo')) {
    // 	$data['icon'] = up()->upload([
    // 			'file'        => 'logo',
    // 			'path'        => 'countries',
    // 			'upload_type' => 'single',
    // 			'delete_file' => '',
    // 		]);
    // }

    ModelsTradeMark::create($data);
    $this->reset();
    $this->dispatchBrowserEvent('close');
    session()->flash('message', 'Trademark successfully Created');

    // return redirect()->route('trademark.index')->with('success','TradeMark delete successfully');
  }

  public function edit($id)
  {
    $this->updateMode = true;
    $tradeMark = ModelsTradeMark::where('id',$id)->first();
    $this->modal_id = $id;
    $this->trade_name_ar = '$tradeMark->trade_name_ar';
    $this->trade_name_en = $tradeMark->trade_name_en;
  }

  public function add()
  {
    $this->num++;
  }

  public function update()
  {
    $data = $this->validate(
      request(),
      [
        'trade_name_ar' => 'required',
        'trade_name_en' => 'required',
        // 'logo'            => 'required|'.v_image(),
      ]
    );

    // if (request()->hasFile('logo')) {
    // 	$data['logo'] = up()->upload([
    // 			'file'        => 'logo',
    // 			'path'        => 'countries',
    // 			'upload_type' => 'single',
    // 			'delete_file' => TradeMark::find($id)->logo,
    // 		]);
    // }

    ModelsTradeMark::where('id', $this->modal_id)->update($data);
    $this->reset();
    $this->dispatchBrowserEvent('close');
    session()->flash('message', 'Trademark successfully Updated');
  }


  // public function render()
  // {
  //   return view('admin.trademarks.sh');
  // }
}