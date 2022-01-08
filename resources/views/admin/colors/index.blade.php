@extends('admin.index')

@section('content')


@if ($message = Session::get('success'))
  <div class="position-fixed top-2 end-2 z-index-3">
    <div class="toast fade p-2 bg-white show" role="alert" aria-live="assertive" id="successToast" aria-atomic="true">
      <div class="toast-header border-0">
        <i class="material-icons text-success me-2">check</i>
        <i class="fas fa-times translate-middle-y float-end text-md ms-9 cursor-pointer" data-bs-dismiss="toast" aria-label="Close" aria-hidden="true"></i>
      </div>
      <hr class="horizontal dark m-0">
      <div class="toast-body">
          {{$message}}
      </div>
    </div>
  </div>
@endif

<div class="container-fluid py-4">
  <div class="row">
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <h6 class="text-white text-capitalize ps-3">{{$title}}</h6>
          </div>
        </div>
        <div class="card-body px-0 pb-2">
          <div class="table-responsive p-3">

            <form action="{{url()->current() . '/destroy/all'}}" method="POST">
              @csrf
              @method('DELETE')
              {!! $dataTable->table(['class'=>'table align-items-center mb-0'], true) !!}

              <button type="submit" class="btn btn-danger btn-footer-table"><i class="fa fa-trash"></i></button>
            </form>

          </div>
        </div>
      </div>

    </div>
  </div>
</div>




  @push('js')
    {!! $dataTable->scripts() !!}
  @endpush

@endsection
