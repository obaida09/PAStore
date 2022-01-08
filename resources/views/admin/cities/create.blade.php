@extends('admin.index')

@section('title', 'Create City')


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
                <form action="{{route('city.store')}}" method="POST">
                  @csrf

                  <div class="input-group input-group-dynamic mb-5 my-4">
                    <label class="form-label" for="exampleInputEmail1">City Name in Ar</label>
                    <input type="text" name="city_name_ar" class="form-control">
                    @error('city_name_ar')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="input-group input-group-dynamic mb-5">
                    <label class="form-label" for="exampleInputEmail1">City Name in Er</label>
                    <input type="text" name="city_name_en" class="form-control">
                    @error('city_name_en')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="input-group input-group-static mb-5">
                    <label for="exampleFormControlSelect1" class="ms-0">select</label>
                    <select class="form-control" name="country_id" id="exampleFormControlSelect1">
                      @foreach ($country as $item)
                        <option value="{{$item->id}}" >{{$item->country_name_en}}</option>
                      @endforeach
                    </select>

                    @error('country_id')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

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
