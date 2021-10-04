# Extract PDF

## Structured Information Output Format

The output of an SDK extract operation is a zip package containing the
following:

-   The structuredData.json file with the extracted content & PDF
    element structure. See the [JSON
    schema]( ../../resources/extractJSONOutputSchema2.json) for a
    description of the default output. (Please refer the [Styling JSON
    schema]( ../../resources/extractJSONOutputSchemaStylingInfo.json)
    for a description of the output when the styling option is enabled.)
-   A renditions folder(s) containing renditions for each element type
    selected as input. The folder name is either "tables" or "figures"
    depending on your specified element type. Each folder contains
    renditions with filenames that correspond to the element information
    in the JSON file.

![image]( ../../images/extractsamplefiles.png)

The following is a summary of key elements in the extracted JSON(See
additional descriptions in the [JSON
schema]( ../../resources/extractJSONOutputSchema2.json)):

-   Elements : Ordered list of semantic elements (like headings,
    paragraphs, tables, figures) found in the document, on the basis of
    position in the structure tree of the document.The output does not
    include headers or footers.In addition, headings that repeat across
    pages are reported for the first occurrence only.
-   Bounds : Bounding box enclosing the content items forming this
    element. Not reported for elements which don't have any content
    items (like empty table cells).
-   Font : Font description for the font associated with the first
    character. Only reported for text elements.
-   TextSize : Text size (in points) of the last character. Only
    reported for text elements.
-   Attributes: Includes additional properties like line height and text
    alignment.
-   Path : The Path describes the location of elements in the structure
    tree including the element type and the instance number. Element
    types are based on the [ISO
    standard](https://www.iso.org/standard/75839.html) , a summary is
    included below for convenience :
    -   Aside : Content which is not part of regular content flow of the
        document
    -   Figure : Non-reflowable constructs like graphs, images,
        flowcharts
    -   Footnote : FootNote
    -   H, H1, H2, etc : Heading Level
    -   L : List
    -   Li : List Item
    -   Lbl : List Item label
    -   Lbody : List item body
    -   P : Paragraph
    -   ParagraphSpan : Denotes part of a paragraph. Reported when
        paragraph is broken (generally due to page break or column
        break)
    -   Reference : Link
    -   Sect : Logical section of the document
    -   StyleSpan : Denotes difference in styling of text relative to
        the parent container
    -   Sub : Single line of a multiline paragraph (e.g. addresses).
        Such paras are created in html using \<br\> inside \<p\> tags
    -   Table : Table
    -   TD : Table cell
    -   TH : Table header cell
    -   TR : Table row
    -   Title : Title of the document. This is the most prominent
        heading which can define the whole document.
    -   TOC : Table of contents
    -   TOCI : Table of contents item
    -   Watermark : Watermark
-   Text : Text for the element in UTF-8 format, only reported for text
    elements. When inline elements are reported separately from parent
    block element, then this value has references to those inline
    elements.
-   Figures : Identified as a Figure in the Path attribute, saved as a
    PNG in the figures folder with the filename identified in the
    filePaths attribute.
-   Tables : Identified as a Table in the Path attribute, saved as a
    .CSV, .XLSX, and .PNG in the tables folder with the filename
    identified in the filePaths attribute.
-   FilePaths : List of file paths to additional output files (images
    and spreadsheets)
-   Pages : A list of properties for each page of the PDF including page
    number, width, height, and rotation.
-   Reading Order : The reading order of content within columns, across
    page breaks, and inclusive of asides is represented by the order of
    the elements in the Elements array. In the normal mode, exceptions
    can occur for elements extracted from their container (eg. A
    reference link in the middle of a paragraph). However, the order is
    preserved in Styling mode where all Elements and their Kids are
    represented in the natural reading order.

## API limitations

-   **Unsupported PDF types**: The API does not support extracting from
    policy protected and secured PDFs unless the security restrictions
    allow for Content Copying.
-   **Size limits**: Maximum supported file size is 100MB.
-   **Page limits**: Non scanned PDFs are limited to 200 pages and
    Scanned PDFs must be 100 pages or less.Limits may be lower for files
    with a large number of tables.
-   **Rate limits(Extract)**: Keep request rate below 25 requests per minute.

## Extract Text from a PDF

Use the sample below to extract text element information from a PDF
document.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.extractpdf.ExtractTextInfoFromPDF
 
public class ExtractTextInfoFromPDF {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(ExtractTextInfoFromPDF.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            // Create an ExecutionContext using credentials.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            ExtractPDFOperation extractPDFOperation = ExtractPDFOperation.createNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.createFromLocalFile("src/main/resources/extractPdfInput.pdf");
            extractPDFOperation.setInputFile(source);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPDFOptions = ExtractPDFOptions.extractPdfOptionsBuilder()
                    .addElementsToExtract(Arrays.asList(ExtractElementType.TEXT))
                    .build();
            extractPDFOperation.setOptions(extractPDFOptions);

            // Execute the operation
            FileRef result = extractPDFOperation.execute(executionContext);

            // Save the result at the specified location
            result.saveAs("output/ExtractTextInfoFromPDF.zip");

        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
}
      
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ExtractTextInfoFromPDF/
// dotnet run ExtractTextInfoFromPDF.csproj

namespace ExtractTextInfoFromPDF
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
    {
        //Configure the logging
        ConfigureLogging();
        try
        {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
            .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
            .Build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.Create(credentials);
            ExtractPDFOperation extractPdfOperation = ExtractPDFOperation.CreateNew();

            // Set operation input from a source file.
            FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"extractPdfInput.pdf");
            extractPdfOperation.SetInputFile(sourceFileRef);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPdfOptions = ExtractPDFOptions.ExtractPdfOptionsBuilder()
            .AddElementsToExtract(new List<ExtractElementType>(new []{ ExtractElementType.TEXT}))
            .build();
            extractPdfOperation .SetOptions(extractPdfOptions);

            // Execute the operation.
            FileRef result = extractPdfOperation.Execute(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/ExtractTextInfoFromPDF.zip");
        }
        catch (ServiceUsageException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (ServiceApiException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (SDKException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (IOException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (Exception ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    }

        static void ConfigureLogging()
    {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
    }
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/extractpdf/extract-text-info-from-pdf.js

  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  try {
      // Initial setup, create credentials instance.
      const credentials =  PDFServicesSdk.Credentials
          .serviceAccountCredentialsBuilder()
          .fromFile("pdfservices-api-credentials.json")
          .build();

      // Create an ExecutionContext using credentials
      const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

      // Build extractPDF options
      const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
          .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT).build()

      // Create a new operation instance.
      const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
          input = PDFServicesSdk.FileRef.createFromLocalFile(
              'resources/extractPDFInput.pdf',
              PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
          );

      // Set operation input from a source file.
      extractPDFOperation.setInput(input);

      // Set options
      extractPDFOperation.setOptions(options);

      extractPDFOperation.execute(executionContext)
          .then(result => result.saveAsFile('output/ExtractTextInfoFromPDF.zip'))
          .catch(err => {
              if(err instanceof PDFServicesSdk.Error.ServiceApiError
                  || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                  console.log('Exception encountered while executing operation', err);
              } else {
                  console.log('Exception encountered while executing operation', err);
              }
          });
  } catch (err) {
      console.log('Exception encountered while executing operation', err);
  }
```

#### Python

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
// Run the sample:
// python src/extractpdf/extract_txt_from_pdf.py

     logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))
   
     try:
          get base path.
         base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
   
          Initial setup, create credentials instance.
         credentials = Credentials.service_account_credentials_builder()\
             .from_file(base_path + "/pdfservices-api-credentials.json") \
             .build()
   
         #Create an ExecutionContext using credentials and create a new operation instance.
         execution_context = ExecutionContext.create(credentials)
         extract_pdf_operation = ExtractPDFOperation.create_new()
   
         #Set operation input from a source file.
         source = FileRef.create_from_local_file(base_path + "/resources/extractPdfInput.pdf")
         extract_pdf_operation.set_input(source)
   
          Build ExtractPDF options and set them into the operation
         extract_pdf_options: ExtractPDFOptions = ExtractPDFOptions.builder() \
             .with_element_to_extract(ExtractElementType.TEXT) \
             .build()
         extract_pdf_operation.set_options(extract_pdf_options)
   
         #Execute the operation.
         result: FileRef = extract_pdf_operation.execute(execution_context)
   
          Save the result to the specified location.
         result.save_as(base_path + "/output/ExtractTextInfoFromPDF.zip")
     except (ServiceApiException, ServiceUsageException, SdkException):
         logging.exception("Exception encountered while executing operation")
```

#### Rest API

```javascript
curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
    \"cpf:engine\": {
        \"repo:assetId\": \"urn:aaid:cpf:58af6e2c-1f0c-400d-9188-078000185695\"
    },
    \"cpf:inputs\": {
        \"documentIn\": {
            \"cpf:location\": \"InputFile0\",
            \"dc:format\": \"application/pdf\"
        },
        \"params\": {
            \"cpf:inline\": {
                \"elementsToExtract\": [
                    \"text\", \"tables\"
                ],
                \"renditionsToExtract\": [ \"tables\", \"figures\"]
            }
        }
    },
    \"cpf:outputs\": {
        \"elementsInfo\": {
            \"cpf:location\": \"jsonoutput\",
            \"dc:format\": \"application/json\"
        },
        \"elementsRenditions\": {
            \"cpf:location\": \"fileoutpart\",
            \"dc:format\": \"text/directory\"
        }
    }
} "' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Extract Text and Tables

The sample below extracts text and table elements information from a PDF document.It also generates table renditions in xlsx format by default.


<CodeBlock slots="heading, code" repeat="5" languages="Java,.NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.extractpdf.ExtractTextTableInfoFromPDF
 
public class ExtractTextTableInfoFromPDF {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(ExtractTextTableInfoFromPDF.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            // Create an ExecutionContext using credentials.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            ExtractPDFOperation extractPDFOperation = ExtractPDFOperation.createNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.createFromLocalFile("src/main/resources/extractPdfInput.pdf");
            extractPDFOperation.setInputFile(source);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPDFOptions = ExtractPDFOptions.extractPdfOptionsBuilder()
                    .addElementsToExtract(Arrays.asList(ExtractElementType.TEXT, ExtractElementType.TABLES))
                    .build();
            extractPDFOperation.setOptions(extractPDFOptions);

            // Execute the operation
            FileRef result = extractPDFOperation.execute(executionContext);

            // Save the result at the specified location
            result.saveAs("output/ExtractTextTableInfoFromPDF.zip");

        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
}
      
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ExtractTextTableInfoFromPDF/
// dotnet run ExtractTextTableInfoFromPDF.csproj

namespace ExtractTextTableInfoFromPDF
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
    {
        //Configure the logging
        ConfigureLogging();
        try
        {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
            .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
            .Build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.Create(credentials);
            ExtractPDFOperation extractPdfOperation = ExtractPDFOperation.CreateNew();

            // Set operation input from a source file.
            FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"extractPdfInput.pdf");
            extractPdfOperation.SetInputFile(sourceFileRef);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPdfOptions = ExtractPDFOptions.ExtractPdfOptionsBuilder()
            .AddElementsToExtract(new List<ExtractElementType>(new []{ ExtractElementType.TEXT, ExtractElementType.TABLES}))
            .build();
            extractPdfOperation.SetOptions(extractPdfOptions);

            // Execute the operation.
            FileRef result = extractPdfOperation.Execute(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/ExtractTextTableInfoFromPDF.zip");
        }
        catch (ServiceUsageException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (ServiceApiException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (SDKException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (IOException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (Exception ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    }

        static void ConfigureLogging()
    {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
    }
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/extractpdf/extract-text-table-info-from-pdf.js


  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  try {
      // Initial setup, create credentials instance.
      const credentials =  PDFServicesSdk.Credentials
          .serviceAccountCredentialsBuilder()
          .fromFile("pdfservices-api-credentials.json")
          .build();

      // Create an ExecutionContext using credentials
      const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

      // Build extractPDF options
      const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
          .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
          .build()

      // Create a new operation instance.
      const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
          input = PDFServicesSdk.FileRef.createFromLocalFile(
              'resources/extractPDFInput.pdf',
              PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
          );

      // Set operation input from a source file.
      extractPDFOperation.setInput(input);

      // Set options
      extractPDFOperation.setOptions(options);

      extractPDFOperation.execute(executionContext)
          .then(result => result.saveAsFile('output/ExtractTextTableInfoFromPDF.zip'))
          .catch(err => {
              if(err instanceof PDFServicesSdk.Error.ServiceApiError
                  || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                  console.log('Exception encountered while executing operation', err);
              } else {
                  console.log('Exception encountered while executing operation', err);
              }
          });
  } catch (err) {
      console.log('Exception encountered while executing operation', err);
  }

```

#### Python

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
// Run the sample:
// python src/extractpdf/extract_txt_table_info_from_pdf.py

  logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))

  try:
       get base path.
      base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

       Initial setup, create credentials instance.
      credentials = Credentials.service_account_credentials_builder()\
          .from_file(base_path + "/pdfservices-api-credentials.json") \
          .build()

      #Create an ExecutionContext using credentials and create a new operation instance.
      execution_context = ExecutionContext.create(credentials)
      extract_pdf_operation = ExtractPDFOperation.create_new()

      #Set operation input from a source file.
      source = FileRef.create_from_local_file(base_path + "/resources/extractPdfInput.pdf")
      extract_pdf_operation.set_input(source)

       Build ExtractPDF options and set them into the operation
      extract_pdf_options: ExtractPDFOptions = ExtractPDFOptions.builder() \
          .with_element_to_extract(ExtractElementType.TEXT) \
          .with_element_to_extract(ExtractElementType.TABLES) \
          .build()
      extract_pdf_operation.set_options(extract_pdf_options)

      #Execute the operation.
      result: FileRef = extract_pdf_operation.execute(execution_context)

       Save the result to the specified location.
      result.save_as(base_path + "/output/ExtractTextTableInfoFromPDF.zip")
  except (ServiceApiException, ServiceUsageException, SdkException):
      logging.exception("Exception encountered while executing operation")
```

#### Rest API

```javascript
curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
    \"cpf:engine\": {
        \"repo:assetId\": \"urn:aaid:cpf:58af6e2c-1f0c-400d-9188-078000185695\"
    },
    \"cpf:inputs\": {
        \"documentIn\": {
            \"cpf:location\": \"InputFile0\",
            \"dc:format\": \"application/pdf\"
        },
        \"params\": {
            \"cpf:inline\": {
                \"elementsToExtract\": [
                    \"text\", \"tables\"
                ],
                \"renditionsToExtract\": [ \"tables\", \"figures\"]
            }
        }
    },
    \"cpf:outputs\": {
        \"elementsInfo\": {
            \"cpf:location\": \"jsonoutput\",
            \"dc:format\": \"application/json\"
        },
        \"elementsRenditions\": {
            \"cpf:location\": \"fileoutpart\",
            \"dc:format\": \"text/directory\"
        }
    }
} "' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Extract Text and Tables (w/ Tables Renditions)

The sample below extracts text and table elements information as well as table renditions from PDF Document. Note that the output is a zip containing the structured information along with renditions.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.extractpdf.ExtractTextTableInfoWithRenditionsFromPDF
 
public class ExtractTextTableInfoWithRenditionsFromPDF {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(ExtractTextTableInfoWithRenditionsFromPDF.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            // Create an ExecutionContext using credentials.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            ExtractPDFOperation extractPDFOperation = ExtractPDFOperation.createNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.createFromLocalFile("src/main/resources/extractPdfInput.pdf");
            extractPDFOperation.setInputFile(source);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPDFOptions = ExtractPDFOptions.extractPdfOptionsBuilder()
                    .addElementsToExtract(Arrays.asList(ExtractElementType.TEXT, ExtractElementType.TABLES))
                    .addElementToExtractRenditions(ExtractRenditionsElementType.TABLES)
                    .build();
            extractPDFOperation.setOptions(extractPDFOptions);

            // Execute the operation
            FileRef result = extractPDFOperation.execute(executionContext);

            // Save the result at the specified location
            result.saveAs("output/ExtractTextTableInfoWithRenditionsFromPDF.zip");

        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
}
```

#### .NET 

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ExtractTextTableInfoWithRenditionsFromPDF/
// dotnet run ExtractTextTableInfoWithRenditionsFromPDF.csproj

namespace ExtractTextTableInfoWithRenditionsFromPDF
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
    {
        //Configure the logging
        ConfigureLogging();
        try
        {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
            .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
            .Build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.Create(credentials);
            ExtractPDFOperation extractPdfOperation = ExtractPDFOperation.CreateNew();

            // Set operation input from a source file.
            FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"extractPdfInput.pdf");
            extractPdfOperation.SetInputFile(sourceFileRef);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPdfOptions = ExtractPDFOptions.ExtractPdfOptionsBuilder()
            .AddElementsToExtract(new List<ExtractElementType>(new []{ ExtractElementType.TEXT, ExtractElementType.TABLES}))
            .AddElementsToExtractRenditions(new List<ExtractRenditionsElementType> (new [] {ExtractRenditionsElementType.TABLES}))
            .build();

            extractPdfOperation.SetOptions(extractPdfOptions);

            // Execute the operation.
            FileRef result = extractPdfOperation.Execute(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/ExtractTextTableInfoWithRenditionsFromPDF.zip");
        }
        catch (ServiceUsageException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (ServiceApiException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (SDKException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (IOException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (Exception ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    }

        static void ConfigureLogging()
    {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
    }
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/extractpdf/extract-text-table-info-with-tables-renditions-from-pdf.js

  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  try {
      // Initial setup, create credentials instance.
      const credentials =  PDFServicesSdk.Credentials
          .serviceAccountCredentialsBuilder()
          .fromFile("pdfservices-api-credentials.json")
          .build();

      // Create an ExecutionContext using credentials
      const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

      // Build extractPDF options
      const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
          .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
          .addElementsToExtractRenditions(PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.TABLES)
          .build()

      // Create a new operation instance.
      const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
          input = PDFServicesSdk.FileRef.createFromLocalFile(
              'resources/extractPDFInput.pdf',
              PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
          );

      // Set operation input from a source file
      extractPDFOperation.setInput(input);

      // Set options
      extractPDFOperation.setOptions(options);

      extractPDFOperation.execute(executionContext)
          .then(result => result.saveAsFile('output/ExtractTextTableInfoWithTablesRenditionsFromPDF.zip'))
          .catch(err => {
              if(err instanceof PDFServicesSdk.Error.ServiceApiError
                  || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                  console.log('Exception encountered while executing operation', err);
              } else {
                  console.log('Exception encountered while executing operation', err);
              }
          });
  } catch (err) {
      console.log('Exception encountered while executing operation', err);
  }
   
```

#### Python

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
// Run the sample:
// python src/extractpdf/extract_txt_table_info_with_rendition_from_pdf.py

  logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))

  try:
       get base path.
      base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

       Initial setup, create credentials instance.
      credentials = Credentials.service_account_credentials_builder() \
          .from_file(base_path + "/pdfservices-api-credentials.json") \
          .build()

       Create an ExecutionContext using credentials and create a new operation instance.
      execution_context = ExecutionContext.create(credentials)
      extract_pdf_operation = ExtractPDFOperation.create_new()

       Set operation input from a source file.
      source = FileRef.create_from_local_file(base_path + "/resources/extractPdfInput.pdf")
      extract_pdf_operation.set_input(source)

       Build ExtractPDF options and set them into the operation
      extract_pdf_options: ExtractPDFOptions = ExtractPDFOptions.builder() \
          .with_elements_to_extract([ExtractElementType.TEXT, ExtractElementType.TABLES]) \
          .with_element_to_extract_renditions(ExtractRenditionsElementType.TABLES) \
          .build()
      extract_pdf_operation.set_options(extract_pdf_options)

       Execute the operation.
      result: FileRef = extract_pdf_operation.execute(execution_context)

       Save the result to the specified location.
      result.save_as(base_path + "/output/ExtractTextTableWithTableRendition.zip")
  except (ServiceApiException, ServiceUsageException, SdkException):
      logging.exception("Exception encountered while executing operation")
```

#### Rest API

```javascript
curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
    \"cpf:engine\": {
        \"repo:assetId\": \"urn:aaid:cpf:58af6e2c-1f0c-400d-9188-078000185695\"
    },
    \"cpf:inputs\": {
        \"documentIn\": {
            \"cpf:location\": \"InputFile0\",
            \"dc:format\": \"application/pdf\"
        },
        \"params\": {
            \"cpf:inline\": {
                \"elementsToExtract\": [
                    \"text\", \"tables\"
                ],
                \"renditionsToExtract\": [ \"tables\", \"figures\"]
            }
        }
    },
    \"cpf:outputs\": {
        \"elementsInfo\": {
            \"cpf:location\": \"jsonoutput\",
            \"dc:format\": \"application/json\"
        },
        \"elementsRenditions\": {
            \"cpf:location\": \"fileoutpart\",
            \"dc:format\": \"text/directory\"
        }
    }
} "' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Extract Text and Tables (w/ Tables and Figures Renditions)

The sample below extracts text and table elements information as well as tables and figures renditions from PDF Document. Note that the output is a zip containing the structured information along with renditions.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.extractpdf.ExtractTextTableInfoWithRenditionsFromPDF
 
public class ExtractTextTableInfoWithFiguresTablesRenditionsFromPDF {

      private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(ExtractTextTableInfoWithFiguresTablesRenditionsFromPDF.class);

      public static void main(String[] args) {

          try {

              // Initial setup, create credentials instance.
              Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                      .fromFile("pdfservices-api-credentials.json")
                      .build();

              // Create an ExecutionContext using credentials.
              ExecutionContext executionContext = ExecutionContext.create(credentials);

              ExtractPDFOperation extractPDFOperation = ExtractPDFOperation.createNew();

              // Provide an input FileRef for the operation
              FileRef source = FileRef.createFromLocalFile("src/main/resources/extractPdfInput.pdf");
              extractPDFOperation.setInputFile(source);

              // Build ExtractPDF options and set them into the operation
              ExtractPDFOptions extractPDFOptions = ExtractPDFOptions.extractPdfOptionsBuilder()
                      .addElementsToExtract(Arrays.asList(ExtractElementType.TEXT, ExtractElementType.TABLES))
                      .addElementsToExtractRenditions(Arrays.asList(ExtractRenditionsElementType.TABLES, ExtractRenditionsElementType.FIGURES))
                      .build();
              extractPDFOperation.setOptions(extractPDFOptions);

              // Execute the operation
              FileRef result = extractPDFOperation.execute(executionContext);

              // Save the result at the specified location
              result.saveAs("output/ExtractTextTableInfoWithFiguresTablesRenditionsFromPDF.zip");

          } catch (ServiceApiException | IOException | SdkException | ServiceUsageException e) {
              LOGGER.error("Exception encountered while executing operation", e);
          }
      }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ExtractTextTableInfoWithFiguresTablesRenditionsFromPDF/
// dotnet run ExtractTextTableInfoWithFiguresTablesRenditionsFromPDF.csproj

namespace ExtractTextTableInfoWithFiguresTablesRenditionsFromPDF
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
    {
        //Configure the logging
        ConfigureLogging();
        try
        {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
            .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
            .Build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.Create(credentials);
            ExtractPDFOperation extractPdfOperation = ExtractPDFOperation.CreateNew();

            // Set operation input from a source file.
            FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"extractPdfInput.pdf");
            extractPdfOperation.SetInputFile(sourceFileRef);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPdfOptions = ExtractPDFOptions.ExtractPdfOptionsBuilder()
            .AddElementsToExtract(new List<ExtractElementType>(new []{ ExtractElementType.TEXT, ExtractElementType.TABLES}))
        .AddElementsToExtractRenditions(new List<ExtractRenditionsElementType> (new []{ExtractRenditionsElementType.FIGURES, ExtractRenditionsElementType.TABLES}))
        .build();

            extractPdfOperation.SetOptions(extractPdfOptions);


            // Execute the operation.
            FileRef result = extractPdfOperation.Execute(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/ExtractTextTableInfoWithFiguresTablesRenditionsFromPDF.zip");
        }
        catch (ServiceUsageException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (ServiceApiException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (SDKException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (IOException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (Exception ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    }

        static void ConfigureLogging()
    {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
    }
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/extractpdf/extract-text-table-info-with-figures-tables-renditions-from-pdf.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();

    // Create an ExecutionContext using credentials
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

    // Build extractPDF options
    const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
        .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
        .addElementsToExtractRenditions(PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.FIGURES, PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.TABLES)
        .build()

    // Create a new operation instance.
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
        input = PDFServicesSdk.FileRef.createFromLocalFile(
            'resources/extractPDFInput.pdf',
            PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
        );

    // Set operation input from a source file
    extractPDFOperation.setInput(input);

    // Set options
    extractPDFOperation.setOptions(options);

    extractPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/ExtractTextTableWithFigureTableRendition.zip'))
        .catch(err => {
            if(err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}   
```

#### Python

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
// Run the sample:
// python src/extractpdf/extract_txt_table_info_with_figure_tables_rendition_from_pdf.py

  logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))

  try:
       get base path.
      base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

       Initial setup, create credentials instance.
      credentials = Credentials.service_account_credentials_builder() \
          .from_file(base_path + "/pdfservices-api-credentials.json") \
          .build()

       Create an ExecutionContext using credentials and create a new operation instance.
      execution_context = ExecutionContext.create(credentials)
      extract_pdf_operation = ExtractPDFOperation.create_new()

       Set operation input from a source file.
      source = FileRef.create_from_local_file(base_path + "/resources/extractPdfInput.pdf")
      extract_pdf_operation.set_input(source)

       Build ExtractPDF options and set them into the operation
      extract_pdf_options: ExtractPDFOptions = ExtractPDFOptions.builder() \
          .with_elements_to_extract([ExtractElementType.TEXT, ExtractElementType.TABLES]) \
          .with_element_to_extract_renditions(ExtractRenditionsElementType.TABLES,ExtractRenditionsElementType.FIGURES]) \
          .build()
      extract_pdf_operation.set_options(extract_pdf_options)

       Execute the operation.
      result: FileRef = extract_pdf_operation.execute(execution_context)

       Save the result to the specified location.
      result.save_as(base_path + "/output/ExtractTextTableWithTableRendition.zip")
  except (ServiceApiException, ServiceUsageException, SdkException):
      logging.exception("Exception encountered while executing operation")
```

#### Rest API

```javascript
curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
    \"cpf:engine\": {
        \"repo:assetId\": \"urn:aaid:cpf:58af6e2c-1f0c-400d-9188-078000185695\"
    },
    \"cpf:inputs\": {
        \"documentIn\": {
            \"cpf:location\": \"InputFile0\",
            \"dc:format\": \"application/pdf\"
        },
        \"params\": {
            \"cpf:inline\": {
                \"elementsToExtract\": [
                    \"text\", \"tables\"
                ],
                \"renditionsToExtract\": [ \"tables\", \"figures\"]
            }
        }
    },
    \"cpf:outputs\": {
        \"elementsInfo\": {
            \"cpf:location\": \"jsonoutput\",
            \"dc:format\": \"application/json\"
        },
        \"elementsRenditions\": {
            \"cpf:location\": \"fileoutpart\",
            \"dc:format\": \"text/directory\"
        }
    }
} "' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Extract Text and Tables and Character Bounding Boxes (w/ Renditions)

The sample below extracts table renditions and bounding boxes for
characters present in text blocks(paragraphs, list, headings), in
addition to text, table, and figure element information from PDF
Document. Note that the output is a zip containing the structured
information along with renditions.


<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.extractpdf.ExtractTextTableInfoWithCharBoundsFromPDF
 
public class ExtractTextTableInfoWithCharBoundsFromPDF {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(ExtractTextTableInfoWithCharBoundsFromPDF.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            // Create an ExecutionContext using credentials.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            ExtractPDFOperation extractPDFOperation = ExtractPDFOperation.createNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.createFromLocalFile("src/main/resources/extractPdfInput.pdf");
            extractPDFOperation.setInputFile(source);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPDFOptions = ExtractPDFOptions.extractPdfOptionsBuilder()
                    .addElementsToExtract(Arrays.asList(ExtractElementType.TEXT, ExtractElementType.TABLES))
                    .addCharInfo(true)
                    .build();
            extractPDFOperation.setOptions(extractPDFOptions);

            // Execute the operation
            FileRef result = extractPDFOperation.execute(executionContext);

            // Save the result at the specified location
            result.saveAs("output/ExtractTextTableInfoWithCharBoundsFromPDF.zip");

        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
}
```

#### .NET 

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ExtractTextTableInfoWithCharBoundsFromPDF/
// dotnet run ExtractTextTableInfoWithCharBoundsFromPDF.csproj

namespace ExtractTextTableInfoWithCharBoundsFromPDF
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
    {
        //Configure the logging
        ConfigureLogging();
        try
        {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
            .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
            .Build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.Create(credentials);
            ExtractPDFOperation extractPdfOperation = ExtractPDFOperation.CreateNew();

            // Set operation input from a source file.
            FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"extractPdfInput.pdf");
            extractPdfOperation.SetInputFile(sourceFileRef);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPdfOptions = ExtractPDFOptions.ExtractPdfOptionsBuilder()
            .AddElementsToExtract(new List<ExtractElementType>(new []{ ExtractElementType.TEXT, ExtractElementType.TABLES}))
            .AddAddCharInfo(true)
            .build();
            extractPdfOperation.SetOptions(extractPdfOptions);

            // Execute the operation.
            FileRef result = extractPdfOperation.Execute(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/ExtractTextTableInfoWithCharBoundsFromPDF.zip");
        }
        catch (ServiceUsageException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (ServiceApiException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (SDKException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (IOException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (Exception ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    }

        static void ConfigureLogging()
    {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
    }
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/extractpdf/extract-text-table-info-with-char-bounds-from-pdf.js

  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  try {
      // Initial setup, create credentials instance.
      const credentials =  PDFServicesSdk.Credentials
          .serviceAccountCredentialsBuilder()
          .fromFile("pdfservices-api-credentials.json")
          .build();

      // Create an ExecutionContext using credentials
      const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

      // Build extractPDF options
      const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
          .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
          .addCharInfo(true)
          .build()

      // Create a new operation instance.
      const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
          input = PDFServicesSdk.FileRef.createFromLocalFile(
              'resources/extractPDFInput.pdf',
              PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
          );

      // Set operation input from a source file.
      extractPDFOperation.setInput(input);

      // Set options
      extractPDFOperation.setOptions(options);

      extractPDFOperation.execute(executionContext)
          .then(result => result.saveAsFile('output/ExtractTextTableInfoWithCharBoundsFromPDF.zip'))
          .catch(err => {
              if(err instanceof PDFServicesSdk.Error.ServiceApiError
                  || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                  console.log('Exception encountered while executing operation', err);
              } else {
                  console.log('Exception encountered while executing operation', err);
              }
          });
  } catch (err) {
      console.log('Exception encountered while executing operation', err);
  }
```

#### Python

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
// Run the sample:
// python src/extractpdf/extract_txt_table_info_with_char_bounds_from_pdf.py

  logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))

  try:
       get base path.
      base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

       Initial setup, create credentials instance.
      credentials = Credentials.service_account_credentials_builder()\
          .from_file(base_path + "/pdfservices-api-credentials.json") \
          .build()

      #Create an ExecutionContext using credentials and create a new operation instance.
      execution_context = ExecutionContext.create(credentials)
      extract_pdf_operation = ExtractPDFOperation.create_new()

      #Set operation input from a source file.
      source = FileRef.create_from_local_file(base_path + "/resources/extractPdfInput.pdf")
      extract_pdf_operation.set_input(source)

       Build ExtractPDF options and set them into the operation
      extract_pdf_options: ExtractPDFOptions = ExtractPDFOptions.builder() \
          .with_element_to_extract(ExtractElementType.TEXT) \
          .with_get_char_info(True) \
          .build()
      extract_pdf_operation.set_options(extract_pdf_options)

      #Execute the operation.
      result: FileRef = extract_pdf_operation.execute(execution_context)

       Save the result to the specified location.
      result.save_as(base_path + "/output/ExtractTextInfoWithCharBoundsFromPDF.zip")
  except (ServiceApiException, ServiceUsageException, SdkException):
      logging.exception("Exception encountered while executing operation")
```

#### Rest API

```javascript
curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
    \"cpf:engine\": {
        \"repo:assetId\": \"urn:aaid:cpf:58af6e2c-1f0c-400d-9188-078000185695\"
    },
    \"cpf:inputs\": {
        \"documentIn\": {
            \"cpf:location\": \"InputFile0\",
            \"dc:format\": \"application/pdf\"
        },
        \"params\": {
            \"cpf:inline\": {
                \"elementsToExtract\": [
                    \"text\", \"tables\"
                ],
                \"renditionsToExtract\": [ \"tables\", \"figures\"]
            }
        }
    },
    \"cpf:outputs\": {
        \"elementsInfo\": {
            \"cpf:location\": \"jsonoutput\",
            \"dc:format\": \"application/json\"
        },
        \"elementsRenditions\": {
            \"cpf:location\": \"fileoutpart\",
            \"dc:format\": \"text/directory\"
        }
    }
} "' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Extract Text and Tables and Table Structure as CSV (w/ Renditions)

The sample below adds option to get CSV output for tables in addition to
extracting text, table, and figure element information as well as table
renditions from PDF Document. Note that the output is a zip containing
the structured information along with renditions.


<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.extractpdf.ExtractTextTableInfoWithTableStructureFromPdf
 
public class ExtractTextTableInfoWithTableStructureFromPdf {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(ExtractTextTableInfoWithTableStructureFromPdf.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            // Create an ExecutionContext using credentials.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            ExtractPDFOperation extractPDFOperation = ExtractPDFOperation.createNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.createFromLocalFile("src/main/resources/extractPdfInput.pdf");
            extractPDFOperation.setInputFile(source);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPDFOptions = ExtractPDFOptions.extractPdfOptionsBuilder()
                    .addElementsToExtract(Arrays.asList(ExtractElementType.TEXT, ExtractElementType.TABLES))
                    .addElementToExtractRenditions(ExtractRenditionsElementType.TABLES)
                    .addTableStructureFormat(TableStructureType.CSV)
                    .build();
            extractPDFOperation.setOptions(extractPDFOptions);

            // Execute the operation
            FileRef result = extractPDFOperation.execute(executionContext);

            // Save the result at the specified location
            result.saveAs("output/ExtractTextTableInfoWithTableStructureFromPdf.zip");

        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ExtractTextTableInfoWithTableStructureFromPDF/
// dotnet run ExtractTextTableInfoWithTableStructureFromPDF.csproj

namespace ExtractTextTableInfoWithTableStructureFromPDF
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
    {
        //Configure the logging
        ConfigureLogging();
        try
        {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
            .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
            .Build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.Create(credentials);
            ExtractPDFOperation extractPdfOperation = ExtractPDFOperation.CreateNew();

            // Set operation input from a source file.
            FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"extractPdfInput.pdf");
            extractPdfOperation.SetInputFile(sourceFileRef);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPdfOptions = ExtractPDFOptions.ExtractPdfOptionsBuilder()
            .AddElementsToExtract(new List<ExtractElementType>(new []{ ExtractElementType.TEXT, ExtractElementType.TABLES}))
            .AddElementsToExtractRenditions(new List<ExtractRenditionsElementType>(new [] {ExtractRenditionsElementType.TABLES}))
            .AddTableStructureFormat(TableStructureType.CSV)
            .build();

            extractPdfOperation.SetOptions(extractPdfOptions);

            // Execute the operation.
            FileRef result = extractPdfOperation.Execute(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/ExtractTextTableInfoWithTableStructureFromPDF.zip");
        }
        catch (ServiceUsageException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (ServiceApiException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (SDKException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (IOException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (Exception ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    }

        static void ConfigureLogging()
    {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
    }
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/extractpdf/extract-text-table-info-with-tables-renditions-from-pdf.js

    const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
    try {
        // Initial setup, create credentials instance.
        const credentials =  PDFServicesSdk.Credentials
            .serviceAccountCredentialsBuilder()
            .fromFile("pdfservices-api-credentials.json")
            .build();
  
        // Create an ExecutionContext using credentials
        const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
  
        // Build extractPDF options
        const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
            .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
            .addElementsToExtractRenditions(PDFServicesSdk.ExtractPDF.options.ExtractRenditionsElementType.TABLES)
            .addTableStructureFormat(PDFServicesSdk.ExtractPDF.options.TableStructureType.CSV)
            .build()
  
        // Create a new operation instance.
        const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
            input = PDFServicesSdk.FileRef.createFromLocalFile(
                'resources/extractPDFInput.pdf',
                PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
            );
  
        // Set operation input from a source file.
        extractPDFOperation.setInput(input);
  
        // Set options
        extractPDFOperation.setOptions(options);
  
        extractPDFOperation.execute(executionContext)
            .then(result => result.saveAsFile('output/ExtractTextTableWithTableStructure.zip'))
            .catch(err => {
                if(err instanceof PDFServicesSdk.Error.ServiceApiError
                    || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                    console.log('Exception encountered while executing operation', err);
                } else {
                    console.log('Exception encountered while executing operation', err);
                }
            });
    } catch (err) {
        console.log('Exception encountered while executing operation', err);
    }
```

#### Python 

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
// Run the sample:
// python src/extractpdf/extract_txt_table_info_with_table_structure_from_pdf.py

  logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))

  try:
       get base path.
      base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

       Initial setup, create credentials instance.
      credentials = Credentials.service_account_credentials_builder() \
          .from_file(base_path + "/pdfservices-api-credentials.json") \
          .build()

       Create an ExecutionContext using credentials and create a new operation instance.
      execution_context = ExecutionContext.create(credentials)
      extract_pdf_operation = ExtractPDFOperation.create_new()

       Set operation input from a source file.
      source = FileRef.create_from_local_file(base_path + "/resources/extractPdfInput.pdf")
      extract_pdf_operation.set_input(source)

       Build ExtractPDF options and set them into the operation
      extract_pdf_options: ExtractPDFOptions = ExtractPDFOptions.builder() \
          .with_elements_to_extract([ExtractElementType.TEXT, ExtractElementType.TABLES]) \
          .with_element_to_extract_renditions(ExtractRenditionsElementType.TABLES) \
          .with_table_structure_format(TableStructureType.CSV) \
          .build()
      extract_pdf_operation.set_options(extract_pdf_options)

       Execute the operation.
      result: FileRef = extract_pdf_operation.execute(execution_context)

       Save the result to the specified location.
      result.save_as(base_path + "/output/ExtractTextTableWithTableStructure.zip")
  except (ServiceApiException, ServiceUsageException, SdkException):
      logging.exception("Exception encountered while executing operation")

```

#### Rest API

```javascript
curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
    \"cpf:engine\": {
        \"repo:assetId\": \"urn:aaid:cpf:58af6e2c-1f0c-400d-9188-078000185695\"
    },
    \"cpf:inputs\": {
        \"documentIn\": {
            \"cpf:location\": \"InputFile0\",
            \"dc:format\": \"application/pdf\"
        },
        \"params\": {
            \"cpf:inline\": {
                \"elementsToExtract\": [
                    \"text\", \"tables\"
                ],
                \"renditionsToExtract\": [ \"tables\", \"figures\"]
            }
        }
    },
    \"cpf:outputs\": {
        \"elementsInfo\": {
            \"cpf:location\": \"jsonoutput\",
            \"dc:format\": \"application/json\"
        },
        \"elementsRenditions\": {
            \"cpf:location\": \"fileoutpart\",
            \"dc:format\": \"text/directory\"
        }
    }
} "' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## (Beta Feature) Extract Text and Tables and Styling Info

Note: This option is experimental which means that the output may change
without notice. It is provided for evaluation and feedback purposes
only. Use of this option is not supported under the [Document Cloud
Services versioning
policy](./policies.md)

The sample below adds option to get styling information of each element(
Bold / Italics / Superscript etc) in addition to extracting text, table,
and figure element information as well as table renditions from PDF
Document. Note that the output is a zip containing the structured
information along with renditions. Please see the [Styling JSON
schema]( src/pages/resources/extractJSONOutputSchemaStylingInfo.json)
for reference.

<CodeBlock slots="heading, code" repeat="5" languages="Java,.NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.extractpdf.ExtractTextTableWithStylingInfoFromPdfpolicies.md
 
public class ExtractTextTableInfoWithStylingFromPDF {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(ExtractTextTableInfoWithStylingFromPDF.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            // Create an ExecutionContext using credentials.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            ExtractPDFOperation extractPDFOperation = ExtractPDFOperation.createNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.createFromLocalFile("src/main/resources/extractPdfInput.pdf");
            extractPDFOperation.setInputFile(source);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPDFOptions = ExtractPDFOptions.extractPdfOptionsBuilder()
                    .addElementsToExtract(Arrays.asList(ExtractElementType.TEXT, ExtractElementType.TABLES))
                    .addGetStylingInfo(true)
                    .build();
            extractPDFOperation.setOptions(extractPDFOptions);

            // Execute the operation
            FileRef result = extractPDFOperation.execute(executionContext);

            // Save the result at the specified location
            result.saveAs("output/ExtractTextTableInfoWithStylingFromPDF.zip");

        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
}
```

#### .NET 

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ExtractTextTableInfoWithStylingFromPDF/
// dotnet run ExtractTextTableInfoWithStylingFromPDF.csproj

namespace ExtractTextTableInfoWithStylingFromPDF
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
    {
        //Configure the logging
        ConfigureLogging();
        try
        {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
            .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
            .Build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.Create(credentials);
            ExtractPDFOperation extractPdfOperation = ExtractPDFOperation.CreateNew();

            // Set operation input from a source file.
            FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"extractPdfInput.pdf");
            extractPdfOperation.SetInputFile(sourceFileRef);

            // Build ExtractPDF options and set them into the operation
            ExtractPDFOptions extractPdfOptions = ExtractPDFOptions.ExtractPdfOptionsBuilder()
            .AddElementsToExtract(new List<ExtractElementType>(new []{ ExtractElementType.TEXT, ExtractElementType.TABLES}))
            .AddGetStylingInfo(true)
            .build();

            extractPdfOperation.SetOptions(extractPdfOptions);


            // Execute the operation.
            FileRef result = extractPdfOperation.Execute(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/ExtractTextTableInfoWithStylingFromPDF.zip");
        }
        catch (ServiceUsageException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (ServiceApiException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (SDKException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (IOException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    catch (Exception ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
    }

        static void ConfigureLogging()
    {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
    }
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/extractpdf/extract-text-table-with-styling-info-from-pdf.js

    
  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  try {
      // Initial setup, create credentials instance.
      const credentials =  PDFServicesSdk.Credentials
          .serviceAccountCredentialsBuilder()
          .fromFile("pdfservices-api-credentials.json")
          .build();

      // Create an ExecutionContext using credentials
      const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

      // Build extractPDF options
      const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
          .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
          .getStylingInfo(true)
          .build()

      // Create a new operation instance.
      const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
          input = PDFServicesSdk.FileRef.createFromLocalFile(
              'resources/extractPDFInput.pdf',
              PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
          );

      // Set operation input from a source file.
      extractPDFOperation.setInput(input);

      // Set options
      extractPDFOperation.setOptions(options);

      extractPDFOperation.execute(executionContext)
          .then(result => result.saveAsFile('output/ExtractTextTableInfoWithStylingInfoFromPDF.zip'))
          .catch(err => {
              if(err instanceof PDFServicesSdk.Error.ServiceApiError
                  || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                  console.log('Exception encountered while executing operation', err);
              } else {
                  console.log('Exception encountered while executing operation', err);
              }
          });
  } catch (err) {
      console.log('Exception encountered while executing operation', err);
  }
```

#### Python

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
// Run the sample:
// python src/extractpdf/extract_txt_table_with_styling_info_from_pdf.py

  logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))

  try:
       get base path.
      base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

       Initial setup, create credentials instance.
      credentials = Credentials.service_account_credentials_builder()\
          .from_file(base_path + "/pdfservices-api-credentials.json") \
          .build()

      #Create an ExecutionContext using credentials and create a new operation instance.
      execution_context = ExecutionContext.create(credentials)
      extract_pdf_operation = ExtractPDFOperation.create_new()

      #Set operation input from a source file.
      source = FileRef.create_from_local_file(base_path + "/resources/extractPdfInput.pdf")
      extract_pdf_operation.set_input(source)

       Build ExtractPDF options and set them into the operation
      extract_pdf_options: ExtractPDFOptions = ExtractPDFOptions.builder() \
          .with_element_to_extract(ExtractElementType.TEXT) \
          .with_include_styling_info(True) \
          .build()
      extract_pdf_operation.set_options(extract_pdf_options)

      #Execute the operation.
      result: FileRef = extract_pdf_operation.execute(execution_context)

       Save the result to the specified location.
      result.save_as(base_path + "/output/ExtractTextInfoWithStylingInfoFromPDF.zip")
  except (ServiceApiException, ServiceUsageException, SdkException):
      logging.exception("Exception encountered while executing operation")
```

#### Rest API

```javascript
curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
    \"cpf:engine\": {
        \"repo:assetId\": \"urn:aaid:cpf:58af6e2c-1f0c-400d-9188-078000185695\"
    },
    \"cpf:inputs\": {
        \"documentIn\": {
            \"cpf:location\": \"InputFile0\",
            \"dc:format\": \"application/pdf\"
        },
        \"params\": {
            \"cpf:inline\": {
                \"elementsToExtract\": [
                    \"text\", \"tables\"
                ],
                \"renditionsToExtract\": [ \"tables\", \"figures\"]
            }
        }
    },
    \"cpf:outputs\": {
        \"elementsInfo\": {
            \"cpf:location\": \"jsonoutput\",
            \"dc:format\": \"application/json\"
        },
        \"elementsRenditions\": {
            \"cpf:location\": \"fileoutpart\",
            \"dc:format\": \"text/directory\"
        }
    }
} "' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```