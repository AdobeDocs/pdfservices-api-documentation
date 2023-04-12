---
title: Getting Started | PDF Accessibility Auto-Tag API | Adobe PDF Services
---

# Getting Started 

<p>
PDF Accessibility Auto-Tag API assists in the process of improving accessibility in individual PDFs via auto-tagging, adding document structure tags to the PDF file that are used to read a document's text and presenting it in a way that makes sense to users using assistive technology. The API is accessible through SDKs which help you get up and running quickly. Once you've received your developer credential, download and set up one of the sample projects. After you're familiar with the APIs, leverage the samples in your own server-side code.
</p>

<InlineAlert slots="text"/>

The SDK only supports server-based use cases where credentials are saved securely in a safe environment. SDK credentials should not be sent to untrusted environments or end user devices.


## Step 1 : Getting the access token

PDF Services API endpoints are authenticated endpoints. You can get an access token by following the [link](../../authentication.md) to start using our APIs.

## Step 2 : Uploading an asset 

After getting the access token, we need to upload the asset. Uploading an asset is a two-step process : 

1. First you need to get an upload pre-signed URI by using the following API.

You can read more about the API in detail [here](../../../apis/#operation/asset.uploadpresignedurl).

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

2. On getting a `200` response status from the above API, use the `uploadUri` field in the response body of the above API to upload the asset directly to the cloud provider using a PUT API call. You will also get an `assetID` field which will be used in creating the job.

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" /> 

### Rest API

```javascript
curl --location -g --request PUT 'https://dcplatformstorageservice-us-east-1.s3-accelerate.amazonaws.com/b37fd583-1ab6-4f49-99ef-d716180b5de4?X-Amz-Security-Token={{Placeholder for X-Amz-Security-Token}}&X-Amz-Algorithm={{Placeholder for X-Amz-Algorithm}}&X-Amz-Date={{Placeholder for X-Amz-Date}}&X-Amz-SignedHeaders={{Placeholder for X-Amz-SignedHeaders}}&X-Amz-Expires={{Placeholder for X-Amz-Expires}}&X-Amz-Credential={{Placeholder for X-Amz-Credential}}&X-Amz-Signature={{Placeholder for X-Amz-Signature}}' \
--header 'Content-Type: application/pdf' \
--data-binary '@{{Placeholder for file path}}'
```

## Step 3 : Creating the job 

To create a job for the operation, please use the  `assetID` obtained in Step 2 in the API request body. On successful job submission you will get a status code of `201` and a response header `location` which will be used for polling. 

For creating the job, please refer to the corresponding API spec for the particular [PDF Operation](../../../apis).

## Step 4 : Fetching the status

Once the job is successfully created, you need to poll the at the `location` returned in response header of Step 3 by using the following API 

You can read more about the API in detail [here](../../../apis/#operation/pdfoperations.compresspdf.jobstatus).

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

You can read more about the API in detail [here](../../../apis/#operation/asset.get).

<CodeBlock slots="heading, code" repeat="1" languages="Rest API" /> 

### Rest API 

```javascript
curl --location -g --request GET 'https://dcplatformstorageservice-us-east-1.s3-accelerate.amazonaws.com/b37fd583-1ab6-4f49-99ef-d716180b5de4?X-Amz-Security-Token={{Placeholder for X-Amz-Security-Token}}&X-Amz-Algorithm={{Placeholder for X-Amz-Algorithm}}&X-Amz-Date={{Placeholder for X-Amz-Date}}&X-Amz-SignedHeaders={{Placeholder for X-Amz-SignedHeaders}}&X-Amz-Expires={{Placeholder for X-Amz-Expires}}&X-Amz-Credential={{Placeholder for X-Amz-Credential}}&X-Amz-Signature={{Placeholder for X-Amz-Signature}}'
```

## There you go! Your job is completed in 5 simple steps. 

## SDK

PDF Services API is also accessible via SDKs in popular languages such as Java and Python.

<InlineAlert slots="text"/>

Please allow-list the following hostnames before using Adobe PDF Services SDK:<ul><li>ims-na1.adobelogin.com</li><li>pdf-services.adobe.io (for versions 3.x.x)</li><li>cpf-ue1.adobe.io (for versions upto 2.x.x)</li><li>senseicore-ue1.adobe.io (for versions below 1.x.x)</li></ul>

### Java

Jump start your development by bookmarking or downloading the following key resources:

-   This document
-   [API reference (Javadoc)](https://www.adobe.com/go/pdftoolsapi_java_docs)
-   [Java Sample code](https://www.adobe.com/go/pdftoolsapi_java_samples)
-   [Java library](https://www.adobe.com/go/pdftoolsapi_java_maven). The Maven project contains the .jar file.

#### Authentication

Once you complete the [Getting Credentials](/document-services/apis/interstitial), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

-   **Personalized Download**: The samples download zip contains a private.key file and an adobe-dc-pdf-services-sdk-java-samples with a preconfigured pdfservices-api-credentials.json file.
-   **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, you can either run the samples in the zip directly, or you can replace the pdfservices-api-credentials.json and private.key files in the [Java sample code](https://www.adobe.com/go/pdftoolsapi_java_samples) with those in the zip.

**Example pdfservices-api-credentials.json file**

```json 
{
 "client_credentials": {
   "client_id": "<YOUR_CLIENT_ID>",
   "client_secret": "<YOUR_CLIENT_SECRET>"
 },
 "service_account_credentials": {
   "organization_id": "<YOUR_ORGANIZATION_ID>",
   "account_id": "<YOUR_TECHNICAL_ACCOUNT_ID>",
   "private_key_file": "<PRIVATE_KEY_FILE_PATH>"
 }
}
```

#### Setup a Java environment

1.  Install [Java 8 or above](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
2.  Run `javac -version` to verify your install.
3.  Verify the JDK bin folder is included in the PATH variable (method varies by OS).
4.  Install [Maven](https://maven.apache.org/install.html). You may use your preferred tool; for example:
    - **Windows:** Example: [Chocolatey](https://chocolatey.org/packages/maven).
    - **Macintosh:** Example: `brew install maven`.

<InlineAlert slots="text" />

Maven uses pom.xml to fetch pdfservices-sdk from the public Maven repository when running the project. The .jar automatically downloads when you build the sample project. Alternatively, you can download the pdfservices-sdk.jar file, and configure your own environment.

##### Option 1: Personalized samples setup

The quickest way to get up and running is to download the personalized code samples during the Getting Credentials workflow. These samples provide everything from ready-to-run sample code, an embedded credential json file, and pre-configured connections to dependencies.

1.  Download [the Java sample project](https://www.adobe.com/go/pdftoolsapi_java_samples).
2.  Build the sample project with Maven: `mvn clean install`.
3.  Test the sample code on the command line.
4.  Refer to this document for details about running samples as well as the API Reference for API details.
5.  You can import the samples Maven project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF from the sample file

```javascript 
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDF
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

##### Option 2: Generic samples setup

If you did not choose **Personalized Code Sample Download** during the credential setup process:

1.  Download [the Java sample project](https://www.adobe.com/go/pdftoolsapi_java_samples).
2.  Find and replace pdfservices-api-credentials.json with the one present in the downloaded zip file.
3.  Find and replace private.key with the one present in the downloaded zip file.
4.  Build the sample project with Maven: `mvn clean install`.
5.  Test the sample code on the command line.
6.  Refer to this document for details about running samples as well as the API Reference for API details.
7.  You can import the samples Maven project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF from the sample file

```javascript 
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDF
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

<InlineAlert slots="text" />
Other sample programs in the SDK let you try out API options including generating a tagging report, and shifting headings so that the document title is only H1.

<InlineAlert slots="text" />

Command line execution is not mandatory. You can import the samples Maven project into your preferred IDE (e.g. IntelliJ/Eclipse) and run the samples from there.

#### Verifying download authenticity

For security reasons you may wish to confirm the installer's authenticity. To do so,

1.  After installing the package, navigate to the `.jar.sha1` file.
2.  Calculate the hash with any 3rd party utility.
3.  Find and open PDF Services sha1 file. Note: if you're using Maven, look in the .m2 directory.
4.  Verify the hash you generated matches the value in the .sha1 file.

```
298bf24b42e543029382a624b9e2c1f0069d90a5
```

#### Logging

Refer to the API docs for error and exception details.

-   For logging, use the [slf4j API](https://www.slf4j.org/) with a log4js-slf4j binding.
-   Logging configurations are provided in src/main/resources/log4js.properties.
-   Specify alternate bindings, if required, in pom.xml.

**log4js.properties file**

```properties
name=PropertiesConfig
appenders = console

# A sample console appender configuration, Clients can change as per their logging implementation
rootLogger.level = WARN
rootLogger.appenderRefs = stdout
rootLogger.appenderRef.stdout.ref = STDOUT

appender.console.type = Console
appender.console.name = STDOUT
appender.console.layout.type = PatternLayout
appender.console.layout.pattern = [%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n

loggers = pdfservicessdk,validator,apache

# Change the logging levels as per need. INFO is recommended for pdfservices-sdk
logger.pdfservicessdk.name = com.adobe.pdfservices.operation
logger.pdfservicessdk.level = INFO
logger.pdfservicessdk.additivity = false
logger.pdfservicessdk.appenderRef.console.ref = STDOUT

logger.validator.name=org.hibernate
logger.validator.level=WARN

logger.apache.name=org.apache
logger.apache.level=WARN
```
   

![Samples directory structure Java](../images/samplefilesjava.png)

#### Custom projects

While the samples use Maven, you can use your own tools and process.

To build a custom project:

1.  Access the .jar in the [central Maven repository](https://www.adobe.com/go/pdftoolsapi_java_maven).
2.  Use your preferred dependency management tool (Ivy, Gradle, Maven), to include the SDK .jar dependency.
3.  Open the pdfservices-api-credentials.json downloaded when you created your credential.
4.  Add the [Authentication](./index.md#authentication) details as described above.

![Adobe PDF Services SDK On Maven](../images/maven.png)

### Python

Jump start your development by bookmarking or downloading the following key resources:

-   This document
-   [Python API reference](https://opensource.adobe.com/pdfservices-python-sdk-samples/apidocs/beta/)
-   [Python sample code](https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta)
-   [Python SDK](https://www.adobe.com/go/pdfservices_python_pypi)

#### Authentication

Once you complete the [Getting Credentials](/document-services/apis/interstitial), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

-   **Personalized Download**: The samples download zip contains a private.key file and adobe-dc-pdfservices-sdk-python-samples directory with a preconfigured pdfservices-api-credentials.json file.
-   **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, you can either run the samples in the zip directly, or you can replace the pdfservices-api-credentials.json and private.key files in the [Python sample code](https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta) with those in the zip.

**Example pdfservices-api-credentials.json file**

```json 
{
 "client_credentials": {
   "client_id": "<YOUR_CLIENT_ID>",
   "client_secret": "<YOUR_CLIENT_SECRET>"
 },
 "service_account_credentials": {
   "organization_id": "<YOUR_ORGANIZATION_ID>",
   "account_id": "<YOUR_TECHNICAL_ACCOUNT_ID>",
   "private_key_file": "<PRIVATE_KEY_FILE_PATH>"
 }
}
```

#### Setup a Python environment

1. Install [Python 3.6](https://www.python.org/downloads/) or higher.
2. Verify your installation by running this command: `python --version`.

##### Option 1: Personalized samples setup

The quickest way to get up and running is to download the personalized code samples during the Getting Credentials workflow. These samples provide everything from ready-to-run sample code, an embedded credential json file, and pre-configured connections to dependencies.

1. Download and extract the [Python sample project](https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta).
2. Go to the project directory (which contains `requirements.txt` file) and build the sample project using this command in terminal: `pip install -r requirements.txt`.
3. Test the sample code on the command line.
4. Refer to this document for details about running samples as well as the API Reference for API details.
5. You can import the samples project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF from the sample file

```javascript 
python src/autotagpdf/autotag_pdf.py
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

##### Option 2: Generic samples setup

If you did not choose **Personalized Code Sample Download** during the credential setup process:

1. Download and extract the [Python sample project](https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta).
2. Copy the downloaded zip to the directory that you set up for this project and unzip the files there.
3. In the top-level directory of your samples, find and replace following files with the one present in the downloaded zip file from [Get API credentials](quickstarts/#get-api-credentials) step:
   1. `pdfservices-api-credentials.json`
   2. `private.key`
4. Go to the project directory (which contains `requirements.txt` file) and build the sample project using this command in terminal: `pip install -r requirements.txt`.
5. Test the sample code on the command line.
6. Refer to this document for details about running samples as well as the API Reference for API details.
7. You can import the samples into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF from the sample file

```javascript 
python src/autotagpdf/autotag_pdf.py
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

<InlineAlert slots="text" />
Other sample programs in the SDK let you try out API options including generating a tagging report, and shifting headings so that the document title is only H1.

## Public API

PDF Services API is accessible directly via REST APIs which requires Adobe-provided credential for authentication. Once you've completed the [Getting Credentials](/document-services/apis/interstitial) workflow, a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

-   **Personalized Download**: The samples download zip contains a private.key file and a samples folder with a preconfigured pdfservices-api-credentials.json file.
-   **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, private.key and credentials info in pdfservices-api-credentials.json can be used to call REST APIs directly per the instructions mentioned in [API Usage Guide](./howtos/api-usage.md).

**Example pdfservices-api-credentials.json file**

```json 
{
 "client_credentials": {
   "client_id": "<YOUR_CLIENT_ID>",
   "client_secret": "<YOUR_CLIENT_SECRET>"
 },
 "service_account_credentials": {
   "organization_id": "<YOUR_ORGANIZATION_ID>",
   "account_id": "<YOUR_TECHNICAL_ACCOUNT_ID>",
   "private_key_file": "<PRIVATE_KEY_FILE_PATH>"
 }
}
```