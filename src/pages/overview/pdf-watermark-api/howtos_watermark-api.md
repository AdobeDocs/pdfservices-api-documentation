---
title: How Tos | PDF Watermark API | Adobe PDF Services
---
# PDF Watermark API

## Input Parameters

### Input Document

A PDF document to which a watermark will be applied. The maximum size of the PDF cannot exceed 100 MB.

### Watermark Document

A PDF document whose first page will be used as a watermark for the input document. The output generated will retain the content along with the watermark from the first page.

## Watermark Parameters

### Page ranges (_pageRanges_)



### Appearance (_appearance_)
* **Foreground**  (*appearOnForeground*)
* **opacity**  (*opacity*)

**Example JSON**

```json
{
  "inputDocumentAssetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f1878678",
  "watermarkDocumentAssetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f1878678e68",
  "pageRanges": [
    {
      "start": 3,
      "end": 7
    },
    {
      "start": 9,
      "end": 15
    }
  ],
  "appearance" : {
    "opacity": 75,
    "appearOnForeground": true
  }
}
```
## API limitations

<br />

- **Input PDF size:** Input PDF files up to a maximum of 100 MB are supported. ??
- **Input Document format:** Supported format is PDF(application/pdf).
- **Password-protected Files:** Encrypted or Password-protected PDFs are not supported for applying watermark.
- **Input PDF version:** Input PDF with version less than 1.3 are not supported.  ????
- **Usage Rights File:** Input PDF having usage rights are not supported.  ???

## REST API

See our public API Reference for [PDF Watermark API](../../../apis/#tag/PDF-Watermark).