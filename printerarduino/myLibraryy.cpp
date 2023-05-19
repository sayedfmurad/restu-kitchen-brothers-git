#include <Arduino.h>
#include "myLibraryy.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

HTTPClient senderr;
WiFiClientSecure wifiClientt;
 

bool myMethodd() {
  Serial.begin(115200);

  while (WiFi.status() != WL_CONNECTED) {
    delay(200);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("myMethod2!------------------");
  Serial.println("Mit dem WLAN verbunden!------------------");
  Serial.println();

   String chipId = String(ESP.getChipId());

      // Get the chip IP
      String chipIp = WiFi.localIP().toString();

  String urll = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws/?ip=";
        urll += chipIp+"&espid="+chipId;
//         urll += "&ip=";
  wifiClientt.setInsecure();
  if (senderr.begin(wifiClientt, urll)) {
    // HTTP-Code der Response speichern
    int httpCode = senderr.GET(); 
    if (httpCode > 0) {
      // Anfrage wurde gesendet und Server hat geantwortet
      // Info: Der HTTP-Code für 'OK' ist 200
      if (httpCode == 200) {
        // Hier wurden die Daten vom Server empfangen
        // String vom Webseiteninhalt speichern
        String payload = senderr.getString();
        // Hier kann mit dem Wert weitergearbeitet werden
        // ist aber nicht unbedingt notwendig
        Serial.println(payload);
        Serial.println("IP Setted");
        return true;
      }else{
        // Falls HTTP-Error
        Serial.print("HTTP-Error: " +  String(httpCode));
      }
    }
    // Wenn alles abgeschlossen ist, wird die Verbindung wieder beendet
    senderr.end();
  }else {
    Serial.printf("HTTP-Verbindung konnte nicht hergestellt werden!");
  }
  return false;
}
