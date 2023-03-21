---
title: How Tos | PDF Accessibility Auto-Tag API | Adobe PDF Services
---
# How Tos

<p>

The [samples and documentation](accessibility-auto-tag-api.md/#generate-tagged-pdf-with-version-17-along-with-an-xlsx-report-and-shift-the-headings-in-the-output-pdf-file) should get you quickly up and running with PDF Accessibility Auto-Tag capabilities in the [PDFServices SDK](../../pdf-services-api/index.md) including:

- Improving the accessibility of PDFs

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

## Runtime in-memory authentication

The SDK supports providing the authentication credentials at runtime. Doing so allows fetching the credentials from a secret server during runtime instead of storing them in a file. Please refer to the following code snippet for details.

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithInMemoryAuthCredentials.java)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_in_memory_auth_credentials.py)

## Custom client timeout configuration

The APIs use inferred timeout properties and provide defaults. However, the SDK supports custom timeouts for the API calls. You can tailor the client timeout settings for your environment and network speed. This custom configuration is only applicable for client-side timeouts and not the server side. In addition to the details below, you can refer to working code samples:

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithCustomTimeouts.java)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_custom_timeouts.py)

### Java timeout configuration

Available properties:

-   **connectTimeout**: Default: 2000. The maximum allowed time in milliseconds for creating an initial HTTPS connection.
-   **socketTimeout**: Default: 10000. The maximum allowed time in milliseconds between two successive HTTP response packets.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

### 

```javascript
ClientConfig clientConfig = ClientConfig.builder()
    .withConnectTimeout(3000)
    .withSocketTimeout(20000)
    .build();
```

### Python timeout configuration

Available properties:

-   **connectTimeout**: Default: 4000. The number of milliseconds Requests will wait for the client to establish a connection to Server.
-   **readTimeout**: Default: 10000. The number of milliseconds the client will wait for the server to send a response.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Python" />

### 

```javascript
client_config = ClientConfig.builder()
    .with_connect_timeout(10000)
    .with_read_timeout(40000)
    .build()
```
