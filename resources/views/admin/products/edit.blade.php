@extends('admin.index')

@section('title', 'Create Country')

@section('content')

		<!--   Big container   -->



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
                <a href="{{route('mall.index')}}">Back</a>
                <h3 class="card-title">Quick Example <small>jQuery Validation</small></h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form action="{{route('mall.update', $mall->id)}}" method="POST">
                @csrf
                @method('PUT')
                <div class="card-body">

                  <div class="form-group">
                    <label for="exampleInputEmail1">Mall Name in Arabic</label>
                    <input type="text" name="name_ar" value='{{$mall->name_ar}}' class="form-control">
                    @error('name_ar')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Mall Name in English</label>
                    <input type="text" name="name_en" value='{{$mall->name_en}}' class="form-control">
                    @error('name_en')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">email</label>
                    <input type="email" name="email" value='{{$mall->email}}' class="form-control">
                    @error('email')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Facebook</label>
                    <input type="text" name="facebook" value='{{$mall->facebook}}' class="form-control">
                    @error('facebook')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Twitter</label>
                    <input type="text" name="twitter" value='{{$mall->twitter}}' class="form-control">
                    @error('twitter')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Website</label>
                    <input type="text" name="website" value='{{$mall->website}}' class="form-control">
                    @error('website')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Contact Name</label>
                    <input type="text" name="contact_name" value='{{$mall->contact_name}}' class="form-control">
                    @error('contact_name')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input type="text" name="address" value='{{$mall->address}}' class="form-control">
                    @error('address')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Mobile</label>
                    <input type="text" name="mobile" value='{{$mall->mobile}}' class="form-control">
                    @error('mobile')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Lat</label>
                    <input type="text" name="lat" value='{{$mall->lat}}' class="form-control">
                    @error('lat')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Lng</label>
                    <input type="text" name="lng" value='{{$mall->lng}}' class="form-control">
                    @error('lng')
                      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                  </div>

                  <select class="form-control" name="country_id">
                    <option selected value="null">Chose Country</option>
                    @foreach ($country as $item)
                      <option value="{{$item->id}}" @if ($item->id == $mall->country_id) selected @endif>{{$item->country_name_en}}</option>
                    @endforeach
                  </select>

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
