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
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Quick Example <small>jQuery Validation</small></h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form action="{{url('admin.settings')}}" method="POST">
              @csrf
              <div class="card-body">

                <div class="form-group">
                  <label for="exampleInputEmail1">Website Name (Ar)</label>
                  <input type="text" name="nameAR" class="form-control" placeholder="Website Name in Arabic">
                  @error('nameAR')
                    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
                  @enderror
                </div>

                <div class="form-group">
                  <label for="exampleInputEmail1">Website Name (En)</label>
                  <input type="text" name="nameEN" class="form-control" placeholder="Website Name in English">
                  @error('nameEN')
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
                  <label for="customFile">Website Logo</label>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                  </div>
                </div>

                <div class="form-group">
                  <label>About Website</label>
                  <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                </div>

                <div class="form-group">
                  <label>Key Word</label>
                  <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                </div>

                <div class="form-group">
                  <label>Status Of Website</label>
                  <select class="form-control">
                    <option>open</option>
                    <option>close</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Message</label>
                  <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
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
  <!-- /.box-body -->
</div>



<div class="row">
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Regular header</h4>
        <p class="category">Category subtitle</p>
      </div>
      <div class="card-body">
        The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona...
      </div>
    </div>
  </div>

  <div class="col-md-6">
    <div class="card">
        <div class="card-header card-header-danger">
            <h4 class="card-title">Full header coloured</h4>
            <p class="category">Category subtitle</p>
        </div>
        <div class="card-body">
              The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona...
        </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-6">
      <div class="card">
          <div class="card-header card-header-icon card-header-rose">
            <div class="card-icon">
              <i class="material-icons">language</i>
            </div>
          </div>
          <div class="card-body">
              <h4 class="card-title">Here is the Icon</h4>
                  The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona...
          </div>
      </div>
  </div>

  <div class="col-md-6">
      <div class="card">
          <div class="card-header card-header-text card-header-primary">
            <div class="card-text">
              <h4 class="card-title">Here is the Text</h4>
            </div>
          </div>
          <div class="card-body">
              The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona...
          </div>
      </div>
  </div>
</div>
<!-- /.box -->
@endsection
