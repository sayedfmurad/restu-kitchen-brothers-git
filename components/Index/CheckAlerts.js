import { useEffect, useState } from "react"
import langswitch from "../Utils/langswitch"


function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    // if (/windows phone/i.test(userAgent)) {
    //     return "Windows Phone";
    // }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}




function AndroidModal () {
    return <div class="modal fade" id="AndroidInstallationModal" tabindex="-1" aria-labelledby="AndroidInstallationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AndroidInstallationModalLabel">Android Installation</h5>
            <button id="btn-close-AndroidInstallationModalLabel" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h4>
            1.Klicke auf die drei Punkte in deinem Browser für mehr Optionen.
            </h4>
            <img style={{width:"100%"}} src="./Images/Instructions/android_install_inst1.jpg"/>
            <br/>
            <h4 className="mt-5">
            2.Klicke auf 'Zum Startbildschirm hinzufügen' für einfachen Zugriff.
            </h4>
            <img style={{width:"100%"}} src="./Images/Instructions/android_install_inst2.jpg"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Schließen</button>
          </div>
        </div>
      </div>
    </div>
}
function IOSModal () {
    return <div class="modal fade" id="IOSInstallationModal" tabindex="-1" aria-labelledby="IOSInstallationModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="IOSInstallationModalLabel">iOS Installation</h5>
          <button id="btn-close-IOSInstallationModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <h4>
            1.Klicke auf den Knopf in deinem Browser für mehr Optionen.
            </h4>
            <img style={{width:"100%"}} src="./Images/Instructions/ios_install_inst1.png"/>
            <br/>
            <h4 className="mt-5">
            2.Klicke auf 'Zum Startbildschirm hinzufügen' für einfachen Zugriff.
            </h4>
            <img style={{width:"100%"}} src="./Images/Instructions/ios_install_inst2.png"/>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Schließen</button>
        </div>
      </div>
    </div>
  </div>
}
function CheckIsPWAInstalled () {
  

        let IsInstallPromptThere = false    
        if( installPrompt !== null)
        if(typeof installPrompt !== "undefined")
        {
            installPrompt.prompt()     
            IsInstallPromptThere = true
        }
        if(!IsInstallPromptThere)
        {
            let type = getMobileOperatingSystem()
            if(type == "Android")
            {
              var myModal = new bootstrap.Modal(document.getElementById('AndroidInstallationModal')
              , {
                keyboard: true
              })
              myModal.show()
              history.pushState({}, '');
              
            }else if(type == "iOS")            
            {
              var myModal = new bootstrap.Modal(document.getElementById('IOSInstallationModal')
              , {
                keyboard: true
              })
              myModal.show()
              history.pushState({}, '');
            }
        }
}

export default({menu})=>{
    const AddRow=(classes,text)=>{
        rows.push(
            <div className={`${classes} rounded-0 m-0`} role="alert">
                {text}            
            </div>)
    }
        const displayMode = window.matchMedia('(display-mode: standalone)');

        var rows = []
        
        
        // if(getMobileOperatingSystem() != "unknown")
        if(!displayMode.matches)
        AddRow("alert alert-warning d-flex justify-content-between p-2",<><strong className="p-1">Installieren Sie unsere App!</strong>
            <button className="btn btn-secondary btn-sm"
            onClick={CheckIsPWAInstalled}
            >&darr;&nbsp;&nbsp;Installieren</button></>) 
        
        if("rabat" in menu)
        if(menu["rabat"]!="")
        AddRow("alert alert-warning","NUR HIER MIT "+menu["rabat"]+"% ONLINE-RABATT BESTELLEN")

        if("alerts" in menu["staticValue"])
        for(var k in menu["staticValue"]["alerts"])
        AddRow(menu["staticValue"]["alerts"][k]["class"],menu["staticValue"]["alerts"][k]["text"])

        if(!("closed" in menu["staticValue"]))
        if(!langswitch.checkOpenCloseStore(menu))    
        AddRow("alert alert-danger","Geschlossen. "+langswitch.NextOpenTimeMsg(menu))



    

        
    


    





    return <>
    {rows}
    <AndroidModal/>
    <IOSModal/>
    </>
}