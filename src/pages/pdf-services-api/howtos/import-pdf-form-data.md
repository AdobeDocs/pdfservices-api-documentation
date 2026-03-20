---
title: Import PDF Form Data | How Tos | PDF Services API | Adobe PDF Services
---

# Import PDF Form Data

The Import PDF Form Data API will take the form data provided as a JSON, insert it into the PDF form, and generate the resulting PDF document.
![Import PDF Form Data](../import-pdf-form.png)

## Input Documents : **Required**

Supported formats:

- **PDF (application/pdf)** – Only **PDF version 1.6 and above** is supported.
- **AcroForm and Static XFA** – The input document must contain an **interactive form** to which form data will be imported.

### Input Document

An **interactive PDF form (AcroForm/Static XFA)** to which form data, provided as a JSON, is imported to generate the resulting PDF document.

#### Important Notes:

- **Only Static XFA files are supported.**
- **Dynamic XFA format is not supported** and will result in an error.

## REST API

See our public API Reference for [Import PDF Form Data API](../../../apis/#tag/Import-PDF-Form-Data).

## Import PDF Form Data

The sample below demonstrates how to import form data from a JSON into PDF and generate the resulting PDF document.

Please refer to the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="3" languages="Java, Python, REST API" />

#### Java

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.ImportPdfFormData

public class ImportPdfFormData {
    // Initialize the logger
    private static final Logger LOGGER = LoggerFactory.getLogger(ImportPdfFormData.class);

    public static void main(String[] args) {
        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/importPdfFormDataInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                                            System.getenv("PDF_SERVICES_CLIENT_ID"), 
                                            System.getenv("PDF_SERVICES_CLIENT_SECRET"));
        
            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
        
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());
            // Create parameters for the job
            ImportPDFFormDataParams importPDFFormDataParams = ImportPDFFormDataParams.importPdfFormDataParamsBuilder()
                .withJsonFormFieldsData(new JSONObject("{\n" +
                    "  \"option_two\": \"Yes\",\n" +
                    "  \"option_one\": \"Yes\",\n" +
                    "  \"name\": \"sufia\",\n" +
                    "  \"option_three\": \"Off\",\n" +
                    "  \"age\": \"25\",\n" +
                    "  \"favorite_movie\": \"Star Wars Again\"\n" +
                    "}\n"))
                .build();
        
            // Creates a new job instance
            ImportPDFFormDataJob importPDFFormDataJob = new ImportPDFFormDataJob(asset);
            importPDFFormDataJob.setParams(importPDFFormDataParams);
        
            // Submit the job and gets the job result
            String location = pdfServices.submit(importPDFFormDataJob);
            PDFServicesResponse<ImportPDFFormDataResult> pdfServicesResponse = pdfServices.getJobResult(location, ImportPDFFormDataResult.class);
        
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
        
            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/ImportPDFFormData.pdf").toPath());
            LOGGER.info(String.format("Saving asset at output/ImportPDFFormData.pdf", outputFilePath));
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            outputStream.close();
        } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
            LOGGER.error("Exception encountered while executing operation", ex);
        }
    }
}
```

#### Python

```python
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/exportpdfformdata/export_pdf_form_data.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class ImportPDFFormData:
    def __init__(self):
        try:
            file = open('../resources/importPdfFormDataInput.pdf', 'rb')
            input_stream = file.read()
            file.close()

            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            # Creates an asset(s) from source file(s) and upload
            input_asset = pdf_services.upload(input_stream=input_stream,
                                              mime_type=PDFServicesMediaType.PDF)

            # Form data to be imported
            form_data = {
                "option_two": "Yes",
                "option_one": "Yes",
                "name": "garvit",
                "option_three": "Off",
                "age": "24",
                "favorite_movie": "Star Wars Again",
            }

            # Create parameters for the job
            import_pdf_form_data_params = ImportPDFFormDataParams(json_form_fields_data=form_data)

            # Creates a new job instance
            import_pdf_form_data_job = ImportPDFFormDataJob(input_asset=input_asset)

            # Set the parameters for the job
            import_pdf_form_data_job.set_params(import_pdf_form_data_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(import_pdf_form_data_job)
            pdf_services_response = pdf_services.get_job_result(location, ImportPDFFormDataResult)

            # Get content from the resulting asset(s)
            result_asset = pdf_services_response.get_result().get_asset()
            stream_asset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = self.create_output_file_path()
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    # Generates a string containing a directory structure and file name for the output file
    @staticmethod
    def create_output_file_path() -> str:
        now = datetime.now()
        time_stamp = now.strftime("%Y-%m-%dT%H-%M-%S")
        os.makedirs("../../output/ImportPDFFormData", exist_ok=True)
        return f"../../output/ImportPDFFormData/import{time_stamp}.pdf"


if __name__ == "__main__":
    ImportPDFFormData()
```

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Import-PDF-Form-Data

curl --location --request POST 'https://pdf-services.adobe.io/operation/setformdata' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "jsonFormFieldsData":"{}"
}'
```
