@extends('admin.index')

@section('content')


{{-- Notifications --}}

<div class="position-fixed top-2 end-2 z-index-3">
  <div class="toast fade p-2 bg-white hide" role="alert" aria-live="assertive" id="successToast" aria-atomic="true">
    <div class="toast-header border-0">
      <i class="material-icons text-success me-2">check</i>
      <i class="fas fa-times translate-middle-y float-end text-md ms-9 cursor-pointer" data-bs-dismiss="toast" aria-label="Close" aria-hidden="true"></i>
    </div>
    <hr class="horizontal dark m-0">
    <div class="toast-body">
    </div>
  </div>
</div>

{{-- Table --}}

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
            {!! $dataTable->table(['class'=>'table align-items-center mb-0'], true) !!}
            <a class="btn btn-danger btn-footer-table mb-0" id="reset" data-bs-toggle="modal" data-bs-target="#createModal">Create</a>
            <a class="btn btn-danger btn-footer-table" data-bs-toggle="modal" data-bs-target="#deleteAllModal"><i class="fa fa-trash" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>


{{-- create city  --}}

@include('admin.colors.create')

{{-- edit city  --}}

@include('admin.colors.edit')

{{-- delete city  --}}

@include('admin.colors.delete')



@push('js')
{!! $dataTable->scripts() !!}
@endpush

@endsection
