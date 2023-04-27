#include <Adafruit_Thermal.h>
#include <SoftwareSerial.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
const char* ssid = "redmi";
const char* password = "sendmenow";
const byte RX_PIN = D5; // goes to TX on printer
const byte TX_PIN = D6; // goes to RX on printer

const int BAUDRATE = 9600;

SoftwareSerial printerSerial(RX_PIN, TX_PIN);
Adafruit_Thermal printer(&printerSerial);

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

void GetData(String url)
{
   if (WiFi.status() != WL_CONNECTED) {
      ESP.reset();
     }
    std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);

    // Ignore SSL certificate validation
    client->setInsecure();
    
    //create an HTTPClient instance
    HTTPClient https;
    Serial.print("[HTTPS] begin...\n");
    if (https.begin(*client, url)) {  // HTTPS
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
          GotData(payload);
        }
      } else {
        Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
      }

      https.end();
    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
  
}
void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  printerSerial.begin(BAUDRATE);
  printer.begin();
  printer.sleep(); 
    while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
    GotData("mprint|||center|||Connected To Wifi::::feed|||2");

    GetData("https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws/?id=667fb59c510d9f7dc2a67c2c920bc1002ae01097&time=2023-04-27%2012:15:41.030256+02:00&menuurl=https://angebote-restu.s3.eu-central-1.amazonaws.com/database/westendgrillundpizza.json&esp=true");
    //  
  // GotData("feed|||2::::setsize|||S::::mprint|||center|||Westend Grill & Pizza::::mprint|||center|||Blumenberger Str. 24::::mprint|||center|||Moenchengladbach 41061::::mprint|||center|||Tel:021612702900::::feed|||3::::bold|||True::::setsize|||L::::mprint|||center|||Lieferung::::mprint|||center|||Bestaetigte Zeit::::mprint|||center|||1234confiremtime1234::::feed|||4::::setsize|||M::::mprint|||left|||Sayed Murad::::mprint|||left|||Blumenberger Strasse 2::::mprint|||left|||Moenchengladbach 41061::::mprint|||left|||123123::::mprint|||left|||::::feed|||3::::mprint|||left|||Linsensuppe (Suppen)(5x)(Nr 1)::::setsize|||S::::mprint|||left|||::::mprint|||right|||27,50::::feed|||2::::feed|||2::::mprint|||left|||Lieferkosten: 0,00 euro::::feed|||1::::mprint|||left|||Total: 26,12 euro::::feed|||3::::setsize|||L::::bold|||True::::mprint|||center|||Bestellung wurde online bezahlt::::feed|||3::::bold|||False::::setsize|||S::::mprint|||center|||Dies ist keine Rechnung"); 
}

void loop() {
  // printerTest();
  
    delay(500000);
}
