---
title: Electronic Seal API | How Tos | PDF Electronic Seal API | Adobe PDF Services
---
# PDF Electronic Seal API

## API Parameters

### Signature Format (_signatureFormat_)

Specifies a supported digital signature format:

* PADES : This is the latest and improved signature format which is more strict, concrete, and secure. For details, see <a href="../PDF_ISO_32000-2.pdf" target="_blank">ISO 32000-2</a> and <a href="../ETSI_EN_319_142-1.pdf" target="_blank">ETSI EN 319 142-1</a>.
* PKCS7 : This signature format is less stringent than PADES since it permits more PDF changes without invalidating the digital signature. This is the default signature format. For details, see <a href="../PDF_ISO_32000-1.pdf" target="_blank">ISO 32000-1</a>.


### Document Level Permission (_documentLevelPermission_)

Specifies the DocMDP (i.e. Document Modification Detection and Prevention) permissions. These permissions are applied to the output electronically sealed document.

* NO_CHANGES_ALLOWED : No changes to the document are permitted. Any change to the document will invalidate the signature.
* FORM_FILLING : Allowed changes are filling in forms, instantiating page templates, and performing approval signatures. This is also the default document level permission, if not specified by the user.
* FORM_FILLING_AND_ANNOTATIONS : In addition to above, annotation creation, deletion, and modification are also allowed.

<InlineAlert slots="text"/>

Long Term Validation (LTV) information of Timestamp Certificates (if using Trusted Timestamping) is embedded in the PDF document only if Document Level Permission is set as FORM_FILLING or FORM_FILLING_AND_ANNOTATIONS.

### TSP Credential Information (_cscCredentialOptions_) : **Required**

TSP parameters encapsulate the sealer's [certificate credential](../../pdf-electronic-seal-api/gettingstarted/#step-1-procure-digital-certificate-credentials) as well as the associated authentication and authorization data.

* **TSP Name**  (*providerName*) : **Required** : Specifies the name of the Trust Service Provider used to generate the certificate. Presently, only TSPs supporting the OAuth 2.0 client credential authorization flow are supported. The table below provides the provider name mapping for each supported Trust Service Provider.
  ![TSP Name Mapping](../../images/provider_mapping_ss.png)

* **TSP Credential Id**  (*credentialId*) : **Required** : Specifies the Digital ID stored with the TSP that should be used for sealing.
* **TSP Authorization Context**  (*authorizationContext*) : **Required** : Encapsulates the authorization data required to communicate with the TSPs.

    * **Access Token**  (*accessToken*) : **Required** : Specifies the access token used to authorize access to the CSC provider hosted APIs.
    * **Token Type** (_tokenType_): Specifies the type of access token. Default value is "Bearer".

* **TSP Credential Authorization Parameter**  (*credentialAuthParameters*) : **Required** : Encapsulates the credential authorization information required to authorize access to their digital certificate.

    * **PIN**  (*pin*) : **Required** : Specifies the PIN associated with TSP provided credential ID.

### TSA Information (_tsaOptions_) :

TSA parameters encapsulate the [timestamping URL and credentials](../../pdf-electronic-seal-api/gettingstarted/#step-2-optional-procure-timestamping-url-and-credentials).

* **TSA URL**  (*url*) : **Required** : Specifies the TSA URL to be used for getting timestamp token.
* **TSA Credential Authorization Parameter**  (*credentialAuthParameters*) : Encapsulates the credential information required to authenticate the TSA URL.

    * **TSA Username**  (*username*) : Specify the username for authenticating TSA URL.
    * **TSA Password**  (*password*) : Specify the password for authenticating TSA URL.


### Seal Field Parameters   (*sealFieldOptions*) : **Required**

The seal field parameters are required to create a new signature field or use an existing signature field.

* **Field Name**  (*fieldName*) : **Required** : Specifies the signature field's name. This must be a non-empty string. If signature field with this field name already exists, that field is used. else a signature field with this name will be created.
* **Visible** (_visible_): Specifies whether the signature field should be visible or hidden. The default value of `true` creates a visible seal.
* **Page Number** (_pageNumber_) : **Required** : Specifies the page number to which the signature field should be attached. Page numbers are 1-based. It is only <b>required</b> if the signature field needs to be visible and, it does not exist in the pdf document. If this is provided along with the signature field then the page number should be same on which signature field is present in the document, else an error is thrown. This parameter will be ignored in case of invisible signature field.
* **Location** (_location_) : **Required** : Specifies the coordinates of the seal appearance's bounding box in default PDF user space units. The location is only <b>required</b> if the signature field does not exist in the pdf document. If this is provided along with the existing signature field, then it is ignored. This parameter will also be ignored for invisible signature field.

    * **Left** (_left_) : **Required** : The left x-coordinate
    * **Bottom** (_bottom_) : **Required** : The bottom y-coordinate
    * **Right** (_right_) : **Required** : The right x-coordinate
    * **Top** (_top_) : **Required** : The top y-coordinate

To add the signature field explicitly, see [how to place a signature field in a PDF](https://www.adobe.com/sign/hub/how-to/add-a-signature-block-to-pdf).

### Seal Appearance Parameters (_sealAppearanceOptions_)

Specifies seal field appearance parameters. These are an enumerated set of display items: NAME, DATE, DISTINGUISHED_NAME, LABELS and SEAL_IMAGE.
* **Display Options**  (*displayOptions*): Specifies the information to display in the seal. NAME and LABELS are the default values.

    * **NAME**: Specifies that the certificate owner's name should be displayed.
      ![Display Options](../../images/name_ss.png)
    * **DATE**: Specifies that the sealing date/time should be displayed. This value should not be mistaken for a signed timestamp from a timestamp authority.
      ![Display Options](../../images/date_ss.png)
    * **DISTINGUISHED_NAME**: Specifies that the distinguished name information from the digital certificate should be displayed.
      ![Display Options](../../images/dn_ss.png)
    * **LABELS**: Specifies that text labels should be displayed.
      ![Display Options](../../images/labels_ss.png)
    * **SEAL_IMAGE**: Specifies the seal image should be displayed.
      ![Display Options](../../images/seal2_ss.png)
      If SEAL_IMAGE is given in appearance parameters and seal image is not passed in the request, the default Acrobat trefoil image is used.
      ![Display Options](../../images/trefoil_ss.png)

**Example JSON**

```json
{
  "signatureFormat": "PADES",
  "documentLevelPermission": "FORM_FILLING",
  "cscCredentialOptions": {
    "authorizationContext": {
      "accessToken": "<ACCESS_TOKEN>",
      "tokenType": "Bearer"
    },
    "credentialAuthParameters": {
      "pin": "<PIN>"
    },
    "providerName": "<PROVIDER_NAME>",
    "credentialId": "<CREDENTIAL_ID>"
  },
  "tsaOptions": {
    "url": "<TIMESTAMP_URL>",
    "credentialAuthParameters": {
      "username": "<USERNAME>",
      "password": "<PASSWORD>"
    }
  },
  "sealFieldOptions": {
    "pageNumber": 1,
    "fieldName": "Signature1",
    "visible": true,
    "location": {
      "left" : 150,
      "top": 250,
      "bottom": 350,
      "right": 200
    }
  },
  "sealAppearanceOptions": {
    "displayOptions": [
      "NAME",
      "DATE",
      "LABELS",
      "DISTINGUISHED_NAME",
      "SEAL_IMAGE"
    ]
  }
}
```

<InlineAlert slots="text"/>

Support of Trusted Timestamping and Document Level Permissions is only available through REST APIs and Java SDK.
Other SDKs will support these features in future versions.

## API limitations

<br />

- **Input PDF size:** Input PDF files up to a maximum of 100 MB are supported.
- **Seal Image size:** Seal Image files up to a maximum of 5 MB are supported.
- **Seal Image formats:** Supported Seal Image formats are JPEG(image/jpeg), PNG(image/png) and PDF(application/pdf).
- **Password-protected Files:** Encrypted or Password-protected PDFs are not supported for applying electronic seal.
- **Signed/Sealed Files:** Any PDF which is already signed, certified or sealed cannot be used for applying electronic seal.
- **Input PDF version:** Input PDF with version less than 1.3 are not supported.
- **Usage Rights File:** Input PDF having usage rights are not supported.

## REST API 

See our public API Reference for [PDF Electronic Seal API](../../../apis/#tag/PDF-Electronic-Seal).

## Apply Electronic Seal with default appearance on PDF

The sample below performs electronic seal operation with default appearance on a given PDF.

Please refer to the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.electronicseal.ElectronicSeal

package com.adobe.pdfservices.operation.samples.electronicseal;

public class ElectronicSeal {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ElectronicSeal.class);

    public static void main(String[] args) {
        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/sampleInvoice.pdf").toPath());
             InputStream inputStreamSealImage = Files.newInputStream(new File("src/main/resources/sampleSealImage.png").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));
        
            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
            
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());
            Asset sealImageAsset = pdfServices.upload(inputStreamSealImage, PDFServicesMediaType.PNG.getMediaType());
        
            // Set the document level permission to be applied for output document
            DocumentLevelPermission documentLevelPermission = DocumentLevelPermission.FORM_FILLING;
        
            // Sets the Seal Field Name to be created in input PDF document.
            String sealFieldName = "Signature1";
        
            // Sets the page number in input document for applying seal.
            Integer sealPageNumber = 1;
        
            // Sets if seal should be visible or invisible.
            Boolean sealVisible = true;
        
            // Creates FieldLocation instance and set the coordinates for applying signature
            FieldLocation fieldLocation = new FieldLocation(150, 250, 350, 200);
        
            // Create FieldOptions instance with required details.
            FieldOptions fieldOptions = new FieldOptions.Builder(sealFieldName)
                .setFieldLocation(fieldLocation)
                .setPageNumber(sealPageNumber)
                .setVisible(sealVisible)
                .build();
        
            // Sets the name of TSP Provider being used.
            String providerName = "<PROVIDER_NAME>";
        
            // Sets the access token to be used to access TSP provider hosted APIs.
            String accessToken = "<ACCESS_TOKEN>";
        
            // Sets the credential ID.
            String credentialID = "<CREDENTIAL_ID>";
        
            // Sets the PIN generated while creating credentials.
            String pin = "<PIN>";
        
            // Creates CSCAuthContext instance using access token and token type.
            CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");
        
            // Create CertificateCredentials instance with required certificate details.
            CertificateCredentials certificateCredentials = CertificateCredentials.cscCredentialBuilder()
                .withProviderName(providerName)
                .withCredentialID(credentialID)
                .withPin(pin)
                .withCSCAuthContext(cscAuthContext)
                .build();
            
            // Create parameters for the job
            PDFElectronicSealParams pdfElectronicSealParams = PDFElectronicSealParams
                .pdfElectronicSealParamsBuilder(certificateCredentials, fieldOptions)
                .withDocumentLevelPermission(documentLevelPermission)
                .build();
        
            // Creates a new job instance
            PDFElectronicSealJob pdfElectronicSealJob = new PDFElectronicSealJob(asset, pdfElectronicSealParams);
        
            // Sets the optional input seal image for PDFElectronicSealOperation instance
            pdfElectronicSealJob.setSealImageAsset(sealImageAsset);
        
            // Submit the job and gets the job result
            String location = pdfServices.submit(pdfElectronicSealJob);
            PDFServicesResponse<PDFElectronicSealResult> pdfServicesResponse = pdfServices.getJobResult(location, PDFElectronicSealResult.class);
        
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
        
            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/sealedOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/sealedOutput.pdf");
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
// cd ElectronicSeal/
// dotnet run ElectronicSeal.csproj

namespace ElectronicSeal
{
    class Program
    {
        // Initialize the logger.
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
                using Stream inputStream = File.OpenRead(@"SampleInvoice.pdf");
                using Stream inputStreamSealImage = File.OpenRead(@"sampleSealImage.png");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());
                IAsset sealImageAsset =
                    pdfServices.Upload(inputStreamSealImage, PDFServicesMediaType.PNG.GetMIMETypeValue());

                // Set the document level permission to be applied for output document
                DocumentLevelPermission documentLevelPermission = DocumentLevelPermission.FORM_FILLING;

                // Sets the Seal Field Name to be created in input PDF document.
                String sealFieldName = "Signature1";

                // Sets the page number in input document for applying seal.
                int sealPageNumber = 1;

                // Sets if seal should be visible or invisible.
                bool sealVisible = true;

                // Creates FieldLocation instance and set the coordinates for applying signature
                FieldLocation fieldLocation = new FieldLocation(150, 250, 350, 200);

                // Create FieldOptions instance with required details.
                FieldOptions fieldOptions = new FieldOptions.Builder(sealFieldName)
                    .SetVisible(sealVisible)
                    .SetFieldLocation(fieldLocation)
                    .SetPageNumber(sealPageNumber)
                    .Build();

                // Sets the name of TSP Provider being used.
                String providerName = "<PROVIDER_NAME>";

                // Sets the access token to be used to access TSP provider hosted APIs.
                String accessToken = "<ACCESS_TOKEN>";

                // Sets the credential ID.
                String credentialID = "<CREDENTIAL_ID>";

                // Sets the PIN generated while creating credentials.
                String pin = "<PIN>";

                // Creates CSCAuthContext instance using access token and token type.
                CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");

                // Create CertificateCredentials instance with required certificate details.
                CertificateCredentials certificateCredentials = CertificateCredentials.CSCCredentialBuilder()
                    .WithProviderName(providerName)
                    .WithCredentialID(credentialID)
                    .WithPin(pin)
                    .WithCSCAuthContext(cscAuthContext)
                    .Build();

                // Create parameters for the job
                PDFElectronicSealParams pdfElectronicSealParams =
                    PDFElectronicSealParams.PDFElectronicSealParamsBuilder(certificateCredentials, fieldOptions)
                        .WithDocumentLevelPermission(documentLevelPermission)
                        .Build();

                // Creates a new job instance
                PDFElectronicSealJob pdfElectronicSealJob = new PDFElectronicSealJob(asset, pdfElectronicSealParams);
                pdfElectronicSealJob.SetSealImageAsset(sealImageAsset);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(pdfElectronicSealJob);
                PDFServicesResponse<PDFElectronicSealResult> pdfServicesResponse =
                    pdfServices.GetJobResult<PDFElectronicSealResult>(location, typeof(PDFElectronicSealResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/sealedOutput.pdf";
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
// node src/electronicseal/electronic-seal.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    DocumentLevelPermission,
    FieldLocation,
    FieldOptions,
    CSCAuthContext,
    CSCCredential,
    PDFElectronicSealParams,
    PDFElectronicSealJob,
    PDFElectronicSealResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {
    let sourceFileReadStream;
    let sealImageReadStream;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        sourceFileReadStream = fs.createReadStream("./sampleInvoice.pdf")
        sealImageReadStream = fs.createReadStream("./sampleSealImage.png");
        const [sourceFileAsset, sealImageAsset] = await pdfServices.uploadAssets({
            streamAssets: [{
                readStream: sourceFileReadStream,
                mimeType: MimeType.PDF
            }, {
                readStream: sealImageReadStream,
                mimeType: MimeType.PNG
            }]
        });

        // Set the document level permission to be applied for output document
        const documentLevelPermission = DocumentLevelPermission.FORM_FILLING;

        // Set the Seal Field Name to be created in input PDF document
        const sealFieldName = "Signature1";

        // Set the page number in input document for applying seal
        const sealPageNumber = 1;

        // Set if seal should be visible or invisible
        const sealVisible = true;

        // Create FieldLocation instance and set the coordinates for applying signature
        const fieldLocation = new FieldLocation({
            left: 150,
            top: 250,
            right: 350,
            bottom: 200
        });

        // Create FieldOptions instance with required details
        const sealFieldOptions = new FieldOptions({
            visible: sealVisible,
            location: fieldLocation,
            fieldName: sealFieldName,
            pageNumber: sealPageNumber,
        });

        // Set the name of TSP Provider being used
        const providerName = "<PROVIDER_NAME>";

        // Set the access token to be used to access TSP provider hosted APIs
        const accessToken = "<ACCESS_TOKEN>";

        // Set the credential ID
        const credentialId = "<CREDENTIAL_ID>";

        // Set the PIN generated while creating credentials
        const pin = "<PIN>";

        // Create CSCAuthContext instance using access token and token type
        const authorizationContext = new CSCAuthContext({
            accessToken,
            tokenType: "Bearer"
        });

        // Create CertificateCredentials instance with required certificate details
        const certificateCredentials = new CSCCredential({
            providerName,
            credentialId,
            pin,
            authorizationContext,
        });

        // Create parameters for the job
        const params = new PDFElectronicSealParams({
            certificateCredentials,
            sealFieldOptions,
            documentLevelPermission,
        });

        // Creates a new job instance
        const job = new PDFElectronicSealJob({
            inputAsset: sourceFileAsset,
            sealImageAsset,
            params,
        });

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: PDFElectronicSealResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates a write stream and copy stream asset's content to it
        const outputFilePath = "./sealedOutput.pdf";
        console.log(`Saving asset at ${outputFilePath}`);

        const writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        sourceFileReadStream?.destroy();
        sealImageReadStream?.destroy();
    }
})();
```

#### Python

```javascript

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class ElectronicSeal:
    def __init__(self):
        try:
            pdf_file = open('./sampleInvoice.pdf', 'rb')
            file_input_stream = pdf_file.read()
            pdf_file.close()

            seal_image_file = open('./sampleSealImage.png', 'rb')
            seal_image_input_stream = seal_image_file.read()
            seal_image_file.close()

            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            # Creates an asset(s) from source file(s) and upload
            asset = pdf_services.upload(input_stream=file_input_stream, mime_type=PDFServicesMediaType.PDF)
            seal_image_asset = pdf_services.upload(input_stream=seal_image_input_stream, mime_type=PDFServicesMediaType.PNG)

            # Set the document level permission to be applied for output document
            document_level_permission = DocumentLevelPermission.FORM_FILLING

            # Sets the Seal Field Name to be created in input PDF document.
            seal_field_name = "Signature1"

            # Sets the page number in input document for applying seal.
            seal_page_number = 1

            # Sets if seal should be visible or invisible.
            seal_visible = True

            # Creates FieldLocation instance and set the coordinates for applying signature
            field_location = FieldLocation(150, 250, 350, 200)

            # Create FieldOptions instance with required details.
            field_options = FieldOptions(
                field_name=seal_field_name,
                field_location=field_location,
                page_number=seal_page_number,
                visible=seal_visible
            )

            # Sets the name of TSP Provider being used.
            provider_name = "<PROVIDER_NAME>"

            # Sets the access token to be used to access TSP provider hosted APIs.
            access_token = "<ACCESS_TOKEN>"

            # Sets the credential ID.
            credential_id = "<CREDENTIAL_ID>"

            # Sets the PIN generated while creating credentials.
            pin = "<PIN>"

            # Creates CSCAuthContext instance using access token and token type.
            csc_auth_context = CSCAuthContext(
                access_token=access_token,
                token_type="Bearer",
            )

            # Create CertificateCredentials instance with required certificate details.
            certificate_credentials = CSCCredentials(
                provider_name=provider_name,
                credential_id=credential_id,
                pin=pin,
                csc_auth_context=csc_auth_context,
            )

            # Create parameters for the job
            electronic_seal_params = PDFElectronicSealParams(
                seal_certificate_credentials=certificate_credentials,
                seal_field_options=field_options,
            )

            # Creates a new job instance
            electronic_seal_job = PDFElectronicSealJob(input_asset=asset,
                                                       electronic_seal_params=electronic_seal_params,
                                                       seal_image_asset=seal_image_asset)

            # Submit the job and gets the job result
            location = pdf_services.submit(electronic_seal_job)
            pdf_services_response = pdf_services.get_job_result(location, ESealPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it

            output_file_path = 'output/ElectronicSeal.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    ElectronicSeal()
```

#### REST API

```javascript
curl --location --request POST 'https://pdf-services.adobe.io/operation/electronicseal' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "inputDocumentAssetID": "urn:aaid:AS:UE1:23c30ee0-2c4d-xxxx-xxxx-087832fca718",
    "sealImageAssetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-xxxx-xxxx-087832fca718",
    "sealOptions": {
        "signatureFormat": "PKCS7",
        "documentLevelPermission": "FORM_FILLING",
        "cscCredentialOptions": {
            "credentialId": "<CREDENTIAL_ID>",
            "providerName": "<PROVIDER_NAME>",
            "authorizationContext": {
                "tokenType": "Bearer",
                "accessToken": "<ACCESS_TOKEN>"
            },
            "credentialAuthParameters": {
                "pin": "<PIN>"
            }
        },
        "sealFieldOptions": {
            "location": {
                "left": 150,
                "top": 250,
                "right": 350,
                "bottom": 200
            },
            "fieldName": "Signature1",
            "pageNumber": 1
        }
    }
}'
```
## Apply Electronic Seal with customized appearance on PDF

The sample below performs electronic seal operation with customized appearance on a given PDF.

Please refer to the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript
// Get the samples from https://github.com/adobe/pdfservices-java-sdk-samples/tree/beta
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.electronicseal.ElectronicSealWithAppearanceOptions

package com.adobe.pdfservices.operation.samples.electronicseal;

public class ElectronicSealWithAppearanceOptions {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ElectronicSealWithAppearanceOptions.class);

    public static void main(String[] args) {
        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/sampleInvoice.pdf").toPath());
             InputStream inputStreamSealImage = Files.newInputStream(new File("src/main/resources/sampleSealImage.png").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));
        
            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
       
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());
            Asset sealImageAsset = pdfServices.upload(inputStreamSealImage, PDFServicesMediaType.PNG.getMediaType());

            // Set the document level permission to be applied for output document
            DocumentLevelPermission documentLevelPermission = DocumentLevelPermission.FORM_FILLING;

            // Create AppearanceOptions and add the required signature display items to it
            AppearanceOptions appearanceOptions = new AppearanceOptions();
            appearanceOptions.addItem(AppearanceItem.NAME);
            appearanceOptions.addItem(AppearanceItem.LABELS);
            appearanceOptions.addItem(AppearanceItem.DATE);
            appearanceOptions.addItem(AppearanceItem.SEAL_IMAGE);
            appearanceOptions.addItem(AppearanceItem.DISTINGUISHED_NAME);
        
        
            // Sets the Seal Field Name to be created in input PDF document.
            String sealFieldName = "Signature1";
        
            // Sets the page number in input document for applying seal.
            Integer sealPageNumber = 1;
        
            // Sets if seal should be visible or invisible.
            Boolean sealVisible = true;
        
            // CreatesFieldLocation instance and set the coordinates for applying signature
            FieldLocation fieldLocation = new FieldLocation(150, 250, 350, 200);
        
            // Create FieldOptions instance with required details.
            FieldOptions fieldOptions = new FieldOptions.Builder(sealFieldName)
                .setFieldLocation(fieldLocation)
                .setPageNumber(sealPageNumber)
                .setVisible(sealVisible)
                .build();
        
            // Sets the name of TSP Provider being used.
            String providerName = "<PROVIDER_NAME>";
        
            // Sets the access token to be used to access TSP provider hosted APIs.
            String accessToken = "<ACCESS_TOKEN>";
        
            // Sets the credential ID.
            String credentialID = "<CREDENTIAL_ID>";
        
            // Sets the PIN generated while creating credentials.
            String pin = "<PIN>";
        
            // Creates CSCAuthContext instance using access token and token type.
            CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");
        
            // Create CertificateCredentials instance with required certificate details.
            CertificateCredentials certificateCredentials = CertificateCredentials.cscCredentialBuilder()
                .withProviderName(providerName)
                .withCredentialID(credentialID)
                .withPin(pin)
                .withCSCAuthContext(cscAuthContext)
                .build();
            
            // Create parameters for the job
            PDFElectronicSealParams pdfElectronicSealParams = PDFElectronicSealParams
                .pdfElectronicSealParamsBuilder(certificateCredentials, fieldOptions)
                .withDocumentLevelPermission(documentLevelPermission)
                .withAppearanceOptions(appearanceOptions)
                .build();
        
            // Creates a new job instance
            PDFElectronicSealJob pdfElectronicSealJob = new PDFElectronicSealJob(asset, pdfElectronicSealParams);
            pdfElectronicSealJob.setSealImageAsset(sealImageAsset);
        
            // Submit the job and gets the job result
            String location = pdfServices.submit(pdfElectronicSealJob);
            PDFServicesResponse<PDFElectronicSealResult> pdfServicesResponse = pdfServices.getJobResult(location, PDFElectronicSealResult.class);
        
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
        
            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/sealedOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/sealedOutput.pdf");
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
// cd ElectronicSealWithAppearanceOptions/
// dotnet run ElectronicSealWithAppearanceOptions.csproj

namespace ElectronicSealWithAppearanceOptions
{
        class Program
    {
        // Initialize the logger.
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
                using Stream inputStream = File.OpenRead(@"SampleInvoice.pdf");
                using Stream inputStreamSealImage = File.OpenRead(@"sampleSealImage.png");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());
                IAsset sealImageAsset =
                    pdfServices.Upload(inputStreamSealImage, PDFServicesMediaType.PNG.GetMIMETypeValue());

                // Create AppearanceOptions and add the required signature display items to it
                AppearanceOptions appearanceOptions = new AppearanceOptions();
                appearanceOptions.AddItem(AppearanceItem.NAME);
                appearanceOptions.AddItem(AppearanceItem.LABELS);
                appearanceOptions.AddItem(AppearanceItem.DATE);
                appearanceOptions.AddItem(AppearanceItem.SEAL_IMAGE);
                appearanceOptions.AddItem(AppearanceItem.DISTINGUISHED_NAME);

                // Set the document level permission to be applied for output document
                DocumentLevelPermission documentLevelPermission = DocumentLevelPermission.FORM_FILLING;

                // Sets the Seal Field Name to be created in input PDF document.
                String sealFieldName = "Signature1";

                // Sets the page number in input document for applying seal.
                int sealPageNumber = 1;

                // Sets if seal should be visible or invisible.
                bool sealVisible = true;

                // Creates FieldLocation instance and set the coordinates for applying signature
                FieldLocation fieldLocation = new FieldLocation(150, 250, 350, 200);

                // Create FieldOptions instance with required details.
                FieldOptions fieldOptions = new FieldOptions.Builder(sealFieldName)
                    .SetVisible(sealVisible)
                    .SetFieldLocation(fieldLocation)
                    .SetPageNumber(sealPageNumber)
                    .Build();

                // Sets the name of TSP Provider being used.
                String providerName = "<PROVIDER_NAME>";

                // Sets the access token to be used to access TSP provider hosted APIs.
                String accessToken = "<ACCESS_TOKEN>";

                // Sets the credential ID.
                String credentialID = "<CREDENTIAL_ID>";

                // Sets the PIN generated while creating credentials.
                String pin = "<PIN>";

                // Creates CSCAuthContext instance using access token and token type.
                CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");

                // Create CertificateCredentials instance with required certificate details.
                CertificateCredentials certificateCredentials = CertificateCredentials.CSCCredentialBuilder()
                    .WithProviderName(providerName)
                    .WithCredentialID(credentialID)
                    .WithPin(pin)
                    .WithCSCAuthContext(cscAuthContext)
                    .Build();

                // Create parameters for the job
                PDFElectronicSealParams pdfElectronicSealParams =
                    PDFElectronicSealParams.PDFElectronicSealParamsBuilder(certificateCredentials, fieldOptions)
                        .WithDocumentLevelPermission(documentLevelPermission)
                        .WithAppearanceOptions(appearanceOptions)
                        .Build();

                // Creates a new job instance
                PDFElectronicSealJob pdfElectronicSealJob = new PDFElectronicSealJob(asset, pdfElectronicSealParams);
                pdfElectronicSealJob.SetSealImageAsset(sealImageAsset);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(pdfElectronicSealJob);
                PDFServicesResponse<PDFElectronicSealResult> pdfServicesResponse =
                    pdfServices.GetJobResult<PDFElectronicSealResult>(location, typeof(PDFElectronicSealResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/sealedOutput.pdf";
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
// node src/electronicseal/electronic-seal-with-appearance-options.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    FieldLocation,
    FieldOptions,
    CSCAuthContext,
    CSCCredential,
    PDFElectronicSealParams,
    PDFElectronicSealJob,
    PDFElectronicSealResult,
    AppearanceOptions,
    AppearanceItem,
    SDKError,
    ServiceUsageError,
    ServiceApiError, DocumentLevelPermission
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {

    let sourceFileReadStream;
    let sealImageReadStream;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        sourceFileReadStream = fs.createReadStream("./sampleInvoice.pdf")
        sealImageReadStream = fs.createReadStream("./sampleSealImage.png");
        const [sourceFileAsset, sealImageAsset] = await pdfServices.uploadAssets({
            streamAssets: [{
                readStream: sourceFileReadStream,
                mimeType: MimeType.PDF
            }, {
                readStream: sealImageReadStream,
                mimeType: MimeType.PNG
            }]
        });

        // Set the document level permission to be applied for output document
        const documentLevelPermission = DocumentLevelPermission.FORM_FILLING;

        // Create AppearanceOptions and add the required signature appearance items
        const sealAppearanceOptions = new AppearanceOptions({
            items: [
                AppearanceItem.DATE,
                AppearanceItem.SEAL_IMAGE,
                AppearanceItem.NAME,
                AppearanceItem.LABELS,
                AppearanceItem.DISTINGUISHED_NAME
            ]
        });

        // Set the Seal Field Name to be created in input PDF document
        const sealFieldName = "Signature1";

        // Set the page number in input document for applying seal
        const sealPageNumber = 1;

        // Set if seal should be visible or invisible
        const sealVisible = true;

        // Create FieldLocation instance and set the coordinates for applying signature
        const fieldLocation = new FieldLocation({
            left: 150,
            top: 250,
            right: 350,
            bottom: 200
        });

        // Create FieldOptions instance with required details
        const sealFieldOptions = new FieldOptions({
            visible: sealVisible,
            location: fieldLocation,
            fieldName: sealFieldName,
            pageNumber: sealPageNumber,
        });

        // Set the name of TSP Provider being used
        const providerName = "<PROVIDER_NAME>";

        // Set the access token to be used to access TSP provider hosted APIs
        const accessToken = "<ACCESS_TOKEN>";

        // Set the credential ID
        const credentialId = "<CREDENTIAL_ID>";

        // Set the PIN generated while creating credentials
        const pin = "<PIN>";

        // Create CSCAuthContext instance using access token and token type
        const authorizationContext = new CSCAuthContext({
            accessToken,
            tokenType: "Bearer"
        });

        // Create CertificateCredentials instance with required certificate details
        const certificateCredentials = new CSCCredential({
            providerName,
            credentialId,
            pin,
            authorizationContext,
        });

        // Create parameters for the job
        const params = new PDFElectronicSealParams({
            documentLevelPermission
            certificateCredentials,
            sealFieldOptions,
            sealAppearanceOptions
        });

        // Creates a new job instance
        const job = new PDFElectronicSealJob({
            inputAsset: sourceFileAsset,
            sealImageAsset,
            params,
        });

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: PDFElectronicSealResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates a write stream and copy stream asset's content to it
        const outputFilePath = "./sealedOutput.pdf";
        console.log(`Saving asset at ${outputFilePath}`);

        const writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        sourceFileReadStream?.destroy();
        sealImageReadStream?.destroy();
    }
})();
```

#### Python

```javascript

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class ElectronicSealWithAppearanceOptions:
    def __init__(self):
        try:
            pdf_file = open('./sampleInvoice.pdf', 'rb')
            file_input_stream = pdf_file.read()
            pdf_file.close()

            seal_image_file = open('./sampleSealImage.png', 'rb')
            seal_image_input_stream = seal_image_file.read()
            seal_image_file.close()

            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            # Creates an asset(s) from source file(s) and upload
            asset = pdf_services.upload(input_stream=file_input_stream, mime_type=PDFServicesMediaType.PDF)
            seal_image_asset = pdf_services.upload(input_stream=seal_image_input_stream, mime_type=PDFServicesMediaType.PNG)

            # Create AppearanceOptions and add the required signature display items to it
            appearance_options: AppearanceOptions = AppearanceOptions()
            appearance_options.add_item(AppearanceItem.NAME)
            appearance_options.add_item(AppearanceItem.LABELS)
            appearance_options.add_item(AppearanceItem.DATE)
            appearance_options.add_item(AppearanceItem.SEAL_IMAGE)
            appearance_options.add_item(AppearanceItem.DISTINGUISHED_NAME)

            # Set the document level permission to be applied for output document
            document_level_permission = DocumentLevelPermission.FORM_FILLING

            # Sets the Seal Field Name to be created in input PDF document.
            seal_field_name = "Signature1"

            # Sets the page number in input document for applying seal.
            seal_page_number = 1

            # Sets if seal should be visible or invisible.
            seal_visible = True

            # Creates FieldLocation instance and set the coordinates for applying signature
            field_location = FieldLocation(150, 250, 350, 200)

            # Create FieldOptions instance with required details.
            field_options = FieldOptions(
                field_name=seal_field_name,
                field_location=field_location,
                page_number=seal_page_number,
                visible=seal_visible
            )

            # Sets the name of TSP Provider being used.
            provider_name = "<PROVIDER_NAME>"

            # Sets the access token to be used to access TSP provider hosted APIs.
            access_token = "<ACCESS_TOKEN>"

            # Sets the credential ID.
            credential_id = "<CREDENTIAL_ID>"

            # Sets the PIN generated while creating credentials.
            pin = "<PIN>"

            # Creates CSCAuthContext instance using access token and token type.
            csc_auth_context = CSCAuthContext(
                access_token=access_token,
                token_type="Bearer",
            )

            # Create CertificateCredentials instance with required certificate details.
            certificate_credentials = CSCCredentials(
                provider_name=provider_name,
                credential_id=credential_id,
                pin=pin,
                csc_auth_context=csc_auth_context,
            )

            # Create parameters for the job
            electronic_seal_params = PDFElectronicSealParams(
                seal_certificate_credentials=certificate_credentials,
                seal_appearance_options=appearance_options,
                seal_field_options=field_options,
                document_level_permissions=document_level_permission,
            )

            # Creates a new job instance
            electronic_seal_job = PDFElectronicSealJob(input_asset=asset,
                                                       electronic_seal_params=electronic_seal_params,
                                                       seal_image_asset=seal_image_asset)

            # Submit the job and gets the job result
            location = pdf_services.submit(electronic_seal_job)
            pdf_services_response = pdf_services.get_job_result(location, ESealPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/ElectronicSeal.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    ElectronicSealWithAppearanceOptions()
```

#### REST API

```javascript
curl --location --request POST 'https://pdf-services.adobe.io/operation/electronicseal' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "inputDocumentAssetID": "urn:aaid:AS:UE1:23c30ee0-2c4d-xxxx-xxxx-087832fca718",
    "sealImageAssetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-xxxx-xxxx-087832fca718",
    "sealOptions": {
        "signatureFormat": "PKCS7",
        "documentLevelPermission": "FORM_FILLING",
        "cscCredentialOptions": {
            "credentialId": "<CREDENTIAL_ID>",
            "providerName": "<PROVIDER_NAME>",
            "authorizationContext": {
                "tokenType": "Bearer",
                "accessToken": "<ACCESS_TOKEN>"
            },
            "credentialAuthParameters": {
                "pin": "<PIN>"
            }
        },
        "sealFieldOptions": {
            "location": {
                "left": 150,
                "top": 250,
                "right": 350,
                "bottom": 200
            },
            "fieldName": "Signature1",
            "pageNumber": 1
        },
        "sealAppearanceOptions": {
            "displayOptions": [
                "NAME",
                "DATE",
                "DISTINGUISHED_NAME",
                "LABELS",
                "SEAL_IMAGE"
            ]
        }
    }
}'
```

## Apply Electronic Seal with trusted timestamp on PDF
The sample below performs electronic seal operation with a trusted timestamp on given PDF.

Please refer to the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript
// Get the samples from https://github.com/adobe/pdfservices-java-sdk-samples/tree/beta
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.electronicseal.ElectronicSealWithAppearanceOptions

package com.adobe.pdfservices.operation.samples.electronicseal;

public class ElectronicSealWithTimeStampAuthority {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ElectronicSealWithTimeStampAuthority.class);

    public static void main(String[] args) {
        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/sampleInvoice.pdf").toPath());
             InputStream inputStreamSealImage = Files.newInputStream(new File("src/main/resources/sampleSealImage.png").toPath())) {
        
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
        
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());
            Asset sealImageAsset = pdfServices.upload(inputStreamSealImage, PDFServicesMediaType.PNG.getMediaType());
        
            // Set the document level permission to be applied for output document
            DocumentLevelPermission documentLevelPermission = DocumentLevelPermission.FORM_FILLING;
        
            // Sets the Seal Field Name to be created in input PDF document.
            String sealFieldName = "Signature1";
        
            // Sets the page number in input document for applying seal.
            Integer sealPageNumber = 1;
        
            // Sets if seal should be visible or invisible.
            Boolean sealVisible = true;
        
            //Creates FieldLocation instance and set the coordinates for applying signature
            FieldLocation fieldLocation = new FieldLocation(150, 250, 350, 200);
        
            //Create FieldOptions instance with required details.
            FieldOptions fieldOptions = new FieldOptions.Builder(sealFieldName)
                .setFieldLocation(fieldLocation)
                .setPageNumber(sealPageNumber)
                .setVisible(sealVisible)
                .build();
        
            // Sets the name of TSP Provider being used.
            String providerName = "<PROVIDER_NAME>";
        
            // Sets the access token to be used to access TSP provider hosted APIs.
            String accessToken = "<ACCESS_TOKEN>";
        
            // Sets the credential ID.
            String credentialID = "<CREDENTIAL_ID>";
        
            // Sets the PIN generated while creating credentials.
            String pin = "<PIN>";
        
            //Creates CSCAuthContext instance using access token and token type.
            CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");
        
            //Create CertificateCredentials instance with required certificate details.
            CertificateCredentials certificateCredentials = CertificateCredentials.cscCredentialBuilder()
                .withProviderName(providerName)
                .withCredentialID(credentialID)
                .withPin(pin)
                .withCSCAuthContext(cscAuthContext)
                .build();
        
            //Create TSABasicAuthCredentials using username and password
            TSABasicAuthCredentials tsaBasicAuthCredentials = new TSABasicAuthCredentials("<USERNAME>", "<PASSWORD>");
        
            // Set the Time Stamp Authority Options using url and TSA Auth credentials
            TSAOptions tsaOptions = new RFC3161TSAOptions("<TIMESTAMP_URL>", tsaBasicAuthCredentials);
        
            // Create parameters for the job
            PDFElectronicSealParams pdfElectronicSealParams = PDFElectronicSealParams.pdfElectronicSealParamsBuilder(certificateCredentials, fieldOptions)
                .withDocumentLevelPermission(documentLevelPermission)
                .withTSAOptions(tsaOptions)
                .build();
        
            // Creates a new job instance
            PDFElectronicSealJob pdfElectronicSealJob = new PDFElectronicSealJob(asset, pdfElectronicSealParams);
        
            // Sets the optional input seal image for PDFElectronicSealOperation instance
            pdfElectronicSealJob.setSealImageAsset(sealImageAsset);
        
            // Submit the job and gets the job result
            String location = pdfServices.submit(pdfElectronicSealJob);
            PDFServicesResponse<PDFElectronicSealResult> pdfServicesResponse = pdfServices.getJobResult(location, PDFElectronicSealResult.class);
        
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
        
            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/sealedOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/sealedOutput.pdf");
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
// cd ElectronicSealWithTimeStampAuthority/
// dotnet run ElectronicSealWithTimeStampAuthority.csproj

namespace ElectronicSealWithTimeStampAuthority
{
        class Program
    {
        // Initialize the logger.
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
                using Stream inputStream = File.OpenRead(@"SampleInvoice.pdf");
                using Stream inputStreamSealImage = File.OpenRead(@"sampleSealImage.png");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());
                IAsset sealImageAsset =
                    pdfServices.Upload(inputStreamSealImage, PDFServicesMediaType.PNG.GetMIMETypeValue());

                // Set the document level permission to be applied for output document
                DocumentLevelPermission documentLevelPermission = DocumentLevelPermission.FORM_FILLING;

                // Sets the Seal Field Name to be created in input PDF document.
                String sealFieldName = "Signature1";

                // Sets the page number in input document for applying seal.
                int sealPageNumber = 1;

                // Sets if seal should be visible or invisible.
                bool sealVisible = true;

                // Creates FieldLocation instance and set the coordinates for applying signature
                FieldLocation fieldLocation = new FieldLocation(150, 250, 350, 200);

                // Create FieldOptions instance with required details.
                FieldOptions fieldOptions = new FieldOptions.Builder(sealFieldName)
                    .SetVisible(sealVisible)
                    .SetFieldLocation(fieldLocation)
                    .SetPageNumber(sealPageNumber)
                    .Build();

                // Sets the name of TSP Provider being used.
                String providerName = "<PROVIDER_NAME>";

                // Sets the access token to be used to access TSP provider hosted APIs.
                String accessToken = "<ACCESS_TOKEN>";

                // Sets the credential ID.
                String credentialID = "<CREDENTIAL_ID>";

                // Sets the PIN generated while creating credentials.
                String pin = "<PIN>";

                // Creates CSCAuthContext instance using access token and token type.
                CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");

                // Create CertificateCredentials instance with required certificate details.
                CertificateCredentials certificateCredentials = CertificateCredentials.CSCCredentialBuilder()
                    .WithProviderName(providerName)
                    .WithCredentialID(credentialID)
                    .WithPin(pin)
                    .WithCSCAuthContext(cscAuthContext)
                    .Build();

                //Create TSABasicAuthCredentials using username and password
                TSABasicAuthCredentials tsaBasicAuthCredentials =
                    new TSABasicAuthCredentials("<USERNAME>", "<PASSWORD>");

                // Set the Time Stamp Authority Options using url and TSA Auth credentials
                TSAOptions tsaOptions = new RFC3161TSAOptions("<TIMESTAMP_URL>", tsaBasicAuthCredentials);

                // Create parameters for the job
                PDFElectronicSealParams pdfElectronicSealParams =
                    PDFElectronicSealParams.PDFElectronicSealParamsBuilder(certificateCredentials, fieldOptions)
                        .WithDocumentLevelPermission(documentLevelPermission)
                        .WithTSAOptions(tsaOptions)
                        .Build();

                // Creates a new job instance
                PDFElectronicSealJob pdfElectronicSealJob = new PDFElectronicSealJob(asset, pdfElectronicSealParams);
                pdfElectronicSealJob.SetSealImageAsset(sealImageAsset);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(pdfElectronicSealJob);
                PDFServicesResponse<PDFElectronicSealResult> pdfServicesResponse =
                    pdfServices.GetJobResult<PDFElectronicSealResult>(location, typeof(PDFElectronicSealResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/sealedOutput.pdf";
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
// node src/electronicseal/electronic-seal-with-stamp-authority.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    FieldLocation,
    FieldOptions,
    CSCAuthContext,
    CSCCredential,
    PDFElectronicSealParams,
    PDFElectronicSealJob,
    PDFElectronicSealResult,
    DocumentLevelPermission,
    TSABasicAuthCredentials,
    RFC3161TSAOptions,
    SDKError,
    ServiceUsageError,
    ServiceApiError,
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {

    let sourceFileReadStream;
    let sealImageReadStream;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        sourceFileReadStream = fs.createReadStream("./sampleInvoice.pdf")
        sealImageReadStream = fs.createReadStream("./sampleSealImage.png");
        const [sourceFileAsset, sealImageAsset] = await pdfServices.uploadAssets({
            streamAssets: [{
                readStream: sourceFileReadStream,
                mimeType: MimeType.PDF
            }, {
                readStream: sealImageReadStream,
                mimeType: MimeType.PNG
            }]
        });

        // Set the document level permission to be applied for output document
        const documentLevelPermission = DocumentLevelPermission.FORM_FILLING;

        // Set the Seal Field Name to be created in input PDF document
        const sealFieldName = "Signature1";

        // Set the page number in input document for applying seal
        const sealPageNumber = 1;

        // Set if seal should be visible or invisible
        const sealVisible = true;

        // Create FieldLocation instance and set the coordinates for applying signature
        const fieldLocation = new FieldLocation({
            left: 150,
            top: 250,
            right: 350,
            bottom: 200
        });

        // Create FieldOptions instance with required details
        const sealFieldOptions = new FieldOptions({
            visible: sealVisible,
            location: fieldLocation,
            fieldName: sealFieldName,
            pageNumber: sealPageNumber,
        });

        // Set the name of TSP Provider being used
        const providerName = "<PROVIDER_NAME>";

        // Set the access token to be used to access TSP provider hosted APIs
        const accessToken = "<ACCESS_TOKEN>";

        // Set the credential ID
        const credentialId = "<CREDENTIAL_ID>";

        // Set the PIN generated while creating credentials
        const pin = "<PIN>";

        // Create CSCAuthContext instance using access token and token type
        const authorizationContext = new CSCAuthContext({
            accessToken,
            tokenType: "Bearer"
        });

        // Create CertificateCredentials instance with required certificate details
        const certificateCredentials = new CSCCredential({
            providerName,
            credentialId,
            pin,
            authorizationContext,
        });

        // Create TSABasicAuthCredentials using username and password
        const tsaBasicAuthCredentials = new TSABasicAuthCredentials({
            username: "<USERNAME>",
            password: "<PASSWORD>"
        });

        // Set the Time Stamp Authority Options using url and TSA Auth credentials
        const tsaOptions = new RFC3161TSAOptions({
            url: "<TIMESTAMP_URL>",
            credentialAuthParameters: tsaBasicAuthCredentials
        });

        // Create parameters for the job
        const params = new PDFElectronicSealParams({
            documentLevelPermission,
            certificateCredentials,
            sealFieldOptions,
            tsaOptions
        });

        // Creates a new job instance
        const job = new PDFElectronicSealJob({
            inputAsset: sourceFileAsset,
            sealImageAsset,
            params,
        });

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: PDFElectronicSealResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates a write stream and copy stream asset's content to it
        const outputFilePath = "./sealedOutput.pdf";
        console.log(`Saving asset at ${outputFilePath}`);

        const writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        sourceFileReadStream?.destroy();
        sealImageReadStream?.destroy();
    }
})();
```
#### Python

```javascript
# Initialize the logger
logging.basicConfig(level=logging.INFO)

class ElectronicSealWithTimestampAuthority:
    def __init__(self):
        try:
            pdf_file = open('./sampleInvoice.pdf', 'rb')
            file_input_stream = pdf_file.read()
            pdf_file.close()

            seal_image_file = open('./sampleSealImage.png', 'rb')
            seal_image_input_stream = seal_image_file.read()
            seal_image_file.close()

            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            # Creates an asset(s) from source file(s) and upload
            asset = pdf_services.upload(input_stream=file_input_stream, mime_type=PDFServicesMediaType.PDF)
            seal_image_asset = pdf_services.upload(input_stream=seal_image_input_stream, mime_type=PDFServicesMediaType.PNG)

            # Set the document level permission to be applied for output document
            document_level_permission = DocumentLevelPermission.FORM_FILLING

            # Sets the Seal Field Name to be created in input PDF document.
            seal_field_name = "Signature1"

            # Sets the page number in input document for applying seal.
            seal_page_number = 1

            # Sets if seal should be visible or invisible.
            seal_visible = True

            # Creates FieldLocation instance and set the coordinates for applying signature
            field_location = FieldLocation(150, 250, 350, 200)

            # Create FieldOptions instance with required details.
            field_options = FieldOptions(
                field_name=seal_field_name,
                field_location=field_location,
                page_number=seal_page_number,
                visible=seal_visible
            )

            # Sets the name of TSP Provider being used.
            provider_name = "<PROVIDER_NAME>"

            # Sets the access token to be used to access TSP provider hosted APIs.
            access_token = "<ACCESS_TOKEN>"

            # Sets the credential ID.
            credential_id = "<CREDENTIAL_ID>"

            # Sets the PIN generated while creating credentials.
            pin = "<PIN>"

            # Creates CSCAuthContext instance using access token and token type.
            csc_auth_context = CSCAuthContext(
                access_token=access_token,
                token_type="Bearer",
            )

            # Create CertificateCredentials instance with required certificate details.
            certificate_credentials = CSCCredentials(
                provider_name=provider_name,
                credential_id=credential_id,
                pin=pin,
                csc_auth_context=csc_auth_context,
            )

            # Create TSABasicAuthCredentials using username and password
            tsa_basic_auth_credentials: TSABasicAuthCredentials = TSABasicAuthCredentials(
                username="<USERNAME>",
                password="<PASSWORD>",
            )

            # Set the Time Stamp Authority Options using url and TSA Auth credentials
            tsa_options: RFC3161TSAOptions = RFC3161TSAOptions(
                url="<TIMESTAMP_URL>",
                tsa_basic_auth_credentials=tsa_basic_auth_credentials,
            )

            # Create parameters for the job
            electronic_seal_params = PDFElectronicSealParams(
                seal_certificate_credentials=certificate_credentials,
                seal_field_options=field_options,
                tsa_options=tsa_options,
                document_level_permissions=document_level_permission,
            )

            # Creates a new job instance
            electronic_seal_job = PDFElectronicSealJob(input_asset=asset,
                                                       electronic_seal_params=electronic_seal_params,
                                                       seal_image_asset=seal_image_asset)

            # Submit the job and gets the job result
            location = pdf_services.submit(electronic_seal_job)
            pdf_services_response = pdf_services.get_job_result(location, ESealPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/ElectronicSeal.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    ElectronicSealWithTimestampAuthority()
```

#### REST API

```javascript
curl --location --request POST 'https://pdf-services.adobe.io/operation/electronicseal' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "inputDocumentAssetID": "urn:aaid:AS:UE1:23c30ee0-2c4d-xxxx-xxxx-087832fca718",
    "sealImageAssetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-xxxx-xxxx-087832fca718",
    "sealOptions": {
        "signatureFormat": "PKCS7",
        "documentLevelPermission": "FORM_FILLING",
        "cscCredentialOptions": {
            "credentialId": "<CREDENTIAL_ID>",
            "providerName": "<PROVIDER_NAME>",
            "authorizationContext": {
                "tokenType": "Bearer",
                "accessToken": "<ACCESS_TOKEN>"
            },
            "credentialAuthParameters": {
                "pin": "<PIN>"
            }
        },
        "tsaOptions": {
            "url" : "<TIMESTAMP_URL>",
            "credentialAuthParameters": {
                "username" : "<USERNAME>",
                "password" : "<PASSWORD>"
        },
        "sealFieldOptions": {
            "location": {
                "left": 150,
                "top": 250,
                "right": 350,
                "bottom": 200
            },
            "fieldName": "Signature1",
            "pageNumber": 1
        },
        "sealAppearanceOptions": {
            "displayOptions": [
                "NAME",
                "DATE",
                "DISTINGUISHED_NAME",
                "LABELS",
                "SEAL_IMAGE"
            ]
        }
    }
}'
```
