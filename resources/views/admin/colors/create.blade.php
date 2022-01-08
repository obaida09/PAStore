@extends('admin.index')

@section('title', 'Create Color')

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
                <form action="{{route('color.store')}}" method="POST">
                  @csrf

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Color Name in Arabic</label>
                    <input type="text" name="name_ar" class="form-control">
                  </div>
                  @error('name_ar')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Color Name in English</label>
                    <input type="text" name="name_en" class="form-control">
                  </div>
                  @error('name_en')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-static mt-5">
                    <label class="form-label" for="exampleInputEmail1">Color</label>
                    <input type="color" name="color" class="form-control">
                  </div>
                  @error('color')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <button type="submit" class="btn btn-secondary">Submit</button>
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

