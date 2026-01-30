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

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" />

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
#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ImportPDFFormData/
// dotnet run ImportPDFFormData.csproj

namespace ImportPDFFormData
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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(@"importPdfFormDataInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                var formData = new JObject(
                    new JProperty("option_two", "Yes"),
                    new JProperty("option_one", "Yes"),
                    new JProperty("name", "sufia"),
                    new JProperty("option_three", "Off"),
                    new JProperty("age", "25"),
                    new JProperty("favorite_movie", "Star Wars Again")
                );

                ImportPDFFormDataParams importParams = ImportPDFFormDataParams.ImportPDFFormDataParamsBuilder()
                    .WithJsonFormFieldsData(formData)
                    .Build();

                // Creates a new job instance
                ImportPDFFormDataJob importPDFFormDataJob = new ImportPDFFormDataJob(asset);
                importPDFFormDataJob.SetParams(importParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(importPDFFormDataJob);
                PDFServicesResponse<ImportPDFFormDataResult> pdfServicesResponse =
                    pdfServices.GetJobResult<ImportPDFFormDataResult>(location, typeof(ImportPDFFormDataResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = CreateOutputFilePath();
                new FileInfo(Directory.GetCurrentDirectory() + outputFilePath).Directory.Create();
                Stream outputStream = File.OpenWrite(Directory.GetCurrentDirectory() + outputFilePath);
                streamAsset.Stream.CopyTo(outputStream);
                outputStream.Close();
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
// node src/importpdfformdata/import-pdf-form-data.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ImportPDFFormDataJob,
    ImportPDFFormDataResult,
    ImportPDFFormDataParams,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {
    let readStream;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and uploads
        readStream = fs.createReadStream("resources/importPdfFormDataInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new ImportPDFFormDataParams({
            jsonFormFieldsData: {
                "option_two": "Yes",
                "option_one": "Off",
                "name": "Supratim",
                "option_three": "Off",
                "age": "23",
                "favorite_movie": "The Empire Strikes Back"
            }
        });

        // Creates a new job instance
        const job = new ImportPDFFormDataJob({ inputAsset, params });

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: ImportPDFFormDataResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = createOutputFilePath();
        console.log(`Saving asset at ${outputFilePath}`);

        const outputStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(outputStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        readStream?.destroy();
    }
})();
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
