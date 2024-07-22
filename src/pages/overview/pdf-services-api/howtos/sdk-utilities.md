---
title: SDK Utilities | How Tos | PDF Services API | Adobe PDF Services
---

# SDK Utilities

This page covers various utilities provided by the Adobe PDF Services SDKs, including operations such as refreshing 
download URIs, deleting assets, and streamline your workflows.

## Important Note on Expiry

- Asset Expiry : Assets uploaded to Adobe internal storage are transiently stored for 24 hours.

- Pre-signed URI Expiry : The pre-signed URI provided for uploading or downloading the content has an expiry of 1 hour.

See our public API Reference for assets [here](../../../apis/#tag/Assets).

## Refresh Download URI

This function will create a new download URI for your asset. This is useful for scenarios where the asset needs to be 
downloaded after its URI has expired.

<CodeBlock slots="heading, code" repeat="4" languages="Java, Node.js, Python, .NET" />

### Java

```javascript
CreatePDFResult result = pdfServicesResponse.getResult();
Asset asset = result.getAsset();

// refresh the download URI in case it expires or is null for the uploaded asset
Asset refreshedAsset = pdfServices.refreshDownloadURI(asset);
```

### Node.js

```javascript
const result = pdfServicesResponse.result;
const asset = result.asset;

// refresh the download URI in case it expires or is null for the uploaded asset
const refreshedAsset = await pdfServices.refreshDownloadURI({asset});
```

### Python

```python
result = pdf_services_response.getResult()
asset = result.getAsset()

# refresh the download URI in case it expires or is null for the uploaded asset
refreshed_asset = pdf_services.refreshDownloadURI(asset);
```

### .NET

```csharp
CreatePDFResult result = pdfServicesResponse.Result;
IAsset asset = result.Asset;
 
// refresh the download URI in case it expires or is null for the uploaded asset
pdfServices.RefreshDownloadURI(asset);
```

## Delete Asset

This function deletes an asset from Adobe internal storage. If you prefer not to store your asset on Adobe's storage, 
where assets are transiently stored for 24 hours, you can use this function to delete the asset immediately.

<CodeBlock slots="heading, code" repeat="4" languages="Java, Node.js, Python, .NET" />

### Java

```javascript
CreatePDFResult result = pdfServicesResponse.getResult();
Asset asset = result.getAsset();
 
// delete asset
pdfServices.deleteAsset(asset);
```

### Node.js

```javascript
const result = pdfServicesResponse.result;
const asset = result.asset;

// delete asset
await pdfServices.deleteAsset({asset});
```

### Python

```python
create_pdf_result = pdf_services_response.getResult()
output_asset = create_pdf_result.getAsset()        

# delete asset
pdf_services.deleteAsset(output_asset);
```


### .NET

```csharp
CreatePDFResult result = pdfServicesResponse.Result;
IAsset asset = result.Asset;
 
// delete asset
pdfServices.deleteAsset(asset);
```
