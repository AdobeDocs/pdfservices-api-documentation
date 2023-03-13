---
title: Authentication | Adobe PDF Services
---
# Authentication

## How to get started?

**STEP 1: Get Credentials -** Invoking PDF Services API requires an Adobe-provided credential. To get one, [click here](https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api), and complete the workflow. Be sure to copy and save the credential values to a secure location.

**Validity term:** The certificate associated with your credential is valid for one year. However, you can simply regenerate a new credential or apply a new certificate to the current credential from the [Document Cloud Developer Console](https://developer.adobe.com/console/).

**STEP 2: Retrieve Access Token -** The PDF Services APIs require an access_token to authorize the request. Use the "Get AccessToken" API from the Postman Collection with your client_id, client_secret and scopes (mentioned in the pdfservices-api-credentials.json file present in the Credentials zip downloaded in STEP-1) access_token.

```javascript
curl --location 'https://ims-na1-stg1.adobelogin.com/ims/token/v2' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id={{Placeholder for client_id}}' \
--data-urlencode 'client_secret={{Placeholder for client_secret}}' \
--data-urlencode 'scope={{Placeholder for scopes}}'
```

Follow this link [How to retrieve Access Token](https://developer.adobe.com/developer-console/docs/guides/authentication/OAuth/)? to understand the request format to get the access_token.
