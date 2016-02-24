'use strict';

var playerNamesInput = document.getElementById('playerNames');

function saveOptions() {
  var players = document.getElementById('playerNames').value;
  chrome.storage.sync.set({
    players: players,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
      chrome.tabs.reload();
    }, 750);
  });


}

function loadOptions() {
  chrome.storage.sync.get({
    players: '',
  }, function(items) {
    document.getElementById('playerNames').value = items.players;
  });
}

document.getElementById('saveOptions').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', loadOptions);