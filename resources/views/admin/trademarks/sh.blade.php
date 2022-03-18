

  {{-- Start Create TradeMark Model --}}

  <div class="col-md-4">
    <!-- Modal -->
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-footer">

            @include('admin.trademarks.create')

            <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" wire:click="store" class="btn bg-gradient-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4">
    <!-- Modal -->
    <div class="modal fade" id="updateModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-footer">
            <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" wire:click="edit(5)" class="btn bg-gradient-primary">Submit</button>
            <button type="submit" wire:click="add" class="btn bg-gradient-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  {{-- End Create TradeMark Model --}}
