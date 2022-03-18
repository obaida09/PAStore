<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title font-weight-normal" >Are you sure ?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
        <div id="delete_city">
          <a class="btn bg-gradient-primary">Delete</a>
        </div>
      </div>
    </div>
  </div>
</div>



<!-- Delete All Modal -->
<div class="modal fade" id="deleteAllModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title font-weight-normal" >Are you sure ?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" id="btn_delete_all" class="btn bg-gradient-primary">Delete</button>
      </div>
    </div>
  </div>
</div>



@push('js')
<script>
   // delete city 

  function addRoute(route) {
    $('#delete_city').attr('data-route', route)
  }

  $("#delete_city").click(function(e) {
    var route = $(this).attr("data-route");
    $.ajax({
      url: route
      , type: "delete"
      , headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
      , success: function(response) {
        jQuery.noConflict();
        $('#deleteModal').modal('hide');

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
    })
  })

  // delete all city 

  $("#btn_delete_all").click(function() {
    var item = [];
    $.each($("input[type=checkbox]:checked"), function() {
      item.push($(this).val());
    });

    $.ajax({
      url: '{{ url()->current() . '/destroy/all' }}'
      , type: "post"
      , headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
      , data: {item}
      , success: function(response) {
        console.log(response)
        jQuery.noConflict();
        $('#deleteAllModal').modal('hide');

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
    })
  })
</script>
@endpush