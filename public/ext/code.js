
(function() {
    
    if(!window.location.href.includes("web.telegram.org/k"))
    alert("please Load web.telegram.org/k instead of /a")
    console.log("Loaded");
    let  audioElement = new Audio('https://web.telegram.org/k/assets/audio/call_incoming.mp3');
          function playAudio() {
            audioElement.addEventListener('ended', onAudioEnded);
            audioElement.play();
          }
          
          function stopAudio() {
            audioElement.pause();
            audioElement.currentTime = 0;
            audioElement.removeEventListener('ended', onAudioEnded);
          }
          
          function onAudioEnded() {
            audioElement.currentTime = 0;
            audioElement.play();
          }
        document.addEventListener("click", function(event) {
          stopAudio()
        });
      let lastSavedElement="";
    
      // Function to check for new messages
      function checkForNewMessages() {
        var chatContainer = document.querySelectorAll('.bubbles-group');     
        if(!chatContainer)return;
        chatContainer = chatContainer[chatContainer.length-1]  
        if(!chatContainer)return;
        chatContainer = chatContainer.lastChild
        if(!chatContainer)return;
        chatContainer = chatContainer.querySelector(".message")
        chatContainer = chatContainer.textContent
    
    
      console.log(chatContainer==lastSavedElement)
      if(lastSavedElement!=chatContainer)
      {     
        if(lastSavedElement!="")
        if(chatContainer.includes("bar")||chatContainer.includes("paypal"))
        {
        playAudio()
        console.log("Playing")        
               
        }
        console.log("found")  
        lastSavedElement= chatContainer
      }          
      }
      setInterval(checkForNewMessages, 2000);
    
        
      })();
    