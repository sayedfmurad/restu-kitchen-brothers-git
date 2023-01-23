 var gsum = 0; 
 var mainid = "";
 var successpage = "success.html"
    function initPayPalButton() {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal',
          
        },
        funding: {
          allowed: [ paypal.FUNDING.CARD ],
          disallowed: [ paypal.FUNDING.CREDIT ]
         },
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"reference_id":mainid,"amount":{"currency_code":"EUR","value":gsum}}]
          });
        },

        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
            
            // Full available details
            // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

            // Show a success message within this page, e.g.
            const element = document.getElementById('paypal-button-container');
            element.innerHTML = '';
            element.innerHTML = '<h3>Thank you for your payment!</h3>';
            window.location.href = successpage;
            // Or go to another URL:  actions.redirect('thank_you.html');
            
          });
        },

        onError: function(err) {
            window.location.href = "./";
        }
      }).render('#paypal-button-container');
    }
    window.onload = ()=>{
        initPayPalButton();
    }
    
  