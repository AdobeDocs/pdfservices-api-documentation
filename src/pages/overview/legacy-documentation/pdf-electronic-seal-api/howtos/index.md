---
title: How Tos | PDF Electronic Seal API | Adobe PDF Services
---
# How Tos

<p>

The [samples and documentation](electronic-seal-api.md/#apply-electronic-seal-with-default-appearance-on-pdf) should get you quickly up and running with PDF Electronic Seal capabilities in the [PDFServices SDK](../../pdf-services-api/index.md) including:

- Applying Electronic Seal on PDFs

For code examples illustrating other PDF actions including those below, see the [PDFServices SDK](../../pdf-services-api/index.md) :

- Creating a PDF from multiple formats, including HTML, Microsoft Office documents, and text files
- Exporting a PDF to other formats or an image
- Combining entire PDFs or specified page ranges
- Using OCR to make a PDF file searchable with a custom locale
- Compress PDFs with compression level and Linearize PDFs
- Protect PDFs with password(s) and Remove password protection from PDFs
- Common page operations, including inserting, replacing, deleting, reordering, and rotating
- Splitting PDFs into multiple files

</p>

## Custom timeout configuration

The APIs use inferred timeout properties and provide defaults. However,
the SDK supports custom timeouts for the API calls. You can tailor the
timeout settings for your environment and network speed. In addition to
the details below, you can refer to working code samples:

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithCustomTimeouts.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/blob/master/CreatePDFWithCustomTimeouts/Program.cs)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/customconfigurations/create-pdf-with-custom-timeouts.js)

### Java timeout configuration

Available properties:

-   **connectTimeout**: Default: 2000. The maximum allowed time in
    milliseconds for creating an initial HTTPS connection.
-   **socketTimeout**: Default: 10000. The maximum allowed time in
    milliseconds between two successive HTTP response packets.
-   **processingTimeout**: Default: 600000. The maximum allowed time
    in milliseconds for processing the documents. Any operation taking more time than the specified `processingTimeout` will result in an operation timeout exception.
    - **Note :** It is advisable to set the `processingTimeout` to higher values for processing large files.


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
-   **processingTimeout**: Default: 600000. The maximum allowed time
    in milliseconds for processing the documents. Any operation taking more time than the specified `processingTimeout` will result in an operation timeout exception.
    - **Note :** It is advisable to set the `processingTimeout` to higher values for processing large files.

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
-   **processingTimeout**: Default: 600000. The maximum allowed time
    in milliseconds for processing the documents. Any operation taking more time than the specified `processingTimeout` will result in an operation timeout exception.
    - **Note :** It is advisable to set the `processingTimeout` to higher values for processing large files.


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
