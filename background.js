const queryKey = "create";

chrome.browserAction.onClicked.addListener(function(tab) { 
  chrome.storage.sync.get('server', function(response) {
    chrome.storage.sync.get({
      server: '',
    }, function(items) {
      const server = items.server;
      chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs){
          if (server) {
            fetchShortUrl(server, tabs[0].url);
          } else {
            alert("Server not defined. Set in extension options.");
          }
        }
      );
    });
  });
});

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

const fetchShortUrl = (server, url) => {
  const queryUrl = new URL(server);
  queryUrl.searchParams.append(queryKey, url);
  fetch(queryUrl.href, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => copyToClipboard(json.url))
    .catch(err => alert(`unable to fetch short url from server:\n${queryUrl.href}\n\n Error: ${err}`));
};