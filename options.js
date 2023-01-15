// Saves options to chrome.storage
function save_options() {
    var url = document.getElementById('server_url').value;
    if (!validURL(url)) {
        alert("Invalid url, try again");
        return;
    }
    chrome.storage.sync.set({'server': url}, function() {
        set_status("server saved");
        restore_options();
    })
}

function set_status(status_str) {
    var status = document.getElementById('status');
    status.textContent = status_str;
    setTimeout(function() {
        status.textContent = '';
        }, 3000);
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        server: ''
    }, function(items) {
        document.getElementById('current_server_url').textContent = `Current server: ${items.server}`;
        document.getElementById('server_url').value = items.server;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}