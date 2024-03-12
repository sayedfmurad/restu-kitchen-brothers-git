import React, { useState } from 'react';
import Button from '@mui/material/Button';

export default function PaymentMethods2({ menu, CheckOutBtn }) {
    const [value, setValue] = useState("none");

    React.useEffect(() => {
        menu["order"]["paymentmethod"] = value;
    }, [value]);

    return (
        <>
            <div className='list-group'>
                <div className='list-group-item backgroundcart'>
                    <div className="d-flex justify-content-start mb-2">
                        Bezahlen mit:
                    </div>
                    <div className=" mb-2 d-flex justify-content-start">
                        {
                            Object.keys(menu["staticValue"]["paymentmethod"]).map((keyy, indexx) => {
                                return (
                                    <>&nbsp;
                                        <Button
                                            key={keyy} // Added key prop
                                            onClick={() => setValue(keyy)} // Simplified onClick handler
                                            variant={value === keyy ? "contained" : "outlined"} // Fixed comparison
                                        >
                                            {menu["staticValue"]["paymentmethod"][keyy]["name"]}
                                        </Button>
                                    </>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <br />
            <button onClick={CheckOutBtn} className="btn btn-success col-12">
                <span className="sr-only">Bezahlen</span>
            </button>
        </>
    );
}
