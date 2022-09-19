---
title: Document Services APIs | PDF Electronic Seal API
---
# Overview

## What is a PDF Electronic Seal?

A PDF Electronic Seal, powered by a digital signature, enables an organization to digitally sign the PDFs. E-signatures are legal, trusted, and enforceable around the world. The validation process performs two actions: 

* It authenticates the signing organization's identity via its digital certificate. 
* It verifies a document's integrity. 

![PDF Electronic Seal](../images/blueBar.png)

## Electronic Signature vs Electronic Seal

An *electronic signature* (or e-signature) is a broad term referring to any legally recognized electronic process that indicates acceptance of an agreement or a record. Typical e-signature solutions use common electronic authentication methods to verify signer identity, such as an email address, a corporate ID, or a phone PIN. If increased security is needed, multi-factor authentication may be used. Both digital signatures and electronic seal are electronic signatures. 

* A *digital signature* is a specific type of e-signature that use certificate-based digital IDs to authenticate signer identity and demonstrate proof of signing by binding each signature to the document with encryption. Validation occurs through trusted Certifying Authority (CAs) or Trust Service Provider (TSPs).

* An *electronic seal* binds an organization rather than an individual to one or more documents. While validation happens the same way as digital signatures, electronic seal facilitate use-cases where 2-parties are not involved and the document first needs certification by a legal entity before distribution to multiple consumers. An electronic seal therefore provides cost-efficient bulk signing at the organizational level.

## PDF Electronic Seal Components

A PDF Electronic Seal workflow involves the following:

* **PDF Document**: A PDF document as an input file. The maximum size of the PDF cannot exceed 10MB.
* **Sealing Parameters**: Parameters  specify the seal's format, visibility and appearance as well as the certificate credentials required to communicate with a Trust Service Provider. For details, see [sealing parameters](/overview/pdf-electronic-seal-api/quickstarts/#parameters).
* **PDF Electronic Seal API**: The PDF Electronic Seal API enables sealing PDF documents programmatically with no user interaction. It uses the sealing parameters to authorize the client and apply a seal on the input PDF which is then bound to the specified legal entity.
* **Seal Image**: The API can accept an optional seal image as an input file which overrides the default Acrobat trefoil image. The maximum size of the seal image cannot exceed 2MB.
