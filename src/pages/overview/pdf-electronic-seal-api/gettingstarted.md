---
title: Getting Started | PDF Electronic Seal API | Adobe PDF Services
---
# Getting Started

## PDF Electronic Seal API Prerequisites

### Step 1: Procure Digital Certificate Credentials

1. A client must register with a Trust Service Provider (TSP or TSPs) and obtain the digital certificate. A certificate may be purchased from any of the [supported TSPs](../#supported-trust-service-providers) which are Cloud Signature Consortium (CSC) compliant. For more details, see [CSC](https://cloudsignatureconsortium.org/wp-content/uploads/2020/01/CSC_API_V1_1.0.4.0.pdf) standard.
2. TSP performs remote identity verification of the client who acts as the legal owner of the digital certificate.
3. After identity verification, the TSP issues a digital certificate to the client with a `credential_id`, `client_id` and `client_secret`. These are typically protected by a static PIN. The client should securely store the credential details and PIN for later use.

![TSP Token Generation](../images/cert.png)

### Step 2: Get API Credentials

In order to invoke the PDF Electronic Seal API, Adobe client credentials are required. To get one, [click here](https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api) and complete the workflow. The client should securely store the credential details for later use.

### Step 3: Obtain your OAuth Token

The client sends the `client_id` and `client_secret` to the TSP's OAuth 2.0 authorization API. The TSP responds with an access token which is passed as one of the [input parameters](#api-parameters) to the PDF Electronic Seal API. The purpose of this token is to access the TSP's end points for the sealing process. It is valid during a timeframe specified by the TSP.

![TSP Token Generation](../images/TSPToken.png)

**Sample OAuth Request**

```javascript
curl --location --request POST 'https://<base-url>/<API-domain-name>/csc/v0/oauth2/token'
--header 'cache-control: no-cache'
--header 'content-type: application/json'
--data-raw '{
   "lang": "en-US",
   "client_id": "<YOUR_CLIENT_ID>",
   "client_secret": "<YOUR_CLIENT_SECRET>",
   "grant_type": "client_credentials"
}'
```

**Sample Response**

```json
{
   "access_token": "xxxx-xxx-xxx-xxxx-xxxxxxxx",
   "token_type": "Bearer",
   "expires_in": <TIME_IN_SECONDS>
}
```

Once the customer has all the necessary prerequisites in place, they have to call the PDF Electronic Seal API with the appropriate parameters to get the electronically sealed PDF.

![Seal Workflow](../images/sealFlow.png)

## API Parameters

### Signature Format (_signatureFormat_)

Specifies a supported digital signature format:

* PADES : This is the latest and improved signature format which is more strict, concrete, and secure. For details, see [ISO 32000-2](./PDF_ISO_32000-2.pdf) and [ETSI EN 319 142-1](./ETSI_EN_319_142-1.pdf)
* PKCS7 : This signature format is less stringent than PADES since it permits more PDF changes without invalidating the digital signature. This is the default signature format. For details, see [ISO 32000-1](./PDF_ISO_32000-1.pdf).

### TSP Credential Information (_cscCredentialOptions_) : **Required**

TSP parameters encapsulate the sealer's [certificate credential](#step-1-procure-digital-certificate-credentials) as well as the associated authentication and authorization data.

* **TSP Name**  (*providerName*) : **Required** : Specifies the name of the Trust Service Provider used to generate the certificate. Presently, only TSPs supporting the OAuth 2.0 client credential authorization flow are supported. The table below provides the provider name mapping for each supported Trust Service Provider.
  ![TSP Name Mapping](../images/provider_mapping_ss.png)

* **TSP Credential Id**  (*credentialId*) : **Required** : Specifies the Digital ID stored with the TSP that should be used for sealing.
* **TSP Authorization Context**  (*authorizationContext*) : **Required** : Encapsulates the authorization data required to communicate with the TSPs.

    * **Access Token**  (*accessToken*) : **Required** : Specifies the access token used to authorize access to the CSC provider hosted APIs.
    * **Token Type** (_tokenType_): Specifies the type of access token. Default value is "Bearer".

* **TSP Credential Authorization Parameter**  (*credentialAuthParameters*) : **Required** : Encapsulates the credential authorization information required to authorize access to their digital certificate.

    * **PIN**  (*pin*) : **Required** : Specifies the PIN associated with TSP provided credential ID.

### Seal Field Parameters   (*sealFieldOptions*) : **Required**

The seal field parameters are required to create a new signature field or use an existing signature field.

* **Field Name**  (*fieldName*) : **Required** : Specifies the signature field's name. This must be a non-empty string. If signature field with this field name already exists, that field is used. else a signature field with this name will be created.
* **Visible** (_visible_): Specifies whether the signature field should be visible or hidden. The default value of `true` creates a visible seal.
* **Page Number** (_pageNumber_) : **Required** : Specifies the page number to which the signature field should be attached. Page numbers are 1-based. It is only <b>required</b> if the signature field does not exist in the pdf document. If this is provided along with the signature field then the page number should be same on which signature field is present in the document, else an error is thrown.
* **Location** (_location_) : **Required** : Specifies the coordinates of the seal appearance's bounding box in default PDF user space units. The location is only <b>required</b> if the signature field does not exist in the pdf document. If this is provided along with the existing signature field, then it is ignored.

    * **Left** (_left_) : **Required** : The left x-coordinate
    * **Bottom** (_bottom_) : **Required** : The bottom y-coordinate
    * **Right** (_right_) : **Required** : The right x-coordinate
    * **Top** (_top_) : **Required** : The top y-coordinate

To add the signature field explicitly, see [how to place a signature field in a PDF](https://www.adobe.com/sign/hub/how-to/add-a-signature-block-to-pdf).

### Seal Appearance Parameters (_sealAppearanceOptions_)

Specifies seal field appearance parameters. These are an enumerated set of display items: NAME, DATE, DISTINGUISHED_NAME, LABELS and SEAL_IMAGE.
* **Display Options**  (*displayOptions*): Specifies the information to display in the seal. NAME and LABELS are the default values.

    * **NAME**: Specifies that the certificate owner's name should be displayed.
  ![Display Options](../images/name_ss.png)
    * **DATE**: Specifies that the sealing date/time should be displayed. This value should not be mistaken for a signed timestamp from a timestamp authority.
  ![Display Options](../images/date_ss.png)
    * **DISTINGUISHED_NAME**: Specifies that the distinguished name information from the digital certificate should be displayed.
  ![Display Options](../images/dn_ss.png)
    * **LABELS**: Specifies that text labels should be displayed.
  ![Display Options](../images/labels_ss.png)
    * **SEAL_IMAGE**: Specifies the seal image should be displayed.
  ![Display Options](../images/seal2_ss.png)
  If SEAL_IMAGE is given in appearance parameters and seal image is not passed in the request, the default Acrobat trefoil image is used.
  ![Display Options](../images/trefoil_ss.png)

**Example JSON**

```json
{
  "signatureFormat": "PADES",
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
  "sealFieldOptions": {
    "pageNumber": 1,
    "fieldName": "Signature1",
    "visible": true,
    "location": {
      "top": 300,
      "bottom": 250,
      "left": 300,
      "right": 500
    }
  },
  "sealAppearanceOptions": {
    "displayOptions": [
      "DATE",
      "DISTINGUISHED_NAME",
      "SEAL_IMAGE"
    ]
  }
}
```


## Workflows

The PDF Electronic Seal API can be integrated in two ways, either via our REST API or our PDF Services SDKs.

### REST API

To use the REST API, below are the detailed steps:

1. [Generate asset IDs for all the input documents](../../../apis/#tag/Assets).
1. Call the `/asset` API with `mediaType` in the request specifying the document upload type. For example, `application/pdf`. The API responds with an asset ID and upload URI.
1. Request to upload the input document to the upload URI.
1. Invoke PDF Electronic Seal API (/pdf-services/operation/electronicseal) by providing the asset IDs generated in step 1 and other required sealing parameters. In the response, the client receives the job URI in the location header. [Details](../../../apis/#operation/pdfoperations.electronicseal).
1. Use the job URI to poll the status of the submitted job (Electronic Seal operation). The response includes a job status: *In progress*, *Failed* or *Done*. If the status is done, the seal API returns an asset ID and download URI. **This download URI is valid for 24 hours.**
1. Download the electronically sealed PDF using download URI from above step.


### PDF Services SDKs

Clients can also access the PDF Electronic Seal API via PDF Services SDKs. For additional details, see [Quickstarts](./quickstarts/).

To use the PDF Services SDKs, below are the detailed steps:

1. Save the input PDF and seal image on the local machine. File paths must be absolute.
1. Save the `pdfservices-api-credentials.json` file created after [generating credentials](./quickstarts/java/#step-one-getting-credentials)
1. Make a call to the PDF Electronic Seal operation that includes the following:
    * The file path to an input PDF (from the local machine).
    * [API parameters](#api-parameters)
    * Specify an optional file path to a logo/watermark/background image used as part of the seal's appearance. Supported formats include:
        * image/jpeg
        * image/png
        * application/pdf
1. The electronically sealed PDF file obtained will be saved to the specified output file path.

Use the samples below to generate a PDF with an electronic seal.

Please refer the [API usage guide](../pdf-services-api/howtos/api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, Rest API" />

##### Java

```javascript
// Get the samples from https://github.com/adobe/pdfservices-java-sdk-samples/tree/beta
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.electronicseal.ElectronicSeal

package com.adobe.pdfservices.operation.samples.electronicseal;

public class ElectronicSeal {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ElectronicSeal.class);

    public static void main(String[] args) {
        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                .withClientId("PDF_SERVICES_CLIENT_ID")
                .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                .build();

            // Create an ExecutionContext using credentials.
            ExecutionContext executionContext = ExecutionContext.create(credentials);
        
            //Get the input document to perform the sealing operation
            FileRef sourceFile = FileRef.createFromLocalFile("src/main/resources/sampleInvoice.pdf");
        
            //Get the background seal image for signature , if required.
            FileRef sealImageFile = FileRef.createFromLocalFile("src/main/resources/sampleSealImage.png");
        
            //Create AppearanceOptions and add the required signature display items to it
            AppearanceOptions appearanceOptions = new AppearanceOptions();
            appearanceOptions.addItem(AppearanceItem.NAME);
            appearanceOptions.addItem(AppearanceItem.LABELS);
            appearanceOptions.addItem(AppearanceItem.DATE);
            appearanceOptions.addItem(AppearanceItem.SEAL_IMAGE);
            appearanceOptions.addItem(AppearanceItem.DISTINGUISHED_NAME);
        
            //Set the Seal Field Name to be created in input PDF document.
            String sealFieldName = "Signature1";
        
            //Set the page number in input document for applying seal.
            Integer sealPageNumber = 1;
        
            //Set if seal should be visible or invisible.
            Boolean sealVisible = true;
        
            //Create FieldLocation instance and set the coordinates for applying signature
            FieldLocation fieldLocation = new FieldLocation(150, 250, 350, 200);
        
            //Create FieldOptions instance with required details.
            FieldOptions fieldOptions = new FieldOptions.Builder(sealFieldName)
                .setFieldLocation(fieldLocation)
                .setPageNumber(sealPageNumber)
                .setVisible(sealVisible)
                .build();
        
            //Set the name of TSP Provider being used.
            String providerName = "<PROVIDER_NAME>";
        
            //Set the access token to be used to access TSP provider hosted APIs.
            String accessToken = "<ACCESS_TOKEN>";
        
            //Set the credential ID.
            String credentialID = "<CREDENTIAL_ID>";
        
            //Set the PIN generated while creating credentials.
            String pin = "<PIN>";
        
            //Create CSCAuthContext instance using access token and token type.
            CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");
        
            //Create CertificateCredentials instance with required certificate details.
            CertificateCredentials certificateCredentials = CertificateCredentials.cscCredentialBuilder()
                .withProviderName(providerName)
                .withCredentialID(credentialID)
                .withPin(pin)
                .withCSCAuthContext(cscAuthContext)
                .build();
        
            //Create SealOptions instance with all the sealing parameters.
            SealOptions sealOptions = new SealOptions.Builder(certificateCredentials, fieldOptions)
                .withAppearanceOptions(appearanceOptions).build();
        
            //Create the PDFElectronicSealOperation instance using the SealOptions instance
            PDFElectronicSealOperation pdfElectronicSealOperation = PDFElectronicSealOperation.createNew(sealOptions);
        
            //Set the input source file for PDFElectronicSealOperation instance
            pdfElectronicSealOperation.setInput(sourceFile);
        
            //Set the optional input seal image for PDFElectronicSealOperation instance
            pdfElectronicSealOperation.setSealImage(sealImageFile);
        
            //Execute the operation
            FileRef result = pdfElectronicSealOperation.execute(executionContext);
    
            //Save the output at specified location
            result.saveAs("output/sealedOutput.pdf");


        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
            LOGGER.error("Exception encountered while executing operation", ex);
        }
    }
}

```

##### .NET

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
                // Initial setup, create credentials instance.
                Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                    .WithClientId("PDF_SERVICES_CLIENT_ID")
                    .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .Build();


                // Create an ExecutionContext using credentials.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);

                //Set the input document to perform the sealing operation
                FileRef sourceFile = FileRef.CreateFromLocalFile(@"SampleInvoice.pdf");

                //Set the background seal image for signature , if required.
                FileRef sealImageFile = FileRef.CreateFromLocalFile(@"sampleSealImage.png");

                //Create AppearanceOptions and add the required signature appearance items
                AppearanceOptions appearanceOptions = new AppearanceOptions();
                appearanceOptions.AddItem(AppearanceItem.NAME);
                appearanceOptions.AddItem(AppearanceItem.LABELS);
                appearanceOptions.AddItem(AppearanceItem.DATE);
                appearanceOptions.AddItem(AppearanceItem.SEAL_IMAGE);
                appearanceOptions.AddItem(AppearanceItem.DISTINGUISHED_NAME);

                //Set the Seal Field Name to be created in input PDF document.
                string sealFieldName = "Signature1";

                //Set the page number in input document for applying seal.
                int sealPageNumber = 1;

                //Set if seal should be visible or invisible.
                bool sealVisible = true;

                //Create FieldLocation instance and set the coordinates for applying signature
                FieldLocation fieldLocation = new FieldLocation(150, 250, 350, 200);
                
                //Create FieldOptions instance with required details.
                FieldOptions fieldOptions = new FieldOptions.Builder(sealFieldName)
                    .SetVisible(sealVisible)
                    .SetFieldLocation(fieldLocation)
                    .SetPageNumber(sealPageNumber)
                    .Build();

                //Set the name of TSP Provider being used.
                string providerName = "<PROVIDER_NAME>";

                //Set the access token to be used to access TSP provider hosted APIs.
                string accessToken = "<ACCESS_TOKEN>";

                //Set the credential ID.
                string credentialID = "<CREDENTIAL_ID>";

                //Set the PIN generated while creating credentials.
                string pin = "<PIN>";

                CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");

                //Create CertificateCredentials instance with required certificate details.
                CertificateCredentials certificateCredentials = CertificateCredentials.CSCCredentialBuilder()
                    .WithProviderName(providerName)
                    .WithCredentialID(credentialID)
                    .WithPin(pin)
                    .WithCSCAuthContext(cscAuthContext)
                    .Build();
                
                
                //Create SealingOptions instance with all the sealing parameters.
                SealOptions sealOptions = new SealOptions.Builder(certificateCredentials, fieldOptions)
                    .WithAppearanceOptions(appearanceOptions).Build();

                //Create the PDFElectronicSealOperation instance using the SealOptions instance
                PDFElectronicSealOperation pdfElectronicSealOperation = PDFElectronicSealOperation.CreateNew(sealOptions);

                //Set the input source file for PDFElectronicSealOperation instance
                pdfElectronicSealOperation.SetInput(sourceFile);

                //Set the optional input seal image for PDFElectronicSealOperation instance
                pdfElectronicSealOperation.SetSealImage(sealImageFile);

                //Execute the operation
                FileRef result = pdfElectronicSealOperation.Execute(executionContext);

                // Save the output at specified location.
                result.SaveAs(output/sealedOutput.pdf);
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

##### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/electronicseal/electronic-seal.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

try {
        // Initial setup, create credentials instance.
        const credentials =  PDFServicesSdk.Credentials
            .servicePrincipalCredentialsBuilder()
            .withClientId("PDF_SERVICES_CLIENT_ID")
            .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
            .build();
    
        // Create an ExecutionContext using credentials
        const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
    
        const pdfElectronicSeal = PDFServicesSdk.PDFElectronicSeal,
            options = pdfElectronicSeal.options;
    
        //Get the input document to perform the sealing operation
        const sourceFile = PDFServicesSdk.FileRef.createFromLocalFile('resources/sampleInvoice.pdf'),
    
            //Get the background seal image for signature , if required.
            sealImageFile = PDFServicesSdk.FileRef.createFromLocalFile('resources/sampleSealImage.png');
    
        //Create AppearanceOptions and add the required signature appearance items
        appearanceOptions = new options.AppearanceOptions();
        appearanceOptions.addItem(options.AppearanceOptions.AppearanceItem.DATE);
        appearanceOptions.addItem(options.AppearanceOptions.AppearanceItem.SEAL_IMAGE);
        appearanceOptions.addItem(options.AppearanceOptions.AppearanceItem.NAME);
        appearanceOptions.addItem(options.AppearanceOptions.AppearanceItem.LABELS);
        appearanceOptions.addItem(options.AppearanceOptions.AppearanceItem.DISTINGUISHED_NAME);
    
        // Set the Seal Field Name to be created in input PDF document.
        sealFieldName = "Signature1";
    
        // Set the page number in input document for applying seal.
        sealPageNumber = 1;
    
        // Set if seal should be visible or invisible.
        sealVisible = true;
    
        //Create FieldLocation instance and set the coordinates for applying signature
        fieldLocation = new options.FieldLocation(150,250,350,200);
    
        //Create FieldOptions instance with required details.
        fieldOptions = new options.FieldOptions.Builder(sealFieldName)
            .setFieldLocation(fieldLocation)
            .setPageNumber(sealPageNumber)
            .setVisible(sealVisible)
            .build();
    
        //Set the name of TSP Provider being used.
        providerName = "<PROVIDER_NAME>";
    
        //Set the access token to be used to access TSP provider hosted APIs.
        accessToken = "<ACCESS_TOKEN>";
    
        //Set the credential ID.
        credentialID = "<CREDENTIAL_ID>";
    
        //Set the PIN generated while creating credentials.
        pin = "<PIN>";
    
        //Create CSCAuthContext instance using access token and token type.
        cscAuthContext = new options.CSCAuthContext(accessToken, "Bearer");
    
        //Create CertificateCredentials instance with required certificate details.
        certificateCredentials = options.CertificateCredentials.cscCredentialBuilder()
            .withProviderName(providerName)
            .withCredentialID(credentialID)
            .withPin(pin)
            .withCSCAuthContext(cscAuthContext)
            .build();
    
        //Create SealOptions instance with sealing parameters.
        sealOptions = new options.SealOptions.Builder(certificateCredentials, fieldOptions)
            .withAppearanceOptions(appearanceOptions)
            .build()
    
        //Create the PDFElectronicSealOperation instance using the SealOptions instance
        const pdfElectronicSealOperation = pdfElectronicSeal.Operation.createNew(sealOptions);
    
        //Set the input source file for PDFElectronicSealOperation instance
        pdfElectronicSealOperation.setInput(sourceFile);
    
        //Set the optional input seal image for PDFElectronicSealOperation instance
        pdfElectronicSealOperation.setSealImage(sealImageFile);

        // Execute the operation and Save the result to the specified location.
        pdfElectronicSealOperation.execute(executionContext)
            .then(result => result.saveAsFile("output/sealedOutput.pdf"))
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
##### REST API

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
                "top": 300,
                "left": 50,
                "right": 250,
                "bottom": 100
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
