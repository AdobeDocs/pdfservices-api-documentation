---
title: External Storage for Adobe PDF Services APIs | Adobe PDF Services
---
# Overview

## **External Storage for Adobe PDF Services APIs**

Adobe PDF Services APIs have added support for accessing files from the external storage of the client directly. The client can invoke the PDF Services API with Signed URLs and files will be automatically accessed from their storage.

A **Signed URL** temporarily provides access to a resource. Signed URLs contain user/authentication information, allowing users without credentials to access the given resource.

PDF Services APIs supports the signed URLs of input and output files in the request body. Please refer to the **External Section** in Request Body of [Document Generation API](../../../apis/#tag/Document-Generation) for more details.

<InlineAlert slots="text"/>

Accessing files from External Storage is presently restricted to the [Document Generation API](../../../apis/#tag/Document-Generation). Future releases will include the support of external storage across all PDF Services operations.

## Supported External Storage Solutions

The concept of Signed URLs is common across various cloud storage solutions for downloading and uploading files. Adobe PDF Services APIs currently supports the signed URLs generated through -
- [SharePoint](#sharepoint)
- [Amazon S3](#amazon-s3)


## SharePoint

PDF Services APIs can connect with the SharePoint using Signed URLs for downloading and uploading the files to and from SharePoint site. 

Signed URLs for SharePoint files can be created using [Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview).

## Amazon S3

PDF Services APIs can connect with the Amazon S3 using pre-signed URLs for downloading and uploading the files to and from S3 buckets without AWS security credentials or permissions.

Please refer [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) for more details.




