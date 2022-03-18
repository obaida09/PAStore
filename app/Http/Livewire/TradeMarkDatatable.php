<?php

namespace App\Http\Livewire;

use App\Models\TradeMark as ModelsTradeMark;
use Livewire\Component;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\NumberColumn;
use Mediconesystems\LivewireDatatables\DateColumn;

class TradeMarkDatatable extends LivewireDatatable
{
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
            ->label('Name en')
            ->searchable(),   
      ];
    }
}
