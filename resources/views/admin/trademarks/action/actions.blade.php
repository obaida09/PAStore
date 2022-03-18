{!! Form::open(['route' => ['trademark.destroy', $id], 'method' => 'delete']) !!}
<a class="btn btn-warning btn-table" href='{{ route('trademark.edit', $id) }}'><i class="fas fa-user-edit"></i></a>
<button type="submit" class="btn btn-danger btn-table">del</button>
{!! Form::close() !!}

<button type="button"class="mr-1" data-bs-toggle="modal" data-bs-target="#updateModel" wire:click="edit({{ $id }})">
  {{ __('Edit') }}
</button>
