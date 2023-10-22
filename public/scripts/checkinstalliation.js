var installPrompt = null;  
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event; 
});