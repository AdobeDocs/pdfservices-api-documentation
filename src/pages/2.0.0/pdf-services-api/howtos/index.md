# How Tos

The samples and documentation here should get you quickly up and running
with the PDF Services SDK. These code examples illustrate how to perform
PDF actions using the SDK, including:

-   Creating a PDF from multiple formats, including HTML, Microsoft
    Office documents, and text files
-   Exporting a PDF to other formats or an image
-   Combining entire PDFs or specified page ranges
-   Using OCR to make a PDF file searchable with a custom locale
-   Compress PDFs with compression level and Linearize PDFs
-   Protect PDFs with password(s) and Remove password protection from
    PDFs
-   Common page operations, including inserting, replacing, deleting,
    reordering, and rotating
-   Splitting PDFs into multiple files
-   Extract PDF as JSON: the content, structure & renditions of table
    and figure elements along with Character Bounding Boxes
-   Get the properties of a PDF file like page count, PDF version, file size, compliance levels, font info, permissions and more

## Runtime in-memory authentication

The SDK supports providing the authentication credentials at runtime.
Doing so allows fetching the credentials from a secret server during
runtime instead of storing them in a file. Please refer the following
samples for details.

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/createpdf/CreatePDFWithInMemoryAuthCredentials.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/tree/master/CreatePDFWithInMemoryAuthCredentials)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/createpdf/create-pdf-with-inmemory-auth-credentials.js)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_in_memory_auth_credentials.py)

## Custom timeout configuration

The APIs use inferred timeout properties and provide defaults. However,
the SDK supports custom timeouts for the API calls. You can tailor the
timeout settings for your environment and network speed. In addition to
the details below, you can refer to working code samples:

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/platform/operation/samples/createpdf/CreatePDFWithCustomTimeouts.java)
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

```
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

```
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

```
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

``` 
client_config = ClientConfig.builder()
    .with_connect_timeout(10000)
    .with_read_timeout(40000)
    .build()
```