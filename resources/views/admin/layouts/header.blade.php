<!DOCTYPE html>
<html lang="en" dir={{ direction() }}>

<head>
  <meta charset="utf-8" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="./assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="./assets/img/logo-h.png">
  <title>
    {{ isset($title) ? $title : "Admin Panel" }}
  </title>
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
  <!-- Nucleo Icons -->
  <link href="{{ asset('admin/assets/css/nucleo-icons.css') }}" rel="stylesheet" />
  <link href="{{ asset('admin/assets/css/nucleo-svg.css') }}" rel="stylesheet" />
  <!-- Wizard -->
  <link href="{{ asset('admin/assets/css/wizard.css') }}" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <!-- Datepicker -->
  <link href="{{ asset('admin/assets/css/bootstrap-datepicker.css') }}" rel="stylesheet" />
  <!-- js tree -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
  <!-- data table -->
  <link href="{{ asset('admin/DataTables/DataTables/css/jquery.dataTables.css') }}" rel="stylesheet" />
  <link href="{{ asset('admin/DataTables/Buttons/css/buttons.dataTables.css') }}" rel="stylesheet" />
  <link href="{{ asset('admin/DataTables/Responsive/css/responsive.dataTables.css') }}" rel="stylesheet" />

  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
  <!-- CSS Files -->
  <link id="pagestyle" href="{{ asset('admin/assets/css/material-dashboard.css?v=3.0.0') }}" rel="stylesheet" />

  <link rel="stylesheet" href="http://www.orangehilldev.com/jstree-bootstrap-theme/demo/assets/dist/themes/proton/style.css" />

  <style>
    /* body overlay model */
    .overlay {
      background: rgba(0, 0, 0, 0.342);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: none;
    }

    .disBlock {
      display: block;
      transition: .2s;
    }

    .modal-backdrop.show {
      opacity: 1;
      background: rgba(0, 0, 0, 0.342);
      transition: .2s;
    }


    @media screen and (min-width: 1200px) {
      .ltr .margin-nav {
        margin-left: 17.125rem;
      }
    }
    @media screen and (min-width: 1200px) {
      .rtl .margin-nav {
        margin-right: 17.125rem;
      }
    }

    .p-l {
      padding: 10px;
    }

    tr td .btn {
      margin: 5px 0 5px 3px;
    }

    .btn-footer-table {
      margin: -4% 0 0 1%;
    }

    .full {
      padding: 0 20px;
      ll
    }

      {
        {
        --

        /* fix ul in the wizard */
        .nav.nav-pills {
          line-height: 38px;
        }

        /* fix textarea in the wizard */
        .long {
          height: 110px;
          padding: 10px 0px;
        }

        /* fix button in the wizard */
        .pull-right {
          float: right !important;
        }

        .pull-left {
          float: left !important;
        }

        --
      }
    }


    /* Start Datepicker Edit */
    .datepicker.dropdown-menu {
      border: 1px solid #cccccc;
    }

    .datepicker th.prev p,
    .datepicker th.next p {
      font-size: 3rem;
      color: #000;
      padding-top: 30%;
    }

    .datepicker th.switch {
      color: #000;
      font-weight: 400
    }

    .datepicker .day p {
      color: #000;
      font-size: 0.8rem;
      font-weight: 400
    }

    .datepicker .day.old p,
    .datepicker .day.new p {
      opacity: .3;
    }

    /* End Datepicker Edit */


    /* edit search input in table */
    .search-table {
      background: none;
      border: 1px solid #d2d6da;
      border-radius: 0.375rem;
      border-top-left-radius: 0.375rem !important;
      border-bottom-left-radius: 0.375rem !important;
      padding: 0.5rem 0.55rem !important;
      line-height: 1.4 !important;
    }

    .search-table:active {
      background: none;
      border: 1px solid #e02e9c;
    }

    /* form cheack remove padding */
    .form-check {
      padding-left: 0;
    }

    .left {
      float: left;
      padding-left: 20px
    }


    .thr {
      border-top: 1px solid rgb(243, 243, 243);
    }

    .bhr {
      border-bottom: 1px solid rgb(243, 243, 243);
    }


    /* File Input in The Product */

    .file1 input {
      z-index: 999;
    }

    .file1 input,
    .file1 .btn-primary {
      position: absolute;
      width: 24%;
      padding: 1%;
      border-radius: 4px;
      display: inline-block;
      cursor: pointer;
    }

    .file1 .btn-primary i {
      float: right;
      padding: 1%
    }

    .preview {
      overflow: hidden;
      background-color: #fff;
    }

    .preview ol li {
      float: left;
      margin: 10px;
      width: 200px;
      color: rgb(155, 155, 155);
      font-size: 12px;
    }

    .preview ol li img {
      width: 200px;
      display: block;
      border-radius: 10px;
    }

    .preview ol li p {
      padding: 10px 0 0 10px;
      font-size: 12px;
    }


    .jstree-default .jstree-wholerow-hovered {
      background: linear-gradient(to bottom, #e32f6e4f 0, #e32f6e2f 100%);
    }

    .jstree-default .jstree-wholerow-clicked {
      background: linear-gradient(to bottom, #e32f6ea6 0, #e32f6e83 100%);
    }

  </style>

  @livewireStyles
</head>

<body class="g-sidenav-show bg-gray-200 {{ direction() }}">
