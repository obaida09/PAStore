@extends('admin.index')

@section('title', 'Create User')

@section('content')

<div class="main-content position-relative bg-gray-100 max-height-vh-100 h-100 ps ps--active-y">

<div class="container-fluid px-2 px-md-4">
  <div class="card card-body mx-3 mx-md-4 mt-n6">
    <div class="row gx-4 mb-2">


      <form action="{{route('admin.store')}}" method="POST">
        @csrf
        <div class="card-body">

          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" name="name" class="form-control" placeholder="Enter name">
            @error('name')
              <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
            @enderror
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" name="email" class="form-control" placeholder="Enter email">
            @error('email')
              <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
            @enderror
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" name="password" class="form-control" placeholder="Password">
            @error('password')
              <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
            @enderror
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Confirmed Password</label>
            <input type="password" name="password_confirmation" class="form-control" placeholder="Confirm Password ">
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <button type="submit" class="btn btn-secondary">Submit</button>
        </div>
      </form>

    </div>
  </div>
</div>
</div>



  <div class="container">
  <!-- Content Wrapper. Contains page content -->
  <div>
    <!-- Content Header (Page header) -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-12">
            <!-- jquery validation -->
            <div class="card card-secondary">
              <div class="card-header">
                <a href="{{route('admin.index')}}">Back</a>
                <h3 class="card-title">Quick Example <small>jQuery Validation</small></h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form action="{{route('admin.store')}}" method="POST">
                @csrf
                <div class="card-body">

                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" name="name" class="form-control" placeholder="Enter name">
                    @error('name')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" class="form-control" placeholder="Enter email">
                    @error('email')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Password">
                    @error('password')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPassword1">Confirmed Password</label>
                    <input type="password" name="password_confirmation" class="form-control" placeholder="Confirm Password ">
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-secondary">Submit</button>
                </div>
              </form>
            </div>
            <!-- /.card -->
            </div>
          <!--/.col (left) -->
          <!-- right column -->
          <div class="col-md-6">
          </div>
          <!--/.col (right) -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</div>
@endsection
