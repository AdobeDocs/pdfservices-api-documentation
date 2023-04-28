---
title: Getting Started | PDF Electronic Seal API | Adobe PDF Services
---
# Getting Started

## PDF Electronic Seal API Prerequisites

### Step 1: Procure Digital Certificate Credentials

1. A client must register with a Trust Service Provider and obtain the digital certificate which will be associated as identity in the electronically sealed documents. A certificate may be purchased from any of the [supported Trust Service Providers](#supported-trust-service-providers). Note that supported TSPs are Cloud Signature Consortium compliant. For more detail, see [Cloud Signature Consortium Standard](https://cloudsignatureconsortium.org/wp-content/uploads/2020/01/CSC_API_V1_1.0.4.0.pdf).
2. TSP performs remote identity verification of the client representative who acts as the legal owner of the digital certificate.
3. After identity verification, a client creates an account in the TSP's portal. The TSP issues a certificate to the client and delivers a `credential_id`, `client_id` and `client_secret`. These are typically protected by a static PIN. The client should securely store the credential details and PIN for later use.

![TSP Token Generation](../images/cert.png)

### Step 2: Get API Credentials

In order to invoke the PDF Electronic Seal API, Adobe-provided credentials are required. To get one, [click here](https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api) and complete the workflow. Make sure to save the credential values to a secure location.

### Step 3: Obtain your OAuth Token

The client sends the `client_id` and `client_secret` to the TSP's OAuth 2.0 authorization API. The TSP responds with an access token which is passed as one of the [input parameters](#parameters) to the PDF Electronic Seal API. The purpose of this token is to access the TSP's end points for further sealing process. It is valid for a timeframe specified by the TSP.

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

## Parameters

### Signature Format (*Required*)

Specifies a supported digital signature format used to apply electronic seal:

* PADES : This is the latest and improved signature format which is more strict, concrete, and secure. For details, see [ETSI TS 102 778-3](https://www.etsi.org/deliver/etsi_ts/102700_102799/10277803/01.02.01_60/ts_10277803v010201p.pdf)
* PKCS7 : This signature format is less stringent than PADES since it permits more PDF changes without invalidating the digital signature. For details, see [ISO 32000-1](https://opensource.adobe.com/dc-acrobat-sdk-docs/standards/pdfstandards/pdf/PDF32000_2008.pdf)

### TSP Credential Information (*Required*)

TSP parameters encapsulate the signer's [certificate credential](#step-1-procure-certificate-credentials) as well as the associated authentication and authorization data.

* **TSP Name**  (*Required*): Specifies the name of the Trust Service Provider used to generate the certificate.
* **TSP Credential Id**  (*Required*): Specifies the Digital ID stored with the TSP that should be used for sealing.
* **TSP Authorization Context**  (*Required*): Encapsulates the authorization data required to communicate with the TSPs.

    * **Access Token**  (*Required*): Specifies the access token used to authorize access to the CSC provider hosted APIs.
    * **Token Type**: Specifies the type of access token. If not given, default value "Bearer" will be used.

* **TSP Credential Authorization Parameter**  (*Required*): Encapsulates the credential authorization information required to authorize access to their digital certificate.

    * **PIN**  (*Required*): Specifies the PIN associated with credential ID.

### Seal Field Parameters   (*Required*)

The seal field parameters are required to give information about signature field in PDF which will be used for visualization of eSeal. Customers can either create a new signature field or sign an existing field.

* **Field Name**  (*Required*): The signature field name. This must be a non-empty string. If signature field with this field name already exist, that field will be used.
  If it does not exist, a signature field with this name will be created.
* **Visibility**: Specifies whether the signature field is visible or invisible. The default value of `true` creates a visible signature.
* **Page Number**: Specifies the page number to which the signature field should be attached. Page numbers are 1-based. The page number is only **required** if the signature field does not already exist in the pdf document. If this is specified along with the signature field name then it overrides the page on which signature field is present in the document.
* **Location**: Specifies the coordinates of the signature appearance's bounding box in default PDF user space units. The location is only **required** if the signature field does not already exist in the pdf document. If this is specified along with the signature field then it overrides the existing signature bounding box.

    * **Left**: The left x-coordinate
    * **Bottom**: The bottom y-coordinate
    * **Right**: The right x-coordinate
    * **Top**: The top y-coordinate

The **Location** and **Page Number** fields are **optional** if the signature field is already added in the input PDF document. To add the signature field explicitly, see [how to place a signature field in a PDF](https://www.adobe.com/sign/hub/how-to/add-a-signature-block-to-pdf).

### Seal Appearance Parameters

Specifies signature field appearance parameters. These are an enum set of display items: NAME, DATE, DISTINGUISHED_NAME, LABELS and SEAL_IMAGE. Specifies the information to display in the signature. NAME and LABELS are the default values.

* **NAME**: Specifies that the certificate holder's name should be displayed in the seal appearance.
  ![Display Options](../images/sealName.png)
* **DATE**: Specifies that the date/time of sealing should be displayed in the seal appearance. This option only controls whether the value of the
  time/date in the signature dictionary is displayed or not. This value should not be mistaken for a signed timestamp from a timestamp authority.
  ![Display Options](../images/sealDate.png)
* **DISTINGUISHED_NAME**: Specifies that the distinguished name information from the digital certificate should be displayed in the seal appearance.
  ![Display Options](../images/sealDN.png)
* **LABELS**: Specifies that text labels should be displayed in the seal appearance.
  ![Display Options](../images/sealLabel.png)
* **SEAL_IMAGE**: Specifies that the seal image should be displayed in the seal appearance.
  ![Display Options](../images/sealImage.png)
  If SEAL_IMAGE is given in appearance parameters and seal image is not present in the request body, the default Acrobat trefoil image is used.
  ![Display Options](../images/sealImage_default.png)

**Example JSON**

```json
{
  "signatureFormat": "PADES",
  "cscCredentialOptions": {
    "authorizationContext": {
      "accessToken": "<ACCESS TOKEN>",
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
    "fieldName": "Signature",
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

There are two ways to access PDF Electronic Seal API: via the REST API or with the PDF Services SDKs.

### REST API

Clients using the REST API must perform the following:

1. [Generate asset IDs for all the input documents](https://developer.adobe.com/document-services/docs/apis/#tag/Assets).
1. Call the `/asset` API with `mediaType` in the request specifying the document upload type. For example, `application/pdf`. The API responds with an asset ID and upload URI.
1. Request to upload the input document to the upload URI.
1. Invoke PDF Electronic Seal API (/pdf-services/operation/electronicseal) by providing the asset IDs generated in step 1 and other required sealing parameters. In the response, the client receives the job URI in the location header. [Details](https://developer.adobe.com/document-services/docs/apis/#operation/pdfoperations.electronicseal).
1. Use the job URI to poll the status of the submitted job (Electronic Seal operation). The response includes a job status: *In progress*, *Failed* or *Done*. If the status is done, the seal API returns an asset ID and download URI. **This download URI is valid for 24 hours.**.
1. Download the electronically sealed PDF using download URI from above step.


### PDF Services SDKs

Clients can also access the PDF Electronic Seal API via PDF Services SDKs. For additional details, see [Quickstarts](../pdf-services-api/).

Clients using the PDF Services SDKs must perform the following:

1. Save the input document and seal image on the local machine. File paths must be absolute.
1. Save the `pdfservices-api-credentials.json` file created after [generating credentials](../pdf-services-api/#authentication)
1. Make a call to the PDF Electronic Seal operation that includes the following:
    * The file path to an input PDF (from the local machine).
    * [Required parameters](#parameters)
    * Specify an optional file path to a logo/watermark/background image used as part of the signature field's seal appearance. Supported formats include:
        * image/jpeg
        * image/png
1. The electronically sealed PDF file obtained will be saved to specified output file path.

Use the samples below to generate a PDF with an electronic seal.

Please refer the [API usage guide](../pdf-services-api/howtos/api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, Rest API" /> 

##### Java

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.electronicseal.ElectronicSeal

package com.adobe.pdfservices.operation.samples.electronicseal;

public class ElectronicSeal {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ElectronicSeal.class);

    public static void main(String[] args) {
        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.servicePrincipalsCredentialsBuilder()
                    .withClientId("CLIENT_ID")
                    .withClientSecret("CLIENT_SECRET")
                    .build();

            // Create an ExecutionContext using credentials.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            //Get the input document to perform the sealing operation
            FileRef sourceFile = FileRef.createFromLocalFile("<SOURCE_DOCUMENT_FILE_PATH>");

            //Get the background seal image for signature , if required.
            FileRef sealImageFile = FileRef.createFromLocalFile("<SEAL_IMAGE_FILE_PATH>");
        
            //Create AppearanceOptions and add the required signature display items to it
            AppearanceOptions appearanceOptions = new AppearanceOptions();
            appearanceOptions.addItem(AppearanceItem.NAME);
            appearanceOptions.addItem(AppearanceItem.LABELS);
            appearanceOptions.addItem(AppearanceItem.DATE);
            appearanceOptions.addItem(AppearanceItem.SEAL_IMAGE);
            appearanceOptions.addItem(AppearanceItem.DISTINGUISHED_NAME);
        
            //Set the Seal Field Name to be created in input PDF document.
            String sealFieldName = "<SEAL_FIELD_NAME>";
        
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
        
            //Create CSC auth context using access token and token type.
            CSCAuthContext cscAuthContext = new CSCAuthContext(accessToken, "Bearer");
        
            //Create CertificateCredentials instance with required certificate details.
            CertificateCredentials certificateCredentials = CertificateCredentials.cscCredentialBuilder()
                .withProviderName(providerName)
                .withCredentialID(credentialID)
                .withPin(pin)
                .withCSCAuthContext(cscAuthContext)
                .build();
        
            //Create SealingOptions instance with all the sealing parameters.
            SealOptions sealOptions = new SealOptions.Builder(SignatureFormat.PKCS7, certificateCredentials,
                fieldOptions).withAppearanceOptions(appearanceOptions).build();
        
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

```clike
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ElectronicSeal/
// dotnet run ElectronicSeal.csproj

  namespace ElectronicSeal
   {
       class Program
       {
           private static readonly ILog log = LogManager.GetLogger(typeof(Program));
  
           static void Main()
           {
               //Configure the logging.
               ConfigureLogging();
               try
               {
                   // Initial setup, create credentials instance.
                   Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                          .WithClientId("CLIENT_ID")
                          .WithClientSecret("CLIENT_SECRET")
                          .Build();
  
                   // Create an ExecutionContext using credentials.
                   ExecutionContext executionContext = ExecutionContext.Create(credentials);
  
                   //Get the input document to perform the sealing operation
                   FileRef sourceFile = FileRef.CreateFromLocalFile(@"SampleInvoice.pdf");
    
                   //Get the background seal image for signature , if required.
                   FileRef sealImageFile = FileRef.CreateFromLocalFile(@"sampleSealImage.png");
    
                   //Create AppearanceOptions and add the required signature appearance items
                   AppearanceOptions appearanceOptions = new AppearanceOptions();
                   appearanceOptions.AddItem(AppearanceItem.NAME);
                   appearanceOptions.AddItem(AppearanceItem.LABELS);
                   appearanceOptions.AddItem(AppearanceItem.DATE);
                   appearanceOptions.AddItem(AppearanceItem.SEAL_IMAGE);
                   appearanceOptions.AddItem(AppearanceItem.DISTINGUISHED_NAME);
    
                   //Set the Seal Field Name to be created in input PDF document.
                   string sealFieldName = "<SEAL_FIELD_NAME>";
    
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
                   string accessToken = "<ACCESS TOKEN>";
    
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
                   SealOptions sealOptions = new SealOptions.Builder(SignatureFormat.PKCS7, certificateCredentials,
                            fieldOptions).WithAppearanceOptions(appearanceOptions).Build();
    
                   //Create the PDFElectronicSealOperation instance using the SealOptions instance
                   PDFElectronicSealOperation pdfElectronicSealOperation = PDFElectronicSealOperation.CreateNew(sealOptions);
    
                   //Set the input source file for PDFElectronicSealOperation instance
                   pdfElectronicSealOperation.SetInput(sourceFile);
    
                   //Set the optional input seal image for PDFElectronicSealOperation instance
                   pdfElectronicSealOperation.SetSealImage(sealImageFile);
    
                   //Execute the operation
                   FileRef result = pdfElectronicSealOperation.Execute(executionContext);
    
                   //Save the output at specified location
                   result.SaveAs("output/sealedOutput.pdf");
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

```js
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/electronicseal/electronic-seal.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 try {
     // Initial setup, create credentials instance.
     const credentials =  PDFServicesSdk.Credentials
       .servicePrincipalsCredentialsBuilder()
       .withClientId("CLIENT_ID")
       .withClientSecret("CLIENT_SECRET")
       .build();

     // Create an ExecutionContext using credentials
     const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

     const pdfElectronicSeal = PDFServicesSdk.PDFElectronicSeal,
         Options = pdfElectronicSeal.options;

     //Get the input document to perform the sealing operation
     const sourceFile = PDFServicesSdk.FileRef.createFromLocalFile('resources/sampleInvoice.pdf'),

         //Get the background seal image for signature , if required.
         sealImageFile = PDFServicesSdk.FileRef.createFromLocalFile('resources/sampleSealImage.png');

     //Create AppearanceOptions and add the required signature appearance items
     appearanceOptions = new Options.AppearanceOptions();
     appearanceOptions.addItem(Options.AppearanceOptions.AppearanceItem.DATE);
     appearanceOptions.addItem(Options.AppearanceOptions.AppearanceItem.SEAL_IMAGE);
     appearanceOptions.addItem(Options.AppearanceOptions.AppearanceItem.NAME);
     appearanceOptions.addItem(Options.AppearanceOptions.AppearanceItem.LABELS);
     appearanceOptions.addItem(Options.AppearanceOptions.AppearanceItem.DISTINGUISHED_NAME);

     // Set the Seal Field Name to be created in input PDF document.
     sealFieldName = "<SEAL_FIELD_NAME>";

     // Set the page number in input document for applying seal.
     sealPageNumber = 1;

     // Set if seal should be visible or invisible.
     sealVisible = true;

     //Create FieldLocation instance and set the coordinates for applying signature
     fieldLocation = new Options.FieldLocation(150,250,350,200);

     //Create FieldOptions instance with required details.
     fieldOptions = new Options.FieldOptions.Builder(sealFieldName)
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

     //Create CSC auth context using access token and token type.
     cscAuthContext = new Options.CSCAuthContext(accessToken, "Bearer");

     //Create CertificateCredentials instance with required certificate details.
     certificateCredentials = Options.CertificateCredentials.cscCredentialBuilder()
         .withProviderName(providerName)
         .withCredentialID(credentialID)
         .withPin(pin)
         .withCSCAuthContext(cscAuthContext)
         .build();

     //Create SealingOptions instance with all the sealing parameters.
     sealOptions = new Options.SealOptions.Builder(Options.SealOptions.SignatureFormat.PKCS7, certificateCredentials, fieldOptions)
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
         .then(result => result.saveAsFile('output/sealedOutputWithAppearanceOptions.pdf'))
         .catch(err => {
             if(err instanceof PDFServicesSdk.Error.ServiceApiError
                 || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                 console.log('Exception encountered while executing operation', err);
             } else {
                 console.log('Exception encountered while executing operation', err);
             }
         });
 }
 catch (err) {
     console.log('Exception encountered while executing operation', err);
 }
```
##### REST API

```bash
curl --location --request POST 'https://pdf-services.adobe.io/operation/electronicseal' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "inputDocumentAssetID": "urn:aaid:AS:UE1:23c30ee0-2c4d-46d6-87f2-087832fca718",
    "sealImageAssetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "sealOptions": {
        "signatureFormat": "PKCS7",
        "cscCredentialOptions": {
            "credentialId": "[ADOBE]_xxxx_xx:35",
            "providerName": "intxxxxxst",
            "authorizationContext": {
                "tokenType": "bearer",
                "accessToken": "b7338a1f-xxxx-xxxx-xxxx-1eec91c47c12"
            },
            "credentialAuthParameters": {
                "pin": "12xxxx65"
            }
        },
        "sealFieldOptions": {
            "location": {
                "top": 300,
                "left": 50,
                "right": 250,
                "bottom": 100
            },
            "fieldName": "mytestfield",
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
