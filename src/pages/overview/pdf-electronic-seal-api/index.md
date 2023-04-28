---
title: PDF Electronic Seal API | Adobe PDF Services
---
# Overview

## What is a PDF Electronic Seal?

An Electronic Seal in PDF is the equivalent of an organisation rubber stamp on a paper, but it’s much more secure. It is supported by a digital certificate issued in the name of organisation. Electronic Seal i.e. eSeal is in accordance with the global standards set by CSC and offer the utmost level of assurance of identity while handling digital documents.

eSeal is a cloud based solution where the organisations need digital certificates issued to their legal entity to demonstrate the integrity and authenticity of official documents such as invoices, statements etc. These digital certificates are issued by a CSC compliant Trust Service Provider(TSP).
Listed below are the objectives for utilizing a Trust Service Provider.

* Integrity: Trust that the document has not been altered at any point in the workflow.
* Authenticity: Trust that the document's author is the expected person and not someone else.
* Non-Repudiation: Trust that the issuing party cannot disown their authorship.
* Long Term Validation: Trust that the integrity, authenticity and non-repudiation can be verified over the long term, even after the expiry of digital certificate being used.

eSeal can be represented by solely an image, a text block (comprising name of entity, date and time of the seal etc.) , or a combination of both image and text. Below is the sample representation of eSeal applied on a PDF Document.

![PDF Electronic Seal](../images/blueBar.png)

## PDF Electronic Seal Components

A PDF Electronic Seal workflow involves the following:

* **PDF Document**: A PDF document as an input file for eSeal operation. The maximum size of the PDF cannot exceed 10MB.
* **Sealing Parameters**: Parameters  specifying the seal's format, visibility and appearance as well as the digital certificate credentials. For details, see [sealing parameters](gettingstarted#parameters).
* **PDF Electronic Seal API**: The PDF Electronic Seal API uses the sealing parameters to apply a seal on the input PDF which is then bound to the specified legal entity.
* **Seal Image**: The API can accept an optional seal image as an input file which overrides the default Acrobat trefoil image. The maximum size of the seal image cannot exceed 2MB. Supported image formats for seal image are JPEG or PNG only.


## Supported Trust Service Providers

The PDF Electronic Seal API supports digital certificates hosted by Trust Service Providers certified under the eIDAS regulation and supporting the open API standard from the Cloud Signature Consortium. These QTSPs must configure explicit authorization (based on a static PIN only), and the OAuth 2.0 client credential authorization flow.
Currently, this requirement is only fulfilled by below TSPs : <!-- REFERENCES https://helpx.adobe.com/acrobat/kb/approved-trust-list1.html -->
<br/>

* [Intesi Group](https://www.intesigroup.com/en/)
* [Entrust](https://www.entrust.com/pdf-signing-certificates/)
* [GlobalSign](https://www.globalsign.com/en/digital-signatures)
* [TrustPro](https://www.trustpro.eu/)
