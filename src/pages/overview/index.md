---
title: Document Services APIs 
---

# Introduction


## What are Document Services APIs?

Increasingly content and application owners are looking for easy-to-use PDF functionality when building modern web experiences. They are looking to cloud-based platforms with simple and reliable plug-and-play services.

Adobe Document Services has four main APIs: the Adobe PDF Services API , the Adobe PDF Embed API, the Adobe Document Generation API and Adobe PDF Extract API. The latter two APIs and their SDKs are bundled into Adobe PDF Services API as part of a paid offering. PDF Embed API is a free offering. These APIs automate the generation, manipulation, and transformation of document content via a set of modern cloud-based web services. They help you deliver simpler, faster, and branded experiences so that you control user interaction with your documents, streamline PDF workflows and promote usage and retention.

With tools and language support that caters to developers’ existing skill sets, you can now create compelling and consistent PDF experiences, including viewing, exporting, creating and working with PDFs.

These APIs represent a paradigm shift in the way PDF workflows exist and interact with your environment and digital documents. Adobe is rapidly evolving and expanding the portfolio of APIs to support additional use cases. We are also continually enhancing the APIs, including supporting SDKs, sample code, and documentation.

## PDF Embed API for viewing and collaboration within your web pages

The [PDF Embed API](pdf-embed-api) brings PDF viewing to any web application with only a few lines of JavaScript. Multiple embed modes make it easy to support different views, from full browser to boxed containers and in line. Document collaboration is achieved with support for commenting, drawing, highlighting, and text editing tools. Analytics insights provide an opportunity to embed dynamic interactivity to enhance end-user experiences with chats, prompts, and other with event triggers based on PDF viewing activity.

## PDF Services API to automate for your document workflows

The [PDF Services API](pdf-services-api) offers a number of operations to programmatically manipulate documents and automate many different types of document workflows. You can easily create a PDF from a dynamic HTML report, set a password to prevent unauthorized opening of the document, compress it for sharing as an attachment, or extract text, tables, images and document structure to enable downstream solutions. 

There are also capabilities to compress or linearize document for faster web viewing, and to insert, reorder, rotate, replace, and delete pages within documents.

The PDF Services API includes ready-to-use code samples for Java, Node.JS and .NET and offers a [PDF Services free trial that includes up to 1,000 free Document Transactions or runs for 6 months, whichever occurs earlier.](https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api)

The PDF Services API is also available on [Power Automate](https://docs.microsoft.com/en-us/power-automate/) with easy to integrate Power Automate connectors.

## Document Generation API for automating document workflows    

The [Document Generation API](src/pages/overview/document-generation-api) is a cloud-based web service that allows you to produce high fidelity PDF and Word documents with dynamic data inputs. Using Document Generation API, you can merge your data(e.g. JSON file) with Word templates to create dynamic documents for contracts and agreements, invoices, proposals, reports, forms, branded marketing documents and more.

Embed Document Generation API into any application using [PDFServices SDK](pdf-services-api#sdk) for Node.js, .Net, and Java. [Start a Document Generation free trial that includes up to 1,000 free Document transactions or runs for 6 months, whichever occurs earlier.](https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=document-generation-api)

## PDF Extract API for extracting pdf structure and information

The [PDF Extract API (included with the PDF Services API)](pdf-extract-api/index.md) is a cloud-based web service that uses Adobe’s Sensei AI technology to automatically extract content and structural information from PDF documents – native or scanned – and to output it in a structured JSON format. The service extracts text, complex tables, and figures as follows:

* Text is extracted in contextual blocks – paragraphs, headings, lists, footnotes, etc. – and includes font, styling, and other text formatting information.

* Tables are extracted and parsed with the contents and table formatting information delivered for each cell. The service automatically identifies table cells that span multiple rows or columns. Table data is delivered within the resulting JSON and can also optionally be output in CSV and XLSX files. Tables are also output as PNG images allowing the table data to be visually validated.

* Objects that are identified as figures or images are extracted as PNG files.

The JSON output also captures document structure information, such as the natural reading order of the various extracted elements and the layout of the elements on each given page.

The PDF Extract API provides a method for developers to extract and structure content for use in a number of downstream applications including content republishing, workflow automation, content analysis, and data aggregation, management, and search.

The PDF Extract API can be embedded into any application using the [PDFServices SDK](./pdf-services-api/index.md#sdk) for Node.js, Python, and Java. [Start a PDF Extract free trial that includes up to 1,000 free Document transactions or runs for 6 months, whichever occurs earlier.](https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-extract-api)

## <span align="center" style="color:red;font-size:15px;vertical-align:middle;border:1px solid;padding-left:2px;padding-right:2px;"><b>Available under Early Access Program</b></span><br/> PDF Accessibility Auto-Tag API for improving accessibility in PDFs

PDF Accessibility Auto-Tag API is a powerful tool that may be used as part of the process of improving accessibility in individual PDFs and can be applied at scale for large backlogs of PDFs. Auto-tagging adds document structure tags to the PDF file that are used to read a document's text and present it in a way that makes sense to users using assistive technology. Part of the Adobe PDF Services API offering, it is available as a REST-powered SDK with underlying Sensei AI and is easily called by automated workflows.

Automatic tagging is a good first step on a document’s journey to full accessibility. It provides significant quality improvements over untagged PDF files including more accurate results for heading levels, reading order, complex lists, links, references, and tables. Screen reader users also benefit significantly from the improvements to heading levels for navigation.The service replaces any existing tags within your document, so it provides the most benefit for PDFs that have no tags or low-quality tags. An optional Excel report generated by the PDF Accessibility Auto-Tag service provides information related to the tagging of the document and helps to find content that you might need to review or correct.

The output from the API is a tagged PDF, but it is not guaranteed to fully comply with accessibility standards such as WCAG and PDF/UA, as you may need to perform further downstream remediation and it is your responsibility to seek independent review of the same to meet those standards. After auto-tagging, to further improve accessibility, you may use Adobe Acrobat Pro to add alt-text to all figures and review the tagging of complex tables. Next you should check the first page and how the title is identified, the reading order, and then run the accessibility report, resolving any errors.

You can learn more about PDF Accessibility in [this Overview](https://www.adobe.com/accessibility/pdf/pdf-accessibility-overview.html).

## Community forum and feedback

Customer feedback is particularly valuable as it helps the team validate use cases, guide development, and troubleshoot issues. Comments and questions are always welcome on the [Community Forum](https://community.adobe.com/t5/document-cloud-sdk/bd-p/Document-Cloud-SDK?page=1&sort=latest_replies&filter=all).
