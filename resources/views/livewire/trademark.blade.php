<div class="modal-header">
  <h5 class="modal-title font-weight-normal" id="exampleModalLongTitle">Create City</h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body font-weight-light">



  <div class="input-group  input-group-outline mt-3">
    <label class="form-label">trademark Name in Arabic</label>
    <input type="text" name="trade_name_ar" class="form-control">
  </div>
  @error('trade_name_ar')
    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
  @enderror

  <div class="input-group  input-group-outline mt-4">
    <label class="form-label">trademark Name in English</label>
    <input type="text" name="trade_name_en" class="form-control">
  </div>
  @error('trade_name_en')
    <div style="color: rgba(255, 0, 0, 0.692)" class="form-text">{{ $message }}</div>
  @enderror



</div>
<div class="modal-footer">
  <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
  <button type="submit" wire:click="store" class="btn bg-gradient-primary">Submit</button>
</div>
