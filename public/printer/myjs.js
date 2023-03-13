var selected_device;
var devices = [];
var canPrint=false;
function addEleRes(msg){
	var html_select = document.getElementById("elel");
	html_select.innerHTML=html_select.innerHTML+"<br/>"+msg
				// var option = document.createElement("h4");
				// option.text = msg;
				// html_select.add(option);
}
function startListener(){	
	setTimeout(() => {
	checkBoolean();
	addEleRes("First Step")
	writeToSelectedPrinter('~hs'); 
	readFromSelectedPrinter();
	}, 5000);
}
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
function GetData()
{
	const id = findGetParameter("id");	
	const menuurl = findGetParameter("menuurl");	
	const time = findGetParameter("time");	
	if(id === null || menuurl === null || time === null)
	alert("einige Daten sind nicht verfugbar. id or menuurl or time Get Parameters");
	var urll = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws/?id="+id+"&time="+time+"&menuurl="+menuurl;
	let mheaders = new Headers();
      mheaders.append('Origin','*');
      fetch(urll, {
        method: 'GET', 
        headers: mheaders
      })
	  .then(response => response.json())
  	  .then(data => console.log(data))
      .catch((error) => {
		alert("Fehler"+error)
        console.error('Error:', error);
      })
}
function checkBoolean()
{
	setTimeout(() => {
		if(!canPrint)
		{
			addEleRes("CanPrint Not True");
			window.location.href=window.location.href;
		}
		else
		{
			addEleRes("CanPrint Is True");
			writeToSelectedPrinter(document.getElementById('write_text').value);
		}
	}, 4000);
}
function setup()
{
	// GetData();
	startListener();
	//Get the default device from the application as a first step. Discovery takes longer to complete.
	BrowserPrint.getDefaultDevice("printer", function(device)
			{
		
				//Add device to list of devices and to html select element
				selected_device = device;
				devices.push(device);
				var html_select = document.getElementById("selected_device");
				var option = document.createElement("option");
				option.text = device.name;
				html_select.add(option);


				//Discover any other devices available to the application
				BrowserPrint.getLocalDevices(function(device_list){
					for(var i = 0; i < device_list.length; i++)
					{
						//Add device to list of devices and to html select element
						var device = device_list[i];
						if(!selected_device || device.uid != selected_device.uid)
						{
							devices.push(device);
							var option = document.createElement("option");
							option.text = device.name;
							option.value = device.uid;
							html_select.add(option);
						}
					}
					
				}, function(){
					addEleRes("No Local Printers")
				},"printer");
				
			}, function(error){
				if(option.text == "")
				{
					alert("please Open Zebra app")
					window.location.href=window.location.href;
				}
				addEleRes(error);
			})
}
function getConfig(){
	BrowserPrint.getApplicationConfiguration(function(config){
		addEleRes(JSON.stringify(config))
	}, function(error){
		addEleRes(JSON.stringify(new BrowserPrint.ApplicationConfiguration()));
	})
}
function writeToSelectedPrinter(dataToWrite)
{
	selected_device.send(dataToWrite, undefined, errorCallback);
}
var readCallback = function(readData) {
	if(readData === undefined || readData === null || readData === "")
	{
		addEleRes("No Response from Device");
	}
	else
	{
		canPrint=true
		addEleRes("ok"+readData);
	}
	
}
var errorCallback = function(errorMessage){
	addEleRes("Error: " + errorMessage);
	addEleRes("Error: " + errorMessage);	
}
function readFromSelectedPrinter()
{

	selected_device.read(readCallback, errorCallback);
	
}
function getDeviceCallback(deviceList)
{
	addEleRes("Devices: \n" + JSON.stringify(deviceList, null, 4))
}

function sendImage(imageUrl)
{
	url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
	url = url + "/" + imageUrl;
	selected_device.convertAndSendFile(url, undefined, errorCallback)
}
function sendFile(fileUrl){
    url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
    url = url + "/" + fileUrl;
    selected_device.sendFile(url, undefined, errorCallback)
}
function onDeviceSelected(selected)
{
	for(var i = 0; i < devices.length; ++i){
		if(selected.value == devices[i].uid)
		{
			selected_device = devices[i];
			return;
		}
	}
}
window.onload = setup;