function updateMessagesRegion(json) {
  var html = '';
  for (var i = 0; i < json.length; i++) {
    var message = json[i];
    html += '<li><div>' + message.time + '</div><div>' + message.msg + '</div></li>';
  }
  var region = document.getElementById('messagesregion');
  if (region) {
    region.innerHTML = html;
  }
}

function handleSendButtonClick() {
  var messageInput = document.getElementById('message');
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var res = xhr.responseText;
      var json = JSON.parse(res);
      updateMessagesRegion(json);
    }
  };

  var params = 'msg=' + messageInput.value;
  xhr.open('POST', '/echo/submit/', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}

function run() {
  var sendButton = document.getElementById('sendButton');
  if (sendButton) {
    sendButton.addEventListener('click', handleSendButtonClick);
  }
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var res = xhr.responseText;
      var json = JSON.parse(res);
      updateMessagesRegion(json);
    }
  };

  xhr.open('GET', '/echo/all');
  xhr.send();
}

document.addEventListener('DOMContentLoaded', run);