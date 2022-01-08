@extends('admin.index')

@section('title', 'Create Country')

@section('content')

  <div class="container">
  <!-- Content Wrapper. Contains page content -->
  <div>
    <!-- Content Header (Page header) -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-12">
            <!-- jquery validation -->
            <div class="card my-6">

              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 class="text-white text-capitalize ps-3">{{$title}}</h6>
                </div>
              </div>


              <div class="p-4">
                <!-- form start -->
                <form action="{{route('size.store')}}" method="POST">
                  @csrf

                  <div class="card-body">
                    <div class="input-group input-group-dynamic mt-5">
                      <label for="exampleInputEmail1" class="form-label">Size Name in Arabic</label>
                      <input type="text" name="name_ar" class="form-control">
                    </div>
                      @error('name_ar')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                      @enderror

                    <div class="input-group input-group-dynamic mt-5">
                      <label for="exampleInputEmail1" class="form-label">Size Name in English</label>
                      <input type="text" name="name_en" class="form-control">
                    </div>
                      @error('name_en')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                      @enderror

                    <div class="input-group input-group-static mb-5">
                      <label for="exampleFormControlSelect1" class="ms-0">select</label>
                      <select class="form-control" name="is_public" id="exampleFormControlSelect1">
                        <option selected value="null">Chose...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    @error('is_public')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                    <input type="hidden" name="department_id" class="department_id" value="{{ old('department_id') }}">
                    <div id="jstree"></div>

                    @error('department_id')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror

                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                    <button type="submit" class="btn btn-secondary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <!-- /.card -->
            </div>
          <!--/.col (left) -->
          <!-- right column -->
          <div class="col-md-6">
          </div>
          <!--/.col (right) -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</div>

@push('js')

<script type="text/javascript">
  $(document).ready(function() {

    $('#jstree').jstree({
      "core": {
        'data': {!! load_dep(old('department_id')) !!},
        "themes": {
          "variant": "large"
        }
      },
      "checkbox": {
        "keep_selected_style": true
      },
      "plugins": [
        "wholerow",
      ]
    });

  });

  $('#jstree').on('changed.jstree',function(e,data){
    var i , j , r = [];
    var  name = [];
    for(i=0,j = data.selected.length;i < j;i++)
    {
        r.push(data.instance.get_node(data.selected[i]).id);
    }

    if(r.join(', ') != '')
    {
      $('.department_id').val(r.join(', '));
    }

});
</script>
@endpush


@endsection
