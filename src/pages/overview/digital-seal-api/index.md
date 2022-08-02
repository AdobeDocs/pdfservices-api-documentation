# Overview
## What is PDF Electronic Seal?
PDF Electronic Seal powered by Digital Signature, is the concept to digitally sign the pdf document by an organisation or legal entity.
It authenticates the identity of the organisation using digital certificate, and the integrity by digitally signing large volumes of documents, 
such as invoices, bills, educational transcripts, health documents etc. 


![PDF Electronic Seal Identification](../images/blueBar.png)

<!--- 
REFERENCES
https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=DEX&title=DC+Platform+-+Sealing+Service+API+and+Use-cases#DCPlatformSealingServiceAPIandUsecases-SignvsSeal-Howdotheydiffer
https://www.adobe.com/in/sign/electronic-signatures.html
https://www.adobe.com/sign/digital-signatures.html
-->

## Electronic Signature vs Electronic Seal
Electronic Signature or e-signature is a simple and legally recognised way to indicate consent or approval on a digital document or form.

Electronic Seal on the other hand, is an organisational construct which ties the identity of the organisation/company 
issuing the document to the actual digital document and not of any specific individual. It focuses on use-cases where 2-parties are not involved and document 
first needs to be certified by a legal entity and then distributed across many consumers.

## PDF Electronic Seal Flow

![PDF Electronic Seal Process](../images/sealProcess.png)

## Components of PDF Electronic Seal

**PDF Document**

PDF Electronic Seal API requires a PDF document as an input file on which a seal has to be applied.

**Sealing Parameters**

PDF Electronic Seal API requires a few input parameters for the creation of a seal. The parameters should specify the 
format, visibility and appearance of the seal. It should also have the certificate credentials required to communicate with Trust Service Providers.<br/>

Refer to [sealing parameters](/overview/digital-seal-api/quickstarts/#2-configure-sealing-parameters) for more details.

**PDF Electronic Seal API**

PDF Electronic Seal API enables the generation of PDF Electronic Seal on PDF documents with no user interaction. It uses the provided 
sealing parameters to authorize the client and apply a seal on the input PDF document. The generated PDF document is said to be bound to the specified legal entity.
 
To Get Started, visit [Quickstarts](./quickstarts.md)

**Seal Image**

PDF Electronic Seal API can accept the seal image as input file. This is an optional field that defaults to 'Acrobat Trefoil'
unless overridden by this parameter.

## FAQ
<details><summary>Digital Signature vs Electronic Signature</summary><p>

Electronic Signature is a broad term referring to any electronic process that indicates acceptance of 
an agreement or a record. Typical e-signature solutions use common electronic authentication methods to verify signer 
identity, such as an email address, a corporate ID, or a phone PIN. If increased security is needed, multifactor 
authentication may be used. 
<br/>
Digital Signature is one specific type of e-signature that use certificate-based digital IDs to authenticate signer 
identity and demonstrate proof of signing by binding each signature to the document with encryption. Validation occurs 
through trusted certificate authorities (CAs) or trust service providers (TSPs).

</p></details>



