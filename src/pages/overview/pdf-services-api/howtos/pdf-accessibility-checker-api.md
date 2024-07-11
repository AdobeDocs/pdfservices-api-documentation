---
title: PDF Accessibility Checker | How Tos | PDF Services API | Adobe PDF Services
---
<InlineAlert slots="text"/>

PDF Accessibility Checker is currently accessible through the REST API only.

# PDF Accessibility Checker

Accessibility Checker API will check PDF files to see if they meet the machine-verifiable requirements of PDF/UA and WCAG 2.0. It will generate a report that summarizes the findings of the accessibility checks. Additional human remediation may be required to ensure that the reading order of elements is correct and that alternative text tags properly convey the meaning of an image. The report contains links to documentation that assist in manually fixing problems using Adobe Acrobat Pro.

## API Parameters

### Input Document

A PDF document for which accessibility to be checked.

### Page start (_pageStart_)

The parameter allows for the specification of the starting page for the accessibility check. If "pageStart" is not provided, the first page is considered the default startPage. It should be greater than equal to 1.

### Page end (_pageEnd_)

The parameter allows for the specification of the ending page for the accessibility check. If "pageEnd" is not provided, the last page is considered the default pageEnd. It should be greater than equal to 1.

## REST API

See our public API Reference for [PDF Accessibility Checker API](../../../apis/#tag/PDF-Accessibility-Checker).

## Check accessibility for specified pages

The sample below performs accessibility checker operation for specified pages of a given PDF.

Please refer the [API usage guide](../gettingstarted.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="1" languages="REST API" />

#### REST API

```javascript
curl --location --request POST 'https://pdf-services.adobe.io/operation/accessibilitychecker' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f1878678e68",
    "pageStart":1,
    "pageEnd":5
}'
```
