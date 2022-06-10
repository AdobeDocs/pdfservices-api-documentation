
# Quickstarts
<p>
PDF Accessibility Auto-Tag API is available as SDKs to help you get up and running quickly. You can then leverage the samples in your own code
</p>

## Get API credentials

Calling the PDF Accessibility Auto-Tag API requires an Adobe-provided credential. To get one, [click here](https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-extract-api) and complete the workflow. Be sure to copy and save the credential values to a secure location.

<InlineAlert slots="text"/>

During the credential creation process you'll be asked to whether you'd like a **Personalized Code Sample Download**. Choosing *Personalized* preconfigures the samples with your credential and removes a few steps from your development setup process.

## Install SDK and samples

PDF Accessibility Auto-Tag API is available as SDKs in Node.js, Java , .NET, and Python.

### Java

Jumpstart your development by bookmarking or downloading the following key resources:

-   This document
-   [API reference (Javadoc)](https://www.adobe.com/go/pdftoolsapi_java_docs)
-   [Java sample code](https://www.adobe.com/go/pdftoolsapi_java_samples)
-   [Java library](https://www.adobe.com/go/pdftoolsapi_java_maven). The Maven project contains the .jar file.

#### Authentication

Once you complete the [Get API credentials](quickstarts/#getting-credentials), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

- **Personalized Download**: The samples download zip contains a private.key file and an adobe-dc-pdf-services-sdk-java-samples with a preconfigured pdfservices-api-credentials.json file.
- **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

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

#### Install Java and Maven

Skip this step if you already have Java and Maven running on your computer.

1. Install [Java](https://www.oracle.com/java/technologies/downloads/#java8). The SDK has been tested with Java 8, but it should also work with newer versions.
2. Verify your installation by running this command `javac -version`.
3. [Download](https://maven.apache.org/download.cgi) and [install](https://maven.apache.org/install.html) Maven. The SDK works with maven 3.8.1 or newer versions.
4. Verify your installation by running this command: `mvn -version`.

##### Option 1: Personalized samples setup

The quickest way to get up and running is to download the personalized code samples during the Getting Credentials workflow. These samples provide everything from ready-to-run sample code, an embedded credential json file, and pre-configured connections to dependencies.

1. Download and extract the [Java sample project](https://www.adobe.com/go/pdftoolsapi_java_samples).
2. Cd to the project directory (which contains pom.xml file) and build the sample project with Maven using this command in terminal: `mvn clean install`.
3. You can import the samples Maven project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDF
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

##### Option 2: Generic samples setup

If you did not choose **Personalized Code Sample Download** during the credential setup process:

1. Download and extract the [Java sample project](https://www.adobe.com/go/pdftoolsapi_java_samples).
2. Copy the downloaded zip to the directory that you set-up for this project and unzip the files there.
3. In the top-level directory of your samples, find and replace following files with the one present in the downloaded zip file from [Get API credentials](quickstarts/#getting-credentials) step:
   1. pdfservices-api-credentials.json 
   2. private.key
4. Cd to the project directory (which contains pom.xml file) and build the sample project with Maven using this command in terminal: `mvn clean install`.
5. You can import the samples Maven project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDF
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

<InlineAlert slots="text" />
Other sample programs in the SDK let you try out API options including generating a tagging report, and shifting headings so that the document title is only H1.


### .NET

Jumpstart your development by bookmarking or downloading the following key resources:

-   This document
-   [.NET API reference](https://www.adobe.com/go/pdftoolsapi_net_docs)
-   [.NET sample code](https://www.adobe.com/go/pdftoolsapi_net_samples)
-   [Nuget package](https://www.adobe.com/go/pdftoolsapi_net_nuget)

#### Authentication

Once you complete the [Get API credentials](quickstarts/#getting-credentials), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

- **Personalized Download**: The samples download zip contains a private.key file and an adobe-DC.PDFServices.SDK.NET.Samples directory. Each sample directory contains the sample code as well as a preconfigured pdfservices-api-credentials.json file.
- **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, you can either run the samples in the zip directly, or you can replace the pdfservices-api-credentials.json and private.key files in the [.NET sample code](https://www.adobe.com/go/pdftoolsapi_net_samples) with those in the zip.


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

#### Install .NET SDK

Skip this step if you already have .NET running on your computer.

1.  Download and install the [.NET SDK](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/install).

##### Option 1: Personalized samples setup

The quickest way to get up and running is to download the personalized code samples during the Getting Credentials workflow. These samples provide everything from ready-to-run sample code, an embedded credential json file, and pre-configured connections to dependencies.

1. Download and extract the [.NET sample project](https://www.adobe.com/go/pdftoolsapi_net_samples).
2. Cd to the project directory and build the sample project using this command in terminal: `dotnet build`.
3. You can import the samples project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
cd AutotagPDF/
dotnet run AutotagPDF.csproj
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

##### Option 2: Generic samples setup

If you did not choose **Personalized Code Sample Download** during the credential setup process:

1. Download and extract the [.NET sample project](https://www.adobe.com/go/pdftoolsapi_net_samples).
2. Copy the downloaded zip to the directory that you set-up for this project and unzip the files there.
3. In the top-level directory of your samples, find and replace following files with the one present in the downloaded zip file from [Get API credentials](quickstarts/#getting-credentials) step:
   1. pdfservices-api-credentials.json
   2. private.key
4. Cd to the project directory and build the sample project with using this command in terminal: `dotnet build`.
5. You can import the samples project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
cd AutotagPDF/
dotnet run AutotagPDF.csproj
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

<InlineAlert slots="text" />
Other sample programs in the SDK let you try out API options including generating a tagging report, and shifting headings so that the document title is only H1.


### Node.js

Jumpstart your development by bookmarking or downloading the following key resources:

-   This document
-   [Node.js API reference](https://www.adobe.com/go/pdftoolsapi_node_docs)
-   [Node.js sample code](http://www.adobe.com/go/pdftoolsapi_node_sample)
-   [Node.js SDK](http://www.adobe.com/go/pdftoolsapi_node_npm)

#### Authentication

Once you complete the [Get API credentials](quickstarts/#getting-credentials), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

- **Personalized Download**: The samples download.zip contains a private.key file and an adobe-dc-pdf-services-sdk-node-samples directory. Each sample directory contains the sample code as well as a preconfigured pdfservices-api-credentials.json file.
- **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, you can either run the samples in the zip directly, or you can replace the pdfservices-api-credentials.json and private.key files in the [Node.js sample code](http://www.adobe.com/go/pdftoolsapi_node_sample) with those in the zip.

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

#### Install Node.js

Skip this step if you already have Node.js running on your computer.

1. Install [Node.js 10.13.0](https://nodejs.org/en/download/) or higher.
2. Verify your installation by running this command: `node --version`.



##### Option 1: Personalized samples setup

The quickest way to get up and running is to download the personalized code samples during the Getting Credentials workflow. These samples provide everything from ready-to-run sample code, an embedded credential json file, and pre-configured connections to dependencies.

1. Download and extract the [Node.js sample project](http://www.adobe.com/go/pdftoolsapi_node_sample).
2. Cd to the project directory (which contains package.json file) and build the sample project using this command in terminal: `npm install`.
3. You can import the samples project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
node src/autotagpdf/autotag-pdf.js
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

##### Option 2: Generic samples setup

If you did not choose **Personalized Code Sample Download** during the credential setup process:

1. Download and extract the [Node.js sample project](http://www.adobe.com/go/pdftoolsapi_node_sample).
2. Copy the downloaded zip to the directory that you set-up for this project and unzip the files there.
3. In the top-level directory of your samples, find and replace following files with the one present in the downloaded zip file from [Get API credentials](quickstarts/#getting-credentials) step:
   1. pdfservices-api-credentials.json
   2. private.key
4. Cd to the project directory (which contains package.json file) and build the sample project with Maven using this command in terminal: `npm install`.
5. You can import the samples project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
node src/autotagpdf/autotag-pdf.js
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

<InlineAlert slots="text" />
Other sample programs in the SDK let you try out API options including generating a tagging report, and shifting headings so that the document title is only H1.

### Python

Jumpstart your development by bookmarking or downloading the following key resources:

-   This document
-   [Python API reference](https://www.adobe.com/go/pdfservices_python_docs)
-   [Python sample code](https://www.adobe.com/go/pdfservices_python_samples)
-   [Python SDK](https://www.adobe.com/go/pdfservices_python_pypi)

#### Authentication

Once you complete the [Get API credentials](quickstarts/#getting-credentials), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

- **Personalized Download**: The samples download.zip contains a private.key file and an adobe-dc-pdfservices-sdk-python-samples directory. Each sample directory contains the sample code as well as a preconfigured pdfservices-api-credentials.json file.
- **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, you can either run the samples in the zip directly, or you can replace the pdfservices-api-credentials.json and private.key files in the [Python sample code](http://www.adobe.com/go/pdfservices_python_samples) with those in the zip.

**Example pdfservices-api-credentials.json file**

```json 
{
  "client_credentials": {
     "client_id": " <YOUR_CLIENT_ID> ",
     "client_secret": " <YOUR_CLIENT_SECRET> "
  },
  "service_account_credentials": {
     "organization_id": " <YOUR_ORGANIZATION_ID> ",
     "account_id": " <YOUR_TECHINCAL_ACCOUNT_ID> ",
     "private_key_file": "private.key"
  }
}
```

#### Install Python

Skip this step if you already have Python running on your computer.

1. Install [Python 3.7](https://www.python.org/downloads/) or higher.
2. Verify your installation by running this command: `python --version`.

##### Option 1: Personalized samples setup

The quickest way to get up and running is to download the personalized code samples during the Getting Credentials workflow. These samples provide everything from ready-to-run sample code, an embedded credential json file, and pre-configured connections to dependencies.

1. Download and extract the [Python sample project](https://www.adobe.com/go/pdfservices_python_samples).
2. Cd to the project directory (which contains requirements.txt file) and build the sample project using this command in terminal: `pip install -r requirements.txt`.
3. You can import the samples project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
python src/autotagpdf/autotag_pdf_without_options.py
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

##### Option 2: Generic samples setup

If you did not choose **Personalized Code Sample Download** during the credential setup process:

1. Download and extract the [Python sample project](https://www.adobe.com/go/pdfservices_python_samples).
2. Copy the downloaded zip to the directory that you set-up for this project and unzip the files there.
3. In the top-level directory of your samples, find and replace following files with the one present in the downloaded zip file from [Get API credentials](quickstarts/#getting-credentials) step:
   1. pdfservices-api-credentials.json
   2. private.key
4. Cd to the project directory (which contains requirements.txt file) and build the sample project using this command in terminal: `pip install -r requirements.txt`.
5. You can import the samples into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
python src/autotagpdf/autotag_pdf_without_options.py
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

<InlineAlert slots="text" />
Other sample programs in the SDK let you try out API options including generating a tagging report, and shifting headings so that the document title is only H1.


## Public API

PDF Accessibility Auto-Tag API is accessible directly via REST APIs which requires Adobe-provided credential for authentication. Once you complete the [Get API credentials](quickstarts/#getting-credentials), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

- **Personalized Download**: The samples download zip contains a private.key file and a samples folder with a preconfigured pdfservices-api-credentials.json file.
- **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, private.key and credentials info in pdfservices-api-credentials.json can be used to call REST APIs directly per the instructions mentioned in [Public API Docs](https://documentcloud.adobe.com/document-services/index.html#how-to-get-started-) under Sub-Section (Introduction -\> How to get started?)

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
