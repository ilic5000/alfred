// JFreesteel native messaging project

var EXTENSION_NAME = "pmf.ni.ac.rs.alfredhost";

var registeredUnload = false;

var backgroundPort;

// messages from page
window.addEventListener("message", function(event) {

    var message = event.data;

    if(event.source !== window
        || !message.target || message.target != EXTENSION_NAME
        || !message.source || message.source != "page")
        return;

    console.log("Content received from page", message);

    if (!backgroundPort) {
        openBackgroundPort();
    }

    // forward command to background
    backgroundPort.postMessage(message.command);

    // quit host app on page unload
    // https://github.com/open-eid/chrome-token-signing/blob/master/extension/content.js
    if (!registeredUnload) {
        // close host app on page unload
        window.addEventListener("beforeunload", function(event) {
            try {
                backgroundPort.postMessage("quit");
            } catch (err) {}
        }, false);
        registeredUnload = true;
    }
}, false);

function openBackgroundPort() {
    backgroundPort = chrome.runtime.connect({name: EXTENSION_NAME});

    // messages from background
		backgroundPort.onMessage.addListener(function (message, sender) {
        console.log("Content received from background", message);

        message["source"] = "content";
        message["target"] = "pmf.ni.ac.rs.alfredhost";

        // post to page
        window.postMessage(message, "*");
    });
}