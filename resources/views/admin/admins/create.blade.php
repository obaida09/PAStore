<div class="col-md-4">
  <!-- Modal -->
  <div class="modal fade modalCreate" id="createModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-normal" id="exampleModalLongTitle">Create Admin</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="adminCreate" data-route="{{ route('admin.store') }}">
          <div class="modal-body font-weight-light">
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Name</label>
              <input type="text" name="name" class="form-control">
            </div>
             <div id="name_error" class="form-text error"></div>
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Email address</label>
              <input type="text" name="email" class="form-control">
            </div>
             <div id="email_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Password</label>
              <input type="text" name="password" class="form-control">
            </div>
             <div id="password_error" class="form-text error"></div>
             <div class="input-group input-group-outline mt-5">
              <label class="form-label">Confirmed Password</label>
              <input type="text" name="password_confirmation" class="form-control">
            </div>
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

   // Store City
   $("#reset").click(function() { $("#adminCreate").trigger("reset") })
   $("#adminCreate").submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    var route = $(this).attr("data-route");
    $.ajax({
      type: "post"
      , headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
      , url: route
      , data: formData
      , success: function(response) {
        jQuery.noConflict();
        $('.modalCreate').modal('hide');

        /* Notifications Start */
        $(".toast-body").append(document.createTextNode(response));
        $('.toast').addClass('show').addClass('article-read');
        setTimeout(function() {
          $('.toast').removeClass('show').addClass('article-read');
          $(".toast-body").empty();
        }, 3000);
        /* Notifications End */

        $('#adminDatatable-table').DataTable().ajax.reload();
      }
      , error: function(reject) {
        if (reject.status === 422) {
          var errors = $.parseJSON(reject.responseText).errors;
          $.each(errors, function(key, val) {
            $("#" + key + "_error").text(val[0]);
          });
        }
      }
    , })
  })
</script>
@endpush
