@extends('admin.index')
@section('content')

<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
@push('js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
@endpush

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

 <section class="wizard-section">
  <div class="row no-gutters">
    <div class="col-lg-12 col-md-12">
      <div class="form-wizard">
        <form data-route="{{route('product.update', $product->id)}}" id="updateProduct" enctype='multipart/form-data'>

          <div class="form-wizard-header">
            <p></p>
            <ul class="list-unstyled form-wizard-steps clearfix">
              <li class="active"><a href="#f"><span>Product Details</span></a></li>
              <li><a href="#f"><span>Department</span></a></li>
              <li><a href="#f"><span>Setting</span></a></li>
              <li><a href="#f"><span>Delivery</span></a></li>
              <li><a href="#f"><span>Other Data</span></a></li>
            </ul>
          </div>

          <fieldset class="wizard-fieldset show">
            @include('admin.products.tabs.product-info')
            <div class="form-group btn-move clearfix">
              <a href="javascript:;" class="form-wizard-next-btn">Next</a>
            </div>
          </fieldset>	

          <fieldset class="wizard-fieldset">
            @include('admin.products.tabs.department')
            <div class="form-group btn-move clearfix">
              <a href="javascript:;" class="form-wizard-previous-btn">Previous</a>
              <a href="javascript:;" class="form-wizard-next-btn">Next</a>
            </div>
          </fieldset>	

          <fieldset class="wizard-fieldset">
             @include('admin.products.tabs.product-setting')
            <div class="form-group btn-move clearfix">
              <a href="javascript:;" class="form-wizard-previous-btn">Previous</a>
              <a href="javascript:;" class="form-wizard-next-btn">Next</a>
            </div>
          </fieldset>	

          <fieldset class="wizard-fieldset">
            @include('admin.products.tabs.product_size_weight')
            <div class="form-group btn-move clearfix">
              <a href="javascript:;" class="form-wizard-previous-btn">Previous</a>
              <a href="javascript:;" class="form-wizard-next-btn">Next</a>
            </div>
          </fieldset>	

          <fieldset class="wizard-fieldset">
           @include('admin.products.tabs.other_data')
            <div class="form-group btn-move clearfix">
              <a href="javascript:;" class="form-wizard-previous-btn">Previous</a>
              <button class="form-wizard-submit">Submit</button>
            </div>
          </fieldset>	

        </form>
      </div>
    </div>
  </div>
</section>


{{-- Ajax File --}}

@include('admin.products.ajax.update')



{{-- <!-- Modal -->
<div id="del_admin{{ $product->id }}" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">{{ trans('admin.delete') }}</h4>
      </div>
      {!! Form::open(['route'=>['products.destroy',$product->id],'method'=>'delete']) !!}
      <div class="modal-body">
        <h4>{{ trans('admin.delete_this',['name'=> $product->title]) }}</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-info" data-dismiss="modal">{{ trans('admin.close') }}</button>
        {!! Form::submit(trans('admin.yes'),['class'=>'btn btn-danger']) !!}
      </div>
      {!! Form::close() !!}
    </div>
  </div>
</div> --}}

@endsection
