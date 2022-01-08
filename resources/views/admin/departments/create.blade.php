@extends('admin.index')

@section('title', 'Create Country')

@section('content')

  @push('js')
    <script type="text/javascript">
      $(document).ready(function() {

        $('#jstree').jstree({
          "core": {
            'data': {!! load_dep(old('parent')) !!},
            "themes": {
              "variant": "large"
            }
          },
          "checkbox": {
            "keep_selected_style": false
          },
          "plugins": ["wholerow"]
        });

      });

      $('#jstree').on('changed.jstree', function(e, data) {
        var i, j, r = [];
        for (i = 0, j = data.selected.length; i < j; i++) {
          r.push(data.instance.get_node(data.selected[i]).id);
        }
        $('.parent_id').val(r.join(', '));
      });
    </script>
  @endpush

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
                    <h6 class="text-white text-capitalize ps-3">{{ $title }}</h6>
                  </div>
                </div>


                <div class="p-4">
                  <!-- form start -->
                  <form action="{{ route('department.store') }}" method="POST">
                    @csrf

                    <div class="input-group is-filled input-group-dynamic mt-5">
                      <label class="form-label" for="exampleInputEmail1">Department Name in Arabic</label>
                      <input type="text" name="department_name_ar" class="form-control">
                    </div>
                    @error('department_name_ar')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                    @enderror

                    <div class="input-group is-filled input-group-dynamic mt-5">
                      <label class="form-label" for="exampleInputEmail1">Department Name in English</label>
                      <input type="text" name="department_name_en" class="form-control">
                    </div>
                    @error('department_name_en')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                    @enderror

                    <input type="hidden" class="parent_id" name="parent" value="{{ old('parent')}}">
                    <div class="clearfix"></div>
                    <div id="jstree"></div>

                    <div class="form-group mt-5">
                      <label>Description</label>
                      <textarea class="form-control" name='description' rows="3" placeholder="Enter ..."></textarea>
                    </div>
                    @error('description')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                    @enderror

                    <div class="form-group mt-5">
                      <label>Keyword</label>
                      <textarea class="form-control" name='keyword' rows="3" placeholder="Enter ..."></textarea>
                    </div>
                    @error('keyword')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                    @enderror


                    <button type="submit" class="btn btn-secondary mt-5">Submit</button>
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
@endsection
