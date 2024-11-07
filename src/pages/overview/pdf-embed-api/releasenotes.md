---
title: Release Notes | PDF Embed API | Adobe PDF Services
---
# Release Notes

In addition to general bug fixes, and performance enhancements, refer to
the changes below for each release.

## Change history

### November 6, 2024
| Change  | Description                                                     |
|---------|-----------------------------------------------------------------|
| Bug fix | Fixed file preview issue for macOS Safari version 18 and iOS 18 |

### August 14, 2024
| Change  | Description                                                          |
|---------|----------------------------------------------------------------------|
| Changed | Updated rendering timeout to five minutes to preview complex pdf files. |

### June 27, 2024
| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Fixed issue regarding developer console error "Feature can't be enabled or disabled".   |
| Bug fix | Fixed issue regarding developer console error "Edit dropin is not loaded".             |
| Bug fix | Fixed PDF download allowed issue through PDF printing option even when download is disabled in Firefox browser.  |
| New     | PDF Embed API now supports PDF printing in Firefox browser. |

### May 9, 2024
| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Fixed the issue with opening Word based password protected PDF files.                   |
| Bug fix | Fixed developer console error issue when using Chinese characters in form fields.       |
| Bug fix | Fixed duplicate annotations issue when returning from full screen mode.                 |
| New     | Added new previewFile API configuration option([showFullScreenViewButton](../howtos_ui.md/#menu-and-tool-options)) to hide full-screen button in right-hand panel.      |

### January, 2024
| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Changed | Essential library upgrades         |
| Bug fix | Addressed issues with the error dialog that appears when an invalid Client ID is provided to the PDF Embed API.         |

### December, 2023
| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Added fixes for enhanced security.         |

### October, 2023

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Fixed PDF rendering issue when third party cookies are disabled.      |

### September, 2023

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Fixed PREVIEW_RENDERING_FAILED error for large PDF files.             |
| Bug fix | Fixed Search button accessibility issue.                              |

### July, 2023

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Added fix for the issue with vanishing form fields text when the PDF is scrolled.
| Bug fix | Added fix for the issue with visibility of the page number in the scrollbar for sized container embed mode.

### May, 2023

| Change | Description                                                                                                                                                                   |
| ------ |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New    | PDF Embed API is also available on the new <b>acrobatservices.adobe.com</b> subdomain. For sample usage, see the section [sample usage](./gettingstarted.md/#copy-it-run-it).
| Changed | Enhanced the commenting experience.
| Bug fix | Fixed issues in the Annotations API to improve the dragging and placing of text comments onto the PDF.
| Bug fix | Fixed issues to improve the support for interactive PDFs.

### April, 2023

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| New | Legacy viewer will no longer be accessible and all calls to legacy viewer will route to new modern PDF viewer.
| Bug fix | Fixed issues to restore the optimised viewing of Linearized PDFs.
| Bug fix | Fixed issues in the Inline Embed mode where Blue Line gets displayed around PDF.
| Bug fix | Fixed issues in the Inline Embed mode where Error message not displayed for invalid client Id.
| Changed | PDF Embed API no longer captures anonUserUUID in browsers local storage.

### February, 2023

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Fixed issue with onResultsUpdate callback in Search API.

### December, 2022

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Fixed issues with the Annotations API to address few failure cases related to adding annotations.

### November, 2022

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| New | Deprecation messaging for PDF Embed API legacy viewer. Refer the [migration guide](./modernviewer.md).
| Bug fix | Added fixes for PDF preview issue on latest Safari versions and full screen view in FULL_WINDOW embed mode.

### September, 2022

| Change | Description                                                                                                                                                                     |
| ------ |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New    | PDF Embed API is also available on the new <b>documentservices.adobe.com</b> subdomain. For sample usage, see the section  [sample usage](./gettingstarted.md/#copy-it-run-it). |

### August, 2022

| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| New    | Adobe has launched a modern PDF viewer across all embed modes to render PDFs. For more details, see the section [Legacy to Modern viewer](../modernviewer/). |

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
| Changed | The default behaviour of saving user preferences in the local storage (such as updated annotation color) has been deprecated for the commenting feature in full window embed mode. Website developers can still save these user preferences elsewhere using the existing user setting callbacks provided by PDF Embed API. For more details, see the section [User settings](howtos_ui.md#user-settings). |

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
