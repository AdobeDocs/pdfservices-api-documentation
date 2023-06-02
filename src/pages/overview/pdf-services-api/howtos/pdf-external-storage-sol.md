---
title: Adobe PDF Services APIs with External Storage | Adobe PDF Services
---
# Overview

## **Adobe PDF Services APIs with External Storage (Supported only for Document Generation API)**

Adobe PDF Services API have added a support of accessing files from the external storage of the client directly. Client can simply invoke the PDF Services API with Signed URLs and files will be automatically fetched from their storage by our services.

**Signed URIs:** A signed URL is a URL that provides limited permission and time to make a request. Signed URLs contain authentication information in their query string, allowing users without credentials to perform specific actions on a resource. We can generate a download and upload the pre-signed URL of a file and share it with the required entity.

PDF Services API supports the passing of signed URLs of input and output files in the request body. Please refer here for API specs.

<InlineAlert slots="text"/>

Accessing files from External Storage is presently restricted to the Document Generation API. Future releases of APIs will include the support of external storage connector across all operations.

## Supported External Storage Solutions

The concept of Signed URLs is common across various cloud storage solutions for downloading and uploading files. Adobe PDF Services for now, only supports the signed URLs generated from
- Sharepoint
- Amazon S3

Any other Storage solution's Signed URLs will not work with PDF Services and will fail the API operation.

## Sharepoint Storage
For clients having SharePoint storage for their documents, PDF Services API will connect directly with Sharepoint to download and upload the files using SharePoint Signed URLs. Signed URLs for Sharepoint files can be done using Sharepoint REST API V1 or Sharepoint REST API V2 or Microsoft Graph. Microsoft Graph can be used to connect to SharePoint using SharePoint API in Microsoft Graph.

For more details please refer 
- [Sharepoint REST API V1](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom)
- [Sharepoint REST API V2](https://learn.microsoft.com/en-us/sharepoint/dev/apis/sharepoint-rest-graph)
- [Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview)

## Amazon S3 Storage

Amazon S3 supports pre-signed URLs for downloading and uploading objects to and from S3 buckets without AWS security credentials or permissions.

Refer [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) for more details.

## Invoking PDF Services API with Signed URLs


- PDF Services API supports different request schema for supporting external storage solutions using _Input_ and _Output_ request params. For more details click [here](../../../apis/#tag/Document-Generation).




