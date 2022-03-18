@include('admin.layouts.header')
@include('admin.layouts.navbar')

  <!-- Main content -->
  @include('admin.layouts.message')
  @yield('content')

@include('admin.layouts.footer')
