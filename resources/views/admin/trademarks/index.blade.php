@extends('admin.index')

@section('content')

  @if (session()->has('message'))
    <div class="alert alert-success">
      {{ session('message') }}
    </div>
  @endif

  @if ($message = Session::get('success'))
    <div class="position-fixed top-2 end-2 z-index-3">
      <div class="toast fade p-2 bg-white show" role="alert" aria-live="assertive" id="successToast" aria-atomic="true">
        <div class="toast-header border-0">
          <i class="material-icons text-success me-2">check</i>
          <i class="fas fa-times translate-middle-y float-end text-md ms-9 cursor-pointer" data-bs-dismiss="toast"
            aria-label="Close" aria-hidden="true"></i>
        </div>
        <hr class="horizontal dark m-0">
        <div class="toast-body">
          {{ $message }}
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
              <h6 class="text-white text-capitalize ps-3">{{ $title }}</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">

            {{-- <livewire:trade-mark-datatable
              searchable="name, email"
              exportable
            /> --}}

            @livewire('trade-mark-datatable')

            {{-- <div class="table-responsive p-3">

              {{-- @livewire('trademark')  --}}

              <button type="button" class="btn bg-gradient-danger btn-block mb-0" data-bs-toggle="modal"
                data-bs-target="#exampleModalLong">
                Create
              </button>

              <button type="button" class="btn bg-gradient-danger btn-block mb-0" data-bs-toggle="modal"
                data-bs-target="#updateModel" wire:click="edit(5)">
                {{ __('Edit') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

@endsection
