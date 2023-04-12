---
title: Generate Tagged PDF from a PDF  | How Tos | PDF Accessibility Auto-Tag API | Adobe PDF Services
---
## Generate Tagged PDF from a PDF

The sample below generates tagged PDF from a PDF.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="3" languages="Java, Python, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://git.corp.adobe.com/dc/dc-cpf-sdk-java-samples/tree/beta
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDF

public class AutotagPDF {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDF.class);

    public static void main(String[] args) {

        try {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

            // Provide an input FileRef for the operation
            autotagPDFOperation.setInput(FileRef.createFromLocalFile("src/main/resources/autotagPdfInput.pdf"));

            // Execute the operation
            AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

            // Save the output files at the specified location
            autotagOutputFiles.saveTaggedPDF("output/AutotagPDF-tagged.pdf");

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }
}  
```

#### Python

```python
# Get the samples from https://git.corp.adobe.com/dc/dc-cpf-python-sdk-samples/tree/beta
# Run the sample:
# python src/autotagpdf/autotag_pdf.py

logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))

try:
    # get base path.
    base_path = str(Path(__file__).parents[2])

    # Initial setup, create credentials instance.
    credentials = Credentials.service_account_credentials_builder() \
        .from_file(base_path + '/pdfservices-api-credentials.json') \
        .build()

    # Create an ExecutionContext using credentials and create a new operation instance.
    execution_context = ExecutionContext.create(credentials)
    autotag_pdf_operation = AutotagPDFOperation.create_new()

    # Set operation input from a source file.
    input_file_path = 'autotagPdfInput.pdf'
    source = FileRef.create_from_local_file(base_path + '/resources/' + input_file_path)
    autotag_pdf_operation.set_input(source)

    # Execute the operation.
    autotag_output_files: AutotagPDFOutputFiles = autotag_pdf_operation.execute(execution_context)

    input_file_name = Path(input_file_path).stem
    base_output_path = base_path + '/output/AutotagPDF/'

    Path(base_output_path).mkdir(parents=True, exist_ok=True)
    tagged_pdf_path = f'{base_output_path}{input_file_name}-tagged.pdf'

    # Save the result to the specified location.
    autotag_output_files.save_pdf_file(tagged_pdf_path)

except (ServiceApiException, ServiceUsageException, SdkException) as e:
    logging.exception(f'Exception encountered while executing operation: {e}')
```

#### Rest API 

```javascript
// Please refer our Rest API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Auto-Tag

curl --location --request POST 'https://pdf-services.adobe.io/operation/autotag' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'
```
