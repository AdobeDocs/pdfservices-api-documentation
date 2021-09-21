# Replace Pages

## Replace Pages in PDF

The replace pages operation replaces pages in a PDF with pages from
other PDF files.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.replacepages.ReplacePDFPages
 
     public class ReplacePDFPages {
    
       // Initialize the logger.
       private static final Logger LOGGER = LoggerFactory.getLogger(ReplacePDFPages.class);
    
       public static void main(String[] args) {
    
           try {
               // Initial setup, create credentials instance.
               Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                       .fromFile("pdfservices-api-credentials.json")
                       .build();
    
               // Create an ExecutionContext using credentials and create a new operation instance.
               ExecutionContext executionContext = ExecutionContext.create(credentials);
               ReplacePagesOperation replacePagesOperation = ReplacePagesOperation.createNew();
    
               // Set operation base input from a source file.
               FileRef baseSourceFile = FileRef.createFromLocalFile("src/main/resources/baseInput.pdf");
               replacePagesOperation.setBaseInput(baseSourceFile);
    
               // Create a FileRef instance using a local file.
               FileRef firstInputFile = FileRef.createFromLocalFile("src/main/resources/replacePagesInput1.pdf");
               PageRanges pageRanges = getPageRangeForFirstFile();
    
               // Adds the pages (specified by the page ranges) of the input PDF file for replacing the
               // page of the base PDF file.
               replacePagesOperation.addPagesForReplace(firstInputFile, pageRanges, 1);
    
    
               // Create a FileRef instance using a local file.
               FileRef secondInputFile = FileRef.createFromLocalFile("src/main/resources/replacePagesInput2.pdf");
    
               // Adds all the pages of the input PDF file for replacing the page of the base PDF file.
               replacePagesOperation.addPagesForReplace(secondInputFile, 3);
    
               // Execute the operation
               FileRef result = replacePagesOperation.execute(executionContext);
    
               // Save the result at the specified location
               result.saveAs("output/replacePagesOutput.pdf");
           } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
               LOGGER.error("Exception encountered while executing operation", e);
           }
       }
    
       private static PageRanges getPageRangeForFirstFile() {
           // Specify pages of the first file for replacing the page of base PDF file.
           PageRanges pageRanges = new PageRanges();
           // Add pages 1 to 3.
           pageRanges.addRange(1, 3);
    
           // Add page 4.
           pageRanges.addSinglePage(4);
    
           return pageRanges;
       }
     }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ReplacePDFPages/
// dotnet run ReplacePDFPages.csproj

   namespace ReplacePDFPages
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
                 ReplacePagesOperation replacePagesOperation = ReplacePagesOperation.CreateNew();
  
                 // Set operation base input from a source file.
                 FileRef baseSourceFile = FileRef.CreateFromLocalFile(@"baseInput.pdf");
                 replacePagesOperation.SetBaseInput(baseSourceFile);
  
                 // Create a FileRef instance using a local file.
                 FileRef firstInputFile = FileRef.CreateFromLocalFile(@"replacePagesInput1.pdf");
                 PageRanges pageRanges = GetPageRangeForFirstFile();
  
                 // Adds the pages (specified by the page ranges) of the input PDF file for replacing the
                 // page of the base PDF file.
                 replacePagesOperation.AddPagesForReplace(firstInputFile, pageRanges, 1);
  
                 // Create a FileRef instance using a local file.
                 FileRef secondInputFile = FileRef.CreateFromLocalFile(@"replacePagesInput2.pdf");
  
                 // Adds all the pages of the input PDF file for replacing the page of the base PDF file.
                 replacePagesOperation.AddPagesForReplace(secondInputFile, 3);
  
                 // Execute the operation.
                 FileRef result = replacePagesOperation.Execute(executionContext);
  
                 // Save the result to the specified location.
                 result.SaveAs(Directory.GetCurrentDirectory() + "/output/replacePagesOutput.pdf");
             }
             catch (ServiceUsageException ex)
             {
                 log.Error("Exception encountered while executing operation", ex);
             // Catch more errors here . . .
         }
  
         private static PageRanges GetPageRangeForFirstFile()
         {
             // Specify pages of the first file for replacing the page of base PDF file.
             PageRanges pageRanges = new PageRanges();
             // Add pages 1 to 3.
             pageRanges.AddRange(1, 3);
  
             // Add page 4.
             pageRanges.AddSinglePage(4);
  
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
// node src/replacepages/replace-pdf-pages.js

     const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
    
     const getPageRangesForFirstFile = () => {
       // Specify pages of the first file for replacing the page of base PDF file.
       const pageRangesForFirstFile = new PDFServicesSdk.PageRanges();
       // Add pages 1 to 3.
       pageRangesForFirstFile.addPageRange(1, 3);
    
       // Add page 4.
       pageRangesForFirstFile.addSinglePage(4);
    
       return pageRangesForFirstFile;
     };
    
     try {
       // Initial setup, create credentials instance.
       const credentials = PDFServicesSdk.Credentials
           .serviceAccountCredentialsBuilder()
           .fromFile("pdfservices-api-credentials.json")
           .build();
    
       // Create an ExecutionContext using credentials and create a new operation instance.
       const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
           replacePagesOperation = PDFServicesSdk.ReplacePages.Operation.createNew();
    
       // Set operation base input from a source file.
       const baseInputFile = PDFServicesSdk.FileRef.createFromLocalFile('resources/baseInput.pdf');
       replacePagesOperation.setBaseInput(baseInputFile);
    
       // Create a FileRef instance using a local file.
       const firstInputFile = PDFServicesSdk.FileRef.createFromLocalFile('resources/replacePagesInput1.pdf'),
           pageRanges = getPageRangesForFirstFile();
    
       // Adds the pages (specified by the page ranges) of the input PDF file for replacing the
       // page of the base PDF file.
       replacePagesOperation.addPagesForReplace(1, firstInputFile, pageRanges);
    
       // Create a FileRef instance using a local file.
       const secondInputFile = PDFServicesSdk.FileRef.createFromLocalFile('resources/replacePagesInput2.pdf');
    
       // Adds all the pages of the input PDF file for replacing the page of the base PDF file.
       replacePagesOperation.addPagesForReplace(3, secondInputFile);
    
       // Execute the operation and Save the result to the specified location.
       replacePagesOperation.execute(executionContext)
           .then(result => result.saveAsFile('output/replacePagesOutput.pdf'))
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