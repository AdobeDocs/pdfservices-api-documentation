# Autotag PDF

## Autotag Output Format

The output of an SDK autotag operation contains the following:

- The tagged pdf file of version 1.7 or 2.0 as per the option set and with headings shifted if the option of shift headings is set.
- An optional excel report containing the information of the tagging if the option of generatereport is set.

## API limitations

- **File size:** Files up to a maximum of 100MB are supported.
- **Number of Pages:** Non-scanned PDFs up to 200 pages and scanned PDFs up to 100 pages are supported, however limits may be lower for files with a large number of tables.
- **Rate limits:** Keep request rate below 25 requests per minutes.
- **Page Size:** The API supports standard page sizes not to exceed 17.5” or less than 6” in either dimension.
- **Hidden Objects:** PDF files that contain content that is not visible on the page like javascript, OCG (optional content groups), etc are not supported. Files that contain such hidden information may fail to process. For such cases, [removing hidden content](https://helpx.adobe.com/acrobat/using/removing-sensitive-content-pdfs.html) prior to processing files again may return a successful result.
- **Language:** The API is currently optimized for English language content. Files containing content in other Latin languages should return good results, but may have issues with non-English punctuation.
- **OCR and Scan quality:** The quality of text extracted from scanned files is dependent on the clarity of content in the input file. Conditions like skewed pages, shadowing, obscured or overlapping fonts, and page resolution less than 200 DPI can all result in lower quality text output.
- **Form fields:** Files containing XFA and other fillable form elements are not supported.
- **Unprotected files:** The API supports files that are unprotected or where security restrictions allow copying of content. Files that are secured and do not allow copying of content will not be processed.
- **Annotations:** Content in PDF files containing annotations such as highlights and sticky notes will be processed, but annotations that obscure text could impact output quality. Text within annotations will not be included in the output.
- **PDF Producers:** The Autotag API is designed to make to PDF accessible. Files created from applications that produce other types of content like illustrations, CAD drawings or other types of vector art may not return quality results.
- **PDF Collections:** PDFs that are made from a collection of files including PDF Portfolios are not currently supported.

## Error codes
| Scenario                  | Error code                | Error message                                                                                                             |
| --------------------------| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Unsuitable file           | DISQUALIFIED              | File is not suitable for conversion. Note this can still be returned even if the file was prequalified on the client.     |
| Bad Input                 | BAD_INPUT                 | Input is corrupted or empty.                                                                                              |
| Bad PDF                   | BAD_PDF                   | Not a PDF, File is corrupted, malformed or an empty PDF.                                                                  |
| Protected PDF             | PROTECTED_PDF             | PDF is encrypted or password protected.                                                                                   |
| Disqualified Experiment   | DISQUALIFIED_EXPERIMENT   | File belongs to an experiment.                                                                                            |
| Unknown error / failure   | ERROR                     | Unexpected error.                                                                                                         |

## Code samples

- [Generate tagged pdf of version 1.7 from a PDF](autotag-api/#generate-tagged-pdf-of-version-17-from-a-pdf)
- [Generate tagged pdf of version 1.7 and an excel report from a PDF](autotag-api/#generate-tagged-pdf-of-version-17-and-an-excel-report-from-a-pdf)
- [Generate tagged pdf of version 1.7 and shift its headings and an excel report from a PDF](autotag-api/#generate-tagged-pdf-of-version-17-and-shift-its-headings-and-an-excel-report-from-a-pdf)
- [Generate tagged pdf of version 1.7 from a PDF and shift its headings](autotag-api/#generate-tagged-pdf-of-version-17-from-a-pdf-and-shift-its-headings)
- [Generate tagged pdf of version 2.0 from a PDF](autotag-api/#generate-tagged-pdf-of-version-20-from-a-pdf)
- [Generate tagged pdf of version 2.0 and an excel report from a PDF](autotag-api/#generate-tagged-pdf-of-version-20-and-an-excel-report-from-a-pdf)
- [Generate tagged pdf of version 2.0 and shifting its headings and an excel report from a PDF](autotag-api/#generate-tagged-pdf-of-version-20-and-shifting-its-headings-and-an-excel-report-from-a-pdf)
- [Generate tagged pdf of version 2.0 from a PDF and shift its headings](autotag-api/#generate-tagged-pdf-of-version-20-from-a-pdf-and-shift-its-headings)

## Generate tagged pdf of version 1.7 from a PDF

Use the sample below to generate tagged pdf of version 1.7 from a PDF document.

Copy this command in terminal to run the sample:
```
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithV17 
```

Sample code:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

#### Java

```javascript  
public class AutotagPDFWithV17 {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithV17.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

            // Provide an input FileRef for the operation and take the name of the input file to be used in output file
            String filename = "src/main/resources/autotagPdfInput.pdf";
            FileRef source = FileRef.createFromLocalFile(filename);
            autotagPDFOperation.setInputFile(source);

            //Extract the name of the input file to be used in saving output file with same name
            String inputFileName = filename.substring(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

             // Build AutotagPDF options and set them into the operation
            AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                    .pdfVersion(PDFVersion.v17)
                    .build();
            autotagPDFOperation.setOptions(autotagPDFOptions);

            // Execute the operation
            AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

            // Save the output files at the specified location
            String outputDirectory = "output/AutotagPDFWithV17/";
            String taggedPDFPath = outputDirectory + inputFileName+ "-taggedPDF.pdf";

            autotagOutputFiles.saveTaggedPDF(taggedPDFPath);

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
          System.out.println(e);
        }
    }
}
      
```

## Generate tagged pdf of version 1.7 and an excel report from a PDF

Use the sample below to generate tagged pdf of version 1.7 and an excel report from a PDF document.

Copy this command in terminal to run the sample:
```
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithV17AndReport
```

Sample code:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

#### Java

```javascript  
public class AutotagPDFWithV17AndReport {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithV17AndReport.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

            // Provide an input FileRef for the operation and take the name of the input file to be used in output file
            String filename = "src/main/resources/autotagPdfInput.pdf";
            FileRef source = FileRef.createFromLocalFile(filename);
            autotagPDFOperation.setInputFile(source);

            //Extract the name of the input file to be used in saving output file with same name
            String inputFileName = filename.substring(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

            // Build AutotagPDF options and set them into the operation
            AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                    .pdfVersion(PDFVersion.v17)
                    .generateReport()
                    .build();
            autotagPDFOperation.setOptions(autotagPDFOptions);

            // Execute the operation
            AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

            // Save the output files at the specified location
            String outputDirectory = "output/AutotagPDFWithV17AndReport/";
            String taggedPDFPath = outputDirectory + inputFileName+ "-taggedPDF.pdf";
            String reportPath = outputDirectory  + inputFileName + "-report.xlsx";

            autotagOutputFiles.saveTaggedPDF(taggedPDFPath);
            autotagOutputFiles.saveReport(reportPath);

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }
}      
```

## Generate tagged pdf of version 1.7 and shift its headings and an excel report from a PDF

Use the sample below to generate tagged pdf of version 1.7 and shift its headings an excel report from a PDF document.

Copy this command in terminal to run the sample:
```
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithV17AndReportAndShiftHeadings 
```

Sample code:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

#### Java

```javascript 
public class AutotagPDFWithV17AndReportAndShiftHeadings {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithV17AndReportAndShiftHeadings.class);

    public static void main(String[] args) {

        try {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

            // Provide an input FileRef for the operation and take the name of the input file to be used in output file
            String filename = "src/main/resources/autotagPdfInput.pdf";
            FileRef source = FileRef.createFromLocalFile(filename);
            autotagPDFOperation.setInputFile(source);

            //Extract the name of the input file to be used in saving output file with same name
            String inputFileName = filename.substring(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

            // Build AutotagPDF options and set them into the operation
            AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                    .pdfVersion(PDFVersion.v17)
                    .shiftHeadings()
                    .generateReport()
                    .build();
            autotagPDFOperation.setOptions(autotagPDFOptions);

            // Execute the operation
            AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

            // Save the output files at the specified location
            String outputDirectory = "output/AutotagPDFWithV17AndReportAndShiftHeadings/";
            String taggedPDFPath = outputDirectory +inputFileName+ "-taggedPDF.pdf";
            String reportPath = outputDirectory  + inputFileName + "-report.xlsx";

            autotagOutputFiles.saveTaggedPDF(taggedPDFPath);
            autotagOutputFiles.saveReport(reportPath);

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }
}
```

## Generate tagged pdf of version 1.7 from a PDF and shift its headings

Use the sample below to generate tagged pdf of version 1.7 from a PDF and shift its headings.

Copy this command in terminal to run the sample:
```
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithV17AndShiftHeadings 
```

Sample code:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

#### Java

```javascript 
public class AutotagPDFWithV17AndShiftHeadings {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithV17AndShiftHeadings.class);

    public static void main(String[] args) {

        try {

             // Initial setup, create credentials instance.
             Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                     .fromFile("pdfservices-api-credentials.json")
                     .build();

             //Create an ExecutionContext using credentials and create a new operation instance.
             ExecutionContext executionContext = ExecutionContext.create(credentials);

             AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

             // Provide an input FileRef for the operation and take the name of the input file to be used in output file
             String filename = "src/main/resources/autotagPdfInput.pdf";
             FileRef source = FileRef.createFromLocalFile(filename);
             autotagPDFOperation.setInputFile(source);

             //Extract the name of the input file to be used in saving output file with same name
             String inputFileName = filename.substring(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

             // Build AutotagPDF options and set them into the operation
             AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                     .pdfVersion(PDFVersion.v17)
                     .shiftHeadings()
                     .build();
             autotagPDFOperation.setOptions(autotagPDFOptions);

             // Execute the operation
             AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

             // Save the output files at the specified location
             String outputDirectory = "output/AutotagPDFWithV17AndShiftHeadings/";
             String taggedPDFPath = outputDirectory +inputFileName+ "-taggedPDF.pdf";

             autotagOutputFiles.saveTaggedPDF(taggedPDFPath);

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
             System.out.println(e);
        }
    }
}
```

## Generate tagged pdf of version 2.0 from a PDF

Use the sample below to generate tagged pdf of version 2.0 from a PDF document.

Copy this command in terminal to run the sample:
```
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithV20 
```

Sample code:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

#### Java

```javascript  
public class AutotagPDFWithV20 {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithV20.class);

    public static void main(String[] args) {

        try {

             // Initial setup, create credentials instance.
             Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                     .fromFile("pdfservices-api-credentials.json")
                     .build();

             //Create an ExecutionContext using credentials and create a new operation instance.
             ExecutionContext executionContext = ExecutionContext.create(credentials);

             AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

             // Provide an input FileRef for the operation and take the name of the input file to be used in output file
             String filename = "src/main/resources/autotagPdfInput.pdf";
             FileRef source = FileRef.createFromLocalFile(filename);
             autotagPDFOperation.setInputFile(source);

             //Extract the name of the input file to be used in saving output file with same name
             String inputFileName = filename.substring(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

             // Build AutotagPDF options and set them into the operation
             AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                     .pdfVersion(PDFVersion.v20)
                     .build();
             autotagPDFOperation.setOptions(autotagPDFOptions);

             // Execute the operation
             AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

             // Save the output files at the specified location
             String outputDirectory = "output/AutotagPDFWithV20/";
             String taggedPDFPath = outputDirectory + inputFileName+ "-taggedPDF.pdf";

             autotagOutputFiles.saveTaggedPDF(taggedPDFPath);

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }
}
```

## Generate tagged pdf of version 2.0 and an excel report from a PDF

Use the sample below to generate tagged pdf of version 2.0 and an excel report from a PDF document.

Copy this command in terminal to run the sample:
```
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithV20AndReport 
```

Sample code:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

#### Java

```javascript 
public class AutotagPDFWithV20AndReport {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithV20AndReport.class);

    public static void main(String[] args) {

        try {

             // Initial setup, create credentials instance.
             Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                     .fromFile("pdfservices-api-credentials.json")
                     .build();

             //Create an ExecutionContext using credentials and create a new operation instance.
             ExecutionContext executionContext = ExecutionContext.create(credentials);

             AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

             // Provide an input FileRef for the operation and take the name of the input file to be used in output file
             String filename = "src/main/resources/autotagPdfInput.pdf";
             FileRef source = FileRef.createFromLocalFile(filename);
             autotagPDFOperation.setInputFile(source);

             //Extract the name of the input file to be used in saving output file with same name
             String inputFileName = filename.substring(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

             // Build AutotagPDF options and set them into the operation
             AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                    .pdfVersion(PDFVersion.v20)
                    .generateReport()
                    .build();
             autotagPDFOperation.setOptions(autotagPDFOptions);

             // Execute the operation
             AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

             // Save the output files at the specified location
             String outputDirectory = "output/AutotagPDFWithV20AndReport/";
             String taggedPDFPath = outputDirectory + inputFileName+ "-taggedPDF.pdf";
             String reportPath = outputDirectory  + inputFileName + "-report.xlsx";

             autotagOutputFiles.saveTaggedPDF(taggedPDFPath);
             autotagOutputFiles.saveReport(reportPath);

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }
}
```

## Generate tagged pdf of version 2.0 and shifting its headings and an excel report from a PDF

Use the sample below to generate tagged pdf of version 2.0 and shifting its headings an excel report from a PDF document.

Copy this command in terminal to run the sample:
```
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithV20AndReportAndShiftHeadings 
```

Sample code:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

#### Java

```javascript 
public class AutotagPDFWithV20AndReportAndShiftHeadings {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithV20AndReportAndShiftHeadings.class);

    public static void main(String[] args) {

        try {

             // Initial setup, create credentials instance.
             Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

             //Create an ExecutionContext using credentials and create a new operation instance.
             ExecutionContext executionContext = ExecutionContext.create(credentials);

             AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

             // Provide an input FileRef for the operation and take the name of the input file to be used in output file
             String filename = "src/main/resources/autotagPdfInput.pdf";
             FileRef source = FileRef.createFromLocalFile(filename);
             autotagPDFOperation.setInputFile(source);

             //Extract the name of the input file to be used in saving output file with same name
             String inputFileName = filename.substring(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

             // Build AutotagPDF options and set them into the operation
             AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                    .pdfVersion(PDFVersion.v20)
                    .generateReport()
                    .shiftHeadings()
                    .build();
             autotagPDFOperation.setOptions(autotagPDFOptions);

             // Execute the operation
             AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

             // Save the output files at the specified location
             String outputDirectory = "output/AutotagPDFWithV20AndReportAndShiftHeadings/";
             String taggedPDFPath = outputDirectory +inputFileName+ "-taggedPDF.pdf";
             String reportPath = outputDirectory +inputFileName+ "-report.xlsx";

             autotagOutputFiles.saveTaggedPDF(taggedPDFPath);
             autotagOutputFiles.saveReport(reportPath);

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }
}
```

## Generate tagged pdf of version 2.0 from a PDF and shift its headings

Use the sample below to generate tagged pdf of version 2.0 from a PDF and shift its headings.

Copy this command in terminal to run the sample:
```
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithV20AndShiftHeadings 
```

Sample code:

<CodeBlock slots="heading, code" repeat="1" languages="Java" /> 

#### Java

```javascript 
public class AutotagPDFWithV20AndShiftHeadings {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithV20AndShiftHeadings.class);

    public static void main(String[] args) {

        try {

             // Initial setup, create credentials instance.
             Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                      .fromFile("pdfservices-api-credentials.json")
                      .build();

             //Create an ExecutionContext using credentials and create a new operation instance.
             ExecutionContext executionContext = ExecutionContext.create(credentials);

             AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

             // Provide an input FileRef for the operation and take the name of the input file to be used in output file
             String filename = "src/main/resources/autotagPdfInput.pdf";
             FileRef source = FileRef.createFromLocalFile(filename);
             autotagPDFOperation.setInputFile(source);

             //Extract the name of the input file to be used in saving output file with same name
             String inputFileName = filename.substring(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

             // Build AutotagPDF options and set them into the operation
             AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                      .pdfVersion(PDFVersion.v20)
                      .shiftHeadings()
                      .build();
             autotagPDFOperation.setOptions(autotagPDFOptions);

             // Execute the operation
             AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

             // Save the output files at the specified location
             String outputDirectory = "output/AutotagPDFWithV20AndShiftHeadings/";
             String taggedPDFPath = outputDirectory +inputFileName+ "-taggedPDF.pdf";

             autotagOutputFiles.saveTaggedPDF(taggedPDFPath);

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
              System.out.println(e);
        }
    }
}
```