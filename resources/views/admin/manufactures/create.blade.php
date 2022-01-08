@extends('admin.index')

@section('title', 'Create Country')

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
                    <h6 class="text-white text-capitalize ps-3">{{ $title }}</h6>
                  </div>
                </div>


                <div class="p-4">
                  <!-- form start -->
                  <form action="{{ route('manufacture.store') }}" method="POST">
                    @csrf

                    <div class="card-body">
                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Manufacture Name in Arabic</label>
                        <input type="text" name="name_ar" class="form-control">
                      </div>
                      @error('name_ar')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Manufacture Name in English</label>
                        <input type="text" name="name_en" class="form-control">
                      </div>
                      @error('name_en')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">email</label>
                        <input type="email" name="email" class="form-control">
                      </div>
                      @error('email')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Facebook</label>
                        <input type="text" name="facebook" class="form-control">
                      </div>
                      @error('facebook')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Twitter</label>
                        <input type="text" name="twitter" class="form-control">
                      </div>
                      @error('twitter')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Website</label>
                        <input type="text" name="website" class="form-control">
                      </div>
                      @error('website')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Contact Name</label>
                        <input type="text" name="contact_name" class="form-control">
                      </div>
                      @error('contact_name')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Address</label>
                        <input type="text" name="address" class="form-control">
                      </div>
                      @error('address')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Mobile</label>
                        <input type="text" name="mobile" class="form-control">
                      </div>
                      @error('mobile')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Lat</label>
                        <input type="text" name="lat" class="form-control">
                      </div>
                      @error('lat')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
                      @enderror

                      <div class="input-group is-filled input-group-dynamic mt-5">
                        <label for="exampleInputEmail1" class="form-label">Lng</label>
                        <input type="text" name="lng" class="form-control">
                      </div>
                      @error('lng')
                        <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
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
