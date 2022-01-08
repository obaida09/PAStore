@extends('admin.index')

@section('content')

<div class="container-fluid py-4">

      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <h6 class="text-white text-capitalize ps-3">{{$title}}</h6>
          </div>
        </div>
        <div class="card-body px-0 pb-2">
          <div class="table-responsive p-0">
            {{-- <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                  <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
                  <th class="text-secondary opacity-7"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">John Michael</h6>
                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Manager</p>
                    <p class="text-xs text-secondary mb-0">Organization</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">Online</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
                  </td>
                  <td class="align-middle">
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                      Edit
                    </a>
                  </td>
                </tr>

              </tbody>
            </table> --}}


{{--
            <table id="example1" class="table align-items-center mb-0">
              <thead>
              <tr>
                <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>id</th>
                <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>name</th>
                <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>email</th>
                <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>created_at</th>
                <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>updated_at</th>
                <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>updated_at</th>

              </tr>
              </thead>
              <tbody>

              @foreach ($admin as $item)
                <tr>

                  <td>
                    {{$item->id}}
                  </td>

                  <td>
                    {{$item->name}}
                  </td>

                  <td>
                   {{$item->email}}
                  </td>

                  <td>
                   {{$item->created_at}}
                  </td>

                  <td>
                   {{$item->updated_at}}
                  </td>

                  <td>
                   <a class="btn btn-icon btn-3 btn-primary">edit</a>
                  </td>
                </tr>
              @endforeach
              </tbody>
            </table> --}}

            {!!

            $dataTable->table([
              'class'=>'table align-items-center mb-0'
            ])


            !!}

          </div>
        </div>
      </div>

    </div>
  </div>
</div>

















{{-- <div class="box" style="padding:0 15px 0 8px">
  <div class="box-header">
    <h3 class="box-title">{{ $title }}</h3>
  </div>
  <!-- /.box-header -->
  <div class="box-body">
    {!! $dataTable->table([
    'class'=>'table table-dark table-striped table-hover'
    ]) !!}
  </div>
  <!-- /.box-body -->
</div> --}}
<!-- /.box -->

{{-- @push('js')
{!! $dataTable->scripts() !!}
@endpush --}}

@endsection
