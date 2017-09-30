// ==UserScript==
// @run-at       document-start
// @name         Change Discord Audio Threshold
// @namespace    http://github.io/thepiercingarrow
// @version      0.1
// @description  help me spy on ali >:)
// @author       tpa
// @match        https://discordapp.com/channels/@me
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var audio = JSON.parse(localStorage.getItem("audio"));
    audio.modeOptions.threshold = -95;
    localStorage.setItem('audio', JSON.stringify(audio));
    // Your code here...
})();
