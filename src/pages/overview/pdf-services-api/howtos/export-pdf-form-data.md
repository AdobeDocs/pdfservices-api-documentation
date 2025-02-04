---
title: Export PDF Form Data | How Tos | PDF Services API | Adobe PDF Services
---

# Export PDF Form Data

The Export PDF Form Data API will retrieve the data from a PDF form and return it as a JSON file
![Export PDF Form Data](../export-pdf-form.png)

## Input Documents : **Required**

Supported formats:
- **PDF (application/pdf)** – Only **PDF version 1.6 and above** is supported.
- **AcroForm and Static XFA** – The input document must contain an **interactive form** from which data needs to be extracted.

### Input Document

A **filled interactive PDF form (AcroForm/Static XFA)** from which data needs to be exported.

#### Important Notes:
- **Only Static XFA files are supported.**
- **Dynamic XFA format is not supported** and will result in an error.

## REST API

See our public API Reference for [Export PDF Form Data API](../../../apis/#tag/Export-PDF-Form-Data).

## Export PDF Form Data

The sample below exports PDF form data and returns it as a JSON file.

Please refer to the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" languages="REST API" />

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Export-PDF-Form-Data

curl --location --request POST 'https://pdf-services.adobe.io/operation/getformdata' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
}'
```
