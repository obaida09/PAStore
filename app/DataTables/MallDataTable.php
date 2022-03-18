<?php

namespace App\DataTables;

use App\Models\Mall;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class MallDataTable extends DataTable
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
      ->addColumn('checkbox', 'admin.malls.action.checkbox')
      ->addColumn('action', 'admin.malls.action.actions')
      ->editColumn('created_at', function (Mall $Mall) {
        return $Mall->created_at->toFormattedDateString();
      })
      ->editColumn('updated_at', function (Mall $Mall) {
        return $Mall->updated_at->toFormattedDateString();
      })
      ->rawColumns([
        'action',
        'checkbox',
      ]);
  }

  /**
   * Get query source of dataTable.
   *
   * @param \Mall $model
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function query(Mall $model)
  {
    return $model->newQuery()->with('country')->select('malls.*');
  }

  /**
   * Optional method if you want to use html builder.
   *
   * @return \Yajra\DataTables\Html\Builder
   */
  public function html()
  {
    return $this->builder()
      ->setTableId('mallDatatable-table')
      ->columns($this->getColumns())
      ->minifiedAjax()
      ->parameters([
        'dom'        => 'Blfrtip',
        'responsive' => true,
        'autoWidth'  => false,
        'lengthMenu' => [[10, 25, -1], [10, 25, 'All Record']],
        'buttons' => ['excel', 'csv', 'pdf', 'reset'],
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
      Column::make('mobile'),
      Column::make('contact_name'),
      Column::computed('Country Name')
        ->data('country.country_name_' . lang()),

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
    return 'Mall_' . date('YmdHis');
  }
}
