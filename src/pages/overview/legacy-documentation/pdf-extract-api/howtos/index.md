---
title: How Tos | PDF Extract API | Adobe PDF Services
---
# How Tos
<p>

The [samples and documentation](extract-api.md#extract-text-from-a-pdf) should get you quickly up and running with PDF Extract capabilities in the [PDFServices SDK](../../pdf-extract-api/gettingstarted#sdk) including:

- Extracting PDF as JSON: the content, structure & renditions of table and figure elements along with Character Bounding Boxes

For code examples illustrating other PDF actions including those below, see the [PDFServices SDK](../../pdf-extract-api/gettingstarted#sdk) :

- Creating a PDF from multiple formats, including HTML, Microsoft Office documents, and text files
- Exporting a PDF to other formats or an image
- Combining entire PDFs or specified page ranges
- Using OCR to make a PDF file searchable with a custom locale
- Compress PDFs with compression level and Linearize PDFs
- Protect PDFs with password(s) and Remove password protection from PDFs
- Common page operations, including inserting, replacing, deleting, reordering, and rotating
- Splitting PDFs into multiple files

</p>

## How It Works

PDF Extract uses AI/ML technology to identify and categorize the various objects within documents – such as paragraphs, lists, headings, tables, and images – and extract the text, formatting, and associated document structural information which is then delivered in a resulting JSON file. Extracted table data can optionally be delivered within .CSV or .XLSX files, and extracted images are delivered as .PNG files. For additional information, please refer to <a href="../../../overview/pdf/Adobe_PDF_Extract_API_Technical_Brief.pdf" target="_blank">PDF Extract API white paper</a>

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
