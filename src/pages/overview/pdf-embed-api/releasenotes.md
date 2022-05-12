# Release Notes

In addition to general bug fixes, and performance enhancements, refer to
the changes below for each release.

## Change history

### May, 2022

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| New    | Website developers can now integrate Google Analytics with PDF Embed API with only a few steps and collect PDF analytics. For more details, see the section [Google Analytics](./howtodata.md#google-analytics).                         |

### August, 2021 (Patch Release)
| Change  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed | PDF Embed API now no longer uses Adobe Analytics to gather anonymous usage data for measuring performance. For more details, see the section [Analytics](../#analytics) |

### August, 2021

| Change  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New | PDF Embed API will end support for Internet Explorer 11 and Microsoft Edge Legacy after September, 2021. A warning message will be displayed when the PDF is rendered on these browsers till the end of September, 2021, notifying users to use any other supported browser. Beginning October 1, 2021, PDF rendering will stop working on these browsers. To know about the list of supported browsers, see the section [Supported browsers](../#supported-browsers)|


### July, 2021

| Change  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed | Previously, the PDF always used to take focus on rendering, irrespective of the embed mode. Now the default behaviour has been changed and the PDF will take focus only when rendered in full window and lightbox embed modes. Website developers can override this default behaviour using the preview configuration ``focusOnRendering``. For more details, see the section [Focus on PDF rendering](./howtos.md#focus-on-pdf-rendering).                 |


### June, 2021

| Change  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed | The default behaviour of saving user preferences in the local storage (such as updated annotation colour) has been deprecated for the commenting feature in full window embed mode. Website developers can still save these user preferences elsewhere using the existing user setting callbacks provided by PDF Embed API. For more details, see the section [User settings](howtos_ui.md#user-settings). |

### May, 2021

| Change  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| New     | New tools for undo and redo actions introduced in the top bar.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Changed | Updated the Adobe Acrobat branding in all embed modes. The new Adobe Acrobat logo will appear in the page controls toolbar at the bottom for full window, sized container and in-line embed modes, and in the top bar for lightbox embed mode. Clicking on the logo will open the [Adobe Acrobat online](https://documentcloud.adobe.com/link/home) application in a new browser tab. See the section [Embed modes](howtos.md#embed-modes) for more details. |
| New | Added support for passing `strokeWidth` input parameter to the `startAnnotationMode()` annotation API in order to set the line thickness of drawing annotation programmatically.                                                                                                                                                                                                                                                                                                                             |

### April, 2021

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| New    | Added support for displaying linearized PDFs.                          |
| New    | New viewer API to access file attachments in the PDF programmatically. |

### March, 2021

| Change | Description                                                                     |
| ------ | ------------------------------------------------------------------------------- |
| New    | Added support for eraser annotation tool to erase parts of drawing annotations. |
| New    | New viewer API to fetch and open bookmarks in the PDF programmatically.         |

### January, 2021

| Change | Description                                                                                                                              |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| New    | Added support for add text annotation in annotation APIs.                                                                                |
| New    | New viewer APIs to perform zoom and search operations on the PDF programmatically.                                                       |
| New    | Enhancements in the mobile view experience of PDF files displayed using PDF Embed API.                                                   |
| New    | Added a new event for “UNSUPPORTED\_FEATURE\_FOUND” which will be generated when any unsupported feature is used by the end-user.        |
| New    | Added a new section in documentation about recommended approaches for search engine indexing of PDF files displayed using PDF Embed API. |

### November, 2020

| Change | Description                                                                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| New    | Added support for document search in the in-line embed mode.                                                                                        |
| Changed    | Previously, the updateAnnotation API only supported updating comment text. It now supports updating color, stroke width, position and bounding box. |

### September, 2020

| Change  | Description                                                                                                                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New     | Added support for the new “Add Text Comment” annotation tool which adds free text to PDFs.                                                                                                                |
| New     | UI improvements in the right-hand comments panel.                                                                                                                                                         |
| New     | Events for annotation actions.                                                                                                                                                                            |
| New     | Improvement in the PDF viewing experience in sized container embed mode by enabling fade-in and fade-out of page controls along with the top bar.                                                         |
| Bug fix | Previously, there was an issue in Embed API which caused the rendering of few PDFs to fail, and users would see an error message. This is now resolved and those PDFs render correctly in the web viewer. |

### August, 2020

| Change  | Description                                                                                                                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New     | Sized container full screen mode only: To facilitate exiting from full screen mode, support was added for a **Close** button in the top bar on all platforms as well as support for the swipe down gesture on mobile browsers.  |
| Changed     | Sized container full screen mode only: Improved the PDF preview experience in full screen mode on mobile browsers.                                                                                                              |
| Bug fix | Previously, disabling print via the API disabled the context menu items behind the overflow icon but did not disable the keyboard shortcuts in all cases. Now, the API disables both the menu items and the keyboard shortcuts. |

### July, 2020

| Change | Description                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Changed    | Moved the document search bar below the top bar in full window embed mode to unblock the annotation tools during a search operation. |
| New    | PDF Embed API bug fixes and documentation updates around the save behavior.                                                          |