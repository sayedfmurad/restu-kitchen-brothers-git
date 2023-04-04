import { loadScript } from "@paypal/paypal-js";
import langswitch from "../components/Utils/langswitch"
export default ()=>
{

    loadScript({ 
        "client-id": "AfuSl7LqNnZtAwNFZ-PVW56KYsaBJvrg1USrJj1_7evZzCqGcXXktUWyRi6pKBlpa3PEVDyps8CeJD8i",
        currency: "EUR",
        "data-page-type": "checkout"
     })
        .then((paypal) => {
            paypal
                .Buttons(
                    {
                        style: {
                          layout: 'vertical',
                          color:  'blue',
                          shape:  'rect',
                          label:  'paypal'
                        },
                            createOrder: function(data, actions) {
                              return actions.order.create({
                                purchase_units: [{
                                  amount: {
                                    value: '10.00',
                                    currency_code: 'EUR'
                                  }
                                }]
                              });
                            },
                            onApprove: (data, actions) =>{
                              return actions.order.capture().then(function(details) {
                                // Show a success message to the buyer
                                window.location.href=langswitch.RouteP("success");
                              });
                            }
                      }
                )
                .render("#paypalc")
                .catch((error) => {
                    console.error("failed to render the PayPal Buttons", error);
                });
        })
        .catch((error) => {
            console.error("failed to load the PayPal JS SDK script", error);
        });

    return<>
    <div className="container" id="paypalc">

    </div>
    </>
}