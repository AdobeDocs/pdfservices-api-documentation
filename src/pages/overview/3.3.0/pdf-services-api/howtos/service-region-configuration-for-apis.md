---
title: Region Configuration for APIs | How Tos | PDF Services API | Adobe PDF Services
---

# Service Region Configuration for PDF Services APIs

## Default Configuration 

Adobe PDF Services APIs use `United States` as a default region to process all the documents.
Once you purchase PDF Services API, its APIs can be configured to process the documents in a specified region that is listed below. 

## Service Region Configuration

Currently, PDF Services APIs have support for the following regions :

|Region Code | Name                    | Hostname          |
| ------------| -----------------------|-------------------|
| `ue1`       | United States (default)| https://pdf-services-ue1.adobe.io |
| `ew1`       | Europe                 | https://pdf-services-ew1.adobe.io |

<br />

For invoking region specific PDF Services API endpoints, hostnames needs to be changed to the following pattern : `https://pdf-services-{regionCode}.adobe.io`.

### Assets API 

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" />

#### Rest API

```javascript
curl --location --request POST 'https://pdf-services-ew1.adobe.io/assets' \
--header 'X-API-Key: {{Placeholder for client_id}}' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "mediaType": "{{Placeholder for mediaType}}"
}'
```

### Create Job API

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" />

#### Rest API

```javascript

curl --location --request POST 'https://pdf-services-ew1.adobe.io/operation/{Placeholder for operation name}' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "{{Placeholder for asset ID}}"
}'

```

### Poll Job API

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" />

#### Rest API

```javascript

curl --location --request GET 'https://pdf-services-ew1.adobe.io/operation/{Placeholder for operation name}' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}'
'
```

For a step-by-step guide to use Adobe PDF services APIs, please [click here](./api-usage.md).
