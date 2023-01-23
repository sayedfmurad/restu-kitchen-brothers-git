import decodeToken from '../Utils/decodeToken'
import { useRouter } from 'next/router'
import React, { useState } from 'react';

const CoEdituser = () => {
    let user;
    const router = useRouter();

    let submitForm;
    if(process.browser)
    {
        user = decodeToken(localStorage.getItem("id_token"));
        if(user == undefined)
         router.push({pathname:"./",query:""});
        window.onload = ()=>{
          if (window.jQuery) {  
            $('#firstname').val(user['name']);
            $('#lastname').val(user['family_name']);
            $('#tel').val(user['phone_number']);
        }
        }
        
        submitForm = async e => {
            e.preventDefault();
            $('#spinnersub').get(0).style.display = '';
            const id_token = localStorage.getItem("id_token");
            const url ='https://u1qqd0r6p7.execute-api.eu-central-1.amazonaws.com/prod/users';
            var x = new XMLHttpRequest(); x.open("POST",url); 
              x.setRequestHeader("Content-Type", "application/json");
              x.setRequestHeader("Authorization", id_token);
              x.onreadystatechange = function () {
                if(x.readyState === XMLHttpRequest.DONE) {
                  var status = x.status;
                  if (status === 0 || (status >= 200 && status < 400)) {
                    router.push({pathname:"./logout",query:""});
                  } else {
                    $('#spinnersub').get(0).style.display = 'none';                    
                    $('.alert').get(0).style.display = '';                    
                    $('.alert').text(x.responseText);                    
                  }
                }
              };
              x.send(JSON.stringify({"fname":$('#firstname').val(),"lname":$('#lastname').val(),"tel":$('#tel').val(),"username":user["sub"]}));
        }
    
      }

    return ( <> 
    <div className="container">
        <form className="row" onSubmit={submitForm}>
            <div class="col-md-6">
                <label for="firstname" class="form-label">First Name</label>
                <input type="fname" class="form-control" id="firstname"  name="fname"  required/>
            </div>
            <div class="col-md-6">
                <label for="lastname" class="form-label">Last Name</label>
                <input type="lname" class="form-control" id="lastname" name="lname"  required/>
            </div>
            <div class="col-md-6">
                <label for="tel" class="form-label">Phone Number</label>
                <input type="tel" class="form-control" id="tel" name="tel"  required/>
            </div>
            <div className="col-md-12 mt-4 ">
            <button class="btn btn-primary" id="submitbtn" type="submit" >
              <span id='spinnersub' style={{display:'none'}} class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              <span class="sr-only">{' '}Edit</span>
            </button>
            <div class="alert alert-danger mt-4" style={{display:'none'}} role="alert">
            Error
            </div>  
            </div>
            
        </form>
    </div> 
    </>
    )
}
export default CoEdituser;