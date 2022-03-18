@extends('admin.index')
@section('content')
<div class="box">
  <div class="box-header">
    <h3 class="box-title">{{ $title }}</h3>
  </div>
  <!-- /.box-header -->
  <section class="content container">
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
            <!-- /.card-header -->
            <!-- form start -->
            <form action="{{route('admin.setting')}}" method="POST">
              @csrf
              <div class="card-body">

                <div class="input-group input-group-outline mt-5">
                  <label class="form-label">Website Name (Ar)</label>
                  <input type="text" name="sitename_ar" class="form-control">
                </div>
                @error('sitename_ar')
                  <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                @enderror

                <div class="input-group input-group-outline mt-5">
                  <label class="form-label">Website Name (En)</label>
                  <input type="text" name="sitename_en" class="form-control">
                </div>
                @error('sitename_en')
                  <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                @enderror

                <div class="input-group input-group-outline mt-5">
                  <label class="form-label">Email address</label>
                  <input type="email" name="email" class="form-control">
                </div>
                @error('email')
                  <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                @enderror

                <div class="input-group input-group-outline mt-5">
                  <label class="form-label">About Website</label>
                  <textarea class="form-control" rows="3"></textarea>
                </div>

                <div class="input-group input-group-outline mt-5">
                  <label class="form-label">Key Word</label>
                  <textarea class="form-control" rows="3"></textarea>
                </div>

                <div class="input-group input-group-outline mt-5">
                  <label>Status Of Website</label>
                  <select class="form-control">
                    <option>open</option>
                    <option>close</option>
                  </select>
                </div>

                <div class="input-group input-group-outline mt-5">
                  <label class="form-label">Message</label>
                  <textarea class="form-control" rows="3"></textarea>
                </div>

                <div>
                  <div class='file1'>
                    <div class="btn-primary">Choose Icon to upload <i class="fas fa-upload"></i></div>
                    <input style='opacity:0;' type="file" id="image_uploads" name="icon" accept=".jpg, .jpeg, .png" multiple>
                  </div>
                  <div class="preview mt-4">
                    @error('photo')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @enderror
                    @if ($message = Session::get('empty_img'))
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                    @endif
                  </div>
                </div>

              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                <button type="submit" class="btn btn-secondary mt-3">Submit</button>
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
  <!-- /.box-body -->
</div>
@endsection
