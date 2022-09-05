# Overview
<p>

**What is Extract?**

[The PDF Extract API (included with the PDF Services API)](./howtos/extract-api.md) is a cloud-based web service that uses Adobe’s Sensei AI technology to automatically extract content and structural information from PDF documents – native or scanned – and to output it in a structured JSON format. The service extracts text, complex tables, and figures as follows:

- Text is extracted in contextual blocks – paragraphs, headings, lists, footnotes, etc. – and includes font, styling, and other text formatting information.
- Tables are extracted and parsed with the contents and table formatting information delivered for each cell. The service automatically identifies table cells that span multiple rows or columns. Table data is delivered within the resulting JSON and can also optionally be output in CSV and XLSX files. Tables are also output as PNG images allowing the table data to be visually validated.
- Objects that are identified as figures or images are extracted as PNG files.

The JSON output also captures document structure information, such as the natural reading order of the various extracted elements and the layout of the elements on each given page.

The PDF Extract API provides a method for developers to extract and structure content for use in a number of downstream applications including content republishing, content processing, data analysis, and content aggregation, management, and search.

The PDF Extract API can be embedded into any application using the [PDFServices SDK](../pdf-services-api/index.md) for Node.js, Python, .NET and Java. [Start a free trial that includes up to 1,000 free Document transactions or runs for 6 months, whichever occurs earlier.](https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-extract-api)

</p>

## Extract Process

![PDF Extract Process : PDF containing title, image, header, paragraph, list and table and provide output as json, png and csv files to client applications](../images/extract_process_21.png)
