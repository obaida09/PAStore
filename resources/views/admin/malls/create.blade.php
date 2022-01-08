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
                  <h6 class="text-white text-capitalize ps-3">{{$title}}</h6>
                </div>
              </div>


              <div class="p-4">
                <!-- form start -->
                <form action="{{route('mall.store')}}" method="POST">
                  @csrf

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Mall Name in Arabic</label>
                    <input type="text" name="name_ar" class="form-control">
                  </div>
                  @error('name_ar')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Mall Name in English</label>
                    <input type="text" name="name_en" class="form-control">
                  </div>
                  @error('name_en')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Email</label>
                    <input type="email" name="email" class="form-control">
                  </div>
                  @error('email')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Facebook</label>
                    <input type="text" name="facebook" class="form-control">
                  </div>
                  @error('facebook')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Twitter</label>
                    <input type="text" name="twitter" class="form-control">
                  </div>
                  @error('twitter')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Website</label>
                    <input type="text" name="website" class="form-control">
                  </div>
                  @error('website')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Contact Name</label>
                    <input type="text" name="contact_name" class="form-control">
                  </div>
                  @error('contact_name')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Address</label>
                    <input type="text" name="address" class="form-control">
                  </div>
                  @error('address')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Mobile</label>
                    <input type="text" name="mobile" class="form-control">
                  </div>
                  @error('mobile')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Lat</label>
                    <input type="text" name="lat" class="form-control">
                  </div>
                  @error('lat')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror

                  <div class="input-group is-filled input-group-dynamic mt-5">
                    <label class="form-label" for="exampleInputEmail1">Language</label>
                    <input type="text" name="lng" class="form-control">
                  </div>
                  @error('lng')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror


                  <div class="input-group input-group-static mb-5">
                    <label for="exampleFormControlSelect1" class="ms-0">Select Country</label>
                    <select class="form-control" name="country_id" id="exampleFormControlSelect1">
                      @foreach ($country as $item)
                        <option value="{{$item->id}}">{{$item->country_name_en}}</option>
                      @endforeach
                    </select>
                  </div>
                  @error('country_id')
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
