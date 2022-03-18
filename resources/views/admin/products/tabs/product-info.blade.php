<div class="row">
  <div class="col-sm-12">
    <h4 class="info-text mt-5"> Let's start with the basic details.</h4>
  </div>
  <div class="col-sm-12">
    <div class="input-group input-group-outline mb-5">
      <label class="form-label">Your Title</label>
      <input name="title" value='{{$product->title}}' type="text" class="form-control">
    </div>

    <div class="input-group full">
      <div class="">
        <label class="form-label">Your Content</label>
        <textarea class="form-control long" name="content" rows="5">{{$product->content}}</textarea>
      </div>
    </div>
  </div>

  <div class="px-4 mt-4">
    <div class='file1'>
      <div class="btn-primary">Choose images to upload <i class="fas fa-upload"></i></div>
      <input type="file" id="image_uploads" name="photo" accept=".jpg, .jpeg, .png" multiple>
    </div>
    <div class="preview mt-6">
      @error('photo')
      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
      @enderror
      @if ($message = Session::get('empty_img'))
      <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{$message}}</div>
      @endif
    </div>
  </div>


</div>



@push('js')

<script>
  const input = document.querySelector('.file1 input');
  const preview = document.querySelector('.preview');

  input.style.opacity = 0;

  input.addEventListener('change', updateImageDisplay);

  function updateImageDisplay() {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    if (curFiles.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No files currently selected for upload';
      preview.appendChild(para);
    } else {
      const list = document.createElement('ol');
      preview.appendChild(list);

      for (const file of curFiles) {
        const listItem = document.createElement('li');
        const para = document.createElement('p');
        if (validFileType(file)) {
          para.textContent = `${file.name}, file size ${returnFileSize(file.size)}.`;
          const image = document.createElement('img');
          image.src = URL.createObjectURL(file);

          listItem.appendChild(image);
          listItem.appendChild(para);
        } else {
          para.textContent = `${file.name}: Not a valid file type. Update your selection.`;
          listItem.appendChild(para);
        }

        list.appendChild(listItem);
      }
    }
  }

  const fileTypes = [
    "image/apng"
    , "image/bmp"
    , "image/gif"
    , "image/jpeg"
    , "image/pjpeg"
    , "image/png"
    , "image/svg+xml"
    , "image/tiff"
    , "image/webp"
    , "image/x-icon"
  ];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  function returnFileSize(number) {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB';
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + 'MB';
    }
  }

</script>



@endpush
