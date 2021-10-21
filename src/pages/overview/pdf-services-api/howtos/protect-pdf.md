# Protect PDF

## Protect PDFs with user password

You can password protect PDFs so that only users with a document open
password can open the file.

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
                Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                        .fromFile("pdfservices-api-credentials.json")
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
                Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                                .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
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
          .serviceAccountCredentialsBuilder()
          .fromFile("pdfservices-api-credentials.json")
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
// https://documentcloud.adobe.com/document-services/index.html#post-protectPDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"params\": {
			\"cpf:inline\": {
				\"passwordProtection\": {
					\"userPassword\": \"user_password\",
				},
				\"encryptionAlgorithm\": \"AES_128\"
			}
		},
		\"documentIn\": {
			\"cpf:location\": \"InputFile0\",
			\"dc:format\": \"application/pdf\"
		}
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-627aa455ac5d4c338ad49ca882e0fce5\"
	},
	\"cpf:outputs\": {
		\"documentOut\": {
			\"cpf:location\": \"multipartLabelOut\",
			\"dc:format\": \"application/pdf\"
		}
	}
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Protect PDFs with owner password

You can secure a PDF file with owner/permissions password and set the
restriction on certain features like printing, editing and copying in
the PDF document. Refer to `ContentEncryption` and `Permission` in the
API docs for a list of supported types of content to encrypt and types
of document permissions.

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
           Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                   .fromFile("pdfservices-api-credentials.json")
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
               Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                               .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
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
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
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
// https://documentcloud.adobe.com/document-services/index.html#post-protectPDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"params\": {
			\"cpf:inline\": {
				\"passwordProtection\": {
					\"ownerPassword\": \"owner_password\"
				},
				\"permissions\": [\"PRINT_LOW_QUALITY\", \"PRINT_HIGH_QUALITY\", \"EDIT_CONTENT\", \"EDIT_FILL_AND_SIGN_FORM_FIELDS\", \"EDIT_ANNOTATIONS\", \"EDIT_DOCUMENT_ASSEMBLY\", \"COPY_CONTENT\"],
				\"contentToEncrypt\": \"ALL_CONTENT_EXCEPT_METADATA\",
				\"encryptionAlgorithm\": \"AES_128\"
			}
		},
		\"documentIn\": {
			\"cpf:location\": \"InputFile0\",
			\"dc:format\": \"application/pdf\"
		}
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-627aa455ac5d4c338ad49ca882e0fce5\"
	},
	\"cpf:outputs\": {
		\"documentOut\": {
			\"cpf:location\": \"multipartLabelOut\",
			\"dc:format\": \"application/pdf\"
		}
	}
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```