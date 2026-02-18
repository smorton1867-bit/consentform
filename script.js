// Auto-fill date
document.getElementById('currentDate').value = new Date().toLocaleDateString();

// Signature pads
const customerCanvas = document.getElementById('customerSig');
const artistCanvas = document.getElementById('artistSig');
const customerSigPad = new SignaturePad(customerCanvas);
const artistSigPad = new SignaturePad(artistCanvas);

// Medical conditional
const medicalSelect = document.getElementById('medicalSelect');
const medicalTextLabel = document.getElementById('medicalTextLabel');
medicalSelect.addEventListener('change', function(){
  medicalTextLabel.style.display = this.value === 'Yes' ? 'block' : 'none';
});

// Payment conditional
const paymentMethod = document.getElementById('paymentMethod');
const paymentExtra = document.getElementById('paymentExtra');
paymentMethod.addEventListener('change', function(){
  if(this.value === 'Bank Transfer' || this.value === 'Cash'){
    paymentExtra.style.display = 'block';
  } else { paymentExtra.style.display = 'none'; }
});

// Form submission
const form = document.getElementById('consentForm');
form.addEventListener('submit', function(e){
  // Ensure signatures
  if(customerSigPad.isEmpty() || artistSigPad.isEmpty()){
    e.preventDefault();
    alert("Both signatures are required.");
    return false;
  }
  // Save signatures to hidden fields
  document.getElementById('customerSigData').value = customerSigPad.toDataURL();
  document.getElementById('artistSigData').value = artistSigPad.toDataURL();
  
  // Show success message
  setTimeout(function(){
    form.reset();
    customerSigPad.clear();
    artistSigPad.clear();
    document.getElementById('successMessage').style.display = 'block';
    setTimeout(()=>{ document.getElementById('successMessage').style.display='none'; },5000);
  }, 500);
});
