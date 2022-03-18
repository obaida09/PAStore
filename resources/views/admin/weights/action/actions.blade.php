
<!-- button Edit -->
<a class="btn btn-warning btn-table edit" onclick="getData('{{route('weight.edit', $id)}}' , '{{route('weight.update', $id)}}')" id="btn_table_update" data-bs-toggle="modal" data-bs-target="#modalUpdate">
  <i class="fas fa-user-edit" aria-hidden="true"></i>
</a>
<!-- button modal delete -->
<a onclick="addRoute('{{route('weight.destroy', $id)}}')" id="btn_table_delete" class="btn bg-gradient-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
<i class="fa fa-trash"></i>
</a>

