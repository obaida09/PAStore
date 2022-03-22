<!-- button Edit -->
<a class="btn btn-warning btn-table" href='{{route('product.edit', $id)}}'><i class="fas fa-user-edit"></i></a>

<!-- button modal delete -->
<a onclick="addRoute('{{route('product.destroy', $id)}}')" id="btn_table_delete" class="btn bg-gradient-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
  <i class="fa fa-trash"></i>
</a>
