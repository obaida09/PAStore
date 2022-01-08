@extends('admin.index')

@section('title', 'Create User')

@section('content')

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
            <div class="card my-6">

              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 class="text-white text-capitalize ps-3">{{$title}}</h6>
                </div>
              </div>


              <div class="p-4">
                <!-- form start -->
                <form action="{{route('user.update' , $user->id)}}" method="POST">
                  @csrf
                  @method('PUT')
                  <div class="card-body">

                    <div class="input-group is-filled input-group-dynamic mt-5">
                      <label for="exampleInputEmail1" class="form-label">Name</label>
                      <input type="text" name="name" class="form-control" value="{{$user->name}}">
                    </div>
                      @error('name')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                      @enderror

                    <div class="input-group is-filled input-group-dynamic mt-5">
                      <label for="exampleInputEmail1" class="form-label">Email address</label>
                      <input type="email" name="email" class="form-control" value="{{$user->email}}">
                    </div>
                      @error('email')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                      @enderror

                    <div class="input-group  input-group-dynamic mt-5">
                      <label for="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" name="password" class="form-control" >
                    </div>
                      @error('password')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                      @enderror

                    <div class="input-group  input-group-dynamic mt-5">
                      <label for="exampleInputPassword1" class="form-label">Confirmed Password</label>
                      <input type="password" name="password_confirmation" class="form-control">
                    </div>


                    <div class="input-group input-group-static mb-5">
                      <label for="exampleFormControlSelect1" class="ms-0">select</label>
                      <select class="form-control" name="level" id="exampleFormControlSelect1">
                        <option selected value="null">Chose...</option>
                        <option @if ($user->level == 'user') selected @endif>user</option>
                        <option @if ($user->level == 'vendor') selected @endif>vendor</option>
                        <option @if ($user->level == 'company') selected @endif>company</option>
                      </select>
                    </div>
                    @error('is_public')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror

                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                    <button type="submit" class="btn btn-secondary">Submit</button>
                  </div>
                </form>
              </div>
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
