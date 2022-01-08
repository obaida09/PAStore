@push('js')
  <script type="text/javascript">
    var x = 1;
    $(document).on('click', '.addInput', function() {
      var max_input = 4;
      if (x < max_input) {

        $('.div_inputs').append('<div>' +
          '<div class="col-md-6 form-group left">' +
          '{!! Form::label('input_key', 'Input Title') !!}' +
          '{!! Form::text('input_key[]', '', ['class' => 'form-control']) !!}' +
          '</div>' +
          '<div class="col-md-6 form-group left">' +
          '{!! Form::label('input_value', 'Input Content') !!}' +
          '{!! Form::text('input_value[]', '', ['class' => 'form-control']) !!}' +
          '</div>' +
          '<br>' +
          '<a href="#" class="removeInput btn btn-danger ml-5"><i class="fa fa-trash"></i></a>' +
          '</div>');
        x++;
        console.log(x)
      }
      if(x == max_input) {
        $('.addInput').remove();
      }
      return false;
    });
    $(document).on('click', '.removeInput', function() {
      $(this).parent('div').remove();
      x--;
      return false;
    });
  </script>
@endpush
<div id="other_data" class="tab-pane">
  <div class="col-sm-12 mt-4">
    <h4 class="info-text"> You Can Add More Information About Your Product.</h4>
  </div>
  <div class="div_inputs col-md-12">
    @foreach ($product->other_data()->get() as $item)
      <div>
        <div class="col-md-6 form-group left">
          {!! Form::label('input_key', 'Input Title') !!}
          {!! Form::text('input_key[]', $item->data_key, ['class' => 'form-control']) !!}
        </div>
        <div class="col-md-6 form-group left">
          {!! Form::label('input_value', 'Input Content') !!}
          {!! Form::text('input_value[]', $item->data_value, ['class' => 'form-control']) !!}
        </div>
      </div>
    @endforeach

  </div>

  <br>
  <a href="#" class="addInput btn btn-primary"><i class="fa fa-plus"></i></a>

  <br>
</div>
