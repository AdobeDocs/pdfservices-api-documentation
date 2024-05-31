---
title: How Tos | PDF Watermark API | Adobe PDF Services
---
# PDF Watermark API

## Input Parameters : **Required**
Supported format is PDF (application/pdf). Input PDF with version 1.6 and above is supported.

### Input Document

A PDF document to which a watermark will be applied. 

### Watermark Document

A PDF document whose first page will be used as a watermark for the input document. 
The output generated will retain the content along with the watermark from the first page.

## Watermark Parameters

### Page ranges (_pageRanges_)
Specifies the number of pages on which the watermark will be applied. Page numbers are indexed from 1 to N. 
The page ranges are specified as an array of objects whose length cannot exceed beyond 20. Each object has the following properties:
* **Start Page**  (*start*) : The first page number of the range. Default value is 1.
* **End Page**  (*end*) : The last page number of the range. Default value is the last page of the document.


### Appearance (_appearance_)
* **Foreground**  (*appearOnForeground*) : Specifies the placement of the watermark on the page. It can appear in the foreground or background. The default value is false, placing the watermark in the background.
* **Opacity**  (*opacity*) : Specifies the opacity of the watermark, represented as an integer percentage value ranging from 0 to 100. The default value is 100.

**Example JSON**

```json
{
  "inputDocumentAssetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f1878678",
  "watermarkDocumentAssetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f1878678e68",
  "pageRanges": [
    {
      "start": 3,
      "end": 7
    }
  ],
  "appearance" : {
    "opacity": 75,
    "appearOnForeground": true
  }
}
```

## REST API

See our public API Reference for [PDF Watermark API](../../../apis/#tag/PDF-Watermark).

## Apply Watermark on specified pages

The sample below performs watermark operation applying watermark in foreground on specified pages of a given PDF.

<CodeBlock slots="heading, code" repeat="1" languages="REST API" />

#### REST API

```javascript
curl --location --request POST 'https://pdf-services.adobe.io/operation/addwatermark' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "inputDocumentAssetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f68",
    "watermarkDocumentAssetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f1878678e68",
    "pageRanges": [
        {
            "start": 2,
            "end": 5
        },
        {
            "start": 8,
            "end": 10
        }
    ],
    "appearance": {
        "opacity": 50,
        "appearOnForeground": true
    }
}'
```