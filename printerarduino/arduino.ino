
#include "myLibrary.h"

#include <Adafruit_Thermal.h>
#include <SoftwareSerial.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
#include <EEPROM.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <Arduino.h>



HTTPClient sender;
WiFiClientSecure wifiClient;

const byte DNS_PORT = 53;
IPAddress apIP(172, 217, 28, 1);
IPAddress ip(192, 168, 1, 10);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

DNSServer dnsServer;
ESP8266WebServer webServer(80);

String responseHTML = ""
                      "<!DOCTYPE html><html lang='en'><head>"
                      "<meta name='viewport' content='width=device-width'>"
                      "<title>CaptivePortal</title></head><body>"                      
                      "<h1>WiFi Configuration</h1>"
                      "<form method='post' action='/configure'>"
                        "<label for='ssid'>WiFi Network Name:</label>"
                        "<input type='text' id='ssid' name='ssid'><br><br>"
                        "<label for='password'>WiFi Password:</label>"
                        "<input type='password' id='password' name='password'><br><br>"
                        "<input type='submit' value='Submit'>"
                      "</form>"                      
                      "</body></html>";
String responseHTML2 = "<!DOCTYPE html><html><head><title>Printing</title></head><body><h1>Printing</h1><script>window.close();</script></body></html>";




const byte RX_PIN = D5; // goes to TX on printer
const byte TX_PIN = D6; // goes to RX on printer

const int BAUDRATE = 9600;

SoftwareSerial printerSerial(RX_PIN, TX_PIN);
Adafruit_Thermal printer(&printerSerial);

String urlEncode(String str) {
  String encoded = "";
  char c;
  char code0;
  char code1;
  for (int i = 0; i < str.length(); i++) {
    c = str.charAt(i);
    if (c == ' ') {
      encoded += '+';
    } else if (isalnum(c)) {
      encoded += c;
    } else {
      code1 = (c & 0xf) + '0';
      if ((c & 0xf) > 9) {
        code1 = (c & 0xf) - 10 + 'A';
      }
      c = c >> 4;
      code0 = (c & 0xf) + '0';
      if ((c & 0xf) > 9) {
        code0 = (c & 0xf) - 10 + 'A';
      }
      encoded += '%';
      encoded += code0;
      encoded += code1;
    }
  }
  return encoded;
}


void printerWakeUp(void) {
  printer.wake();       // MUST wake() before printing again, even if reset
  printer.setDefault(); // Restore printer to defaults
}

void mPrint(String s, String type){
  if(type=="center"){    
    printer.justify('C');        
  }
  else if(type=="left"){    
    printer.justify('L');        
  }
  else if(type=="right"){    
    printer.justify('R');        
  }
  printer.println(s);
}
void OtherCommand(String type, String val)
{
if(type == "setsize")
{
  printer.setSize(val.charAt(0));
}else if (type == "feed")
{
 printer.feed(val.toInt());
}else if (type == "bold")
{
 if(val == "True")
 {printer.boldOn();}
 if(val == "False")
 {printer.boldOff();}
}

}
void printerTest() {
  printerWakeUp();

  printer.feed(2);  
  printer.setSize('S');
  // mPrint("Konstantinstrasse 87","center");
  // mPrint("41238 Moenchengladbach,","center");
  // mPrint("Tel:021662781117","center");
  // printer.feed(4);
  // printer.boldOn();
  // printer.setSize('L');
  // mPrint("Lieferung","center");
  // mPrint("Bestätigte Zeit","center");
  // mPrint("18:59","center");  
  // printer.feed(4);
  // printer.setSize('M');
  // mPrint("Sayed Murad","L");
  // mPrint("Roemerbrunnen 25","L");
  // mPrint("Moenchengladbach 41238","L");
  // printer.boldOff();
  // printer.feed(4);
  // mPrint("Margherita (#1)(Pizzen)(18,00 €)(4x)","L");
  // printer.feed(2);
  // mPrint("Lieferkosten 0,00€","L");
  // mPrint("Total	 18,00 €","L");
  // printer.feed(3);
  // printer.setSize('S');
  // mPrint("............","center");
  // printer.feed(2);
  // mPrint("Dies ist keine Rechnung","center");

  // // Set text justification (right, center, left) -- accepts 'L', 'C', 'R'
  // printer.justify('R');
  // printer.println(F("Right justified"));  
  // printer.justify('L');
  // printer.println(F("Left justified"));

  // // Test more styles
  printer.boldOn();
  printer.println(F("Bold text"));
  printer.boldOff();

  // printer.underlineOn();
  // printer.println(F("Underlined text"));
  // printer.underlineOff();

  // printer.setSize('L');        // Set type size, accepts 'S', 'M', 'L'
  // printer.println(F("Large"));
  // printer.setSize('M');
  // printer.println(F("Medium"));
  // printer.setSize('S');
  // printer.println(F("Small"));

  // printer.justify('C');
  // printer.println(F("normal\nline\nspacing"));
  // printer.setLineHeight(50);
  // printer.println(F("Taller\nline\nspacing"));
  // printer.setLineHeight(); // Reset to default
  // printer.justify('L');

  // printer.feed(2);
  // printer.sleep();
}
void GotCommand(String text)
{
      String delimiter = "|||";
      int partsCount = 0;

      for (int i = 0; i <= text.length() - delimiter.length(); i++) {
        if (text.substring(i, i + delimiter.length()) == delimiter) {
          partsCount++;
        }
      }

      String parts[partsCount + 1];

      int startIndex = 0;
      int endIndex = 0;

      for (int i = 0; i < partsCount; i++) {
        endIndex = text.indexOf(delimiter, startIndex);
        parts[i] = text.substring(startIndex, endIndex);
        startIndex = endIndex + delimiter.length();
      }

      parts[partsCount] = text.substring(startIndex);

      if(partsCount == 2)
      {
        mPrint(parts[2],parts[1]);
      }else if(partsCount == 1)
      {
        OtherCommand(parts[0],parts[1]);
      }
      

}
void GotData(String text)
{  
  Serial.println(text);
  
String delimiter = "::::";
int partsCount = 0;

for (int i = 0; i <= text.length() - delimiter.length(); i++) {
  if (text.substring(i, i + delimiter.length()) == delimiter) {
    partsCount++;
  }
}

String parts[partsCount + 1];

int startIndex = 0;
int endIndex = 0;

for (int i = 0; i < partsCount; i++) {
  endIndex = text.indexOf(delimiter, startIndex);
  parts[i] = text.substring(startIndex, endIndex);
  startIndex = endIndex + delimiter.length();
}

parts[partsCount] = text.substring(startIndex);

for (int i = 0; i <= partsCount; i++) {
  GotCommand(parts[i]);
}

}


void SetIp() {
while (WiFi.status() != WL_CONNECTED) {
    delay(200);
    Serial.print(".");
  }
 
  Serial.println();
  Serial.println("Mit dem WLAN verbunden!");
  Serial.println();

   String chipId = String(ESP.getChipId());

      // Get the chip IP
      String chipIp = WiFi.localIP().toString();

  String urll = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws/?ip=";
        urll += chipIp+"&espid="+chipId;
//         urll += "&ip=";
  wifiClient.setInsecure();
  if (sender.begin(wifiClient, urll)) {
    // HTTP-Code der Response speichern
    int httpCode = sender.GET(); 
    if (httpCode > 0) {
      // Anfrage wurde gesendet und Server hat geantwortet
      // Info: Der HTTP-Code für 'OK' ist 200
      if (httpCode == 200) {
        // Hier wurden die Daten vom Server empfangen
        // String vom Webseiteninhalt speichern
        String payload = sender.getString();
        // Hier kann mit dem Wert weitergearbeitet werden
        // ist aber nicht unbedingt notwendig
        Serial.println(payload);
      }else{
        // Falls HTTP-Error
        Serial.print("HTTP-Error: " +  String(httpCode));
      }
    }
    // Wenn alles abgeschlossen ist, wird die Verbindung wieder beendet
    sender.end();
  }else {
    Serial.printf("HTTP-Verbindung konnte nicht hergestellt werden!");
  }
  
}


void SetIp22()
{

   if (WiFi.status() != WL_CONNECTED) {
      ESP.reset();
     }

      // Get the chip ID
      String chipId = String(ESP.getChipId());

      // Get the chip IP
      String chipIp = WiFi.localIP().toString();


        String newUrl = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws";
        newUrl += "?espid=";
        newUrl += chipId;
        newUrl += "&ip=";
        newUrl += chipIp;


    std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);

    // Ignore SSL certificate validation
    client->setInsecure();
    
    //create an HTTPClient instance
    HTTPClient https;
    Serial.print(newUrl);
    Serial.print("\n");
    Serial.print("[HTTPS] begin...\n");
    if (https.begin(*client, newUrl)) {  // HTTPS
      Serial.print("[HTTPS] GET...\n");
      // start connection and send HTTP header
      int httpCode = https.GET();
      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTPS] GET... code: %d\n", httpCode);
        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = https.getString();
          GotData("mprint|||center|||"+chipIp+"::::feed|||2");      
          Serial.printf("IP Setted\n");
        }
      } else {
        Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
      }

      https.end();
    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
  
}

void ConnectToWifi2(String ssid, String pass){
    // WiFi.config(ip, gateway, subnet);
    WiFi.begin(ssid, pass);
    int counter = 0;
    while (WiFi.status() != WL_CONNECTED) {
    Serial.println("");
    Serial.println("Try to Connect to Wifi");
    counter = 1+counter;
    if(counter >= 20)
    {clearEEPROM();ESP.reset();}
    delay(10000);
  }
  Serial.println("");
  Serial.println("Connected to Wifi");
  printerSerial.begin(BAUDRATE);
  printer.begin();
  printer.sleep(); 
  String chipIp = WiFi.localIP().toString();
  GotData("mprint|||center|||Connected To Wifi::::feed|||2");
  if(myMethod("") == "true")
  {GotData("mprint|||center|||"+chipIp+"::::feed|||2");}

  startServer();
  // SetIp();  
    // GetData("https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws?espid=11955057&ip=192.168.1.10");
    // GetData("https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws/?id=667fb59c510d9f7dc2a67c2c920bc1002ae01097&time=2023-04-27%2012:15:41.030256+02:00&menuurl=https://angebote-restu.s3.eu-central-1.amazonaws.com/database/westendgrillundpizza.json&esp=true");
}



void saveStringToEEPROM(String str, int address) {
  int strLength = str.length() + 1; // Add 1 for null terminator
  for (int i = 0; i < strLength; i++) {
    EEPROM.write(address + i, str.charAt(i));
  }
  EEPROM.commit();
}
String getStringFromEEPROM(int startAddress) {
  String str = "";
  char c = EEPROM.read(startAddress);
  while (c != '\0') {
    str += c;
    startAddress++;
    c = EEPROM.read(startAddress);
  }
  return str;
}
void clearEEPROM() {
  for (int i = 0; i < EEPROM.length(); i++) {
    EEPROM.write(i, 0);
  }
  EEPROM.commit();
}


void handleConfigure() {
  String ssid = webServer.arg("ssid");
  String password = webServer.arg("password");
  saveStringToEEPROM(ssid+"::::"+password,0);

  webServer.send(200, "text/html", "<script>window.close();</script><h1>Configuration Saved!</h1>");
  delay(1000);
  ESP.reset();
}

void StartWifi(){
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP("EPS Drucker");
}

void handleGet() {
String idEncoded = webServer.arg("id");
String timeEncoded = webServer.arg("time");
timeEncoded.replace(" ", "%20");
String menuurlEncoded = webServer.arg("menuurl");
String url = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws/?id="+idEncoded+"&time="+timeEncoded+"&menuurl="+menuurlEncoded+"&esp=true";
webServer.send(200, "text/html", responseHTML2);
GotData(myMethod(url));
  // Do something with the id and time parameters...
}


void startServer(){
  

  // if DNSServer is started with "*" for domain name, it will reply with
  // provided IP to all DNS request
  dnsServer.start(DNS_PORT, "*", apIP);

  webServer.on("/configure", HTTP_POST, handleConfigure);
  webServer.on("/get", HTTP_GET, handleGet);
  // replay to all requests with same HTML
  webServer.onNotFound([]() {
    webServer.send(200, "text/html", responseHTML);
  });
  webServer.begin();
}

void ConnectToWifi(String text){
       String delimiter = "::::";
      int partsCount = 0;

      for (int i = 0; i <= text.length() - delimiter.length(); i++) {
        if (text.substring(i, i + delimiter.length()) == delimiter) {
          partsCount++;
        }
      }

      String parts[partsCount + 1];

      int startIndex = 0;
      int endIndex = 0;

      for (int i = 0; i < partsCount; i++) {
        endIndex = text.indexOf(delimiter, startIndex);
        parts[i] = text.substring(startIndex, endIndex);
        startIndex = endIndex + delimiter.length();
      }

      parts[partsCount] = text.substring(startIndex);
       Serial.println("");
       Serial.println(parts[0]);
       Serial.println(parts[1]);
    ConnectToWifi2(parts[0],parts[1]);
}


void setup() {
  Serial.begin(115200);
  ConnectToWifi2("mdc","sendmenow");
  // EEPROM.begin(512);
  // //  WiFi.begin("redmi");
  // String myString = getStringFromEEPROM(0);
  //    if(myString == "")
  // {
  // StartWifi();
  // startServer();
  // }
  // else{
  // Serial.println(myString);
  // ConnectToWifi(myString);
  // };  
}

void loop() {
    dnsServer.processNextRequest();
  webServer.handleClient();
}


