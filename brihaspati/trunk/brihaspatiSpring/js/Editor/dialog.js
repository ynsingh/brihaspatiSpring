function Dialog(url, action, init) {
        if (typeof init == "undefined") {
                init = window;  // pass this window object by default
        }
        Dialog._geckoOpenModal(url, action, init);
};

Dialog._parentEvent = function(ev) {
        if (Dialog._modal && !Dialog._modal.closed) {
                Dialog._modal.focus();
                HTMLArea._stopEvent(ev);
        }
};

Dialog._return = null;
Dialog._modal = null;
Dialog._arguments = null;

Dialog._geckoOpenModal = function(url, action, init) {
        var dlg = window.open(url, "hadialog",
                              "toolbar=no,menubar=no,personalbar=no, width=10, height=10," + "scrollbars=no,resizable=yes");
        Dialog._modal = dlg;
        Dialog._arguments = init;

        // capture some window's events
        function capwin(w) {
                HTMLArea._addEvent(w, "click", Dialog._parentEvent);
                HTMLArea._addEvent(w, "mousedown", Dialog._parentEvent);
                HTMLArea._addEvent(w, "focus", Dialog._parentEvent);
        };
        // release the captured events
        function relwin(w) {
                HTMLArea._removeEvent(w, "click", Dialog._parentEvent);
                HTMLArea._removeEvent(w, "mousedown", Dialog._parentEvent);
                HTMLArea._removeEvent(w, "focus", Dialog._parentEvent);
        };
        capwin(window);
        // capture other frames
        for (var i = 0; i < window.frames.length; capwin(window.frames[i++]));
        // make up a function to be called when the Dialog ends.
        Dialog._return = function (val) {
                if (val && action) {
                        action(val);
                }
	}
           relwin(window);
	
}
