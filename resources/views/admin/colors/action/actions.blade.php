
{!! Form::open(['route'=>['color.destroy',$id],'method'=>'delete']) !!}
  <a class="btn btn-warning" style="margin-right:10px;" href='{{route('color.edit', $id)}}'><i class="fas fa-user-edit"></i></a>
  <button type="submit" class="btn btn-danger">del</button>
{!! Form::close() !!}


