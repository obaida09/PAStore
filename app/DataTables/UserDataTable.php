<?php

namespace App\DataTables;

use App\Models\User;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class UserDataTable extends DataTable
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
      ->addColumn('checkbox', 'admin.users.action.checkbox')
      ->addColumn('action', 'admin.users.action.actions')
      ->editColumn('created_at', function (User $User) {
        return $User->created_at->toFormattedDateString();
      })
      ->editColumn('updated_at', function (User $User) {
        return $User->updated_at->toFormattedDateString();
      })
      ->rawColumns([
        'action',
        'checkbox',
      ]);
  }

  /**
   * Get query source of dataTable.
   *
   * @param \User $model
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function query(User $model)
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
    ->setTableId('userDatatable-table')
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
      Column::make('level'),
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
        ->addClass('')
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
    return 'User_' . date('YmdHis');
  }
}
