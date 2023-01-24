---
title: Delete Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Delete Pages

## Delete Pages in a PDF

The delete pages operation selectively removes pages from a PDF file.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.deletepages.DeletePDFPages
 
     
   public class DeletePDFPages {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(DeletePDFPages.class);

   public static void main(String[] args) {
       try {
           // Initial setup, create credentials instance.
           Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                   .fromFile("pdfservices-api-credentials.json")
                   .build();

           // Create an ExecutionContext using credentials and create a new operation instance.
           ExecutionContext executionContext = ExecutionContext.create(credentials);
           DeletePagesOperation deletePagesOperation = DeletePagesOperation.createNew();

           // Set operation input from a source file.
           FileRef source = FileRef.createFromLocalFile("src/main/resources/deletePagesInput.pdf");
           deletePagesOperation.setInput(source);

           // Delete pages of the document (as specified by PageRanges).
           PageRanges pageRangeForDeletion = getPageRangeForDeletion();
           deletePagesOperation.setPageRanges(pageRangeForDeletion);

           // Execute the operation.
           FileRef result = deletePagesOperation.execute(executionContext);

           // Save the result to the specified location.
           result.saveAs("output/deletePagesOutput.pdf");

       } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
           LOGGER.error("Exception encountered while executing operation", e);
       }
   }

   private static PageRanges getPageRangeForDeletion() {
       // Specify pages for deletion.
       PageRanges pageRangeForDeletion = new PageRanges();
       // Add page 1.
       pageRangeForDeletion.addSinglePage(1);

       // Add pages 3 to 4.
       pageRangeForDeletion.addRange(3, 4);
       return pageRangeForDeletion;
   }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd DeletePDFPages/
// dotnet run DeletePDFPages.csproj

    namespace DeletePDFPages
    {
      class Program
      {
          private static readonly ILog log = LogManager.GetLogger(typeof(Program));
          static void Main()
          {
              // Configure the logging
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
                  DeletePagesOperation deletePagesOperation = DeletePagesOperation.CreateNew();
   
                  // Set operation input from a source file.
                  FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"deletePagesInput.pdf");
                  deletePagesOperation.SetInput(sourceFileRef);
   
                  // Delete pages of the document (as specified by PageRanges).
                  PageRanges pageRangeForDeletion = GetPageRangeForDeletion();
                  deletePagesOperation.SetPageRanges(pageRangeForDeletion);
   
                  // Execute the operation.
                  FileRef result = deletePagesOperation.Execute(executionContext);
   
                  // Save the result to the specified location.
                  result.SaveAs(Directory.GetCurrentDirectory() + "/output/deletePagesOutput.pdf");
              }
              catch (ServiceUsageException ex)
              {
                  log.Error("Exception encountered while executing operation", ex);
              }
              // Catch more errors here . . .
          }
   
          private static PageRanges GetPageRangeForDeletion()
          {
              // Specify pages for deletion.
              PageRanges pageRangeForDeletion = new PageRanges();
              // Add page 1.
              pageRangeForDeletion.AddSinglePage(1);
   
              // Add pages 3 to 4.
              pageRangeForDeletion.AddRange(3, 4);
              return pageRangeForDeletion;
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
// node src/replacepages/replace-pdf-pages.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 const getPageRangesForDeletion = () => {
   // Specify pages for deletion.
   const pageRangesForDeletion = new PDFServicesSdk.PageRanges();
   // Add page 1.
   pageRangesForDeletion.addSinglePage(1);

   // Add pages 3 to 4.
   pageRangesForDeletion.addPageRange(3, 4);
   return pageRangesForDeletion;
 };

 try {
   // Initial setup, create credentials instance.
   const credentials = PDFServicesSdk.Credentials
       .serviceAccountCredentialsBuilder()
       .fromFile("pdfservices-api-credentials.json")
       .build();

   // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       deletePagesOperation = PDFServicesSdk.DeletePages.Operation.createNew();

   // Set operation input from a source file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/deletePagesInput.pdf');
   deletePagesOperation.setInput(input);

   // Delete pages of the document (as specified by PageRanges).
   const pageRangesForDeletion = getPageRangesForDeletion();
   deletePagesOperation.setPageRanges(pageRangesForDeletion);

   // Execute the operation and Save the result to the specified location.
   deletePagesOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/deletePagesOutput.pdf'))
       .catch(err => {
           if (err instanceof PDFServicesSdk.Error.ServiceApiError
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
// https://documentcloud.adobe.com/document-services/index.html#post-pageManipulation

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"params\": {
			\"cpf:inline\": {
				\"pageActions\": [{
					\"pageAction\": {
						\"delete\": {
							\"pageRanges\": [{
								\"start\": 1,
								\"end\": 1
							}]
						}
					}
				}]
			}
		},
		\"documentIn\": {
			\"cpf:location\": \"InputFile0\",
			\"dc:format\": \"application/pdf\"
		}
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-4735fcf3cf924b25879e6fcf7aa84ad4\"
	},
	\"cpf:outputs\": {
		\"documentOut\": {
			\"cpf:location\": \"cid:multipartLabelOut\",
			\"dc:format\": \"application/pdf\"
		}
	}
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```
