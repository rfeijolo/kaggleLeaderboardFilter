'use strict';

if (![].contains) {
    Object.defineProperty(Array.prototype, 'contains', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(searchElement /*, fromIndex*/ ) {
            if (this === undefined || this === null) {
                throw new TypeError('Cannot convert this value to object');
            }
            var O = Object(this);
            var len = parseInt(O.length) || 0;
            if (len === 0) {
                return false; }
            var n = parseInt(arguments[1]) || 0;
            if (n >= len) {
                return false; }
            var k;
            if (n >= 0) {
                k = n;
            } else {
                k = len + n;
                if (k < 0) k = 0;
            }
            while (k < len) {
                var currentElement = O[k];
                if (searchElement === currentElement ||
                    searchElement !== searchElement && currentElement !== currentElement
                ) {
                    return true;
                }
                k++;
            }
            return false;
        }
    });
}

function hideOtherPlayers(dontHide) {
    if(dontHide.length === 0) {
      return;
    }
    var playerLinkTags = document.querySelectorAll('.team-player, .single-player');

    var playerLinkTagslength = playerLinkTags.length;

    for (var i = 0; i < playerLinkTagslength; i++) {
        var linkTag = playerLinkTags[i];
        var href = linkTag.getAttribute('href');
        var username = href.substr(1, href.length);

        if (!dontHide.contains(username)) {
            linkTag.parentElement.parentElement.parentElement.remove();
        }
    }
}

chrome.storage.sync.get({
    players: '',
}, function(items) {
    var players;
    try {
        if(items.players === ''){
          players = [];
        } else {
          players = items.players.split(',').map(trimStr);
        }
        
    } catch (e) {
        players = [];
    }
    if (players.length > 0) {
      hideOtherPlayers(players);
    }
});

function trimStr(str) {
  return str.trim();
}