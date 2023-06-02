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

## Service region configuration

Adobe PDF Services SDKs use `US (United States)` as a default region to process all the documents.
Once you purchase PDF Services SDK, the SDKs can be configured to process the documents in a specified region that is listed below.
Currently, PDF Services SDKs has support for the following regions :

|Region Code | Name         |
| ------------| ------------|
| `US`       | United States (default)|
| `EU`       | Europe |

In addition to
the details below, you can refer to working code samples:

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/ExportPDFWithSpecifiedRegion.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/blob/master/ExportPDFWithSpecifiedRegion/Program.cs)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/customconfigurations/export-pdf-with-specified-region.js)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_specified_region.py)

Available properties:

-   **region**: Default: `US`. All documents will be processed in the specified region.

Override the `region` property via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Python" />

### Java

```javascript
ClientConfig clientConfig = ClientConfig.builder()
    .setRegion(Region.EU)
    .build();
```

### .NET

```javascript
ClientConfig clientConfig = ClientConfig.ConfigBuilder()
    .SetRegion(Region.EU)
    .Build();
```

### Node.js

```javascript
const clientConfig = PDFServicesSdk.ClientConfig
    .clientConfigBuilder()
    .setRegion(Region.EU)
    .build();
```
### Python

```javascript
client_config = ClientConfig.builder()
    .with_region(Region.EU)
    .build()
```

## Runtime in-memory authentication

The SDK supports providing the authentication credentials at runtime.
Doing so allows fetching the credentials from a secret server during
runtime instead of storing them in a file. Please refer the following
samples for details.

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithInMemoryAuthCredentials.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/blob/master/CreatePDFWithInMemoryAuthCredentials/Program.cs)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/customconfigurations/create-pdf-with-inmemory-auth-credentials.js)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_in_memory_auth_credentials.py)

## Proxy Server Configuration

The Java SDK enables connection to API calls through Proxy via Client Configurations.
Also, it supports username and password based authentication for the proxy server.
It allows the clients to use SDK within the network where all outgoing calls have to
go through a proxy and are allowed only if allow-listed on the proxy. Please refer to the
following sample for details.

- [Java Sample for Proxy Server Config](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithProxyServer.java )
- [Java Sample for Proxy Server Config With Basic Authentication](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithAuthenticatedProxyServer.java )

### Java Proxy Server configuration

Available properties:

- **host**: The proxy Server Hostname (DNS or IP Address)
- **scheme**: Default: http. Scheme of the proxy server i.e. http or https.
- **port**: Default: 80 for http, 443 for https. Port on which proxy server is listening.
- **username**: Username for the authentication.
- **password**: Password for the authentication.

All these properties are wrapped within the `proxyServerConfig` object. Further, `username` and `password` is to be provided
inside the nested object `usernamePasswordCredentials`.

Set the above properties using a custom `ProxyServerConfig` class, and use `ClientConfig` class to configure proxy server.

**Sample showing proxy server configuration without authentication.**

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

###

```javascript
ProxyServerConfig proxyServerConfig = new ProxyServerConfig.Builder()
    .withHost("PROXY_HOSTNAME")
    .withProxyScheme(ProxyScheme.HTTPS)
    .withPort(443)
    .build();

ClientConfig clientConfig = ClientConfig.builder()
    .withConnectTimeout(10000)
    .withSocketTimeout(40000)
    .withProxyServerConfig(proxyServerConfig)
    .build();
```

**Sample showing proxy server configuration with authentication.**

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

###

```javascript
ProxyServerConfig proxyServerConfig = new ProxyServerConfig.Builder()
    .withHost("PROXY_HOSTNAME")
    .withProxyScheme(ProxyScheme.HTTPS)
    .withPort(443)
    .withCredentials(new UsernamePasswordCredentials("USERNAME", "PASSWORD"))
    .build();

ClientConfig clientConfig = ClientConfig.builder()
    .withConnectTimeout(10000)
    .withSocketTimeout(40000)
    .withProxyServerConfig(proxyServerConfig)
    .build();
```

## Custom timeout configuration

The APIs use inferred timeout properties and provide defaults. However,
the SDK supports custom timeouts for the API calls. You can tailor the
timeout settings for your environment and network speed. In addition to
the details below, you can refer to working code samples:

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithCustomTimeouts.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/blob/master/CreatePDFWithCustomTimeouts/Program.cs)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/customconfigurations/create-pdf-with-custom-timeouts.js)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_custom_timeouts.py)

### Java timeout configuration

Available properties:

-   **connectTimeout**: Default: 2000. The maximum allowed time in
    milliseconds for creating an initial HTTPS connection.
-   **socketTimeout**: Default: 10000. The maximum allowed time in
    milliseconds between two successive HTTP response packets.
-   **processingTimeout**: Default: 600000. The maximum allowed time
    in milliseconds for processing the documents. Any operation taking more time than the specified `processingTimeout` will result in an operation timeout exception.
    It is advisable to set the `processingTimeout` to higher values for processing large files.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.builder()
    .withConnectTimeout(3000)
    .withSocketTimeout(20000)
    .withProcessingTimeout(900000)
    .build();
```

### .NET timeout configuration

Available properties:

-   **timeout**: Default: 400000. The maximum allowed time in
    milliseconds for establishing a connection, sending a request, and
    getting a response.
-   **readWriteTimeout**: Default: 10000. The maximum allowed time in
    milliseconds to read or write data after connection is established.
-   **processingTimeout**: Default: 600000. The maximum allowed time
    in milliseconds for processing the documents. Any operation taking more time than the specified `processingTimeout` will result in an operation timeout exception.
    It is advisable to set the `processingTimeout` to higher values for processing large files.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages=".NET" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.ConfigBuilder()
    .WithTimeout(40000)
    .WithReadWriteTimeout(10000)
    .WithProcessingTmeout(900000)
    .Build();
```

### Node.js timeout configuration

Available properties:

-   **connectTimeout**: Default: 10000. The maximum allowed time in
    milliseconds for creating an initial HTTPS connection.
-   **readTimeout**: Default: 10000. The maximum allowed time in
    milliseconds between two successive HTTP response packets.
-   **processingTimeout**: Default: 600000. The maximum allowed time
    in milliseconds for processing the documents. Any operation taking more time than the specified `processingTimeout` will result in an operation timeout exception.
    It is advisable to set the `processingTimeout` to higher values for processing large files.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Node JS" />

### 

```javascript
const clientConfig = PDFServicesSdk.ClientConfig
    .clientConfigBuilder()
    .withConnectTimeout(15000)
    .withReadTimeout(15000)
    .withProcessingTimeout(900000)
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
