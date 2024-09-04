---
title: .NET | Quickstarts | PDF Electronic Seal API | Adobe PDF Services
---

# Quickstart for Adobe PDF Electronic Seal API (.NET)

To get started using PDF Electronic Seal API, let's walk through a simple scenario - Applying an electronic seal on an invoice PDF document. In this guide, we will walk you through the complete process for creating a program that will accomplish this task.

## Prerequisites

To complete this guide, you will need:

* [.NET: version 6.0 or above](https://dotnet.microsoft.com/en-us/download)
* [.Net SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
* A build tool: Either Visual Studio or .NET Core CLI.
* An Adobe ID. If you do not have one, the credential setup will walk you through creating one.
* A way to edit code. No specific editor is required for this guide.
  
## Step One: Getting credentials

1) To begin, open your browser to <https://acrobatservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api>. If you are not already logged in to Adobe.com, you will need to sign in or create a new user. Using a personal email account is recommended and not a federated ID.

![Sign in](./shot1.png)

2) After registering or logging in, you will then be asked to name your new credentials. Use the name, "New Project". 

3) Change the "Choose language" setting to ".Net". 

4) Also note the checkbox by, "Create personalized code sample." This will include a large set of samples along with your credentials. These can be helpful for learning more later. 

5) Click the checkbox saying you agree to the developer terms and then click "Create credentials."

![Project setup](./shot2_spc.png)

6) After your credentials are created, they are automatically  downloaded:

![alt](./shot3_spc.png)

## Step Two: Setting up the project

1) In your Downloads folder, find the ZIP file with your credentials: PDFServicesSDK-.NetSamples.zip. If you unzip that archive, you will find a folder of samples and the `pdfservices-api-credentials.json` file.

![alt](./shot5_spc.png)

2) Take the `pdfservices-api-credentials.json` file and place it in a new directory.

3) In your new directory, create a new file, `ElectronicSeal.csproj`. This file will declare our requirements as well as help define the application we're creating.

```xml
<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>netcoreapp3.1</TargetFramework>
    </PropertyGroup>

    <ItemGroup>
        <PackageReference Include="log4net" Version="2.0.12" />
        <PackageReference Include="Adobe.PDFServicesSDK" Version="3.4.0" />
    </ItemGroup>

    <ItemGroup>
        <None Update="log4net.config">
            <CopyToOutputDirectory>Always</CopyToOutputDirectory>
        </None>
        <None Update="sampleInvoice.pdf">
          <CopyToOutputDirectory>Always</CopyToOutputDirectory>
        </None>
        <None Update="sampleSealImage.png">
          <CopyToOutputDirectory>Always</CopyToOutputDirectory>
        </None>
    </ItemGroup>

</Project>
```

Our application will take an Invoice PDF document, `sampleInvoice.pdf` (downloadable from <a href="./sampleInvoice.pdf" target="_blank">here</a>), and will use the sealing options with default appearance options to apply electronic seal over the PDF document by invoking Acrobat Services API and generate an electronically sealed PDF.

4) In your editor, open the directory where you previously copied the credentials and created the `csproj` file. Create a new file, `Program.cs`. 

Now you're ready to begin coding.

## Step Three: Creating the application

1) We'll begin by including our required dependencies:

```javascript
using Adobe.PDFServicesSDK;
using Adobe.PDFServicesSDK.auth;
using Adobe.PDFServicesSDK.exception;
using Adobe.PDFServicesSDK.io;
using Adobe.PDFServicesSDK.options.electronicseal;
using Adobe.PDFServicesSDK.pdfops;
using log4net;
using log4net.Config;
using log4net.Repository;
using System;
using System.IO;
using System.Reflection;
``` 

2) Now let's define our main class and `Main` method:

```javascript
namespace ElectronicSeal
{
    public class Program
    {
        // Initialize the logger.
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main() {
        }
    }
}
```

3) Set the environment variables `PDF_SERVICES_CLIENT_ID` and `PDF_SERVICES_CLIENT_SECRET` by running the following commands and replacing placeholders `YOUR CLIENT ID` and `YOUR CLIENT SECRET` with the credentials present in `pdfservices-api-credentials.json` file:
- **Windows:**
  - `set PDF_SERVICES_CLIENT_ID=<YOUR CLIENT ID>`
  - `set PDF_SERVICES_CLIENT_SECRET=<YOUR CLIENT SECRET>`

- **MacOS/Linux:**
  - `export PDF_SERVICES_CLIENT_ID=<YOUR CLIENT ID>`
  - `export PDF_SERVICES_CLIENT_SECRET=<YOUR CLIENT SECRET>`



4) Let's create credentials for pdf services and use them:

```javascript
// Initial setup, create credentials instance.
Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                    .WithClientId(Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"))
                    .WithClientSecret(Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"))
                    .Build();

// Create an ExecutionContext using credentials.
ExecutionContext executionContext = ExecutionContext.Create(credentials);
```

5) Now let's define our input fields:

```javascript
//Get the input document to perform the sealing operation
FileRef sourceFile = FileRef.CreateFromLocalFile(@"sampleInvoice.pdf");

//Get the background seal image for signature , if required.
FileRef sealImageFile = FileRef.CreateFromLocalFile(@"sampleSealImage.png");
```

6) Now, we will define seal field options:

```javascript
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

```


7) Next, we create a CSC Certificate Credentials instance:

```javascript
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
```

8) Now, let's create the seal options with certificate credentials and field options:

```javascript
//Create SealingOptions instance with all the sealing parameters.
SealOptions sealOptions = new SealOptions.Builder(certificateCredentials, fieldOptions)
                    .WithAppearanceOptions(appearanceOptions).Build();
```

9) Now, let's create the operation:

```javascript
//Create the PDFElectronicSealOperation instance using the PDFElectronicSealOptions instance
PDFElectronicSealOperation pdfElectronicSealOperation = PDFElectronicSealOperation.CreateNew(sealOptions);

//Set the input source file for PDFElectronicSealOperation instance
pdfElectronicSealOperation.SetInput(sourceFile);

//Set the optional input seal image for PDFElectronicSealOperation instance
pdfElectronicSealOperation.SetSealImage(sealImageFile);
```
This code creates a seal operation using sealOptions, input source file and input seal image.

10) Let's execute this seal operation:
```javascript
//Execute the operation
FileRef result = pdfElectronicSealOperation.Execute(executionContext);

//Save the output at specified location
result.SaveAs("output/sealedOutput.pdf");
```

Here's the complete application (`Program.cs`):

```javascript
using Adobe.PDFServicesSDK;
using Adobe.PDFServicesSDK.auth;
using Adobe.PDFServicesSDK.exception;
using Adobe.PDFServicesSDK.io;
using Adobe.PDFServicesSDK.options.electronicseal;
using Adobe.PDFServicesSDK.pdfops;
using log4net;
using log4net.Config;
using log4net.Repository;
using System;
using System.IO;
using System.Reflection;

/// <summary>
/// This sample ElectronicSeal illustrates how to apply electronic seal over the PDF document using custom appearance options.
/// <para>
/// To know more about PDF Electronic Seal, please see the <a href="https://developer.adobe.com/document-services/docs/overview/pdf-electronic-seal-api/" target="_blank">documentation</a>.
/// </para>
/// Refer to README.md for instructions on how to run the samples.
/// </summary>
namespace ElectronicSeal
{
  public class Program
{
  // Initialize the logger.
  private static readonly ILog log = LogManager.GetLogger(typeof(Program));
  static void Main(string[] args)
{
  //Configure the logging
  ConfigureLogging();

  try
{
  // Initial setup, create credentials instance.
  Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
        .WithClientId(Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"))
        .WithClientSecret(Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"))
        .Build();


  // Create an ExecutionContext using credentials.
  ExecutionContext executionContext = ExecutionContext.Create(credentials);

  //Set the input document to perform the sealing operation
  FileRef sourceFile = FileRef.CreateFromLocalFile(@"sampleInvoice.pdf");

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

## Next Steps

Now that you've successfully performed your first operation, [review the documentation](https://developer.adobe.com/document-services/docs/overview/pdf-services-api/) for many other examples and reach out on our [forums](https://community.adobe.com/t5/document-services-apis/ct-p/ct-Document-Cloud-SDK) with any questions. Also remember the samples you downloaded while creating your credentials also have many demos.
