---
title: Export PDF Form Data | How Tos | PDF Services API | Adobe PDF Services
---

# Export PDF Form
The Export PDF Form Data API will retrieve the data from a PDF form and return it as a JSON file
![Export PDF Form](../exportform_overview.png)

## Input Documents : **Required**

Supported format is PDF (application/pdf). Input PDF with version 1.6 and above is supported.

### Input Document

A PDF AcroForm from which data needs to be exported.

## REST API

See our public API Reference for [Export PDF Form API](../../../apis/#tag/Export-PDF-Form-Data).

## Export PDF Form Data

The sample below exports PDF form data and returns it as a JSON file.

Please refer to the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="REST API" />

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Export-PDF-Form-API

curl --location --request POST 'https://pdf-services.adobe.io/operation/getformdata' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
}'
```
