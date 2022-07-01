# <h1>PDF Accessibility Auto-Tag API<span style="color:red;font-size:15px;margin-left:10px;vertical-align:middle;border:1px solid;padding-left:2px;padding-right:2px"><b>Available under Early Access Program</b></span></h1>

## PDF Accessibility Auto-Tag API Output Format

The output of PDF Accessibility Auto-Tag API contains the following:

- The tagged PDF file of version 1.7 with headings shifted if the option of shift headings is set.
- A report in XLSX format, which provides information related to tagging of the document. This will be generated if report generation is enabled.

## API limitations

- **File size:** Files up to a maximum of 100 MB are supported.
- **Number of Pages:** Non-scanned PDFs up to 200 pages and scanned PDFs up to 100 pages are supported, however limits may be lower for files with a large number of tables.
- **Rate limits:** Keep request rate below 25 requests per minute.
- **Page Size:** The API supports standard page sizes not more than 17.5” or less than 6” in either dimension.
- **Hidden Objects:** PDF files that contain content that is not visible on the page like Javascript, OCG (optional content groups), etc are not supported. Files that contain such hidden information may fail to process. For such cases, [removing hidden content](https://helpx.adobe.com/acrobat/using/removing-sensitive-content-pdfs.html) prior to processing files again may return a successful result.
- **Language:** The API is currently optimized for English language content. Files containing content in French, German, Spanish, Danish, Dutch, Norwegian (Bokmal), Galician, Catalan, Finnish, Italian, Swedish, Portuguese, and Romanian should return good results most of the time. Files containing content in Afrikaans, Bosnian, Croatian, Czech, Hungarian, Indonesian, Malay, Polish, Russian, Serbian, Turkish, Hindi, Marathi and other similar languages should return good results often. Non-English files may have issues with non-English punctuation. OCR is configured for English content.
- **OCR and Scan quality:** The quality of text extracted from scanned files is dependent on the clarity of content in the input file and is currently configured for English content. Conditions like skewed pages, shadowing, obscured or overlapping fonts, and page resolution less than 200 DPI can all result in lower quality text output.
- **Form fields:** Files containing XFA and other fillable form elements are not supported.
- **Unprotected files:** The API supports files that are unprotected or where security restrictions allow editing of content. Files that are secured and do not allow editing of content will not be processed.
- **Annotations:** Content in PDF files containing annotations such as highlights and sticky notes will be processed, but annotations that obscure text could impact output quality. Text within annotations will not be included in the output.
- **PDF Producers:** The PDF Accessibility Auto-Tag API is designed to add tags to PDF to make it easier to make the file accessible. Files created from applications that produce other types of content like illustrations, CAD drawings or other types of vector art may not return high quality results.
- **PDF Collections:** PDFs that are made from a collection of files including PDF Portfolios are not currently supported.

## Error codes

| Scenario                      | Error code                    | Error message                                                                                            |
| ----------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| Unknown error/ failure	    | ERROR                         | Unexpected error                                                                                         |
| Timeout	                    | TIMEOUT		                | Unexpected error: Processing timeout                                                                     |
| Disqualified	                | DISQUALIFIED		            | File is not suitable for conversion                                                                      |
| Unsupported XFA file	        | DISQUALIFIED_XFA	        	| File is not suitable for conversion: File contains an XFA form                                           |
| Page limit violation	        | DISQUALIFIED_PAGE_LIMIT		| File is not suitable for conversion: File exceeds page limit                                             |
| Scan page limit violation	    | DISQUALIFIED_SCAN_PAGE_LIMIT	| File is not suitable for conversion: Scanned file exceeds page limit                                     |
| File size violation	        | DISQUALIFIED_FILE_SIZE		| File is not suitable for conversion: File exceeds size limit                                             |
| Encryption permission	        | DISQUALIFIED_PERMISSIONS		| File is not suitable for conversion: File permissions do not allow conversion                            |
| Complex file	                | DISQUALIFIED_COMPLEX_FILE		| File is not suitable for conversion: File content is too complex                                         |
| Unsupported language	        | DISQUALIFIED_LANGUAGE		    | File is not suitable for conversion: File content language is unsupported                                |
| Bad PDF	                    | BAD_PDF		                | The PDF file is damaged or its content is too complex                                                    |
| Bad PDF file type	            | BAD_PDF_FILE_TYPE		        | The input file is not a PDF file                                                                         |
| Damaged input file	        | BAD_PDF_DAMAGED		        | The input file is damaged                                                                                |
| Complex table	                | BAD_PDF_COMPLEX_TABLE		    | The input file contains a table that is too complex to process                                           |
| Complex content	            | BAD_PDF_COMPLEX_INPUT		    | The input file contains content that is too complex to process                                           |
| Unsupported font	            | BAD_PDF_UNSUPPORTED_FONT		| The input file contains font data that is corrupted or not supported                                     |
| Large PDF file	            | BAD_PDF_LARGE_FILE		    | The input file size exceeds the maximum allowed                                                          |
| Protected PDF	                | PROTECTED_PDF		            | PDF is encrypted or password-protected                                                                   |
| Empty or corrupted input	    | BAD_INPUT		                | Input is corrupted or empty                                                                              |
| Invalid input parameters	    | BAD_INPUT_PARAMS		        | Invalid input parameters                                                                                 |

## Generate tagged PDF with version 1.7 along with an XLSX report and shift the headings in the output PDF file

The sample below generate tagged PDF of version 1.7 along with an XLSX report and shift the headings in the output PDF file.


<CodeBlock slots="heading, code" repeat="2" languages="Java, Python" /> 

#### Java

```javascript 
// Get the samples from https://git.corp.adobe.com/dc/dc-cpf-sdk-java-samples/tree/beta
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFWithOptions 

public class AutotagPDFWithOptions {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithOptions.class);

    public static void main(String[] args) {

        try {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

            // Provide an input FileRef for the operation
            autotagPDFOperation.setInput(FileRef.createFromLocalFile("src/main/resources/autotagPdfInput.pdf"));

            // Build AutotagPDF options and set them into the operation
            AutotagPDFOptions autotagPDFOptions = AutotagPDFOptions.autotagPDFOptionsBuilder()
                    .shiftHeadings()
                    .generateReport()
                    .build();
            autotagPDFOperation.setOptions(autotagPDFOptions);

            // Execute the operation
            AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

            // Save the output files at the specified location
            autotagOutputFiles.saveTaggedPDF("output/AutotagPDFWithOptions-tagged.pdf");
            autotagOutputFiles.saveReport("output/AutotagPDFWithOptions-report.xlsx");


        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }
}
```

#### Python

```python
# Get the samples from https://git.corp.adobe.com/dc/dc-cpf-python-sdk-samples/tree/beta
# Run the sample:
# python src/autotagpdf/autotag_pdf_with_options.py

    logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))

    try:
        # get base path.
        base_path = str(Path(__file__).parents[2])
    
        # Initial setup, create credentials instance.
        credentials = Credentials.service_account_credentials_builder() \
            .from_file(base_path + '/pdfservices-api-credentials.json') \
            .build()
    
        # Create an ExecutionContext using credentials and create a new operation instance.
        execution_context = ExecutionContext.create(credentials)
        autotag_pdf_operation = AutotagPDFOperation.create_new()
    
        # Set operation input from a source file.
        input_file_path = 'autotagPdfInput.pdf'
        source = FileRef.create_from_local_file(base_path + '/resources/' + input_file_path)
        autotag_pdf_operation.set_input(source)
    
        # Build AutotagPDF options and set them into the operation
        autotag_pdf_options: AutotagPDFOptions = AutotagPDFOptions.builder()\
            .with_shift_headings()\
            .with_generate_report()\
            .build()
        autotag_pdf_operation.set_options(autotag_pdf_options)
    
        # Execute the operation.
        autotag_output_files: AutotagPDFOutputFiles = autotag_pdf_operation.execute(execution_context)
    
        input_file_name = Path(input_file_path).stem
        base_output_path = base_path + '/output/AutotagPDFWithOptions/'
    
        Path(base_output_path).mkdir(parents=True, exist_ok=True)
        tagged_pdf_path = f'{base_output_path}{input_file_name}-tagged.pdf'
        report_path = f'{base_output_path}{input_file_name}-report.xlsx'
    
        # Save the result to the specified location.
        autotag_output_files.save_pdf_file(tagged_pdf_path)
        autotag_output_files.save_xls_file(report_path)
    
    except (ServiceApiException, ServiceUsageException, SdkException) as e:
        logging.exception(f'Exception encountered while executing operation: {e}')
```


## Generate tagged PDF from a PDF

The sample below generates tagged PDF from a PDF.

<CodeBlock slots="heading, code" repeat="2" languages="Java, Python" /> 

#### Java

```javascript 
// Get the samples from https://git.corp.adobe.com/dc/dc-cpf-sdk-java-samples/tree/beta
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDF

public class AutotagPDF {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDF.class);

    public static void main(String[] args) {

        try {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

            // Provide an input FileRef for the operation
            autotagPDFOperation.setInput(FileRef.createFromLocalFile("src/main/resources/autotagPdfInput.pdf"));

            // Execute the operation
            AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

            // Save the output files at the specified location
            autotagOutputFiles.saveTaggedPDF("output/AutotagPDF-tagged.pdf");

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }
}  
```

#### Python

```python
# Get the samples from https://git.corp.adobe.com/dc/dc-cpf-python-sdk-samples/tree/beta
# Run the sample:
# python src/autotagpdf/autotag_pdf.py

    logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))
    
    try:
        # get base path.
        base_path = str(Path(__file__).parents[2])
    
        # Initial setup, create credentials instance.
        credentials = Credentials.service_account_credentials_builder() \
            .from_file(base_path + '/pdfservices-api-credentials.json') \
            .build()
    
        # Create an ExecutionContext using credentials and create a new operation instance.
        execution_context = ExecutionContext.create(credentials)
        autotag_pdf_operation = AutotagPDFOperation.create_new()
    
        # Set operation input from a source file.
        input_file_path = 'autotagPdfInput.pdf'
        source = FileRef.create_from_local_file(base_path + '/resources/' + input_file_path)
        autotag_pdf_operation.set_input(source)
    
        # Execute the operation.
        autotag_output_files: AutotagPDFOutputFiles = autotag_pdf_operation.execute(execution_context)
    
        input_file_name = Path(input_file_path).stem
        base_output_path = base_path + '/output/AutotagPDF/'
    
        Path(base_output_path).mkdir(parents=True, exist_ok=True)
        tagged_pdf_path = f'{base_output_path}{input_file_name}-tagged.pdf'
    
        # Save the result to the specified location.
        autotag_output_files.save_pdf_file(tagged_pdf_path)
    
    except (ServiceApiException, ServiceUsageException, SdkException) as e:
        logging.exception(f'Exception encountered while executing operation: {e}')
```

## Generates tagged PDF by setting options with command line arguments

The sample below generates tagged PDF by setting options through command line arguments.

Here is a sample list of command line arguments and their description:
- --input < input file path >
- --output < output file path >
- --report { If this argument is present then the output will be generated with the report }
- --shift_headings { If this argument is present then the headings will be shifted in the output PDF file }


<CodeBlock slots="heading, code" repeat="2" languages="Java, Python" /> 

#### Java

```javascript 
// Get the samples from https://git.corp.adobe.com/dc/dc-cpf-sdk-java-samples/tree/beta
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFParamaterised -Dexec.args="--report --shift_headings --input src/main/resources/autotagPdfInput.pdf --output output/"

public class AutotagPDFParamaterised {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFWithOptions.class);

    public static void main(String[] args) {
        LOGGER.info("--input " + getInputFilePathFromCmdArgs(args));
        LOGGER.info("--output " + getOutputFilePathFromCmdArgs(args));
        LOGGER.info("--report " + getGenerateReportFromCmdArgs(args));
        LOGGER.info("--shift_headings " + getShiftHeadingsFromCmdArgs(args));

        try {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);

            AutotagPDFOperation autotagPDFOperation = AutotagPDFOperation.createNew();

            // Set input for operation from command line args
            autotagPDFOperation.setInput(FileRef.createFromLocalFile(getInputFilePathFromCmdArgs(args)));

            // Get and Build AutotagPDF options from command line args and set them into the operation
            AutotagPDFOptions autotagPDFOptions = getOptionsFromCmdArgs(args);
            autotagPDFOperation.setOptions(autotagPDFOptions);

            // Execute the operation
            AutotagOutputFiles autotagOutputFiles = autotagPDFOperation.execute(executionContext);

            // Save the output files at the specified location
            String outputPath = getOutputFilePathFromCmdArgs(args);
            autotagOutputFiles.saveTaggedPDF(outputPath + "AutotagPDFParameterised-tagged.pdf");
            if (autotagPDFOptions != null && autotagPDFOptions.isGenerateReport())
                autotagOutputFiles.saveReport(outputPath + "AutotagPDFParameterised-report.xlsx");

        } catch (ServiceApiException | IOException | ServiceUsageException e) {
            System.out.println(e);
        }
    }

    private static AutotagPDFOptions getOptionsFromCmdArgs(String[] args) {
        Boolean generateReport = getGenerateReportFromCmdArgs(args);
        Boolean shiftHeadings = getShiftHeadingsFromCmdArgs(args);

        AutotagPDFOptions.Builder builder = AutotagPDFOptions.autotagPDFOptionsBuilder();

        if (generateReport)
            builder.generateReport();
        if (shiftHeadings)
            builder.shiftHeadings();

        return builder.build();
    }

    private static Boolean getShiftHeadingsFromCmdArgs(String[] args) {
        return Arrays.asList(args).contains("--shift_headings");
    }

    private static Boolean getGenerateReportFromCmdArgs(String[] args) {
        return Arrays.asList(args).contains("--report");
    }

    private static String getInputFilePathFromCmdArgs(String[] args) {
        String inputFilePath = "src/main/resources/autotagPdfInput.pdf";
        int inputFilePathIndex = Arrays.asList(args).indexOf("--input");
        if (inputFilePathIndex >= 0 && inputFilePathIndex < args.length - 1) {
            inputFilePath = args[inputFilePathIndex + 1];
        } else
            LOGGER.info("input file not specified, using default value : autotagPdfInput.pdf");

        return inputFilePath;
    }

    private static String getOutputFilePathFromCmdArgs(String[] args) {
        String outputFilePath = "output/";
        int outputFilePathIndex = Arrays.asList(args).indexOf("--output");
        if (outputFilePathIndex >= 0 && outputFilePathIndex < args.length - 1) {
            outputFilePath = args[outputFilePathIndex + 1];
        } else
            LOGGER.info("output path not specified, using default value : output/");

        return outputFilePath;
    }
} 
```

#### Python

```python
# Get the samples from https://git.corp.adobe.com/dc/dc-cpf-python-sdk-samples/tree/beta
# Run the sample:
# python src/autotagpdf/autotag_pdf_parameterised.py --report --shift_headings --input resources/autotagPdfInput.pdf --output output/

    logging.basicConfig(level=os.environ.get('LOGLEVEL', 'INFO'))

 
    class AutotagPDFParameterised:
    
        _input_path: str
        _output_path: str
        _generate_report: bool
        _shift_headings: bool
    
        base_path = str(Path(__file__).parents[2])
    
        def __init__(self):
            pass
    
        @staticmethod
        def parse_args(*args: str):
            if not args:
                args = sys.argv[1:]
            parser = argparse.ArgumentParser(description='Autotag PDF')
    
            parser.add_argument('--input', help='Input file path', type=Path, metavar='input')
            parser.add_argument('--output', help='Output path', type=Path, dest='output')
            parser.add_argument('--report', dest='report', action='store_true', help='Generate report(in XLSX format)',
                                default=False)
            parser.add_argument('--shift_headings', dest='shift_headings', action='store_true', help='Shift headings',
                                default=False)
    
            return parser.parse_args(args)
    
        def get_default_input_file_path(self) -> str:
            return self.base_path + '/resources/autotagPdfInput.pdf'
    
        def get_default_output_file_path(self) -> str:
            return self.base_path + '/output/AutotagPDFParameterised'
    
        def get_autotag_pdf_options(self) -> AutotagPDFOptions:
            shift_headings = self._shift_headings
            generate_report = self._generate_report
    
            builder: AutotagPDFOptions.Builder = AutotagPDFOptions.builder()
            if shift_headings:
                builder.with_shift_headings()
            if generate_report:
                builder.with_generate_report()
            return builder.build()
    
        def execute(self, *args: str) -> None:
            args = self.parse_args(*args)
            self._input_path = args.input if args.input else self.get_default_input_file_path()
            self._output_path = args.output if args.output else self.get_default_output_file_path()
            self._generate_report = args.report
            self._shift_headings = args.shift_headings
    
            self.autotag_pdf()
    
        def autotag_pdf(self):
            try:
                # Initial setup, create credentials instance.
                credentials = Credentials.service_account_credentials_builder() \
                    .from_file(self.base_path + '/pdfservices-api-credentials.json') \
                    .build()
    
                # Create an ExecutionContext using credentials and create a new operation instance.
                execution_context = ExecutionContext.create(credentials)
                autotag_pdf_operation = AutotagPDFOperation.create_new()
    
                # Set operation input from a source file.
                source = FileRef.create_from_local_file(self._input_path)
                autotag_pdf_operation.set_input(source)
    
                # Build AutotagPDF options and set them into the operation
                autotag_pdf_operation.set_options(self.get_autotag_pdf_options())
    
                # Execute the operation.
                autotag_output_files: AutotagPDFOutputFiles = autotag_pdf_operation.execute(execution_context)
    
                input_file_name = Path(self._input_path).stem
                base_output_path = self._output_path
    
                Path(base_output_path).mkdir(parents=True, exist_ok=True)
    
                # Save the result to the specified location.
                tagged_pdf_path = f'{base_output_path}/{input_file_name}-tagged.pdf'
                autotag_output_files.save_pdf_file(tagged_pdf_path)
                if self._generate_report:
                    report_path = f'{base_output_path}/{input_file_name}-report.xlsx'
                    autotag_output_files.save_xls_file(report_path)
    
            except (ServiceApiException, ServiceUsageException, SdkException) as e:
                logging.exception(f'Exception encountered while executing operation: {e}')
    
    
    if __name__ == "__main__":
        autotag_pdf_parameterised = AutotagPDFParameterised()
        autotag_pdf_parameterised.execute()
```
