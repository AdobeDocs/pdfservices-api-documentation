# Prerequisites

## PDF Electronic Seal API Prerequisites

### Step 1: Procure Certificate Credentials

1. A client must register with a trust service provider and obtain the digital certificate which authorizes and validates electronically sealed documents. A certificate may be purchased from any of the [supported Trust Service Providers.](/overview/pdf-electronic-seal-api/prerequisites/#supported-trusted-service-providers). Note that supported TSPs are Cloud Signature Consortium compliant. For more detail, see [Cloud Signature Consortium Standard](https://cloudsignatureconsortium.org/wp-content/uploads/2020/01/CSC_API_V1_1.0.4.0.pdf).
2. The trust service provider (TSP) performs remote identity verification of the client representative who acts as the legal owner of the seal certificate.
3. After identity verification, a client creates an account in the TSP's portal. The TSP issues a certificate to the client and delivers a `credential_id`, `client_id` and `client_secret`. These are typically protected by a static PIN, but 3rd party TSPs may provide different user experiences. The client should securely store the credential details and PIN for later use.

![TSP Token Generation](../images/cert.png)

### Step 2: Obtain your OAuth Token

The client sends the `client_id` and `client_secret` to the TSP's OAuth 2.0 authorization API. The TSP responds with an access token which is passed as one of the [input parameters](/overview/pdf-electronic-seal-api/quickstarts/#2-configure-sealing-parameters) to the PDF Electronic Seal API. The purpose of this token is to access the TSP's end point. It is valid for a timeframe specified by the TSP.  

![TSP Token Generation](../images/TSPToken.png)

**Sample OAuth Request**

```javascript
curl --location --request POST 'https://<base-url>/<API-domain-name>/csc/v0/oauth2/token'
--header 'cache-control: no-cache'
--header 'content-type: application/json'
--data-raw '{
   "lang": "en-US",
   "client_id": "<YOUR_CLIENT_ID>",
   "client_secret": "<YOUR_CLIENT_SECRET>",
   "grant_type": "client_credentials"
}'
```

**Sample Response**

```json
{
   "access_token": "xxxx-xxx-xxx-xxxx-xxxxxxxx",
   "token_type": "Bearer",
   "expires_in": <TIME_IN_SECONDS>
}
```

## Supported Trust Service Providers

Trust service providers (TSPs) are companies that offer a wide range of secure identity and transactions services, including certificate authority services such as providing and preserving digital certificates for creating and validating digital signatures as well as authenticating their signatories.

The electronic seal API supports digital certificates hosted by Qualified Trust Service Providers(QTSP) certified under the eIDAS regulation and supporting the open API standard from the Cloud Signature Consortium. Because these TSPs must support the OAuth 2.0 client credential flow, the Electronic Seal APIs limits support  to the following providers: <!-- REFERENCES https://helpx.adobe.com/acrobat/kb/approved-trust-list1.html -->

* [Intesi Group](https://www.intesigroup.com/en/)
* [Entrust](https://www.entrust.com/pdf-signing-certificates/)
* [GlobalSign](https://www.globalsign.com/en/digital-signatures)
* [TrustPro](https://www.trustpro.eu/)