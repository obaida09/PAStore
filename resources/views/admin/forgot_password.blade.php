<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Foreget Password</title>

  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
  <!-- Nucleo Icons -->
  <link href="{{ asset('admin/assets/css/nucleo-icons.css') }}" rel="stylesheet" />
  <link href="{{ asset('admin/assets/css/nucleo-svg.css') }}" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <!-- CSS Files -->
  <link id="pagestyle" href="{{ asset('admin/assets/css/material-dashboard.css?v=3.0.0') }}" rel="stylesheet" />
</head>
<body class="bg-gray-200">
  <main class="main-content  mt-0">
    <div class="page-header align-items-start min-vh-100" style="background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Forgot Password</h4>
                </div>
              </div>
              <div class="card-body">
                <form class="text-start" method="post">
                  @csrf
                  @if ($message = Session::get('success'))
                  <div class="alert alert-success" role="alert">
                    {{$message}}
                  </div>
                @endif
                  <div class="input-group input-group-outline mt-4">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" name='email' value="{{old('email')}}" onfocus="focused(this)" onfocusout="defocused(this)" data-keeper-lock-id="k-1skxar5ussy">
                    <keeper-lock class="focus-visible keeper-lock-disabled" tabindex="0" id="k-1skxar5ussy" style="background-image: url(&quot;chrome-extension://bfogiafebfohielmmehodmfbbebbbpei/images/ico-field-fill-lock-grey.svg&quot;) !important; background-size: 16px 16px !important; cursor: pointer !important; width: 16px !important; position: absolute !important; opacity: 0 !important; margin-top: auto !important; min-width: 16px !important; top: 12.0938px; left: 272px; z-index: 1; visibility: hidden; height: 16px !important;"></keeper-lock>
                  </div>
                  @error('email')
                  <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror
                  <div class="text-center">
                    <button type="submit" class="btn bg-gradient-primary w-100 my-4 mb-2">Submit</button>
                  </div>
                  <p class="mt-3 mb-2">
                    <a href="{{route('login')}}">Login</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- jQuery -->
  <script src="{{ asset('admin/plugins/jquery/jquery.min.js') }}"></script>
  <!--   Core JS Files   -->
  <script src="{{ asset('admin/assets/js/jquery.bootstrap.js') }}"></script>
  <script src="{{ asset('admin/assets/js/core/popper.min.js') }}"></script>
  <script src="{{ asset('admin/assets/js/plugins/perfect-scrollbar.min.js') }}"></script>
  <script src="{{ asset('admin/assets/js/plugins/smooth-scrollbar.min.js') }}"></script>
  <!-- Github buttons -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="{{ asset('admin/assets/js/material-dashboard.js') }}"></script>
  <script>
    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
      var options = {
        damping: '0.5'
      }
      Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }

  </script>
</body>

</html>
