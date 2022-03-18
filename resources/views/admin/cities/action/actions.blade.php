<!-- button Edit -->
  <a class="btn btn-warning btn-table edit" onclick="getData('{{route('city.edit', $id)}}' , '{{route('city.update', $id)}}')" id="btn_table_update" data-bs-toggle="modal" data-bs-target="#modalUpdate">
    <i class="fas fa-user-edit" aria-hidden="true"></i>
  </a>
<!-- button modal delete -->
<a onclick="addRoute('{{route('city.destroy', $id)}}')" id="btn_table_delete" class="btn bg-gradient-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
  <i class="fa fa-trash"></i>
</a>
