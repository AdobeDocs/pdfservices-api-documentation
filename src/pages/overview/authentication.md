# Authentication

## How to get started?

**STEP 1: Get Credentials -** Invoking PDF Services API requires an Adobe-provided credential. To get one, [click here](https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api), and complete the workflow. Be sure to copy and save the credential values to a secure location.

**Validity term:** The certificate associated with your credential is valid for one year. However, you can simply regenerate a new credential or apply a new certificate to the current credential from the [Document Cloud Developer Console](https://developer.adobe.com/console/).

**STEP 2: Generate JWT -** Use the credential created in STEP-1 to generate a signed JSON Web Token (JWT). There are following two ways to generate JWT:

**• Using Adobe IO Console:**

Goto [Document Cloud Developer Console](https://developer.adobe.com/console/) > Select your newly created Integration > Click on "Service Account (JWT)" > Goto "Generate JWT" tab.

Paste your private.key (from the Credentials zip downloaded in STEP-1) > Click on "Generate token".

Save the Generated JWT and Sample cURL command to retrieve access_token in STEP-3.

**• Using JWT Libraries:** The steps to generate the JWT using libraries can be referred from here.

Use [sample code](https://developer.adobe.com/developer-console/docs/guides/authentication/JWT/samples/#sample-code) in your preferred programming language to generate JWT. While generating JWT use the metascope as mentioned here.

**STEP 3: Retrieve Access Token -** The PDF Services APIs require an access_token to authorize the request. Use the "Exchange JWT" API from the Postman Collection with your client_id, client_secret (mentioned in the pdfservices-api-credentials.json file present in the Credentials zip downloaded in STEP-1) and the above generated JWT to get the access_token OR directly use the saved Sample cURL command in STEP-2 to get the access_token.

Follow this link [How to retrieve Access Token](https://developer.adobe.com/developer-console/docs/guides/#!AdobeDocs/adobeio-auth/master/JWT/JWT.md#exchanging-jwt-to-retrieve-an-access-token)? to understand the request format to get the access_token.
