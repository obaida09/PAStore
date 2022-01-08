<!-- button Edit -->
  <a class="btn btn-warning btn-table" href='{{route('city.edit', $id)}}'><i class="fas fa-user-edit"></i></a>

<!-- button modal delete -->
<button type="button" class="btn bg-gradient-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
  <i class="fa fa-trash"></i>
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title font-weight-normal" id="exampleModalLabel">Are you sure ?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
        <form action="{{route('city.destroy', $id)}}" method="POST">
          @csrf
          @method('delete')
          <input type=hidden id="id" name=id>
          <button type="submit" class="btn bg-gradient-primary">Delete</button>
        </form>
      </div>
    </div>
  </div>
</div>
