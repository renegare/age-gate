const { init } = require("./init");
const { Roles } = require("./constants");

init(`
<div class="ag-modal-container">
<div class="ag-confirm-modal" role="${Roles.CONFIRM_MODAL}">
<div class="ag-content">
<h1>Age Restricted Content</h1>
<p>Please confirm you are above the legal drinking age in your country</p>
</div>

<div class="ag-options">
<button class="ag-confirm" role="${Roles.CONFIRM}">Confirm</button>
<button class="ag-cancel" role="${Roles.CANCEL}">Cancel</button>
</div>
</div>
<div class="ag-cancel-modal hidden" role="${Roles.CANCEL_MODAL}">
<div class="ag-content">
<h1>Sorry!</h1>
<p>You need to be of legal drinking age to visit our website</p>
</div>
<!-- <div class="ag-options">
<button class="ag-close" role="${Roles.CLOSE}">Close</button>
</div> -->
</div>
</div>
`);
