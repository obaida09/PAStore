@push('js')
  <script type="text/javascript">
    $('.datepicker').datepicker({
      rtl: '{{ session('lang') == 'ar' ? true : false }}',
      language: '{{ session('lang') }}',
      format: 'yyyy-mm-dd',
      autoclose: false,
      todayBtn: false,
      clearBtn: false
    });
    $(document).on('change', '.status', function() {
      var status = $('.status option:selected').val();
      if (status == 'refused') {
        $('.reason').removeClass('hidden');
      } else {
        $('.reason').addClass('hidden');
      }
    });
  </script>

  {{-- <script type="text/javascript">
    $('.datepicker').datepicker({
    weekStart:1,
    color: 'red'
    });
  </script> --}}

@endpush

  <div class="col-sm-12 mt-4">
    <h4 class="info-text"> Products price and Stock.</h4>
  </div>

  <div class="bhr">
    <div class="form-group left col-md-3 col-lg-3 col-sm-3 col-xs-12">
      <label>Price</label>
      <input type="text" name="price" class="form-control" value="{{ $product->price }}">
      @error('price')
        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
      @enderror
    </div>

    <div class="form-group left  col-md-3 col-lg-3 col-sm-3 col-xs-12 ">
      <label>Stock</label>
      <input type="text" name="stock" class="form-control" value="{{ $product->stock }}">
      @error('stock')
        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
      @enderror
    </div>

    <div class="form-group left col-md-3 col-lg-3 col-sm-3 col-xs-12">
      <label>Start At</label>
      <input type="text" name="start_at" class="form-control datepicker" value="{{ $product->start_at }}">
      @error('start_at')
        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
      @enderror
    </div>

    <div class="form-group left col-md-3 col-lg-3 col-sm-3 col-xs-12">
      <label>End At</label>
      <input type="text" name="end_at" class="form-control datepicker" value="{{ $product->end_at }}">
      @error('end_at')
        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
      @enderror
    </div>
  </div>

  <div class="clearfix"></div>

  <div class="col-sm-12 mt-5">
    <h4 class="info-text"> Products Offer and End.</h4>
  </div>

  <div class="bhr">
    <div class="form-group left  col-md-4 col-lg-4 col-sm-4 col-xs-12">
      <label>Offer Price</label>
      <input type="text" name="price_offer" class="form-control" value="{{ $product->price_offer }}">
      @error('price_offer')
        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
      @enderror
    </div>

    <div class="form-group left col-md-4 col-lg-4 col-sm-4 col-xs-12">
      <label>Start Offer At</label>
      <input type="text" name="start_offer_at" class="form-control datepicker" value="{{ $product->start_offer_at }}">
      @error('start_offer_at')
        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
      @enderror
    </div>

    <div class="form-group left col-md-4 col-lg-4 col-sm-4 col-xs-12">
      <label>End Offer At</label>
      <input type="text" name="end_offer_at" class="form-control datepicker" value="{{ $product->end_offer_at }}">
      @error('end_offer_at')
        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
      @enderror

    </div>
  </div>

  <div class="clearfix"></div>

  <div class="thr mt-5">
    <div class="form-group">
      {{-- {!! Form::label('status', trans('admin.status')) !!}
      {!! Form::select('status', ['pending' => trans('admin.pending'), 'refused' => trans('admin.refused'), 'active' => trans('admin.active')], $product->status, ['class' => 'form-control status', 'placeholder' => trans('admin.status')]) !!} --}}

      <label>Chose Status</label>
      <select class="form-control status" name="status">
        <option value="active" @if ($product->status == 'active')  selected @endif>Active</option>
        <option value="pending" @if ($product->status == 'pending') selected @endif>Pending</option>
        <option value="refused" @if ($product->status == 'refused') selected @endif>Refused</option>
      </select>

    </div>
    <div class="form-group reason {{ $product->status != 'refused' ? 'hidden' : '' }}">

      <label>Reason</label>
      <input type="text" name="reason" class="form-control status" value="{{ $product->reason }}">
      @error('reason')
        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
      @enderror
    </div>
  </div>


