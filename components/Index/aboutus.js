import Head from 'next/head';
import { useState } from 'react';
import MyNavbar from "../TopBar/TobBar2"
import langswitch from '../Utils/langswitch'

const OpeningTimes = (scheduleData) => {  
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const daysOfWeekGerman = {
      "sunday": "Sonntag",
      "monday": "Montag",
      "tuesday": "Dienstag",
      "wednesday": "Mittwoch",
      "thursday": "Donnerstag",
      "friday": "Freitag",
      "saturday": "Samstag"
    }
    const Adddigit = (d)=>{
    return d < 10 ? "0"+d:d
    }
    const currentDay = new Date().getDay(); // Get current day index (0 - Sunday, 6 - Saturday)

    return (
        <div className="container mt-3">
          <h5>Öffnungszeiten</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Öffnungszeit</th>
                <th>Schließzeit</th>
              </tr>
            </thead>
            <tbody>
          {daysOfWeek.map((day, index) => (
            day in scheduleData?
            <tr key={day} className={currentDay === index ? 'fw-bold' : ''}>
              <td>{daysOfWeekGerman[day]}</td>
              <td >
                {currentDay === index ? <strong> </strong> : null}
                {`${Adddigit(scheduleData[day].opentime.hour)}:${Adddigit(scheduleData[day].opentime.min)}`}
              </td>
              <td >
                {currentDay === index ? <strong> </strong> : null}
                {`${Adddigit(scheduleData[day].closetime.hour)}:${Adddigit(scheduleData[day].closetime.min)}`}
              </td>
            </tr>:<>
                <tr key={day}>
                    <td>{daysOfWeekGerman[day]}</td>
                    <td className='text-danger'>Geschlossen</td>
                    <td></td>
                </tr>
                </>
          ))}
        </tbody>
          </table>
        </div>
      );
      
  };

const Impressum = (s)=>{
  return <>
  <div className='col-12'>
  <h5>Impressum</h5>
  <p>{s["impressum"]["name"]}&nbsp;handelt im Namen von&nbsp;{s["kontakt"]["name"]}
  <br/>{s["kontakt"]["city"]}&nbsp;{s["kontakt"]["zipc"]}
  <br/>{s["kontakt"]["street"]}
  <br/>Tel:&nbsp;{s["kontakt"]["tel"]}</p>
  </div>
  </>
}
export default ({menu})=> {

    const MyLang = langswitch.langswitchs("aboutus");  
    // console.log(menu["staticValue"]["opendays"])
    return(
        <>
        <div class="modal-header">  
        <h3 className='m-0'>Über uns</h3>                                
         
         <button type="button" class="btn-close " id={`btn-close-AboutUsModal`} data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div class="modal-body" id="MainIdd"> 
        <div className="container text-black mt-4">
        <div className="row g-4">            
            <div className="col-12">
              <h5>{MyLang["telefon"]}</h5>
              <a className="" href={`tel:${menu["staticValue"]["kontakt"]["tel"]}`}>{menu["staticValue"]["kontakt"]["tel"]}</a>
              </div>
            <div className="col-12">
              <h5 className="">{MyLang["address"]}</h5>
              <h6 className="">{menu["staticValue"]["kontakt"]["name"]}</h6>
              <h6 className="">{menu["staticValue"]["kontakt"]["street"]}</h6>
              <h6 className="">{menu["staticValue"]["kontakt"]["zipc"]+" "+menu["staticValue"]["kontakt"]["city"]}</h6>
            </div>
            <div className='col-12 p-0'>{OpeningTimes(menu["staticValue"]["opendays"])}</div>
            {/* <div className='col-12 p-2 m-3'>
            <a className='btn btn-primary text-white' href="./html/policyprivacyweb.html">Datenschutz</a>
            </div>             */}            
            {"impressum" in menu["staticValue"]? Impressum(menu["staticValue"]):<></>}
        </div>
    </div>
    </div>
    </>
    )
    
}