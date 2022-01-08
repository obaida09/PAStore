@extends('admin.index')

@section('title', 'Edit Country')

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
                <form action="{{route('country.update', $country->id)}}" method="POST">
                  @csrf
                  @method('PUT')

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Country Name in Arabic</label>
                    <input type="text" name="country_name_ar"  value="{{$country->country_name_ar}}" class="form-control">
                  </div>
                  @error('country_name_ar')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Country Name in English</label>
                    <input type="text" name="country_name_en"  value="{{$country->country_name_en}}" class="form-control">
                  </div>
                  @error('country_name_en')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Mob</label>
                    <input type="text" name="mob"  value="{{$country->mob}}" class="form-control">
                  </div>
                  @error('mob')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Code</label>
                    <input type="text" name="code"  value="{{$country->code}}" class="form-control">
                  </div>
                  @error('code')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror


                  <button type="submit" class="btn btn-secondary mt-5">Submit</button>
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

