---
title: External Storage for Adobe PDF Services APIs | Adobe PDF Services
---
# Overview

## **External Storage for Adobe PDF Services APIs**

Adobe PDF Services APIs have added support for accessing files from the external storage of the client directly. The client can invoke the PDF Services API with Signed URLs and files will be automatically accessed from their storage.

A **Signed URL** temporarily provides access to a resource. Signed URLs contain user/authentication information, allowing users without credentials to access the given resource.

PDF Services APIs supports the signed URLs of input and output files in the request body. Please refer to the **External Section** in Request Body of each API for more details.

<InlineAlert slots="text"/>

<div>
Accessing files from External Storage is currently <b>not</b> supported in the following APIs
<ul>
    <li> <a href="../../../apis/#tag/PDF-Accessibility-Auto-Tag">PDF Accessibility Auto Tag</a> </li>
    <li><a href="../../../apis/#tag/Extract-PDF">Extract PDF</a></li>
    <li><a href="../../../apis/#tag/PDF-Electronic-Seal">PDF Electronic Seal</a> </li>
    <li><a href="../../../apis/#tag/Split-PDF">Split PDF</a> </li>
</ul>
</div>

## Supported External Storage Solutions

The concept of Signed URLs is common across various cloud storage solutions for downloading and uploading files. Adobe PDF Services APIs currently supports the signed URLs generated through -
- [SharePoint](#sharepoint)
- [Amazon S3](#amazon-s3)
- [Dropbox](#dropbox)
- [Azure Blob](#azure-blob)


### SharePoint

PDF Services APIs can connect with SharePoint using Signed URIs for downloading and uploading the files from SharePoint site. 

#### Supported URL Prefixes

- `https://<tenant-name>.sharepoint.com`

Please refer [here](https://learn.microsoft.com/en-us/graph/overview) for more details.

### Amazon S3

PDF Services APIs can connect with Amazon S3 using Signed URIs for downloading and uploading the files from S3 buckets without AWS security credentials or permissions.

#### Supported URL Prefixes:

- `https://<bucket-name>.s3.amazonaws.com`
- `https://<bucket-name>.s3.<region-code>.amazonaws.com`
- `https://s3.amazonaws.com`
- `https://<bucket-name>.s3-accelerate.amazonaws.com`
- `https://<bucket-name>.s3-<region-code>.amazonaws.com`
- `https://s3.<region-code>.amazonaws.com`

Please refer [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) for more details.

### Dropbox

PDF Services APIs can connect with Dropbox using Signed URIs for downloading and uploading the files from Dropbox location without the need for any credentials or access token.

#### Supported URL Prefixes:

- `https://<item-id>.dl.dropboxusercontent.com`
- `https://content.dropboxapi.com/`


Please refer [here](https://www.dropbox.com/developers/documentation/http/documentation) for more details.

### Azure Blob

PDF Services APIs can connect with Azure Blob using Signed URIs or [SAS Urls](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview) for downloading and uploading the files from Azure Blob without the need for any credentials or access token. Use [best practices](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview#best-practices-when-using-sas) when using SAS URLs.

#### Supported URL Prefixes

- `https://<account-name>.blob.core.windows.net`

Please refer [here](https://learn.microsoft.com/en-us/azure/ai-services/translator/document-translation/how-to-guides/create-sas-tokens?tabs=Containers#create-sas-tokens-with-azure-storage-explorer) for more details. 

## Limitation
- Redirection is not allowed with signed URIs.
- Only HTTPS based signed URIs are supported.




