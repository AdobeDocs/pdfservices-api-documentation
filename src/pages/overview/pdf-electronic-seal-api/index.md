---
title: PDF Electronic Seal API | Adobe PDF Services
---
# Overview

## What is PDF Electronic Seal API ?

An Electronic Seal in PDF is akin to an organization's rubber stamp on a paper, but it’s more secure. An organization's electronic seal applied using PDF Electronic Seal API is supported by a digital certificate issued in the name of that organization. The Electronic Seal may be applied using a certificate hosted within a [Cloud Signature Consortium (CSC)](https://cloudsignatureconsortium.org/) compliant service provider. It offers the utmost assurance of identity of the organization while handling digital documents.

PDF Electronic Seal API is a cloud based solution to apply an electronic seal on PDF documents using the digital certificates issued to organizations to demonstrate the integrity and authenticity of official documents such as invoices, statements etc. These digital certificates are issued by a CSC compliant Trust Service Provider (TSP).

An electronic seal can be represented by solely an image, a text block (comprising name of entity, date and time of the seal etc.), or a combination of both image and text. Below is the sample representation of an electronic seal applied on a PDF document.

![PDF Electronic Seal](../images/seal_op_ss.jpg)

## PDF Electronic Seal API Components

A PDF Electronic Seal API workflow involves the following:

* **PDF Document**: A PDF document as an input file. The maximum size of the PDF cannot exceed 100 MB.
* **Sealing Parameters**: Parameters  specifying the seal's format, visibility and appearance along with the digital certificate credentials information. For details, see [sealing parameters](./howtos/electronic-seal-api.md/#api-parameters).
* **Seal Image**: The API accepts an **optional** image as a background for seal appearance which overrides the default seal image. The maximum size of the seal image cannot exceed 5 MB. Supported image formats are JPEG, PNG and PDF only.


## Live Demo

Ready to see the PDF Electronic Seal API in action? The [Live Demo](https://acrobatservices.adobe.com/dc-eseal-playground/index.html) demonstrates how easy it is to apply electronic seal over PDF documents using digital certificate credentials and other configurable parameters.

## Supported Trust Service Providers

TSPs are companies that offer a wide range of identity and transaction services, including certificate authority services such as providing and preserving digital certificates for creating and validating electronic seals as well as authenticating the organizations that applied the electronic seals.

The PDF Electronic Seal API supports digital certificates hosted by Qualified Trust Service Providers (QTSPs) recognized under the eIDAS regulation and the open API standard from the CSC. These TSPs must support explicit authorization (based on a static PIN only), and the OAuth 2.0 client credential authorization flow.
PDF Electronic Seal API currently supports the following TSPs : <!-- REFERENCES https://helpx.adobe.com/acrobat/kb/approved-trust-list1.html -->
<br/>

* [Intesi Group](https://www.intesigroup.com/en/)
* [Entrust](https://www.entrust.com/pdf-signing-certificates/)
* [GlobalSign](https://www.globalsign.com/en/digital-signatures)
* [TrustPro](https://www.trustpro.eu/)

## Supported Timestamping Authorities

A Timestamping Authority (TSA) is a trusted entity that employs the [RFC3161](https://www.ietf.org/rfc/rfc3161.txt) protocol to generate and attach cryptographic timestamps to digital data, certifying its existence at a specific time, thus enhancing data integrity and legal validity.

The PDF Electronic Seal API supports trusted timestamping while sealing the document using one of the supported TSA. Supported TSAs are:

* [Adobe Qualified Timestamp](https://helpx.adobe.com/in/acrobat/kb/trust-services.html#:~:text=EUTL%20trusted%20services.-,Adobe%20Qualified%20Timestamp%20Service,-A%20qualified%20time)
* [Intesi Group](https://www.intesigroup.com/en/)
* [DigiCert Timestamp](https://www.digicert.com/)
* [GlobalSign Timestamp](https://www.globalsign.com/en-in)
* [InfoCert Qualified TSA](https://infocert.digital/consumer/timestamps/)
* [Namirial Qualified TSA](https://support.namirial.com/en/docs/docs-tsp-qualified-signature-timestamp/)
* [QuoVadis](https://www.quovadisglobal.com/)
* [Seiko Timestamp Service](https://www.seikotrust.jp/product/time-stamp/)

If support for any other TSA is required, reach out to us through customer support. <!-- REFERENCES https://helpx.adobe.com/in/sign/using/custom-time-stamp-providers.html -->


