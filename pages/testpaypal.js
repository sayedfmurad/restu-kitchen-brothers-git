import { useEffect } from "react"

export default ()=>{
    useEffect(()=>{
        // Define the PayPal client ID
        const paypalClientId = 'AfuSl7LqNnZtAwNFZ-PVW56KYsaBJvrg1USrJj1_7evZzCqGcXXktUWyRi6pKBlpa3PEVDyps8CeJD8i'

        // Define the checkout parameters
        const checkoutParams = {
            intent: 'capture', // The intent of the checkout (capture or authorize)
            currency_code: 'USD', // The currency of the checkout
            amount: '10.00', // The amount of the checkout
            description: 'My purchase', // The description of the purchase
            reference_id: 'YOUR_REFERENCE_ID' // Your custom reference ID
        }
        
        // Build the checkout URL
        const paypalCheckoutUrl = `https://www.paypal.com/checkoutnow?client-id=${paypalClientId}&intent=${checkoutParams.intent}&currency_code=${checkoutParams.currency_code}&amount=${checkoutParams.amount}&description=${checkoutParams.description}&reference_id=${checkoutParams.reference_id}`

        // Open the PayPal app to complete the checkout
        const paypalAppUrl = `paypal://checkoutnow?token=${paypalCheckoutUrl}`
      
        window.location = paypalAppUrl
    },[])
    
    return <><a href="paypal://checkoutnow?client_id=YOUR_CLIENT_ID&amount=10.00&reference_id=YOUR_REFERENCE_ID">paypal://checkoutnow?client_id=YOUR_CLIENT_ID&amount=10.00&reference_id=YOUR_REFERENCE_ID</a></>
}
