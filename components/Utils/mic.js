const url = "https://transcribe.whisperapi.com";
const apiKey = "4FSN82878X9AFUH9J1VW9W1W2VS483GS";
const fileType = "YOUR_FILE_TYPE";
const numSpeakers = "1";

// Request access to user's microphone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks, { type: fileType });
      const formData = new FormData();
      formData.append("fileType", fileType);
      formData.append("diarization", "false");
      formData.append("numSpeakers", numSpeakers);
      formData.append("file", audioBlob, "voice_recording." + fileType); // Append audio blob as a file

      const headers = new Headers({
        Authorization: `Bearer ${apiKey}`,
      });

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: formData,
        mode:"no-cors"
      };

      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });

    // Start recording
    mediaRecorder.start();

    // Stop recording after a few seconds (you can stop it based on user interaction or any other condition)
    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000); // Stop after 5 seconds (adjust as needed)
  })
  .catch((error) => console.error("Error accessing microphone:", error));
