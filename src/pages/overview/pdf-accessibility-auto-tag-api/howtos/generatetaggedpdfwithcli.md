---
title: Generate Tagged PDF from a PDF  | How Tos | PDF Accessibility Auto-Tag API | Adobe PDF Services
---
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
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta
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
            autotag_pdf_output: AutotagPDFOutput = autotag_pdf_operation.execute(execution_context)

            input_file_name = Path(self._input_path).stem
            base_output_path = self._output_path

            Path(base_output_path).mkdir(parents=True, exist_ok=True)

            # Save the result to the specified location.
            tagged_pdf_path = f'{base_output_path}/{input_file_name}-tagged.pdf'
            autotag_pdf_output.get_tagged_pdf().save_as(tagged_pdf_path)
            if self._generate_report:
                report_path = f'{base_output_path}/{input_file_name}-report.xlsx'
                autotag_pdf_output.get_report().save_as(report_path)

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')


if __name__ == "__main__":
    autotag_pdf_parameterised = AutotagPDFParameterised()
    autotag_pdf_parameterised.execute()
```
