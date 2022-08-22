---
title: Document Services APIs | How Tos | PDF Properties
---
# Get PDF Properties

Use this service to get the metadata properties of a PDF. Metadata including page count, PDF version, file size, compliance levels, font info, permissions and more are provided in JSON format for easy processing.

This data can be used to: check if a document is fully text searchable (OCR), understand the e-signature certificate info, find out compliance levels (e.g., PDF/A and PDF/UA), assess file size before compressing, check permissions related to copy, edit, printing, encryption, and much more.

## Rest API 

See our public API Reference for [PDF Properties](../../../apis/#tag/pdfproperties).

### Get PDF Properties as a JSON File

The sample below fetches the properties of an input PDF, as a JSON file.

<CodeBlock slots="heading, code" repeat="3" languages="Java, .NET, Node JS" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.pdfproperties.PDFPropertiesAsFile

  public class PDFPropertiesAsFile {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(PDFPropertiesAsFile.class);

    public static void main(String[] args) {

      try {

        // Initial setup, create credentials instance.
        Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
            .fromFile("pdfservices-api-credentials.json")
            .build();

        //Create an ExecutionContext using credentials and create a new operation instance.
        ExecutionContext executionContext = ExecutionContext.create(credentials);
        PDFPropertiesOperation pdfPropertiesOperation = PDFPropertiesOperation.createNew();

        // Provide an input FileRef for the operation
        FileRef source = FileRef.createFromLocalFile("src/main/resources/pdfPropertiesInput.pdf");
        pdfPropertiesOperation.setInputFile(source);

        // Execute the operation
        FileRef result = pdfPropertiesOperation.executeAndReturnFileRef(executionContext);

        // Save the result at the specified location
        result.saveAs("output/pdfPropertiesOutput.json");

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
// cd PDFPropertiesAsFile/
// dotnet run PDFPropertiesAsFile.csproj

namespace PDFPropertiesAsFile
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
            PDFPropertiesOperation pdfPropertiesOperation = PDFPropertiesOperation.CreateNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.CreateFromLocalFile(@"pdfPropertiesInput.pdf");
            pdfPropertiesOperation.SetInput(source);

            // Execute the operation.
            FileRef result = pdfPropertiesOperation.ExecuteAndReturnFileRef(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/pdfPropertiesOutput.json");

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
// node src/exportpdf/pdf-properties-as-file.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();

    //Create an ExecutionContext using credentials and create a new operation instance.
    const clientContext = PDFServicesSdk.ExecutionContext.create(credentials),
        pdfPropertiesOperation = PDFServicesSdk.PDFProperties.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/pdfPropertiesInput.pdf');
    pdfPropertiesOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    pdfPropertiesOperation.executeAndReturnFileRef(clientContext)
        .then(result => result.saveAsFile('output/PDFPropertiesOutput.json'))
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

### Get PDF Properties as a JSON Object

The sample below fetches the properties of an input PDF, as a JSON object.

<CodeBlock slots="heading, code" repeat="3" languages="Java, .NET, Node JS" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.pdfproperties.PDFPropertiesAsJSONObject

  public class PDFPropertiesAsJSONObject {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(PDFPropertiesAsJSONObject.class);

    public static void main(String[] args) {

      try {

        // Initial setup, create credentials instance.
        Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
            .fromFile("pdfservices-api-credentials.json")
            .build();

        //Create an ExecutionContext using credentials and create a new operation instance.
        ExecutionContext executionContext = ExecutionContext.create(credentials);
        PDFPropertiesOperation pdfPropertiesOperation = PDFPropertiesOperation.createNew();

        // Provide an input FileRef for the operation
        FileRef source = FileRef.createFromLocalFile("src/main/resources/pdfPropertiesInput.pdf");
        pdfPropertiesOperation.setInputFile(source);

        // Build PDF Properties options to include page level properties and set them into the operation
        PDFPropertiesOptions pdfPropertiesOptions = PDFPropertiesOptions.PDFPropertiesOptionsBuilder()
              .includePageLevelProperties(true)
              .build();
        pdfPropertiesOperation.setOptions(pdfPropertiesOptions);

        // Execute the operation and return JSON Object
        JSONObject result = pdfPropertiesOperation.execute(executionContext);
        LOGGER.info("The resultant PDF Properties are: {}", result);

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
// cd PDFPropertiesAsJSONObject/
// dotnet run PDFPropertiesAsJSONObject.csproj

namespace PDFPropertiesAsJSONObject
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
            PDFPropertiesOperation pdfPropertiesOperation = PDFPropertiesOperation.CreateNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.CreateFromLocalFile(@"pdfPropertiesInput.pdf");
            pdfPropertiesOperation.SetInput(source);

            // Build PDF Properties options to include page level properties and set them into the operation
            PDFPropertiesOptions pdfPropertiesOptions = PDFPropertiesOptions.PDFPropertiesOptionsBuilder()
            .IncludePageLevelProperties(true)
            .Build();
            pdfPropertiesOperation.SetOptions(pdfPropertiesOptions);

            // Execute the operation and return JSON Object
            JObject result = pdfPropertiesOperation.Execute(executionContext);
            Console.WriteLine("The resultant PDF Properties are: " + result.ToString());

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
// node src/exportpdf/pdf-properties-as-json.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();

    //Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        pdfPropertiesOperation = PDFServicesSdk.PDFProperties.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/pdfPropertiesInput.pdf');
    pdfPropertiesOperation.setInput(input);

    // Provide any custom configuration options for the operation.
    const options = new PDFServicesSdk.PDFProperties.options.PDFPropertiesOptions.Builder()
        .includePageLevelProperties(true)
        .build();
    pdfPropertiesOperation.setOptions(options);

    // Execute the operation and log the JSON Object.
    pdfPropertiesOperation.execute(executionContext)
        .then(result => console.log("The resultant json object is : " + JSON.stringify(result)))
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
