<div class="fixed-plugin ps">
  <a class="fixed-plugin-button text-dark position-fixed px-3 py-2">
    <i class="material-icons py-2">settings</i>
  </a>
  <div class="card shadow-lg">
    <div class="card-header pb-0 pt-3">
      <div class="float-start logo-side">
        <h5 class="mt-3 mb-0">PA-Store</h5>
        <p>See our dashboard options.</p>
      </div>
      <div class=" mt-4 x-close">
        <button class="btn btn-link text-dark p-0 fixed-plugin-close-button">
          <i class="material-icons">clear</i>
        </button>
      </div>
      <!-- End Toggle Button -->
    </div>
    <hr class="horizontal dark my-1">
    <div class="card-body pt-sm-3 pt-0">
      <!-- Sidebar Backgrounds -->
      <div>
        <h6 class="mb-0">Sidebar Colors</h6>
      </div>
      <a href="javascript:void(0)" class="switch-trigger background-color">
        <div class="badge-colors my-2 text-start">
          <span class="badge filter bg-gradient-primary active" data-color="primary" onclick="sidebarColor(this)"></span>
          <span class="badge filter bg-gradient-dark" data-color="dark" onclick="sidebarColor(this)"></span>
          <span class="badge filter bg-gradient-info" data-color="info" onclick="sidebarColor(this)"></span>
          <span class="badge filter bg-gradient-success" data-color="success" onclick="sidebarColor(this)"></span>
          <span class="badge filter bg-gradient-warning" data-color="warning" onclick="sidebarColor(this)"></span>
          <span class="badge filter bg-gradient-danger" data-color="danger" onclick="sidebarColor(this)"></span>
        </div>
      </a>
      <!-- Sidenav Type -->
      <div class="mt-3">
        <h6 class="mb-0">Sidenav Type</h6>
        <p class="text-sm">Choose between 2 different sidenav types.</p>
      </div>
      <div class="d-flex">
        <button class="btn bg-gradient-dark px-3 mb-2 ms-2 active" data-class="bg-gradient-dark" onclick="sidebarType(this)">Dark</button>
        <button class="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-transparent" onclick="sidebarType(this)">Transparent</button>
        <button class="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-white" onclick="sidebarType(this)">White</button>
      </div>

      <div class="mt-3">
        <h6 class="mb-0">Language</h6>
        <p class="text-sm">Choose between 2 different Language</p>
      </div>
      <div class="d-flex">
        <a href="{{ url('admin/lang/ar') }}" class="btn bg-gradient-dark px-3 mb-2 ms-2 {{ session('lang') === "ar" ? "active" : "" }}">Arabic</a>
        <a href="{{ url('admin/lang/en') }}" class="btn bg-gradient-dark px-3 mb-2 ms-2 {{ session('lang') === "en" ? "active" : "" }}">English</a>
      </div>
      <p class="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>
      <!-- Navbar Fixed -->
      <div class="mt-3 d-flex">
        <h6 class="mb-0">Navbar Fixed</h6>
        <div class="form-check form-switch ps-0 ms-auto my-auto">
          <input class="form-check-input mt-1 ms-auto" type="checkbox" id="navbarFixed" onclick="navbarFixed(this)">
        </div>
      </div>
      <hr class="horizontal dark my-3">
      <div class="mt-2 d-flex">
        <h6 class="mb-0">Light / Dark</h6>
        <div class="form-check form-switch ps-0 ms-auto my-auto">
          <input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version" onclick="darkMode(this)">
        </div>
      </div>
      <hr class="horizontal dark my-sm-4">
      <div class="w-100 text-center">
        <span></span>
        <h6 class="mt-3">Thank you for sharing!</h6>
        <a href="https://twitter.com/intent/tweet?text=Check%20Material%20UI%20Dashboard%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard" class="btn btn-dark mb-0 me-2" target="_blank">
          <i class="fab fa-twitter me-1" aria-hidden="true"></i> Tweet
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-dashboard" class="btn btn-dark mb-0 me-2" target="_blank">
          <i class="fab fa-facebook-square me-1" aria-hidden="true"></i> Share
        </a>
      </div>
    </div>
  </div>
  <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
    <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
  </div>
  <div class="ps__rail-y" style="top: 0px; right: 0px;">
    <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
  </div>
</div>


<footer class="footer py-4">
  <div class="container-fluid">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6 mb-lg-0 mb-4">
        <div class="copyright text-center text-sm text-muted text-lg-start">
          <script>
            document.write(new Date().getFullYear())

          </script>,
          made with <i class="fa fa-heart"></i> by
          <a href="https://www.creative-tim.com" class="font-weight-bold" target="_blank">Creative Tim</a>
          for a better web.
        </div>
      </div>
      <div class="col-lg-6">
        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
          <li class="nav-item">
            <a href="https://www.creative-tim.com" class="nav-link text-muted" target="_blank">Creative Tim</a>
          </li>
          <li class="nav-item">
            <a href="https://www.creative-tim.com/presentation" class="nav-link text-muted" target="_blank">About Us</a>
          </li>
          <li class="nav-item">
            <a href="https://www.creative-tim.com/blog" class="nav-link text-muted" target="_blank">Blog</a>
          </li>
          <li class="nav-item">
            <a href="https://www.creative-tim.com/license" class="nav-link pe-0 text-muted" target="_blank">License</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>


<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!--   Core JS Files   -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

<script src="{{ asset('admin/assets/js/jquery.bootstrap.js') }}"></script>
<script src="{{ asset('admin/assets/js/core/popper.min.js') }}"></script>
<script src="{{ asset('admin/assets/js/plugins/perfect-scrollbar.min.js') }}"></script>
<script src="{{ asset('admin/assets/js/plugins/smooth-scrollbar.min.js') }}"></script>
<script src="{{ asset('admin/assets/js/plugins/chartjs.min.js') }}"></script>

{{-- <script>
  var ctx = document.getElementById("chart-bars").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: [{
        label: "Sales",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: "rgba(255, 255, 255, .8)",
        data: [50, 20, 10, 22, 50, 10, 40],
        maxBarThickness: 6
      }, ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: 'rgba(255, 255, 255, .2)'
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 500,
            beginAtZero: true,
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: 'normal',
              lineHeight: 2
            },
            color: "#fff"
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: 'rgba(255, 255, 255, .2)'
          },
          ticks: {
            display: true,
            color: '#f8f9fa',
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: 'normal',
              lineHeight: 2
            },
          }
        },
      },
    },
  });


  var ctx2 = document.getElementById("chart-line").getContext("2d");

  new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Mobile apps",
        tension: 0,
        borderWidth: 0,
        pointRadius: 5,
        pointBackgroundColor: "rgba(255, 255, 255, .8)",
        pointBorderColor: "transparent",
        borderColor: "rgba(255, 255, 255, .8)",
        borderColor: "rgba(255, 255, 255, .8)",
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        maxBarThickness: 6

      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: 'rgba(255, 255, 255, .2)'
          },
          ticks: {
            display: true,
            color: '#f8f9fa',
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: 'normal',
              lineHeight: 2
            },
          }
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5]
          },
          ticks: {
            display: true,
            color: '#f8f9fa',
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: 'normal',
              lineHeight: 2
            },
          }
        },
      },
    },
  });

  var ctx3 = document.getElementById("chart-line-tasks").getContext("2d");

  new Chart(ctx3, {
    type: "line",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Mobile apps",
        tension: 0,
        borderWidth: 0,
        pointRadius: 5,
        pointBackgroundColor: "rgba(255, 255, 255, .8)",
        pointBorderColor: "transparent",
        borderColor: "rgba(255, 255, 255, .8)",
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        maxBarThickness: 6

      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: 'rgba(255, 255, 255, .2)'
          },
          ticks: {
            display: true,
            padding: 10,
            color: '#f8f9fa',
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: 'normal',
              lineHeight: 2
            },
          }
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5]
          },
          ticks: {
            display: true,
            color: '#f8f9fa',
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: 'normal',
              lineHeight: 2
            },
          }
        },
      },
    },
  });
</script> --}}


@livewireScripts
<script>
  // var id = $(this).attr("data-id");
  //     var addRoute = '{{ url("admin/city") }}' + '/' + id ;
  //     $('#delete_city').attr('data-route', addRoute)
  //   })

  //   $("#delete_city").submit(function(e) {
  //     e.preventDefault();
  //     var route = $(this).attr("data-route");
  //     $.ajax({
  //       url: route
  //       , type: "delete"
  //       , headers: {
  //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  //       }
  //       , data: { '_token': '{{ csrf_token() }}'}
  //       , success: function(response) {
  //         console.log(response);
  //         $('#deleteModal').modal('hide');
  //         $(".text-error").text(response[0])
  //         //if(response) {
  //         //   $('.success').text(response.success);
  //         //  $("#ajaxform")[0].reset();
  //         //}
  //       }
  //     })
  //   })



  window.addEventListener('close', event => {
    $("#exampleModalLong").modal('hide');
    alert('Name updated to: ' + event.detail.newName);
  })

</script>




<script>
  var win = navigator.platform.indexOf('Win') > -1;
  if (win && document.querySelector('#sidenav-scrollbar')) {
    var options = {
      damping: '0.5'
    }
    Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
  }

  $(document).ready(function() {
    $('#myTable').DataTable();
  });

  /*!
   Bootstrap integration for DataTables' Buttons
   ©2016 SpryMedia Ltd - datatables.net/license
  */


  /* Modal Edit */

  // let body2 = document.querySelector("body");
  // let modal2 = document.querySelector("#exampleModal");
  // let btnModel = document.querySelector('#btnModal');
  // let btnModelClose = document.querySelector('#btnModelClose');

  // btnModel.addEventListener("click", function() {

  //   body2.classList.add("modal-open")

  //   modal2.classList.add("disBlock", "modal-backdrop")


  //   setTimeout(function() {
  //     modal2.classList.add("show")
  //   }, 80);
  // })
  // window.onclick = function(event) {

  //   if (event.target == modal2) {

  //     body2.classList.remove("modal-open")

  //     modal2.classList.remove("show")
  //     setTimeout(function() {
  //       modal2.classList.remove("disBlock", "modal-backdrop")
  //     }, 200);
  //   }
  // }

  // btnModelClose.addEventListener("click", function() {

  //   body2.classList.remove("modal-open")

  //   modal2.classList.remove("show")
  //   setTimeout(function() {
  //     modal2.classList.remove("disBlock", "modal-backdrop")
  //   }, 200);
  // })


  var colorSpan = document.querySelectorAll('.badge-colors span');


  // Select Box Data Table Check All Data

  function toggle(source) {
    checkboxes = document.getElementsByClassName('item_checkbox');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = source.checked;
    }
  }

</script>

<!-- Github buttons -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
<!--  More information about jquery.validate here: http://jqueryvalidation.org/	 -->
<script src="{{ asset('admin/assets/js/jquery.validate.min.js') }}"></script>
<!-- wizard -->
<script src="{{ asset('admin/assets/js/wizard.js') }}"></script>
<!-- Datepicker -->
<script src="{{ asset('admin/assets/js/bootstrap-datepicker.js') }}"></script>

<!-- jstree -->
{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script> --}}
<script src="{{ asset('admin/jstree/jstree.js') }}"></script>
<script src="{{ asset('admin/jstree/jstree.wholerow.js') }}"></script>
<script src="{{ asset('admin/jstree/jstree.checkbox.js') }}"></script>

<!-- DataTables  & Plugins -->
<script src="{{ asset('admin/DataTables/DataTables/js/jquery.dataTables.js') }}"></script>
<script src="{{ asset('admin/DataTables/Buttons/js/dataTables.buttons.js') }}"></script>
<script src="{{ asset('admin/DataTables/Responsive/js/dataTables.responsive.js') }}"></script>
<script src="{{ url('/vendor/datatables/buttons.server-side.js') }}"></script>
<script src='https://cdn.datatables.net/buttons/2.0.1/js/buttons.bootstrap5.min.js'></script>

<!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
<script src="{{ asset('admin/assets/js/material-dashboard.js') }}"></script>

<script src="{{ asset('js/MyScript.js') }}"></script>


<script>
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  // Edit The RTL

  if ($("body").hasClass('rtl')) {
    $(".row .card .card-header .pt-1").removeClass('text-end')
    $(".row .card .card-header .pt-1").addClass('text-start')
    $(".row .card .card-footer p").addClass('text-start')
    $(".nav-item .nav-link .text-center").removeClass('me-2')
    $(".nav-item .nav-link .text-center").addClass('ms-2')

    $(".logo-side").removeClass('float-start')
    $(".logo-side").addClass('float-end')
    $(".x-close").removeClass('float-end')
    $(".x-close").addClass('float-start')
    $(".badge-colors").addClass('text-end')
    $(".card .card-body .form-check").removeClass('ms-auto')
    $(".card .card-body .form-check").addClass('me-auto')
  }

</script>

@stack('js')
@stack('css')

</body>

</html>
