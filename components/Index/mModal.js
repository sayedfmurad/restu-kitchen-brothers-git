export default function MModal ({idd,contaienrr}) {
    return <div  className="modal text-black" id={idd} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme="">
    <div class="modal-dialog modal-fullscreen-md-down">
      <div class="modal-content">
        {contaienrr}         
      </div>
    </div>
  </div>
    
  }