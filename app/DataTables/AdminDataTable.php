<?php

namespace App\DataTables;

use App\Models\Admin;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class AdminDataTable extends DataTable
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
      ->addColumn('checkbox', 'admin.admins.action.checkbox')
      ->addColumn('action', 'admin.admins.action.actions')
      ->addColumn('link', '<a href="#">Html Column</a>')

      ->editColumn('created_at', function (Admin $Admin) {
        return $Admin->created_at->toFormattedDateString();
      })
      ->editColumn('updated_at', function (Admin $Admin) {
        return $Admin->updated_at->toFormattedDateString();
      })
      ->editColumn('name', function (Admin $Admin) {
        return $Admin->name;
      })
      ->rawColumns([
        'action',
        'checkbox',
        'link'
      ]);
  }

  /**
   * Get query source of dataTable.
   *
   * @param \App\Models\Admin $model
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function query(Admin $model)
  {
    return $model->newQuery();
  }

  /**
   * Optional method if you want to use html build`er.
   *
   * @return \Yajra\DataTables\Html\Builder
   */
  public function html()
  {
    return $this->builder()
    ->setTableId('adminDatatable-table')
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
      Column::make('name'),
      Column::make('email'),
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
        ->addClass('item_checkbox form-check-input text-center')
        ->title('<input class="" type="checkbox" onclick="check_all()" value=""/>')
    ];
  }

  /**
   * Get filename for export.
   *
   * @return string
   */
  protected function filename()
  {
    return 'Admin_' . date('YmdHis');
  }
}
