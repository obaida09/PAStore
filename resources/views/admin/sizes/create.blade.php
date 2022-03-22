<div class="col-md-4">
  <!-- Modal -->
  <div class="modal fade modalCreate" id="createModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-normal" id="exampleModalLongTitle">Create Size</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="sizeCreate" data-route="{{ route('size.store') }}">
          <div class="modal-body font-weight-light">
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Size Name in Arabicr</label>
              <input type="text" name="name_ar" class="form-control">
            </div>
            <div id="name_ar_error" class="form-text error"></div>
            <div class="input-group input-group-outline mt-5">
              <label class="form-label">Size Name in English</label>
              <input type="text" name="name_en" class="form-control">
            </div>
            <div id="name_en_error" class="form-text error"></div>
            <div class="input-group input-group-static mb-5">
              <label for="exampleFormControlSelect1" class="ms-0">select</label>
              <select class="form-control" name="is_public" id="exampleFormControlSelect1">
                <option selected value="null">Chose...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div id="is_public_error" class="form-text error"></div>
            <div id="department" class="tab-pane mt-4">
              <div id="jstree"></div>
              <input type="hidden" name="department_id" class="department_id">
            </div>
            <div id="department_id_error" class="form-text error"></div>
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
  $("#reset").click(function() {
    $("#sizeCreate").trigger("reset")
  })
  $("#sizeCreate").submit(function(e) {
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

        $('#sizeDatatable-table').DataTable().ajax.reload();
      }
      , error: function(reject) {
        if (reject.status === 422) {
          var errors = $.parseJSON(reject.responseText).errors;
          $.each(errors, function(key, val) {
            console.log(val)
            $("#" + key + "_error").text(val[0]);
          });
        }
      }
    , })
  })


  // Gte Department JSTree

  $(document).ready(function() {

    $('#jstree').jstree({
      "core": {
        'data': {
          !!load_dep(old('department_id')) !!
        }
        , "themes": {
          "variant": "large"
        }
      }
      , "checkbox": {
        "keep_selected_style": true
      }
      , "plugins": ["wholerow"] //checkbox
    });

  });

  $('#jstree').on('changed.jstree', function(e, data) {
    var i, j, r = [];
    var name = [];
    for (i = 0, j = data.selected.length; i < j; i++) {
      r.push(data.instance.get_node(data.selected[i]).id);
    }

    if (r.join(', ') != '') {
      $('.department_id').val(r.join(', '));
    }

  });

</script>

@endpush
