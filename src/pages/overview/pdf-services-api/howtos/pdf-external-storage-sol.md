---
title: External Storage for Adobe PDF Services APIs | Adobe PDF Services
---
# Overview

## **External Storage for Adobe PDF Services APIs**

Adobe PDF Services APIs have added support for accessing files from the external storage of the client directly. The client can invoke the PDF Services API with Signed URLs and files will be automatically accessed from their storage.

A **Signed URL** temporarily provides access to a resource. Signed URLs contain user/authentication information, allowing users without credentials to access the given resource.

PDF Services APIs supports the signed URLs of input and output files in the request body. Please refer to the **External Section** in Request Body of each API for more details.

<InlineAlert slots="text"/>

Accessing files from External Storage is presently **not** supported in below-mentioned APIs
- [PDF-Accessibility-Auto-Tag](../../../apis/#tag/PDF-Accessibility-Auto-Tag)
- [PDF Accessibility Checker](../../../apis/#tag/PDF-Accessibility-Checker)
- [Extract PDF](../../../apis/#tag/Extract-PDF)
- [PDF-Electronic-Seal](../../../apis/#tag/PDF-Electronic-Seal)
- [Split PDF](../../../apis/#tag/Split-PDF) 

## Supported External Storage Solutions

The concept of Signed URLs is common across various cloud storage solutions for downloading and uploading files. Adobe PDF Services APIs currently supports the signed URLs generated through -
- [SharePoint](#sharepoint)
- [Amazon S3](#amazon-s3)
- [Dropbox](#dropbox)
- [Azure Blob](#azure-blob)


## SharePoint

PDF Services APIs can connect with the SharePoint using Signed URLs for downloading and uploading the files from SharePoint site. 

Signed URLs for SharePoint files can be created using [Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview).

## Amazon S3

PDF Services APIs can connect with the Amazon S3 using pre-signed URLs for downloading and uploading the files from S3 buckets without AWS security credentials or permissions.

Please refer [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) for more details.

## Dropbox

PDF Services APIs can connect with the Dropbox using pre-signed URLs for downloading and uploading the files from Dropbox location without the need for any credentials or access token.

Please refer here for [downloading](https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_link) and [uploading](https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_upload_link) files from dropbox.

## Azure Blob

PDF Services APIs can connect with the Azure Blob using pre-signed URLs or [SAS Urls](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview) for downloading and uploading the files from Azure Blob without the need for any credentials or access token. Use [Best Practices](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview#best-practices-when-using-sas) when using SAS URLs.

Please refer [here](https://learn.microsoft.com/en-us/azure/ai-services/translator/document-translation/how-to-guides/create-sas-tokens?tabs=Containers#create-sas-tokens-with-azure-storage-explorer) for more details. Make sure you have provided required permissions added to your SAS tokens while generating them.




