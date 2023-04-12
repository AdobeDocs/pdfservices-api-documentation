---
title: PDF Accessibility Auto-Tag API Output Format  | How Tos | PDF Accessibility Auto-Tag API | Adobe PDF Services
---
# PDF Accessibility Auto-Tag API Output Format 


The output of PDF Accessibility Auto-Tag API contains the following:

- The version 1.7 tagged PDF file with headings shifted if the option of shift headings is set.
- A report in XLSX format, which provides information related to tagging of the document. This will be generated if report generation is enabled.

## API limitations

<br />
<ul>
<li> <b>File size:</b> Files up to a maximum of 100MB are supported.</li>
<li><b>Number of Pages:</b> Non-scanned PDFs up to 200 pages and scanned PDFs up to 100 pages are supported, however limits may be lower for files with a large number of tables.</li>
<li><b>Rate limits:</b> Keep request rate below 25 requests per minutes.</li>
<li><b>Page Size:</b> The API supports standard page sizes not to exceed 17.5” or less than 6” in either dimension.</li>
<li><b>Hidden Objects:</b> PDF files that contain content that is not visible on the page like javascript, OCG (optional content groups), etc are not supported. Files that contain such hidden information may fail to process. For such cases, [removing hidden content](https://helpx.adobe.com/acrobat/using/removing-sensitive-content-pdfs.html) prior to processing files again may return a successful result.</li>
<li><b>Language:</b> The API is currently optimized for English language content. Files containing content in other Latin languages should return good results, but may have issues with non-English punctuation.</li>
<li><b>OCR and Scan quality:</b> The quality of text extracted from scanned files is dependent on the clarity of content in the input file. Conditions like skewed pages, shadowing, obscured or overlapping fonts, and page resolution less than 200 DPI can all result in lower quality text output.</li>
<li><b>Form fields:</b> Files containing XFA and other fillable form elements are not supported.</li>
<li><b>Unprotected files:</b> The API supports files that are unprotected or where security restrictions allow copying of content. Files that are secured and do not allow copying of content will not be processed.</li>
<li><b>Annotations:</b> Content in PDF files containing annotations such as highlights and sticky notes will be processed, but annotations that obscure text could impact output quality. Text within annotations will not be included in the output.</li>
<li><b>PDF Producers:</b> The Extract API is designed to extract content from files that contain text, table data, and figures. Files created from applications that produce other types of content like illustrations, CAD drawings or other types of vector art may not return quality results.</li>
<li><b>PDF Collections:</b> PDFs that are made from a collection of files including PDF Portfolios are not currently supported.</li>
</ul>

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

