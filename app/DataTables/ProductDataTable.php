<?php

namespace App\DataTables;

use App\Models\Product;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class ProductDataTable extends DataTable
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
      ->addColumn('checkbox', 'admin.products.action.checkbox')
      ->addColumn('action', 'admin.products.action.actions')
      ->editColumn('created_at', function (Product $Product) {
        return $Product->created_at->toFormattedDateString();
      })
      ->editColumn('updated_at', function (Product $Product) {
        return $Product->updated_at->toFormattedDateString();
      })
      ->rawColumns([
        'action',
        'checkbox',
      ]);
  }

  /**
   * Get query source of dataTable.
   *
   * @param \Product $model
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function query(Product $model)
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
      ->setTableId('productDatatable-table')
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
      Column::make('id')
        ->className('text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'),
      Column::make('title'),
      Column::make('content'),
      Column::make('created_at'),
      Column::make('updated_at'),
      Column::computed('action')
        ->exportable(false)
        ->printable(false)
        ->width(60)
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
    return 'Product_' . date('YmdHis');
  }
}
