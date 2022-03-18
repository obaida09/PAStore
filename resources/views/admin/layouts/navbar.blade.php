<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3  ms-3   bg-gradient-dark" id="sidenav-main">
  <div class="sidenav-header">
    <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
    <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
      <img src="./assets/img/logo-h.png" class="navbar-brand-img h-100" alt="main_logo">
      <span class="ms-1 font-weight-bold text-white">AP-Store</span>
    </a>
  </div>
  <hr class="horizontal light mt-0 mb-2">
  <div class="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">

      <li class="nav-item">
        <a class="nav-link {{active_menu('home')[1]}} text-white " href="{{url('admin/home')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-tachometer-alt"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.dashboard') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('admin')[1]}} text-white " href="{{url('admin/admin')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-users-cog"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.admin') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('user')[1]}} text-white " href="{{url('admin/user')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-users"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.user') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('country')[1]}} text-white " href="{{url('admin/country')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-globe"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.countries') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('city')[1]}} text-white " href="{{url('admin/city')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-city"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.cities') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('state')[1]}} text-white " href="{{url('admin/state')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-city"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.states') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('department')[1]}} text-white " href="{{url('admin/department')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fab fa-dyalog"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.departments') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('trademark')[1]}} text-white " href="{{url('admin/trademark')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-trademark"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.trademarks') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('manufacture')[1]}} text-white " href="{{url('admin/manufacture')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-industry"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.manufacturers') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('mall')[1]}} text-white " href="{{url('admin/mall')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fab fa-mastodon"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.malls') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('color')[1]}} text-white " href="{{url('admin/color')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-paint-brush"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.color') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('size')[1]}} text-white " href="{{url('admin/size')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fa fa-circle"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.sizes') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('weight')[1]}} text-white " href="{{url('admin/weight')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fas fa-weight"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.weights') }}</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link {{active_menu('product')[1]}} text-white " href="{{url('admin/product')}}">
          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
            <i class="nav-icon fab fa-product-hunt"></i>
          </div>
          <span class="nav-link-text ms-1">{{ __('sideNav.product') }}</span>
        </a>
      </li>

    </ul>
  </div>
  <div class="sidenav-footer position-absolute w-100 bottom-0 ">

  </div>
</aside>




<main style="" class="main-content margin-nav position-relative max-height-vh-100 h-100 border-radius-lg ">
    <!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a></li>
            <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
          </ol>
          <h6 class="font-weight-bolder mb-0">Dashboard</h6>
        </nav>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            <div class="input-group input-group-outline">
              <label class="form-label">Type here...</label>
              <input type="text" class="form-control">
            </div>
          </div>
          <ul class="navbar-nav  justify-content-end">
            {{-- <li class="nav-item d-flex align-items-center">
              <a href="javascript:;" class="nav-link text-body font-weight-bold px-0">
                <i class="fa fa-user me-sm-1"></i>
                <span class="d-sm-inline d-none">Sign In</span>
              </a>
            </li> --}}
            <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                </div>
              </a>
            </li>
            <li class="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" class="nav-link text-body p-0">
                <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li class="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="javascript:;" class="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-bell cursor-pointer"></i>
              </a>
              <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                <li class="mb-2">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex py-1">
                      <div class="my-auto">
                        <img src="./assets/img/team-2.jpg" class="avatar avatar-sm  me-3 ">
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="text-sm font-weight-normal mb-1">
                          <span class="font-weight-bold">New message</span> from Laur
                        </h6>
                        <p class="text-xs text-secondary mb-0">
                          <i class="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="mb-2">
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex py-1">
                      <div class="my-auto">
                        <img src="./assets/img/small-logos/logo-spotify.svg" class="avatar avatar-sm bg-gradient-dark  me-3 ">
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="text-sm font-weight-normal mb-1">
                          <span class="font-weight-bold">New album</span> by Travis Scott
                        </h6>
                        <p class="text-xs text-secondary mb-0">
                          <i class="fa fa-clock me-1"></i>
                          1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex py-1">
                      <div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                        <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <title>credit-card</title>
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                              <g transform="translate(1716.000000, 291.000000)">
                                <g transform="translate(453.000000, 454.000000)">
                                  <path class="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                  <path class="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="text-sm font-weight-normal mb-1">
                          Payment successfully completed
                        </h6>
                        <p class="text-xs text-secondary mb-0">
                          <i class="fa fa-clock me-1"></i>
                          2 days
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->



