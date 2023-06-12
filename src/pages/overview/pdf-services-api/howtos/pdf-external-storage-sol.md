---
title: External Storage for Adobe PDF Services APIs | Adobe PDF Services
---
# Overview

## **External Storage for Adobe PDF Services APIs**

Adobe PDF Services APIs have added support for accessing files from the external storage of the client directly. The client can invoke the PDF Services API with Signed URLs and files will be automatically accessed from their storage.

A **Signed URL** temporarily provides access to a resource. Signed URLs contain user/authentication information, allowing users without credentials to access the given resource.

PDF Services API supports the passing of signed URLs of input and output files in the request body. Please refer to the **External Section** in Request Body of [Document Generation API](http://developer-stage.adobe.com/document-services/docs/apis/#tag/Document-Generation) for more details.

<InlineAlert slots="text"/>

Accessing files from External Storage is presently restricted to the [Document Generation API](http://developer-stage.adobe.com/document-services/docs/apis/#tag/Document-Generation). Future releases will include the support of external storage across all PDF Services operations.

## Supported External Storage Solutions

The concept of Signed URLs is common across various cloud storage solutions for downloading and uploading files. Adobe PDF Services currently supports the signed URLs generated through -
- <a href="http://developer-stage.adobe.com/document-services/docs/overview/pdf-services-api/howtos/pdf-external-storage-sol/#sharepoint" target="_self">Sharepoint</a>
- <a href="http://developer-stage.adobe.com/document-services/docs/overview/pdf-services-api/howtos/pdf-external-storage-sol/#amazon-s3" target="_self">Amazon S3</a>


## Sharepoint

PDF Services APIs can connect with the Sharepoint storage of the client to download and upload the files using SharePoint Signed URLs. Signed URLs for Sharepoint files can be created using [Sharepoint REST API V1](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom) or [Sharepoint REST API V2](https://learn.microsoft.com/en-us/sharepoint/dev/apis/sharepoint-rest-graph) or [Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview).

## Amazon S3

PDF Services API can connect with Amazon S3 using pre-signed URLs for downloading and uploading objects to and from S3 buckets without AWS security credentials or permissions.

Please refer [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) for more details.




