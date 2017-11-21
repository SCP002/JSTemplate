### JSTemplate
***
A simple, single page application template.<br />
Uses JQuery and History.js.<br /><br />

**Features**:
* **IE8** support.
* Routing.
* History handling.
* Smooth scroll to the anchor after template change.
* Sticky (but not fixed) footer.
* 'Scroll to the top' button with fading and position change to not to overlap footer.
* Relatively fast.<br /><br />

For usage, see **'index.html'**.<br /><br />

To set default content file and anchor to load when page has just opened,
see **'js/window-onload-handler.js'**.<br /><br />

To set different directory for content files (templates),
see **'js/reload-handler.js'**, variable **'templatesPath'**.<br /><br />

To set page title, see **'js/reload-handler.js'**, variable **'pageTitle'**.

**Notes**:
* Class **'ignore'** used with **'a'** elements to
tell javascript not to prevent default behavior of this elements.
