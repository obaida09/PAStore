@push('js')
  <script type="text/javascript">
    $(document).ready(function() {
      var dataSelect = [
        @foreach (App\Models\Country::all() as $country)
          {
          "text":"{{ $country->{'country_name_' . lang()} }}",
          "children":[
          @foreach ($country->mall()->get() as $mall)
            {
            "id":{{ $mall->id }},
            "text":"{{ $mall->{'name_' . lang()} }}",

            },
          @endforeach
          ],
          },
        @endforeach
      ];

      $('.mall_select2').select2({
        data: dataSelect
      });

    });
  </script>
@endpush

<div class="size_weight">
  <h2 class="mt-8 text-center">please select department</h2>
</div>

<div class="info_data hidden">
  <div class="form-group mb-5 px-2">
    <label>Color</label>
    <select class="form-control" name="color_id" id="exampleFormControlSelect1">
      @foreach ($color as $item)
        <option value="{{ $item->id }}" @if ($item->id == $product->color_id) selected @endif>{{ $item->name_en }}</option>
      @endforeach
    </select>

  </div>
  @error('color_id')
    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
  @enderror

  <div class="form-group mb-5 px-2">
    <label>TradeMark</label>
    <select class="form-control" name="trade_id" id="exampleFormControlSelect1">
      @foreach ($tradeMark as $item)
        <option value="{{ $item->id }}" @if ($item->id == $product->trade_id) selected @endif>{{ $item->trade_name_en }}</option>
      @endforeach
    </select>

  </div>
  @error('trade_id')
    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
  @enderror

  <div class="form-group mb-5 px-2">
    <label>Manufacturers</label>
    <select class="form-control" name="manu_id" id="exampleFormControlSelect1">
      @foreach ($manuFacturer as $item)
        <option value="{{ $item->id }}" @if ($item->id == $product->manu_id) selected @endif>{{ $item->name_en }}</option>
      @endforeach
    </select>

  </div>
  @error('manu_id')
    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
  @enderror
</div>


{{-- <div id="product_size_weight" class="tab-pane">
  <h3>{{ trans('admin.product_size_weight') }}</h3>
  <div class="size_weight">
    <center>
      <h1>برجاء قم باختيار قسم</h1>
    </center>
  </div>
  <div class="info_data ">
    <div class="form-group  col-md-4 col-lg-4 col-sm-4 col-xs-12">
      {!! Form::label('color_id', trans('admin.color_id')) !!}
      {!! Form::select('color_id', App\Models\Color::pluck('name_' . lang(), 'id'), $product->color_id, ['class' => 'form-control', 'placeholder' => trans('admin.color_id')]) !!}
    </div>
    <div class="form-group col-md-4 col-lg-4 col-sm-4 col-xs-12">
      {!! Form::label('trade_id', trans('admin.trade_id')) !!}
      {!! Form::select('trade_id', App\Models\TradeMark::pluck('trade_name_' . lang(), 'id'), $product->trade_id, ['class' => 'form-control', 'placeholder' => trans('admin.trade_id')]) !!}
    </div>
    <div class="form-group col-md-4 col-lg-4 col-sm-4 col-xs-12">
      {!! Form::label('manu_id', trans('admin.manu_id')) !!}
      {!! Form::select('manu_id', App\Models\Manufacturers::pluck('name_' . lang(), 'id'), $product->manu_id, ['class' => 'form-control', 'placeholder' => trans('admin.manu_id')]) !!}
    </div>
    <div class="col-md-12 col-lg-12 col-sm-12">
      {!! Form::label('malls', trans('admin.malls')) !!}
      <select name="mall[]" class="form-control mall_select2" multiple="multiple" style="width: 100%"></select>

    </div>
    <div class="clearfix"></div>
  </div>
</div> --}}
