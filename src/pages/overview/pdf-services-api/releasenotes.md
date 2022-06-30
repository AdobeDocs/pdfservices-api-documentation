# Release Notes

This document describes the change history across releases for supported
versions. For details regarding versioning and support policies, see
[Version - Support policy](../pdf-services-api/policies.md).

## Supported versions

This document as well as the URLs on Adobe's website and other
documentation link to the latest product version.

**Note**: Links to repository assets (e.g. GIT, Maven, etc.) direct to
the top level directory. To download assets that match the
documentation, navigate to the correct version. For example, When using
the 1.0.0 Java documentation, you can find the 1.0.0 samples in the GIT
repo as follows:

1.  Go to the [GIT repo](https://www.adobe.com/go/pdftoolsapi_java_samples).
2.  Select *Releases*.
3.  Select and download the needed release.

![Previous Release tags with release notes and links to the assets](../images/prevrelease.png)

## Migration Guide to PDF Services SDK

Refer to the following table for migrating to PDF Services SDK version
2.1.0, you can also refer our Samples(
[Java](https://www.adobe.com/go/pdftoolsapi_java_samples), [Node
JS](https://www.adobe.com/go/pdftoolsapi_node_sample),
[.NET](https://www.adobe.com/go/pdftoolsapi_net_samples)). for the
latest release.

<InlineAlert slots="text"/>

The 1.X.X versions of PDF Tools SDK will be reaching End of Life in
May 2022. Once a version reaches its end of life, functionality may be
deprecated and stop working. Please upgrade to use our latest SDK
version.

### Java changes

* `artifactId` changed from `pdftools-sdk` to `pdfservices-sdk`
* Replace the `<properties>` tag and SDK `<dependency>` tag in your project’s `pom.xml` file with the following:

```
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <pdfservices.sdk.version>2.1.0</pdfservices.sdk.version>
    <pdfservices.sdk.samples.version>2.1.0</pdfservices.sdk.samples.version>
</properties>

<dependency>
    <groupId>com.adobe.documentservices</groupId>
    <artifactId>pdfservices-sdk</artifactId>
    <version>${pdfservices.sdk.version}</version>
</dependency>
```

* Update import statements as per new Package structure. For e.g.

```
import com.adobe.pdfservices.operation.ExecutionContext; 
```

### Node JS changes

* NPM package name changed from `@adobe/documentservices-pdftools-node-sdk` to `@adobe/pdfservices-node-sdk`
* Update the latest SDK dependency in package.json file of your project
 
```
"@adobe/pdfservices-node-sdk": "2.1.0"
```

* Require the `@adobe/pdfservices-node-sdk` in the Sample file to access the SDK interface

```
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk'); 
```

	
For HTML to PDF Conversions, the PageLayout object is moved inside html object. To access the PageLayout interface use the following code:

```
const pageLayout = new PDFServicesSdk.CreatePDF.options.html.PageLayout(); 
```

### .NET changes

* Nuget package name changed from `Adobe.DocumentServices.PDFTools` to `Adobe.PDFServicesSDK`
* Update the SDK dependency in your project’s .csproj file with the following:

```
<ItemGroup>
    <PackageReference Include="log4net" Version="2.0.12" />
    <PackageReference Include="Adobe.PDFServicesSDK" Version="2.1.0" />
</ItemGroup> 
```

* Update the namespaces accordingly in your .cs file as per the new dependency: 
```javascript
using Adobe.PDFServicesSDK;
```  

## Documentation library

Refer to the following for links to supported product documentation.

| Item  | Public doc                                                                |
| ----- | ------------------------------------------------------------------------- |
| 2.1.0 | [Web page(2.1.0 docs)](https://opensource.adobe.com/pdftools-sdk-docs/release/2.1.0/) |
| 2.0.0 | [Web page(2.0.0 docs)](https://opensource.adobe.com/pdftools-sdk-docs/release/2.0.0/) |
| 1.3.0 | [Web page(1.3.0 docs)](https://opensource.adobe.com/pdftools-sdk-docs/release/1.3.0/) |
| 1.2.0 | [Web page(1.2.0 docs)](https://opensource.adobe.com/pdftools-sdk-docs/release/1.2.0/) |
| 1.1.0 | [Web page(1.1.0 docs)](https://opensource.adobe.com/pdftools-sdk-docs/release/1.1.0/) |
| 1.0.0 | [Web page(1.0.0 docs)](https://opensource.adobe.com/pdftools-sdk-docs/release/1.0.0/) |

## Change types

Change types include the following:

-   **New**: Features or implementation changes added in the current
 release.
-   **Changed**: Modified code that changes a feature or implementation
 detail.
-   **Security**: A patch or bug fixed released in an out-of-band patch.
-   **Deprecated**: Existing functionality for which support is ending
 (or ended).

<InlineAlert slots="text" />

The new release is backward compatible with the previous release.
Upgrading to the latest SDK should not break existing applications.

## Change history

### Extract PDF Server Side Release (21 June, 2022; server side release)
| Change  | Language            | Description                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------- |
| Changed | All                 | Enhanced error messages by adding more sub error codes							            |
| Changed | All                 | Bug fixes and stability improvements.								|

### Extract PDF Server Side Release (16 May, 2022; server side release)
| Change  | Language            | Description                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------- |
| Changed | All                 | Bug fixes and stability improvements.								|

### 2.2.2 (May, 2022; patch release)
| Change  | Language            | Description                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------- |
| Changed | Java, NodeJS               | Dependent library upgrades to address vulnerabilities reported in NPM and Maven.                                               |

### Create PDF Server Side Release (6 April, 2022; server side release)
| Change  | Language            | Description                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------- |
| Changed | All                 | Enhanced support for leveraging embedded TrueType fonts.                                               |

### Extract PDF Server Side Release (05 April, 2022; server side release)
| Change  | Language            | Description                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------- |
| Changed | All                 | Improved handling of bad PDFs with 50% reduction in frequency of bad PDF errors and improved successful conversion rate.                                                        |
| Changed | All                 | Bug fixes and stability improvements.                                                         |

### 2.2.1 (March, 2022; patch release)
| Change  | Language            | Description                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------- |
| Changed | .NET                | Dependent library upgrades and SDK internal additional validation checks.  |

### Extract PDF Server Side Release (22 February, 2022; server side release)
| Change  | Language            | Description                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------- |
| Changed | All                 | Adding support for identification of scanned pages with "is_scanned" field in Extract output. |
| Changed | All                 | Bug fixes and stability improvements.                                                         |

### 2.2.1 (February, 2022; patch release)

| Change  | Language            | Description                                                                                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Changed | Java                | Dependent library upgrades.  |


### 2.2.1 (January, 2022; patch release)

| Change  | Language            | Description                                                                                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Changed | Node JS             | Enhanced Document Generation interface to support Json Object and Json array as Fragments data.   |

### 2.2.0 (January, 2022; minor release)

| Change  | Language            | Description                                                                                                                                                   |
| ------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New     | All                 | Adding support for [fragments](../document-generation-api/fragments.md#) feature.                                                                             |
| Changed | Java                | Java SDK is enabled to connect to Internet through Proxy where proxy server settings can be set via client config. |
| Changed | All                 | PDF Extract API bug fixes and stability release. |

### Adobe Document Generation Server Side Release (10 January, 2022; server side release)

| Change  | Language | Description                                                                                                                                                              |
| ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New     | All      | Adding support for [fragments](../document-generation-api/fragments.md#) feature.                                                                                        |
| Changed     | All      | Adding support to add [images](../document-generation-api/templatetags.md#images) (only base64 encoded image data was supported initially) through publicly accessible URLs.     |
| Changed     | All      | Adding support for primitive type [list](../document-generation-api/templatetags.md#lists)

### Adobe Document Generation Server Side Release (14 December, 2021; server side release)

| Change  | Language | Description                                                                                                                                                              |
| ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New     | All      | Adding support for additional tags (<strong\> and <em\>) in [styling and formatting](../document-generation-api/stylingformattingtags.md#apply-styling-and-formatting) feature.                                                                               |
| New     | All      | Support for [dynamic table constructs](../document-generation-api/dynamictableconstructs.md).     |

### Extract PDF Server Side Release (15 November, 2021; server side release)
| Change  | Language            | Description                                                                                    |
| ------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| Changed | All                 | The option to include styling information is generally available.                              |
| Changed | All                 | Identification of scanned content is now performed at the page level rather than per document. |
| Changed | All                 | Bug fixes and stability improvements.                                                          |

### Adobe Document Generation Server Side Release (20 October, 2021; server side release)

| Change  | Language | Description                                                                                                                                                   |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| New     | All      | HTML [styling and formatting](../document-generation-api/stylingformattingtags.md#apply-styling-and-formatting) support in json data.                                                                               |
| New     | All      | Support for [horizontal tables](../document-generation-api/templatetags.md#dynamically-expand-table-rows-or-columns).     |
| New     | All      | Support for SVG images.                                                                               |

### Extract PDF Server Side Release (29 September, 2021; server side release)
| Change  | Language            | Description|
| ------- | ------------------- | ---------- |
| Changed | All                 | Support for more descriptive error messages and PDF Extract API bug fixes. |

### 2.1.0 (September, 2021; minor release)

| Change  | Language            | Description                                                                                                                                                   |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| New     | .NET                | Extract operation is now available in .NET SDK as part of **Adobe.PDFServicesSDK**.                                                                                |
| New     | Java, Node JS, .NET | Support for fetching the properties of a PDF file - metadata including page count, PDF version, file size, compliance levels, font info, permissions and more.     |
| New     | Java, Node JS, .NET | Support for returning the list of images besides returning ZIP of all image files.                                                                                 |
| New     | Java, Node JS, .NET | Support for converting the content hosted on a URL to PDF files.                                                                                                   |
| New     | Java, Node JS, .NET | Support for converting an HTML file containing inline CSS to PDF files.                                                                                            |

### Extract PDF Server Side Release (26 Aug, 2021; server side release)
| Change  | Language            | Description                                     |
| ------- | ------------------- | ----------------------------------------------- |
| Changed | All                 | PDF Extract API bug fixes and stability release |

### 2.0.0 (May, 2021; major release)

| Change  | Language | Description                                                                                                    |
| ------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| New     | All      | Extract operation released as part of **pdfservices-sdk**                                                      |
| Changed | Java     | artifactId changed from pdftools-sdk to **pdfservices-sdk**                                                    |
| Changed | Node JS  | NPM package name changed from @adobe/documentservices-pdftools-node-sdk to **@adobe/pdfservices-node-sdk**     |
| Changed | Node JS  | For HTML to PDF Conversions, the PageLayout object interface is moved inside html object.                      |
| Changed | .NET     | Nuget package name changed from Adobe.DocumentServices.PDFTools to **Adobe.PDFServicesSDK**                    |
| New     | Python   | Python SDK “pdfservices-sdk” v1.0 is released for ML Services which consists of ExtractPDFOperation currently. |

### 1.3.0 (March, 2021; minor release)

| Change | Language | Description                                                                                                                                                      |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New    | All      | Added a feature to the create PDF operation to specify the document language of input file.                                                                      |
| New    | All      | Added Document Merge Operation that merges a Word based document template with the input JSON data to generate the output document in either Word or PDF format. |
| New    | All      | Added support to get the developer error codes in exceptions.                                                                                                    |
| New    | All      | Added a feature to the compress PDF operation to reduce the file size based on compression level.                                                                |

### 1.2.0 (September, 2020; minor release)

| Change | Language | Description                                                                                                                                                               |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New    | All      | Added more features to the password-protect operation to secure a PDF with an owner password and to enable users to restrict features like printing, editing and copying. |
| New    | All      | Added an operation for removing password protection from a PDF.                                                                                                           |
| New    | All      | Added a split PDF operation that splits a PDF document into multiple smaller documents by simply specifying either the number of files, pages per file, or page ranges.   |

### 1.1.0 (June, 2020; minor release)

| Change  | Language | Description                                                                                                                     |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| New     | All      | Added a password-protect operation to securely open a PDF.                                                                      |
| New     | All      | Added an operation for inserting a PDF file into an existing PDF.                                                               |
| New     | All      | Added a replace file operation which replaces a PDF with another.                                                               |
| New     | All      | Added an operation for deleting pages from a PDF.                                                                               |
| New     | All      | Added a rotate page(s) operation for rotating one or more pages in a PDF.                                                       |
| New     | All      | Added reorder page(s) operation to support rearranging page(s) in a PDF.                                                        |
| New     | All      | Added a compress PDF operation to reduce a PDF file size.                                                                       |
| New     | All      | Added a linearize operation to convert a PDF file into a web optimized PDF file for incremental access in network environments. |
| Changed | All      | Changed the combine file limit from 12 to 20.                                                                                   |

### 1.0.0 (March, 2020; First major release)

| Change | Language | Description                                                                                                                                                  |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| New    | All      | Added create PDF operation to create PDF from Office formats, image formats and HTML (doc, docx, ppt, pptx, xls, xlsx, txt, rtf, bmp, gif, tiff, jpeg, png). |
| New    | All      | Added export PDF operation to export PDF to Office formats and image formats (doc, docx, pptx, rtf, xlsx, jpeg, png).                                        |
| New    | All      | Added combine PDF files operation.                                                                                                                           |
| New    | All      | Added an OCR operation to convert PDF files into a searchable PDF.                                                                                           |
