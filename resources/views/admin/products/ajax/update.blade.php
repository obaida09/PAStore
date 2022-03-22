@push('js')

<script>
  //Update Product

  $("#updateProduct").submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    var route = $(this).attr("data-route");
    console.log(route);
    $.ajax({
      url: route
      , type: "PUT"
      , headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
      , data: formData
      , success: function(response) {
        /* Notifications Start */
        $(".toast-body").append(document.createTextNode(response));
        $('.toast').addClass('show').addClass('article-read');
        setTimeout(function() {
          $('.toast').removeClass('show').addClass('article-read');
          $(".toast-body").empty();
        }, 3000);
      }
      , error: function(reject) {
        if (reject.status === 422) {
          var errors = $.parseJSON(reject.responseText).errors;

          /* Notifications Start */
          $.each(errors, function(key, val) {
            $("<p>" + val + "</p>").appendTo(".toast-body");
          });
          $('.toast').addClass('show').addClass('article-read');
          setTimeout(function() {
            $('.toast').removeClass('show').addClass('article-read');
            $(".toast-body").empty();
          }, 10000);
        }
      }
    })
  })

</script>
@endpush
