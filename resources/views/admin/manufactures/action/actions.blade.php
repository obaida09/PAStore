
{!! Form::open(['route'=>['manufacture.destroy',$id],'method'=>'delete']) !!}
<a class="btn btn-warning btn-table" href='{{route('manufacture.edit', $id)}}'><i class="fas fa-user-edit"></i></a>
<button type="submit" class="btn btn-danger btn-table">del</button>
{!! Form::close() !!}

