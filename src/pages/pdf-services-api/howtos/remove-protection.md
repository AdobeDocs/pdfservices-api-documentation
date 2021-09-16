# Remove Protection

## Remove security from PDFs

Use the below sample to remove security from a PDF document.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.removeprotection.RemoveProtection
 
  public class RemoveProtection {
 
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(RemoveProtection.class);
 
    public static void main(String[] args) {
        try {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();
 
            // Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);
            RemoveProtectionOperation removeProtectionOperation = RemoveProtectionOperation.createNew();
 
            // Set operation input from a source file.
            FileRef source = FileRef.createFromLocalFile("src/main/resources/removeProtectionInput.pdf");
            removeProtectionOperation.setInput(source);
 
            // Set the password for removing security from a PDF document.
            removeProtectionOperation.setPassword("password");
 
            // Execute the operation.
            FileRef result = removeProtectionOperation.execute(executionContext);
 
            // Save the result to the specified location.
            result.saveAs("output/removeProtectionOutput.pdf");
 
        } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
  }  
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd RemoveProtection/
// dotnet run RemoveProtection.csproj

  namespace RemoveProtection
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
 
                // Create a new operation instance
                RemoveProtectionOperation removeProtectionOperation = RemoveProtectionOperation.CreateNew();
 
                // Set operation input from a source file.
                FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"removeProtectionInput.pdf");
                removeProtectionOperation.SetInput(sourceFileRef);
 
                // Set the password for removing security from a PDF document.
                removeProtectionOperation.SetPassword("password");
 
                // Execute the operation.
                FileRef result = removeProtectionOperation.Execute(executionContext);
 
                // Save the result to the specified location.
                result.SaveAs(Directory.GetCurrentDirectory() + "/output/removeProtectionOutput.pdf");
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
// node src/removeprotection/remove-protection.js

   const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  
   try {
     // Initial setup, create credentials instance.
     const credentials =  PDFServicesSdk.Credentials
         .serviceAccountCredentialsBuilder()
         .fromFile("pdfservices-api-credentials.json")
         .build();
  
     // Create an ExecutionContext using credentials
     const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
  
     // Create a new operation instance.
     const removeProtectionOperation = PDFServicesSdk.RemoveProtection.Operation.createNew(),
         input = PDFServicesSdk.FileRef.createFromLocalFile(
             'resources/removeProtectionInput.pdf',
             PDFServicesSdk.RemoveProtection.SupportedSourceFormat.pdf
         );
     // Set operation input from a source file.
     removeProtectionOperation.setInput(input);
  
     // Set the password for removing security from a PDF document.
     removeProtectionOperation.setPassword("password");
  
     // Execute the operation and Save the result to the specified location.
     removeProtectionOperation.execute(executionContext)
         .then(result => result.saveAsFile('output/removeProtectionOutput.pdf'))
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
curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"params\": {
			\"cpf:inline\": {
				\"password\": \"password\"
			}
		},
		\"documentIn\": {
			\"cpf:location\": \"InputFile0\",
			\"dc:format\": \"application/pdf\"
		}
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-d80dc37d3aee44a8839e3429360db9a7\"
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