---
title: Combine PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Combine PDF Files

## Combine Files

This sample combines up to 20 PDF files into a single PDF file.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.combinepdf.CombinePDF
 
 public class CombinePDF {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(CombinePDF.class);

   public static void main(String[] args) {
     try {
       // Initial setup, create credentials instance.
       Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
           .fromFile("pdfservices-api-credentials.json")
           .build();

       //Create an ExecutionContext using credentials and create a new operation instance.
       ExecutionContext executionContext = ExecutionContext.create(credentials);
       CombineFilesOperation combineFilesOperation = CombineFilesOperation.createNew();

       // Add operation input from source files.
       FileRef combineSource1 = FileRef.createFromLocalFile("src/main/resources/combineFilesInput1.pdf");
       FileRef combineSource2 = FileRef.createFromLocalFile("src/main/resources/combineFilesInput2.pdf");
       combineFilesOperation.addInput(combineSource1);
       combineFilesOperation.addInput(combineSource2);

       // Execute the operation.
       FileRef result = combineFilesOperation.execute(executionContext);

       // Save the result to the specified location.
       result.saveAs("output/combineFilesOutput.pdf");

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
// cd CombinePDF/
// dotnet run CombinePDF.csproj

 namespace CombinePDF
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

         //Create an ExecutionContext using credentials and create a new operation instance.
         ExecutionContext executionContext = ExecutionContext.Create(credentials);
         CombineFilesOperation combineFilesOperation = CombineFilesOperation.CreateNew();

         // Add operation input from source files.
         FileRef combineSource1 = FileRef.CreateFromLocalFile(@"combineFilesInput1.pdf");
         FileRef combineSource2 = FileRef.CreateFromLocalFile(@"combineFilesInput2.pdf");
         combineFilesOperation.AddInput(combineSource1);
         combineFilesOperation.AddInput(combineSource2);

         // Execute the operation.
         FileRef result = combineFilesOperation.Execute(executionContext);

         // Save the result to the specified location.
         result.SaveAs(Directory.GetCurrentDirectory() + "/output/combineFilesOutput.pdf");

       }
       catch (ServiceUsageException ex)
       {
         log.Error("Exception encountered while executing operation", ex);
       }
       // Catch more errors here. . .
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
// node src/combinepdf/combine-pdf.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
 
  try {
    // Initial setup, create credentials instance.
    const credentials = PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();
 
    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        combineFilesOperation = PDFServicesSdk.CombineFiles.Operation.createNew();
 
    // Set operation input from a source file.
    const combineSource1 = PDFServicesSdk.FileRef.createFromLocalFile('resources/combineFilesInput1.pdf'),
        combineSource2 = PDFServicesSdk.FileRef.createFromLocalFile('resources/combineFilesInput2.pdf');
    combineFilesOperation.addInput(combineSource1);
    combineFilesOperation.addInput(combineSource2);
 
    // Execute the operation and Save the result to the specified location.
    combineFilesOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/combineFilesOutput.pdf'))
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
			\"documentIn\": {
				\"cpf:location\": \"InputFile0\",
				\"dc:format\": \"application/pdf\"
			}
		}, {
			\"documentIn\": {
				\"cpf:location\": \"InputFile1\",
				\"dc:format\": \"application/pdf\"
			}
		}, {
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

## Combine pages from multiple files

This combine sample combines specific pages from up to 20 different PDF
files into a single PDF file. Optional arguments allow specifying page
ranges for each file to combine in the output file.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.combinepdf.CombinePDFWithPageRanges
 
 public class CombinePDFWithPageRanges {
 
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(CombinePDFWithPageRanges.class);
 
    public static void main(String[] args) {
 
      try {
 
        // Initial setup, create credentials instance.
        Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
            .fromFile("pdfservices-api-credentials.json")
            .build();
 
        //Create an ExecutionContext using credentials and create a new operation instance.
        ExecutionContext executionContext = ExecutionContext.create(credentials);
        CombineFilesOperation combineFilesOperation = CombineFilesOperation.createNew();
 
        // Create a FileRef instance from a local file.
        FileRef firstFileToCombine = FileRef.createFromLocalFile("src/main/resources/combineFileWithPageRangeInput1.pdf");
        PageRanges pageRangesForFirstFile = getPageRangeForFirstFile();
        // Add the first file as input to the operation, along with its page range.
        combineFilesOperation.addInput(firstFileToCombine, pageRangesForFirstFile);
 
        // Create a second FileRef instance using a local file.
        FileRef secondFileToCombine = FileRef.createFromLocalFile("src/main/resources/combineFileWithPageRangeInput2.pdf");
        PageRanges pageRangesForSecondFile = getPageRangeForSecondFile();
        // Add the second file as input to the operation, along with its page range.
        combineFilesOperation.addInput(secondFileToCombine, pageRangesForSecondFile);
 
        // Execute the operation.
        FileRef result = combineFilesOperation.execute(executionContext);
 
        // Save the result to the specified location.
        result.saveAs("output/combineFilesWithPageOptionsOutput.pdf");
 
      } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
        LOGGER.error("Exception encountered while executing operation", ex);
      }
    }
 
    private static PageRanges getPageRangeForSecondFile() {
      // Specify which pages of the second file are to be included in the combined file.
      PageRanges pageRangesForSecondFile = new PageRanges();
      // Add all pages including and after page 3.
      pageRangesForSecondFile.addAllFrom(3);
      return pageRangesForSecondFile;
    }
 
    private static PageRanges getPageRangeForFirstFile() {
      // Specify which pages of the first file are to be included in the combined file.
      PageRanges pageRangesForFirstFile = new PageRanges();
      // Add page 1.
      pageRangesForFirstFile.addSinglePage(1);
      // Add page 2.
      pageRangesForFirstFile.addSinglePage(2);
      // Add pages 3 to 4.
      pageRangesForFirstFile.addRange(3, 4);
      return pageRangesForFirstFile;
    }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CombinePDFWithPageRanges/
// dotnet run CombinePDFWithPageRanges.csproj

  namespace CombinePDFWithPageRanges
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
 
          //Create an ExecutionContext using credentials and create a new operation instance.
          ExecutionContext executionContext = ExecutionContext.Create(credentials);
          CombineFilesOperation combineFilesOperation = CombineFilesOperation.CreateNew();
 
          // Create a FileRef instance from a local file.
          FileRef firstFileToCombine = FileRef.CreateFromLocalFile(@"combineFileWithPageRangeInput1.pdf");
          PageRanges pageRangesForFirstFile = GetPageRangeForFirstFile();
          // Add the first file as input to the operation, along with its page range.
          combineFilesOperation.AddInput(firstFileToCombine, pageRangesForFirstFile);
 
          // Create a second FileRef instance using a local file.
          FileRef secondFileToCombine = FileRef.CreateFromLocalFile(@"combineFileWithPageRangeInput2.pdf");
          PageRanges pageRangesForSecondFile = GetPageRangeForSecondFile();
          // Add the second file as input to the operation, along with its page range.
          combineFilesOperation.AddInput(secondFileToCombine, pageRangesForSecondFile);
 
          // Execute the operation.
          FileRef result = combineFilesOperation.Execute(executionContext);
 
          // Save the result to the specified location.
          result.SaveAs(Directory.GetCurrentDirectory() + "/output/combineFilesOutput.pdf");
 
        }
        catch (ServiceUsageException ex)
        {
          log.Error("Exception encountered while executing operation", ex);
        }
        // Catch more errors here. . .
      }
 
      private static PageRanges GetPageRangeForSecondFile()
      {
        // Specify which pages of the second file are to be included in the combined file.
        PageRanges pageRangesForSecondFile = new PageRanges();
        // Add all pages including and after page 5.
        pageRangesForSecondFile.AddAllFrom(5);
        return pageRangesForSecondFile;
      }
 
      private static PageRanges GetPageRangeForFirstFile()
      {
        // Specify which pages of the first file are to be included in the combined file.
        PageRanges pageRangesForFirstFile = new PageRanges();
        // Add page 2.
        pageRangesForFirstFile.AddSinglePage(2);
        // Add page 3.
        pageRangesForFirstFile.AddSinglePage(3);
        // Add pages 5 to 7.
        pageRangesForFirstFile.AddRange(5, 7);
        return pageRangesForFirstFile;
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
// node src/combinepdf/combine-pdf-with-page-ranges.js

  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
 
  const getPageRangesForFirstFile = () => {
    // Specify which pages of the first file are to be included in the combined file.
    const pageRangesForFirstFile = new PDFServicesSdk.PageRanges();
    // Add page 1.
    pageRangesForFirstFile.addSinglePage(1);
    // Add page 2.
    pageRangesForFirstFile.addSinglePage(2);
    // Add pages 3 to 4.
    pageRangesForFirstFile.addPageRange(3, 4);
    return pageRangesForFirstFile;
  };
 
  const getPageRangesForSecondFile = () => {
    // Specify which pages of the second file are to be included in the combined file.
    const pageRangesForSecondFile = new PDFServicesSdk.PageRanges();
    // Add all pages including and after page 3.
    pageRangesForSecondFile.addAllFrom(3);
    return pageRangesForSecondFile;
  };
 
  try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();
 
    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        combineFilesOperation = PDFServicesSdk.CombineFiles.Operation.createNew();
 
    // Create a FileRef instance from a local file.
    const combineSource1 = PDFServicesSdk.FileRef.createFromLocalFile('resources/combineFilesInput1.pdf'),
        pageRangesForFirstFile = getPageRangesForFirstFile();
    // Add the first file as input to the operation, along with its page range.
    combineFilesOperation.addInput(combineSource1, pageRangesForFirstFile);
 
    // Create a second FileRef instance using a local file.
    const combineSource2 = PDFServicesSdk.FileRef.createFromLocalFile('resources/combineFilesInput2.pdf'),
        pageRangesForSecondFile = getPageRangesForSecondFile();
    // Add the second file as input to the operation, along with its page range.
    combineFilesOperation.addInput(combineSource2, pageRangesForSecondFile);
 
    // Execute the operation and Save the result to the specified location.
    combineFilesOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/combineFilesWithPageRangesOutput.pdf'))
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
