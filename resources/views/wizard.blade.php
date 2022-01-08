<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>Material Bootstrap Wizard by Creative Tim</title>

  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  <meta name="viewport" content="width=device-width" />

  <link rel="apple-touch-icon" sizes="76x76" href="admin/assets/img/apple-icon.png" />
  <link rel="icon" type="image/png" href="admin/assets/img/favicon.png" />

  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

  <!-- CSS Files -->
  <link href="admin/assets/css/bootstrap.min.css" rel="stylesheet" />
  <link href="admin/assets/css/material-bootstrap-wizard.css" rel="stylesheet" />

  <!-- CSS Just for demo purpose, don't include it in your project -->
  <link href="admin/assets/css/demo.css" rel="stylesheet" />
</head>

<style>
  .preview{
    overflow: hidden;
    background-color: #fff;
  }
  .preview ol li{
    float: left;
    margin: 10px;
    width: 200px;
  }

  .preview ol li img{
    width: 200px;
    display: block;
    border-radius: 10px;
  }
  .preview ol li p{
    margin-top: 10px;
  }
</style>

<body>



  <div>
    <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple>
  </div>
  <div class="preview">
    <p>No files currently selected for upload</p>
  </div>

<script>

const input = document.querySelector('input');
const preview = document.querySelector('.preview');

input.style.opacity = 0;

input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if(validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

</script>




  <!--   Big container   -->
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <!--      Wizard container        -->
        <div class="wizard-container">
          <div class="card wizard-card" data-color="red" id="wizard">
            <form action="" method="">
              <!--        You can switch " data-color="blue" "  with one of the next bright colors: "green", "orange", "red", "purple"             -->

              <div class="wizard-header">
                <h3 class="wizard-title">
                  Book a Room
                </h3>
                <h5>This information will let us know more about you.</h5>
              </div>
              <div class="wizard-navigation">
                <ul>
                  <li><a href="#details" data-toggle="tab">Account</a></li>
                  <li><a href="#captain" data-toggle="tab">Room Type</a></li>
                  <li><a href="#description" data-toggle="tab">Extra Details</a></li>
                </ul>
              </div>

              <div class="tab-content">
                <div class="tab-pane" id="details">
                  <div class="row">
                    <div class="col-sm-12">
                      <h4 class="info-text"> Let's start with the basic details.</h4>
                    </div>
                    <div class="col-sm-6">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="material-icons">email</i>
                        </span>
                        <div class="form-group label-floating">
                          <label class="control-label">Your Email</label>
                          <input name="name" type="text" class="form-control">
                        </div>
                      </div>

                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="material-icons">lock_outline</i>
                        </span>
                        <div class="form-group label-floating">
                          <label class="control-label">Your Password</label>
                          <input name="name2" type="password" class="form-control">
                        </div>
                      </div>

                    </div>
                    <div class="col-sm-6">
                      <div class="form-group label-floating">
                        <label class="control-label">Country</label>
                        <select class="form-control">
                          <option disabled="" selected=""></option>
                          <option value="Afghanistan"> Afghanistan </option>
                          <option value="Albania"> Albania </option>
                          <option value="Algeria"> Algeria </option>
                          <option value="American Samoa"> American Samoa </option>
                          <option value="Andorra"> Andorra </option>
                          <option value="Angola"> Angola </option>
                          <option value="Anguilla"> Anguilla </option>
                          <option value="Antarctica"> Antarctica </option>
                          <option value="...">...</option>
                        </select>
                      </div>
                      <div class="form-group label-floating">
                        <label class="control-label">Daily Budget</label>
                        <select class="form-control">
                          <option disabled="" selected=""></option>
                          <option value="Afghanistan">
                            < $100 </option>
                          <option value="Albania"> $100 - $499 </option>
                          <option value="Algeria"> $499 - $999 </option>
                          <option value="American Samoa"> $999+ </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="captain">
                  <h4 class="info-text">What type of room would you want? </h4>
                  <div class="row">
                    <div class="col-sm-10 col-sm-offset-1">
                      <div class="col-sm-4">
                        <div class="choice" data-toggle="wizard-radio" rel="tooltip"
                          title="This is good if you travel alone.">
                          <input type="radio" name="job" value="Design">
                          <div class="icon">
                            <i class="material-icons">weekend</i>
                          </div>
                          <h6>Single</h6>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="choice" data-toggle="wizard-radio" rel="tooltip"
                          title="Select this room if you're traveling with your family.">
                          <input type="radio" name="job" value="Code">
                          <div class="icon">
                            <i class="material-icons">home</i>
                          </div>
                          <h6>Family</h6>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="choice" data-toggle="wizard-radio" rel="tooltip"
                          title="Select this option if you are coming with your team.">
                          <input type="radio" name="job" value="Code">
                          <div class="icon">
                            <i class="material-icons">business</i>
                          </div>
                          <h6>Business</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="description">
                  <div class="row">
                    <h4 class="info-text"> Drop us a small description.</h4>
                    <div class="col-sm-6 col-sm-offset-1">
                      <div class="form-group">
                        <label>Room description</label>
                        <textarea class="form-control" placeholder="" rows="6"></textarea>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label class="control-label">Example</label>
                        <p class="description">"The room really nice name is recognized as being a really awesome
                          room. We use it every sunday when we go fishing and we catch a lot. It has some kind of magic
                          shield around it."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wizard-footer">
                <div class="pull-right">
                  <input type='button' class='btn btn-next btn-fill btn-danger btn-wd' name='next' value='Next' />
                  <input type='button' class='btn btn-finish btn-fill btn-danger btn-wd' name='finish' value='Finish' />
                </div>
                <div class="pull-left">
                  <input type='button' class='btn btn-previous btn-fill btn-default btn-wd' name='previous'
                    value='Previous' />

                  <div class="footer-checkbox">
                    <div class="col-sm-12">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" name="optionsCheckboxes">
                        </label>
                        Subscribe to our newsletter
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </form>
          </div>
        </div> <!-- wizard container -->
      </div>
    </div> <!-- row -->
  </div> <!--  big container -->


</body>
<!--   Core JS Files   -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"
integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous">
</script>

<script src="{{ asset('admin/assets/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('admin/assets/js/jquery.bootstrap.js') }}"></script>

<!--  Plugin for the Wizard -->
<script src="{{ asset('admin/assets/js/material-bootstrap-wizard.js') }}"></script>

<!--  More information about jquery.validate here: http://jqueryvalidation.org/	 -->
<script src="{{ asset('admin/assets/js/jquery.validate.min.js') }}"></script>

</html>
