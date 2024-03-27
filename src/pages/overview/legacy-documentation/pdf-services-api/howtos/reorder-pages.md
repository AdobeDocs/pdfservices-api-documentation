---
title: Reorder Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Reorder Pages

## Reorder Pages in PDF

The reorder pages operation moves pages from one location to another in
a PDF file.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.reorderpages.ReorderPDFPages
 
 public class ReorderPDFPages {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ReorderPDFPages.class);

   public static void main(String[] args) {
       try {
           // Initial setup, create credentials instance.
           Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                   .fromFile("pdfservices-api-credentials.json")
                   .build();

           // Create an ExecutionContext using credentials and create a new operation instance.
           ExecutionContext executionContext = ExecutionContext.create(credentials);
           ReorderPagesOperation reorderPagesOperation = ReorderPagesOperation.createNew();

           // Set operation input from a source file, along with specifying the order of the pages for
           // rearranging the pages in a PDF file.
           FileRef source = FileRef.createFromLocalFile("src/main/resources/reorderPagesInput.pdf");
           PageRanges pageRanges = getPageRangeForReorder();
           reorderPagesOperation.setInput(source);
           reorderPagesOperation.setPagesOrder(pageRanges);

           // Execute the operation.
           FileRef result = reorderPagesOperation.execute(executionContext);

           // Save the result to the specified location.
           result.saveAs("output/reorderPagesOutput.pdf");

       } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
           LOGGER.error("Exception encountered while executing operation", e);
       }
   }

   private static PageRanges getPageRangeForReorder() {
       // Specify order of the pages for an output document.
       PageRanges pageRanges = new PageRanges();
       // Add pages 3 to 4.
       pageRanges.addRange(3, 4);

       // Add page 1.
       pageRanges.addSinglePage(1);

       return pageRanges;
   }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ReorderPages/
// dotnet run ReorderPDFPages.csproj

 namespace ReorderPDFPages
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
               ReorderPagesOperation reorderPagesOperation = ReorderPagesOperation.CreateNew();

               // Set operation input from a source file, along with specifying the order of the pages for
               // rearranging the pages in a PDF file.
               FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"reorderPagesInput.pdf");
               reorderPagesOperation.SetInput(sourceFileRef);
               PageRanges pageRanges = GetPageRangeForReorder();
               reorderPagesOperation.SetPagesOrder(pageRanges);

               // Execute the operation.
               FileRef result = reorderPagesOperation.Execute(executionContext);

               // Save the result to the specified location.
               result.SaveAs(Directory.GetCurrentDirectory() + "/output/reorderPagesOutput.pdf");
           }
           catch (ServiceUsageException ex)
           {
               log.Error("Exception encountered while executing operation", ex);
           }
           // Catch more errors here . . .
       }

       private static PageRanges GetPageRangeForReorder()
       {
           // Specify order of the pages for an output document.
           PageRanges pageRanges = new PageRanges();
           // Add pages 3 to 4.
           pageRanges.AddRange(3, 4);

           // Add page 1.
           pageRanges.AddSinglePage(1);

           return pageRanges;
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
// node src/reorderpages/reorder-pdf-pages.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 const getPageRangeForReorder = () => {
   // Specify order of the pages for an output document.
   const pageRanges = new PDFServicesSdk.PageRanges();

   // Add pages 3 to 4.
   pageRanges.addPageRange(3, 4);

   // Add page 1.
   pageRanges.addSinglePage(1);

   return pageRanges;
 };
 try {
   // Initial setup, create credentials instance.
   const credentials = PDFServicesSdk.Credentials
       .serviceAccountCredentialsBuilder()
       .fromFile("pdfservices-api-credentials.json")
       .build();

   // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       reorderPagesOperation = PDFServicesSdk.ReorderPages.Operation.createNew();

   // Set operation input from a source file, along with specifying the order of the pages for
   // rearranging the pages in a PDF file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/reorderPagesInput.pdf');
   const pageRanges = getPageRangeForReorder();
   reorderPagesOperation.setInput(input);
   reorderPagesOperation.setPagesOrder(pageRanges);

   // Execute the operation and Save the result to the specified location.
   reorderPagesOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/reorderPagesOutput.pdf'))
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

#### REST API

```javascript
// Please refer our REST API docs for more information
// https://documentcloud.adobe.com/document-services/index.html#post-combinePDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"documentsIn\": [{
			\"pageRanges\": {
				\"cpf:inline\": [{
					\"start\": 1,
					\"end\": 4
				}]
			},
			\"documentIn\": {
				\"cpf:location\": \"InputFile0\",
				\"dc:format\": \"application/pdf\"
			}
		}, {
			\"pageRanges\": {
				\"cpf:inline\": [{
					\"start\": 1,
					\"end\": 25
				}]
			},
			\"documentIn\": {
				\"cpf:location\": \"InputFile1\",
				\"dc:format\": \"application/pdf\"
			}
		}, {
			\"pageRanges\": {
				\"cpf:inline\": [{
					\"start\": 1
				}, {
					\"end\": 25
				}, {
					\"start\": 1,
					\"end\": 25
				}]
			},
			\"documentIn\": {
				\"cpf:location\": \"InputFile2\",
				\"dc:format\": \"application/pdf\"
			}
		}]
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-916ee91c156b42349a7847a7d564fb13\"
	},
	\"cpf:outputs\": {
		\"documentOut\": {
			\"cpf:location\": \"OutputFile\",
			\"dc:format\": \"application/pdf\"
		}
	}
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"' \
--form 'InputFile1=@"{{Placeholder for input file (absolute path)}}"' \
--form 'InputFile2=@"{{Placeholder for input file (absolute path)}}"'
```
