---
title: Protect PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Protect PDF

Secure a PDF file with a password encrypt the document. Set an owner password and restrictions on certain features like printing, editing and copying in the PDF document to prevent end users from modifying it.

Support for AES-128 and AES-256 encryption on PDF files, with granular permissions for high and low quality printing and fill and sign form field restrictions.

## Rest API 

See our public API Reference for [Protect PDF](../../../apis/#tag/Protect-PDF)

## Protect PDFs with user password

You can password protect PDFs so that only users with a document open
password can open the file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.protectpdf.ProtectPDF
 
      public class ProtectPDF {
        // Initialize the logger.
        private static final Logger LOGGER = LoggerFactory.getLogger(ProtectPDF.class);
     
        public static void main(String[] args) {
     
            try {
                // Initial setup, create credentials instance.
                Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                    .withClientId("PDF_SERVICES_CLIENT_ID")
                    .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .build();
     
                // Create an ExecutionContext using credentials.
                ExecutionContext executionContext = ExecutionContext.create(credentials);
     
                // Build ProtectPDF options by setting a User Password and Encryption
                // Algorithm (used for encrypting the PDF file).
                ProtectPDFOptions protectPDFOptions = ProtectPDFOptions.passwordProtectOptionsBuilder()
                        .setUserPassword("encryptPassword")
                        .setEncryptionAlgorithm(EncryptionAlgorithm.AES_256)
                        .build();
     
                // Create a new operation instance.
                ProtectPDFOperation protectPDFOperation = ProtectPDFOperation.createNew(protectPDFOptions);
     
                // Set operation input from a source file.
                FileRef source = FileRef.createFromLocalFile("src/main/resources/protectPDFInput.pdf");
                protectPDFOperation.setInput(source);
     
                // Execute the operation
                FileRef result = protectPDFOperation.execute(executionContext);
     
                // Save the result at the specified location
                result.saveAs("output/protectPDFOutput.pdf");
     
            } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
                LOGGER.error("Exception encountered while executing operation", ex);
            }
        }
      }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ProtectPDF/
// dotnet run ProtectPDF.csproj

  namespace ProtectPDF
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
                Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                        .WithClientId("PDF_SERVICES_CLIENT_ID")
                        .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                        .Build();
 
                // Create an ExecutionContext using credentials.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
 
                // Build ProtectPDF options by setting a User Password and Encryption
                // Algorithm (used for encrypting the PDF file).
                ProtectPDFOptions protectPDFOptions = ProtectPDFOptions.PasswordProtectOptionsBuilder()
                        .SetUserPassword("encryptPassword")
                        .SetEncryptionAlgorithm(EncryptionAlgorithm.AES_256)
                        .Build();
 
                // Create a new operation instance
                ProtectPDFOperation protectPDFOperation = ProtectPDFOperation.CreateNew(protectPDFOptions);
 
                // Set operation input from a source file.
                FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"protectPDFInput.pdf");
                protectPDFOperation.SetInput(sourceFileRef);
 
                // Execute the operation.
                FileRef result = protectPDFOperation.Execute(executionContext);
 
                // Save the result to the specified location.
                result.SaveAs(Directory.GetCurrentDirectory() + "/output/protectPDFOutput.pdf");
            }
            catch (ServiceUsageException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            }
            // Catch more errors here . . .
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
// node src/protectpdf/protect-pdf.js

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
   
      // Build ProtectPDF options by setting a User Password and Encryption
      // Algorithm (used for encrypting the PDF file).
      const protectPDF = PDFServicesSdk.ProtectPDF,
          options = new protectPDF.options.PasswordProtectOptions.Builder()
              .setUserPassword("encryptPassword")
              .setEncryptionAlgorithm(PDFServicesSdk.ProtectPDF.options.EncryptionAlgorithm.AES_256)
              .build();
   
      // Create a new operation instance.
      const protectPDFOperation = protectPDF.Operation.createNew(options);
   
      // Set operation input from a source file.
      const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/protectPDFInput.pdf');
      protectPDFOperation.setInput(input);
   
      // Execute the operation and Save the result to the specified location.
      protectPDFOperation.execute(executionContext)
          .then(result => result.saveAsFile('output/protectPDFOutput.pdf'))
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

#### Rest API 

```javascript
// Please refer our Rest API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Protect-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/protectpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "passwordProtection": {
        "userPassword": "user_password"
    },
    "encryptionAlgorithm": "AES_128",
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-protectPDF
```

## Protect PDFs with owner password

You can secure a PDF file with owner/permissions password and set the
restriction on certain features like printing, editing and copying in
the PDF document. Refer to `ContentEncryption` and `Permission` in the
API docs for a list of supported types of content to encrypt and types
of document permissions.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.protectpdf.ProtectPDFWithOwnerPassword
 
 public class ProtectPDFWithOwnerPassword {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ProtectPDFWithOwnerPassword.class);

   public static void main(String[] args) {

       try {
           // Initial setup, create credentials instance.
           Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                    .withClientId("PDF_SERVICES_CLIENT_ID")
                    .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .build();

           // Create an ExecutionContext using credentials.
           ExecutionContext executionContext = ExecutionContext.create(credentials);

           // Create new permissions instance and add the required permissions
           Permissions permissions = Permissions.createNew();
           permissions.addPermission(Permission.PRINT_LOW_QUALITY);
           permissions.addPermission(Permission.EDIT_DOCUMENT_ASSEMBLY);
           permissions.addPermission(Permission.COPY_CONTENT);

           // Build ProtectPDF options by setting an Owner/Permissions Password, Permissions,
           // Encryption Algorithm (used for encrypting the PDF file) and specifying the type of content to encrypt.
           ProtectPDFOptions protectPDFOptions = ProtectPDFOptions.passwordProtectOptionsBuilder()
                   .setOwnerPassword("password")
                   .setPermissions(permissions)
                   .setEncryptionAlgorithm(EncryptionAlgorithm.AES_256)
                   .setContentEncryption(ContentEncryption.ALL_CONTENT_EXCEPT_METADATA)
                   .build();

           // Create a new operation instance.
           ProtectPDFOperation protectPDFOperation = ProtectPDFOperation.createNew(protectPDFOptions);

           // Set operation input from a source file.
           FileRef source = FileRef.createFromLocalFile("src/main/resources/protectPDFInput.pdf");
           protectPDFOperation.setInput(source);

           // Execute the operation
           FileRef result = protectPDFOperation.execute(executionContext);

           // Save the result at the specified location
           result.saveAs("output/protectPDFWithOwnerPasswordOutput.pdf");

       } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
           LOGGER.error("Exception encountered while executing operation", ex);
       }
   }
 }
     
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ProtectPDFWithOwnerPassword/
// dotnet run ProtectPDFWithOwnerPassword.csproj

 namespace ProtectPDFWithOwnerPassword
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
               Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                    .WithClientId("PDF_SERVICES_CLIENT_ID")
                    .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .Build();

               // Create an ExecutionContext using credentials.
               ExecutionContext executionContext = ExecutionContext.Create(credentials);

               // Create new permissions instance and add the required permissions
               Permissions permissions = Permissions.CreateNew();
               permissions.AddPermission(Permission.PRINT_LOW_QUALITY);
               permissions.AddPermission(Permission.EDIT_DOCUMENT_ASSEMBLY);
               permissions.AddPermission(Permission.COPY_CONTENT);

               // Build ProtectPDF options by setting an Owner/Permissions Password, Permissions,
               // Encryption Algorithm (used for encrypting the PDF file) and specifying the type of content to encrypt.
               ProtectPDFOptions protectPDFOptions = ProtectPDFOptions.PasswordProtectOptionsBuilder()
                   .SetOwnerPassword("password")
                   .SetPermissions(permissions)
                   .SetEncryptionAlgorithm(EncryptionAlgorithm.AES_256)
                   .SetContentEncryption(ContentEncryption.ALL_CONTENT_EXCEPT_METADATA)
                   .Build();

               // Create a new operation instance
               ProtectPDFOperation protectPDFOperation = ProtectPDFOperation.CreateNew(protectPDFOptions);

               // Set operation input from a source file.
               FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"protectPDFInput.pdf");
               protectPDFOperation.SetInput(sourceFileRef);

               // Execute the operation.
               FileRef result = protectPDFOperation.Execute(executionContext);

               // Save the result to the specified location.
               result.SaveAs(Directory.GetCurrentDirectory() + "/output/protectPDFWithOwnerPasswordOutput.pdf");
           }
           catch (ServiceUsageException ex)
           {
               log.Error("Exception encountered while executing operation", ex);
           }
           // Catch more errors here . . .
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
// node src/protectpdf/protect-pdf-with-owner-password.js

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
 
    // Create new permissions instance and add the required permissions
    const protectPDF = PDFServicesSdk.ProtectPDF,
        protectPDFOptions = protectPDF.options,
        permissions = protectPDFOptions.Permissions.createNew();
    permissions.addPermission(protectPDFOptions.Permission.PRINT_LOW_QUALITY);
    permissions.addPermission(protectPDFOptions.Permission.EDIT_DOCUMENT_ASSEMBLY);
    permissions.addPermission(protectPDFOptions.Permission.COPY_CONTENT);
 
    // Build ProtectPDF options by setting an Owner/Permissions Password, Permissions,
    // Encryption Algorithm (used for encrypting the PDF file) and specifying the type of content to encrypt.
    const options = new protectPDFOptions.PasswordProtectOptions.Builder()
            .setOwnerPassword("password")
            .setPermissions(permissions)
            .setEncryptionAlgorithm(protectPDFOptions.EncryptionAlgorithm.AES_256)
            .setContentEncryption(protectPDFOptions.ContentEncryption.ALL_CONTENT_EXCEPT_METADATA)
            .build();
 
    // Create a new operation instance.
    const protectPDFOperation = protectPDF.Operation.createNew(options);
 
    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/protectPDFInput.pdf');
    protectPDFOperation.setInput(input);
 
    // Execute the operation and Save the result to the specified location.
    protectPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/protectPDFWithOwnerPasswordOutput.pdf'))
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

#### Rest API 

```javascript
// Please refer our Rest API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Protect-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/protectpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
  "passwordProtection": {
    "ownerPassword": "owner_password"
  },
  "encryptionAlgorithm": "AES_256",
  "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-protectPDF
```
