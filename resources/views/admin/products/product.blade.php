@extends('admin.index')
@section('content')

<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
@push('js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>

@endpush

{{-- 
  <!--   Big container   -->
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-sm-offset-2">
        <!--      Wizard container        -->
        <div class="wizard-container pt-2">
           <div class="box-header">
            <h3 class="box-title">{{ $title }}</h3><hr><br>
          </div> 
          <div class="card wizard-card" data-color="red" id="wizard">
            <form  action="{{route('product.update', $product->id)}}" method="POST" enctype="multipart/form-data">
              @csrf
              @method('PUT')
              <!--        You can switch " data-color="blue" "  with one of the next bright colors: "green", "orange", "red", "purple"             -->

              <div class="wizard-header">
                <h3 class="wizard-title">Add a Product</h3>
                <h5 class="mt-3">This information will let us know more about your Product.</h5>
              </div>
              <div class="wizard-navigation mt-3">
                <ul>
                  <li><a href="#details" data-toggle="tab">Product Details</a></li>
                  <li><a href="#department" data-toggle="tab">Department</a></li>
                  <li><a href="#setting" data-toggle="tab">Setting</a></li>
                  <li><a href="#size_weight" data-toggle="tab">Delivery Info</a></li>
                  <li><a href="#other_data" data-toggle="tab">Other Data</a></li>
                </ul>
              </div>

              <div class="tab-content">

                <div class="tab-pane" id="details"> 
                  @include('admin.products.tabs.product-info')
                </div>

                <div class="tab-pane" id="department">
                  @include('admin.products.tabs.department')
                </div>

                <div class="tab-pane" id="setting">
                  @include('admin.products.tabs.product-setting')
                </div>

                <div class="tab-pane" id="size_weight">
                  @include('admin.products.tabs.product_size_weight')
                </div>

                <div class="tab-pane" id="other_data">
                  @include('admin.products.tabs.other_data')
                </div>

                {{-- @include('admin.products.tabs.related_product') 


                <div class="tab-pane" id="description">
                  <div class="row">
                    <h4 class="info-text"> Drop us a small description.</h4>
                    <div class="col-sm-6 col-sm-offset-1">
                      <div class="form-group">
                        <label>Room description</label>
                        <textarea class="form-control" placeholder="" rows="6"></textarea>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label class="control-label">Example</label>
                        <p class="description">"The room really nice name is recognized as being a really awesome
                          room. We use it every sunday when we go fishing and we catch a lot. It has some kind of magic
                          shield around it."</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="wizard-footer">
                <div class="pull-right">
                  <input type='button' class='btn btn-next btn-fill btn-danger btn-wd' name='next' value='Next' />
                  <input type='submit' class='btn btn-finish btn-fill btn-danger btn-wd' name='finish' value='Finish' />
                </div>
                <div class="pull-left">
                  <input type='button' class='btn btn-previous btn-fill btn-default btn-wd' name='previous'
                    value='Previous' />

                </div>
                <div class="clearfix"></div>
              </div>
            </form>
          </div>
        </div> <!-- wizard container -->
      </div>
    </div> <!-- row -->
  </div> <!--  big container -->
 --}}


 <section class="wizard-section">
  <div class="row no-gutters">
    <div class="col-lg-12 col-md-12">
      <div class="form-wizard">
        <form action="{{route('product.update', $product->id)}}" method="post" role="form">
          @csrf
          @method('PUT')
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
