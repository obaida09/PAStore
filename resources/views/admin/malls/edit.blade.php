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
        <form id="updateMall">
          <div class="modal-body font-weight-light">
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Mall Name in Arabic</label>
              <input type="text" name="name_ar" class="form-control">
            </div>
            <div id=name_arerror" class="form-text error"></div>
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Mall Name in English</label>
              <input type="text" name="name_en" class="form-control">
            </div>
            <div id="name_en_error" class="form-text error"></div>
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Email</label>
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
              <label class="form-label">Language</label>
              <input type="text" name="lng" class="form-control">
            </div>
            <div id="lng_error" class="form-text error"></div>
            <div class="input-group input-group-static mb-5">
              <label for="exampleFormControlSelect1" class="ms-0">Select Country</label>
              <select class="form-control" name="country_id" id="exampleFormControlSelect1">
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
    $('#updateMall').attr('data-route', updateRoute)
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

  $("#updateMall").submit(function(e) {
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
        $('#mallDatatable-table').DataTable().ajax.reload();
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
