<?php

namespace App\DataTables;

use App\Models\Color;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class ColorDataTable extends DataTable
{
    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        return datatables()
            ->eloquent($query)
            ->addColumn('checkbox', 'admin.colors.action.checkbox')
            ->addColumn('action', 'admin.colors.action.actions')
            ->editColumn('color', 'admin.colors.action.color')
            ->editColumn('created_at', function(Color $Color) {
              return $Color->created_at->toFormattedDateString() ;
            })
            ->editColumn('updated_at', function(Color $Color) {
              return $Color->updated_at->toFormattedDateString() ;
            })
            ->rawColumns([
              'action',
              'checkbox',
              'color'
            ]);
    }

    /**
     * Get query source of dataTable.
     *
     * @param \Color $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Color $model)
    {
        return $model->newQuery();
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
                    ->setTableId('colordatatable-table')
                    ->columns($this->getColumns())
                    ->minifiedAjax()
                    ->parameters([
                      'dom'        => 'Blfrtip',
                      'responsive' => true,
                      'autoWidth'  => false,
                      'lengthMenu' => [[10, 25, -1], [10, 25, 'All Record']],
                      'buttons'    =>[
                        [
                          'text' => '<i class="fa fa-plus"></i> Create', 'className' => 'btn btn-dark', "action" => "function(){
                          window.location.href = '".\url()->current()."/create';}"
                        ],
                        ['extend' => 'print' ],
                        ['extend' => 'csv'   ],
                        ['extend' => 'excel' ],
                        ['extend' => 'reset'],
                        [
                          'text' => '<i class="fa fa-plus"></i> Create', 'className' => 'btn btn-danger', "action" => "function(){
                          window.location.href = '".\url()->current()."/delete/all';}"
                        ],
                      ],
                    ]);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns()
    {
        return [
          Column::make('id'),
          Column::make('name_ar'),
          Column::make('name_en'),
          Column::make('color'),
          Column::make('created_at'),
          Column::make('updated_at'),
          Column::computed('action')
                ->exportable(false)
                ->printable(false)
                ->width(110)
                ->addClass('text-center'),
          Column::computed('checkbox')
          ->exportable(false)
          ->printable(false)
          ->width(5)
          ->title('<input class="checkbox-thead" onClick="toggle(this)" type="checkbox" onclick="check_all()" value=""/>')
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'Color_' . date('YmdHis');
    }
}
