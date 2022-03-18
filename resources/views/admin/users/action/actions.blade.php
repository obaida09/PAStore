<!-- button Edit -->
<a class="btn btn-warning btn-table btn-sm edit" onclick="getData('{{route('user.edit', $id)}}' , '{{route('user.update', $id)}}')" id="btn_table_update" data-bs-toggle="modal" data-bs-target="#modalUpdate">
  <i class="fas fa-user-edit" aria-hidden="true"></i>
</a>
<!-- button modal delete -->
<a onclick="addRoute('{{route('user.destroy', $id)}}')" id="btn_table_delete" class="btn bg-gradient-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal">
<i class="fa fa-trash"></i>
</a>

<a href="#" class="btn bg-gradient-danger btn-sm"><i class="fa-solid fa-cart-arrow-down"></i></a>
