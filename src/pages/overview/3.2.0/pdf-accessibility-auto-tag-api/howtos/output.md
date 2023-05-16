---
title: PDF Accessibility Auto-Tag API Output Format  | How Tos | PDF Accessibility Auto-Tag API | Adobe PDF Services
---
# PDF Accessibility Auto-Tag API Output Format 


The output of PDF Accessibility Auto-Tag API contains the following:

- The tagged PDF file with headings shifted if the option of shift headings is set.
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
| User not enrolled to allowed Atlas plans | INVALID_PLAN_CODE | Unauthorized to execute this operation. User is not enrolled to plans allowed for the service  | 

