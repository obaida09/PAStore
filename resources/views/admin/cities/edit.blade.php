<div class="col-md-4">
  <!-- Modal -->
  <div class="modal fade modalUpdate" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-normal" id="exampleModalLongTitle">Update City</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="updateCity">
          <div class="modal-body font-weight-light">
            <div class="input-group is-filled input-group-outline mt-4">
              <label class="form-label">City Name in Ar</label>
              <input type="text" name="city_name_ar" id="city_name_ar" class="form-control">
            </div>
            <div id="city_name_ar_error" class="form-text error"></div>
            <div class="input-group is-filled input-group-outline mt-5">
              <label class="form-label">City Name in Er</label>
              <input type="text" name="city_name_en" id="city_name_en" class="form-control">
            </div>
            <div id="city_name_en_error" class="form-text error"></div>
            <div class="input-group input-group-static mt-5">
              <label for="exampleFormControlSelect1" class="ms-0">select</label>
              <select class="form-control" name="country_id" id="country_id">
                @foreach ($country as $id=>$name)
                <option value="{{ $id }}">{{ $name }}</option>
                @endforeach
              </select>
            </div>
            <div id="country_id_error" class="form-text error"></div>
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
    $('#updateCity').attr('data-route', updateRoute)
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

        // Select option from database
        $('.input-group option').each(function() {
          if (data.country_id == $(this).val()) {
            $(this).attr('selected', 'selected');
          }
        });
      }
    , })
  }

  //Update City

  $("#updateCity").submit(function(e) {
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
        $('#citydatatable-table').DataTable().ajax.reload();
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
