
{!! Form::open(['route'=>['admin.destroy',$id],'method'=>'delete']) !!}
  <a class="btn btn-warning btn-table" href='{{route('admin.edit', $id)}}'><i class="fas fa-user-edit"></i></a>
  <button type="submit" class="btn btn-danger btn-table">del</button>
{!! Form::close() !!}


