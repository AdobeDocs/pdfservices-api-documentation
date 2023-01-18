---
title: How Tos | PDF Services API | Adobe PDF Services
---
# How Tos

<p>
The samples and documentation here should get you quickly up and running
with the PDF Services SDK. These code examples illustrate how to perform
PDF actions using the SDK, including:

- Creating a PDF from multiple formats, including HTML, Microsoft
    Office documents, and text files
- Exporting a PDF to other formats or an image
- Combining entire PDFs or specified page ranges
- Using OCR to make a PDF file searchable with a custom locale
- Compress PDFs with compression level and Linearize PDFs
- Protect PDFs with password(s) and Remove password protection from
    PDFs
- Common page operations, including inserting, replacing, deleting,
    reordering, and rotating
- Splitting PDFs into multiple files
- Extract PDF as JSON: the content, structure & renditions of table
    and figure elements along with Character Bounding Boxes
- Get the properties of a PDF file like page count, PDF version, file size, compliance levels, font info, permissions and more
- Improving the accessibility of PDFs (Available under Early Access Program)

</p>

## Runtime in-memory authentication

The SDK supports providing the authentication credentials at runtime.
Doing so allows fetching the credentials from a secret server during
runtime instead of storing them in a file. Please refer the following
samples for details.

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/createpdf/CreatePDFWithInMemoryAuthCredentials.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/tree/master/CreatePDFWithInMemoryAuthCredentials)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/createpdf/create-pdf-with-inmemory-auth-credentials.js)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_in_memory_auth_credentials.py)

## Proxy Server Configuration

The JAVA SDK enables to connect to API calls through Proxy via Client Configurations.
It allows the clients to use SDK within the network where all outgoing calls have to 
go through a proxy and allowed only if allow-listed on the proxy. Please refer the 
following sample for details.

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/createpdf/CreatePDFWithProxyServer.java)

### Java Proxy Server configuration

Available properties:

- **proxyHost**: The proxy Server Hostname (DNS or IP Address)
- **proxyScheme**: Default: http. Scheme of the proxy server i.e. http or https. 
- **proxyPort**: Default: 80 for http, 443 for https. Port on which proxy server is listening.

Configure the Proxy Server via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.builder()
    .withProxyScheme(ClientConfig.ProxyScheme.HTTPS)
    .withProxyHost("PROXY_HOSTNAME")
    .withProxyPort(443)
    .build();
```

## Custom timeout configuration

The APIs use inferred timeout properties and provide defaults. However,
the SDK supports custom timeouts for the API calls. You can tailor the
timeout settings for your environment and network speed. In addition to
the details below, you can refer to working code samples:

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/createpdf/CreatePDFWithCustomTimeouts.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/blob/master/CreatePDFWithCustomTimeouts/Program.cs)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/createpdf/create-pdf-with-custom-timeouts.js)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_custom_timeouts.py)

### Java timeout configuration

Available properties:

-   **connectTimeout**: Default: 2000. The maximum allowed time in
    milliseconds for creating an initial HTTPS connection.
-   **socketTimeout**: Default: 10000. The maximum allowed time in
    milliseconds between two successive HTTP response packets.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.builder()
    .withConnectTimeout(3000)
    .withSocketTimeout(20000)
    .build();
```

### .NET timeout configuration

Available properties:

-   **timeout**: Default: 400000. The maximum allowed time in
    milliseconds for establishing a connection, sending a request, and
    getting a response.
-   **readWriteTimeout**: Default: 10000. The maximum allowed time in
    milliseconds to read or write data after connection is established.
    
Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages=".NET" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.ConfigBuilder()
    .timeout(500000)
    .readWriteTimeout(15000)
    .Build();
```
    
### Node.js timeout configuration

Available properties:

-   **connectTimeout**: Default: 10000. The maximum allowed time in
    milliseconds for creating an initial HTTPS connection.
-   **readTimeout**: Default: 10000. The maximum allowed time in
    milliseconds between two successive HTTP response packets.
    
Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Node JS" />

### 

```javascript
const clientConfig = PDFServicesSdk.ClientConfig
  .clientConfigBuilder()
  .withConnectTimeout(15000)
  .withReadTimeout(15000)
  .build();
```  

### Python timeout configuration

Available properties:

-   **connectTimeout**: Default: 4000. The number of milliseconds
    Requests will wait for the client to establish a connection to
    Server.
-   **readTimeout**: Default: 10000. The number of milliseconds the
    client will wait for the server to send a response.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Python" />

### 

```javascript
client_config = ClientConfig.builder()
    .with_connect_timeout(10000)
    .with_read_timeout(40000)
    .build()
```

## Custom region configuration

Adobe PDF Services APIs and SDKs use `us-east-1` as default region to access all the resources. 
However, the APIs and SDKs can be configured to process the documents in the specified region.

Currently, PDF Services has support for the following regions :



|Region Code | Name         |
| ------------| ------------|
| `ue1`       | US East (N. Virginia)|
| `ew1`       | Europe (Ireland)|

### Java region configuration 

Available properties:

-   **region**: Default: `ue1`. All documents will be process in the specified region. 

Override the `region` property via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.builder()
    .setRegion(Region.EW)
    .build();
```

### .NET region configuration

Available properties:

-   **region**: Default: US. All documents will be process in the specified region.

Override the `region` property via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.ConfigBuilder()
    .SetRegion(Region.EW)
    .Build();
```

### Node.js region configuration

Available properties:

-   **region**: Default: US. All documents will be process in the specified region.

Override the `region` property via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

### 

```javascript
const clientConfig = PDFServicesSdk.ClientConfig
    .clientConfigBuilder()
    .setRegion(Region.EW)
    .build();
```

### Rest API region configuration

For invoking region specific PDF Services API endpoints, hostnames needs to be changed to the following format : `https://pdf-services-{regionCode}.adobe.io`.

Example for uploading the Asset API endpoint will be changed to : 

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" />

### 

```javascript
curl --location --request POST 'https://pdf-services-ew1.adobe.io/assets' \
--header 'X-API-Key: {{Placeholder for client_id}}' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
"mediaType": "{{Placeholder for mediaType}}"
}'
```
