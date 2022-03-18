<div class="col-md-4">
  <!-- Modal -->
  <div class="modal fade modalCreate" id="createModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-normal" id="exampleModalLongTitle">Create State</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="stateCreate" data-route="{{ route('state.store') }}">
          <div class="modal-body font-weight-light">
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">State Name in Ar</label>
              <input type="text" name="state_name_ar" class="form-control">
            </div>
             <div id="state_name_ar_error" class="form-text error"></div>
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">State Name in Er</label>
              <input type="text" name="state_name_en" class="form-control">
            </div>
             <div id="state_name_en_error" class="form-text error"></div>
            <div class="input-group input-group-static mt-5">
              <label for="exampleFormControlSelect1" class="ms-0">select</label>
              <select class="form-control" name="city_id" id="exampleFormControlSelect1">
                @foreach ($city as $id=>$name)
                <option value="{{ $id }}">{{ $name }}</option>
                @endforeach
              </select>
            </div>
            <div id="city_id_error" class="form-text error"></div>
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

   // Store State
   $("#reset").click(function() { $("#stateCreate").trigger("reset") })
   $("#stateCreate").submit(function(e) {
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
        console.log(response)
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

        $('#stateDatatable-table').DataTable().ajax.reload();
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
