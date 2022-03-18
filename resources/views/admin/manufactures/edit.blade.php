{{-- @extends('admin.index')

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
                    <h6 class="text-white text-capitalize ps-3">{{ $title }}</h6>
                  </div>
                </div>


                <div class="p-4">
                  <!-- form start -->
                  <form action="{{ route('manufacture.update', $mf->id) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="card-body">

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Manufacture Name in Arabic</label>
                        <input type="text" name="name_ar" value='{{ $mf->name_ar }}' class="form-control">
                      </div>
                        @error('name_ar')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                          @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Manufacture Name in English</label>
                        <input type="text" name="name_en" value='{{ $mf->name_en }}' class="form-control">
                      </div>
                        @error('name_en')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                          @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">email</label>
                        <input type="email" name="email" value='{{ $mf->email }}' class="form-control">
                      </div>
                        @error('email')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                        @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Facebook</label>
                        <input type="text" name="facebook" value='{{ $mf->facebook }}' class="form-control">
                      </div>
                        @error('facebook')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                        @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Twitter</label>
                        <input type="text" name="twitter" value='{{ $mf->twitter }}' class="form-control">
                      </div>
                        @error('twitter')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                        @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Website</label>
                        <input type="text" name="website" value='{{ $mf->website }}' class="form-control">
                      </div>
                        @error('website')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                        @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Contact Name</label>
                        <input type="text" name="contact_name" value='{{ $mf->contact_name }}' class="form-control">
                      </div>
                        @error('contact_name')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                        @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Address</label>
                        <input type="text" name="address" value='{{ $mf->address }}' class="form-control">
                      </div>
                        @error('address')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                        @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Mobile</label>
                        <input type="text" name="mobile" value='{{ $mf->mobile }}' class="form-control">
                      </div>
                        @error('mobile')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                        @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Lat</label>
                        <input type="text" name="lat" value='{{ $mf->lat }}' class="form-control">
                      </div>
                        @error('lat')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                        @enderror

                      <div class="input-group is-filled input-group-outline mt-5">
                        <label class="form-label">Lng</label>
                        <input type="text" name="lng" value='{{ $mf->lng }}' class="form-control">
                      </div>
                        @error('lng')
                          <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
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
@endsection

 --}}




<div class="col-md-4">
  <!-- Modal -->
  <div class="modal fade modalUpdate" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-normal" id="exampleModalLongTitle">Update Country</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="manufactureCountry">
          <div class="modal-body font-weight-light">
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Manufacture Name in Arabic</label>
              <input type="text" name="name_ar" class="form-control">
            </div>
             <div id="name_ar_error" class="form-text error"></div>
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Manufacture Name in English</label>
              <input type="text" name="name_en" class="form-control">
            </div>
            <div id="name_en_error" class="form-text error"></div>
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">email</label>
              <input type="text" name="email" class="form-control">
            </div>
             <div id="email_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Facebook</label>
              <input type="text" name="facebook" class="form-control">
            </div>
             <div id="facebook_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Twitter</label>
              <input type="text" name="twitter" class="form-control">
            </div>
             <div id="twitter_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Website</label>
              <input type="text" name="website" class="form-control">
            </div>
             <div id="website_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Contact Name</label>
              <input type="text" name="contact_name" class="form-control">
            </div>
             <div id="contact_name_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Address</label>
              <input type="text" name="address" class="form-control">
            </div>
             <div id="address_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Mobile</label>
              <input type="text" name="mobile" class="form-control">
            </div>
             <div id="mobile_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Lat</label>
              <input type="text" name="lat" class="form-control">
            </div>
             <div id="lat_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Lng</label>
              <input type="text" name="lng" class="form-control">
            </div>
             <div id="lng_error" class="form-text error"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn bg-gradient-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

@push('js')

<script>
  // edit city

  function getData(route, updateRoute) {
    $('#manufactureCountry').attr('data-route', updateRoute)
    $.ajax({
      type: "get"
      , url: route
      , dataType: "JSON"
      , success: function(data) {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            $("input[name=" + key + " ]").val(data[key])
          }
        }
      }
    , })
  }

  //Update City

  $("#manufactureCountry").submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    var route = $(this).attr("data-route");
    $.ajax({
      url: route
      , type: "PUT"
      , headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
      , data: formData
      , success: function(response) {
        jQuery.noConflict();
        $('.modalUpdate').modal('hide');

        /* Notifications Start */
        $(".toast-body").append(document.createTextNode(response));
        $('.toast').addClass('show').addClass('article-read');
        setTimeout(function() {
          $('.toast').removeClass('show').addClass('article-read');
          $(".toast-body").empty();
        }, 3000);
        /* Notifications End */
        $('#manuDatatable-table').DataTable().ajax.reload();
      }
      , error: function(reject) {
        if (reject.status === 422) {
          var errors = $.parseJSON(reject.responseText).errors;
          $.each(errors, function(key, val) {
            $("#" + key + "_error").text(val[0]);
          });
        }
      }
    })
  })

</script>
@endpush
