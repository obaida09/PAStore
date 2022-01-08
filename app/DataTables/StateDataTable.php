<?php

namespace App\DataTables;

use App\Models\State;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class StateDataTable extends DataTable
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
            ->addColumn('checkbox', 'admin.states.action.checkbox')
            ->addColumn('action', 'admin.states.action.actions')
            ->editColumn('created_at', function(State $State) {
              return $State->created_at->toFormattedDateString() ;
            })
            ->editColumn('updated_at', function(State $State) {
              return $State->updated_at->toFormattedDateString() ;
            })
            ->rawColumns([
              'action',
              'checkbox',
            ]);
    }

    /**
     * Get query source of dataTable.
     *
     * @param \State $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(State $model)
    {
        return $model->newQuery()->with('city')->select('states.*');
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
                    ->setTableId('statedatatable-table')
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
          Column::make('state_name_ar'),
          Column::make('state_name_en'),
          Column::computed('City Name')
          ->data('city.city_name_' . lang()),

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
        return 'State_' . date('YmdHis');
    }
}
