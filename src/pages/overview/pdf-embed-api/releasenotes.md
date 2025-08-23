---
title: Release Notes | PDF Embed API | Adobe PDF Services
---
# Release Notes

In addition to general bug fixes, and performance enhancements, refer to
the changes below for each release.

## Change history

### June 11, 2025
| Change | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| Bug fix | Fixed issue regarding multiple "Load PDF" event triggers in Adobe Analytics.   |
| Bug fix | Fixed issue regarding firing of duplicate DOCUMENT_OPEN events in analytics.             |
| New     | PDF Embed API now supports a Close option in the invalid License error dialog box. |

### November 6, 2024
| Change  | Description                                                     |
|---------|-----------------------------------------------------------------|
| Bug fix | Fixed file preview issue for macOS Safari version 18 and iOS 18 |

### August 14, 2024
| Change  | Description                                                          |
|---------|----------------------------------------------------------------------|
| Changed | Updated rendering timeout to five minutes to preview complex pdf files. |

### June 27, 2024

- Fixed issue regarding developer console error "Feature can't be enabled or disabled".
- Fixed issue regarding developer console error "Edit dropin is not loaded".
- Fixed PDF download allowed issue through PDF printing option even when download is disabled in Firefox browser.
- PDF Embed API now supports PDF printing in Firefox browser.

### May 9, 2024

- Fixed the issue with opening Word based password protected PDF files.
- Fixed developer console error issue when using Chinese characters in form fields.
- Fixed duplicate annotations issue when returning from full screen mode.
- Added new previewFile API configuration option([showFullScreenViewButton](../howtos_ui.md/#menu-and-tool-options)) to hide full-screen button in right-hand panel.

### January, 2024

- Essential library upgrades.
- Addressed issues with the error dialog that appears when an invalid Client ID is provided to the PDF Embed API.

### December, 2023

- Added fixes for enhanced security.

### October, 2023

- Fixed PDF rendering issue when third party cookies are disabled.

### September, 2023

- Fixed PREVIEW_RENDERING_FAILED error for large PDF files.
- Fixed Search button accessibility issue.

### July, 2023

- Added fix for the issue with vanishing form fields text when the PDF is scrolled.
- Added fix for the issue with visibility of the page number in the scrollbar for sized container embed mode.
