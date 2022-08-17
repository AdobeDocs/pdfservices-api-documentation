# Overview

## What is a PDF Electronic Seal?

A PDF electronic seal, powered by a digital signature, enables an organization or legal entity to digitally sign PDFs in bulk. The validation process performs two actions : 

* It authenticates the signing organization's identity via its digital certificate. 
* It verifies a one or more document's integrity via a digital signature which embeds a time stamp and validity information. 

![PDF Electronic Seal Identification](../images/blueBar.png)

<!--- 
REFERENCES
https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=DEX&title=DC+Platform+-+Sealing+Service+API+and+Use-cases#DCPlatformSealingServiceAPIandUsecases-SignvsSeal-Howdotheydiffer
https://www.adobe.com/in/sign/electronic-signatures.html
https://www.adobe.com/sign/digital-signatures.html
-->

## Electronic Signature vs Electronic Seal

An *electronic signature*, or e-signature, is a simple and legally recognized way to indicate consent or approval on a digital document or form.

An *electronic seal*, on the other hand, is an organizational construct which ties the identity of the organization or company issuing the document to the actual digital document and not of any specific individual. It focuses on use-cases where 2-parties are not involved and the document first needs to be certified by a legal entity before distribution to multiple consumers. An Electronic Seal therefore provides cost efficient bulk signing at the organizational level.

## PDF Electronic Seal Components

A PDF electronic seal workflow always involves the following: 

* **PDF Document**: A PDF document as an input file.
* **Sealing Parameters**: Parameters  specify the seal's format, visibility and appearance as well as the certificate credentials required to communicate with a trust service provider. For details, see [sealing parameters](/overview/pdf-electronic-seal-api/quickstarts/#2-configure-sealing-parameters).
* **PDF Electronic Seal API**: The PDF Electronic Seal API enables signing PDF documents programmatically with no user interaction. It uses the sealing parameters to authorize the client and apply a seal on the input PDF which is then bound to the specified legal entity.
* **Seal Image**: The API can accept an optional seal image as an input file which overrides the default Acrobat trefoil image.

![PDF Electronic Seal Process](../images/sealProcess.png)

## FAQ

**What are the differences between an electronic signature, e-signature, digital signature, and electronic seal?**

* An *electronic signature* (or e-signature) is a broad term referring to any electronic process that indicates acceptance of an agreement or a record. Typical e-signature solutions use common electronic authentication methods to verify signer 
identity, such as an email address, a corporate ID, or a phone PIN. If increased security is needed, multi-factor 
authentication may be used. Both digital signatures and electronic seals are electronic signatures. 
* A *digital signature* is a specific type of e-signature that use certificate-based digital IDs to authenticate signer 
identity and demonstrate proof of signing by binding each signature to the document with encryption. Validation occurs 
through trusted certificate authorities (CAs) or trust service providers (TSPs).
* An *electronic seal* binds an organization rather than an individual to one or more documents. Validation happens the same way as digital signatures, but often occurs programmatically across bulk documents. 



