# PDF Accessibility Auto-Tag API

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
| Error                         | ERROR                         | ERROR - Unable to auto-tag content. Internal error.                                                      |
| Disqualified                  | DISQUALIFIED                  | DISQUALIFIED - File not suitable for auto-tagging.                                                       |
| Disqualified Page Limit       | DISQUALIFIED_PAGE_LIMIT       | File exceeds page limit.                                                                                 |
| Disqualified XFA              | DISQUALIFIED_XFA              | File contains XFA form(s). Not supported for auto-tagging.                                               |
| Disqualified Scan Page Limit  | DISQUALIFIED_SCAN_PAGE_LIMIT  | Scanned page exceeds page limit.                                                                         |
| Disqualified File Size        | DISQUALIFIED_FILE_SIZE        | File exceeds size limit.                                                                                 |
| Disqualified Permissions      | DISQUALIFIED_PERMISSIONS      | File permissions do not allow for auto-tagging.                                                          |
| Disqualified Complex File     | DISQUALIFIED_COMPLEX_FILE     | File contents are too complex for auto-tagging.                                                          |
| Bad PDF                       | BAD_PDF                       | BAD_PDF - Unable to auto-tag content. File is corrupted, malformed or an empty PDF.                      |
| Protected PDF                 | PROTECTED_PDF                 | PROTECTED_PDF - Unable to auto-tag content. File is password protected.                                  |
| Invalid Plan Code             | INVALID_PLAN_CODE             | Unauthorized to execute this operation. User is not enrolled to plans allowed for the service.           |
| Bad Input Parameters          | BAD_INPUT_PARAMS              | Invalid input parameters                                                                                 |

## Generate tagged PDF with version 1.7 along with an XLSX report and shift the headings in the output PDF file

The sample below generate tagged PDF of version 1.7 along with an XLSX report and shift the headings in the output PDF file.


<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
  
```

#### .NET

```javascript

```

#### Node JS

```javascript

```

#### Python

```python
# Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
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
            .with_pdf_version(PdfVersion.v17)\
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

#### Rest API

```javascript

```

## Generate tagged PDF from a PDF

The sample below generates tagged PDF from a PDF.


<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
  
```

#### .NET

```javascript

```

#### Node JS

```javascript

```

#### Python

```python
# Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
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

#### Rest API

```javascript

```

## Generates tagged PDF by setting options with command line arguments

The sample below generates tagged PDF by setting options through command line arguments

Here is a sample list of command line arguments and their description:
--input < input file path >
--output < output file path >
--report { If this argument is present then the output will be generated with the report }
--shift_headings { If this argument is present then the headings will be shifted in the output PDF file }


<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, Rest API" /> 

#### Java

```javascript 
  
```

#### .NET

```javascript

```

#### Node JS

```javascript

```

#### Python

```python
# Get the samples from http://www.adobe.com/go/pdftoolsapi_python_sample
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

#### Rest API

```javascript

```
