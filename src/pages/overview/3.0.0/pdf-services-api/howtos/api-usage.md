---
title: Using Our APIs | How Tos | PDF Services API | Adobe PDF Services
---
# Using Our APIs

This is a step-by-step guide to help you get started with using our APIs. 

## Step 1 : Getting the access token

PDF Services API endpoints are authenticated endpoints. You can get an access token by following the [link](../../authentication.md) to start using our APIs.

## Step 2 : Uploading an asset 

After getting the access token, we need to upload the asset. Uploading an asset is a two-step process : 

1. First you need to get an upload pre-signed URI by using the following API.

You can read more about the API in detail [here](../../../../apis/#operation/asset.uploadpresignedurl).

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" /> 

### Rest API 

```javascript
curl --location --request POST 'https://pdf-services.adobe.io/assets' \
--header 'X-API-Key: {{Placeholder for client_id}}' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "mediaType": "{{Placeholder for mediaType}}"
}'
```

2. On getting `200` response status from the above API, use the `uploadUri` field in response body of the above API to upload the asset directly to the cloud provider using a PUT API call. You will also get an `assetID` field which will be used in creating the job.

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" /> 

### Rest API

```javascript
curl --location -g --request PUT 'https://dcplatformstorageservice-us-east-1.s3-accelerate.amazonaws.com/b37fd583-1ab6-4f49-99ef-d716180b5de4?X-Amz-Security-Token={{Placeholder for X-Amz-Security-Token}}&X-Amz-Algorithm={{Placeholder for X-Amz-Algorithm}}&X-Amz-Date={{Placeholder for X-Amz-Date}}&X-Amz-SignedHeaders={{Placeholder for X-Amz-SignedHeaders}}&X-Amz-Expires={{Placeholder for X-Amz-Expires}}&X-Amz-Credential={{Placeholder for X-Amz-Credential}}&X-Amz-Signature={{Placeholder for X-Amz-Signature}}' \
--header 'Content-Type: application/pdf' \
--data-binary '@{{Placeholder for file path}}'
```

## Step 3 : Creating the job 

To create a job for the operation, please use the  `assetID` obtained in Step 2 in the API request body. On successful job submission you will get a status code of `201` and a response header `location` which will be used for polling. 

For creating the job, please refer to the corresponding API spec for the particular [PDF Operation](../../../../apis).

## Step 4 : Fetching the status

Once the job is successfully created, you need to poll the at the `location` returned in response header of Step 3 by using the following API 

You can read more about the API in detail [here](../../../../apis/#operation/pdfoperations.compresspdf.jobstatus).

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" /> 

### Rest API

```javascript
curl --location -g --request GET 'https://pdf-services.adobe.io/operation/compresspdf/{{Placeholder for job id}}/status' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'x-api-key: {{Placeholder for client id}}'
```

## Step 5 : Downloading the asset 

On getting `200` response code from the poll API, you will receive a `status` field in the response body which can either be `in progress`, `done` or `failed`.

If the `status` field is `in progress` you need to keep polling the location until it changes to `done` or `failed`.

If the `status` field is `done` the response body will also have a download pre-signed URI in the `dowloadUri` field, which will be used to download the asset directly from cloud provider by making the following API call

You can read more about the API in detail [here](../../../../apis/#operation/asset.get).

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" /> 

### Rest API 

```javascript
curl --location -g --request GET 'https://dcplatformstorageservice-us-east-1.s3-accelerate.amazonaws.com/b37fd583-1ab6-4f49-99ef-d716180b5de4?X-Amz-Security-Token={{Placeholder for X-Amz-Security-Token}}&X-Amz-Algorithm={{Placeholder for X-Amz-Algorithm}}&X-Amz-Date={{Placeholder for X-Amz-Date}}&X-Amz-SignedHeaders={{Placeholder for X-Amz-SignedHeaders}}&X-Amz-Expires={{Placeholder for X-Amz-Expires}}&X-Amz-Credential={{Placeholder for X-Amz-Credential}}&X-Amz-Signature={{Placeholder for X-Amz-Signature}}'
```

## There you go! Your job is completed in 5 simple steps. 
