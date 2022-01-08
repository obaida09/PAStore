@extends('admin.index')

@section('content')

  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-normal" id="exampleModalLabel">Are you sure ?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-footer">
          <button type="button" id='btnModelClose' class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
          <form id='form_Delete_department' method="POST">
            @csrf
            @method('delete')
            <button type="submit" class="btn bg-gradient-primary">Delete</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mt-4">

          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">{{ $title }}</h6>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="card-body px-0 pb-1">
            <div id="jstree"></div>

            <!-- /.box-header -->

            <a class="btn btn-primary edit_dep showbtn_control hidden" style="margin:20px 0 0 20px;"><i class="fa fa-edit"></i>
              edit{{ old('parent') }}</a>
            <!-- button modal delete -->
            <button type="button" id="btnModal" class="btn bg-gradient-danger delete_dep showbtn_control hidden" style="margin:20px 0 0 0;"
              data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i class="fa fa-trash"></i>
            </button>
            <!-- /.card-body px-0 pb-2 -->
          </div>
        </div>



      </div>
    </div>
  </div>


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
            "keep_selected_style": true
          },
          "plugins": [
            "wholerow",
          ]
        });

      });

      $('#jstree').on('changed.jstree', function(e, data) {
        var i, j, r = [];
        var name = [];
        for (i = 0, j = data.selected.length; i < j; i++) {
          r.push(data.instance.get_node(data.selected[i]).id);
          name.push(data.instance.get_node(data.selected[i]).text);
        }
        $('#form_Delete_department').attr('action', '{{ url('admin/department') }}/' + r.join(', '));
        $('#dep_name').text(name.join(', '));
        if (r.join(', ') != '') {
          $('.showbtn_control').removeClass('hidden');
          $('.edit_dep').attr('href', '{{ url('admin/department') }}/' + r.join(', ') + '/edit');
        } else {
          $('.showbtn_control').addClass('hidden');
        }
      });
    </script>
  @endpush


@endsection
