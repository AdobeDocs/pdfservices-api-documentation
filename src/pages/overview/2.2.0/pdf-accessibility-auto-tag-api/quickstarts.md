# Quickstarts

<p>
PDF Accessibility Auto-Tag API is available as SDKs to help you get up and running quickly. You can then leverage the samples in your own code
</p>

## Get Early Access

The PDF Accessibility Auto-Tag API is currently available as Early Access. To request access, [Contact Us](https://adobe.com/go/accessibility_early_access_form). Once you receive confirmation that you’ve been given access, proceed to the next step to [Get API credentials](quickstarts/#get-api-credentials).

## Get API credentials

Calling the PDF Accessibility Auto-Tag API requires an Adobe-provided credential. To get one, [click here](https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-accessibility-auto-tag-api) and complete the workflow. Be sure to copy and save the credential values to a secure location.

<InlineAlert slots="text"/>

During the credential creation process you'll be asked to whether you'd like a **Personalized Code Sample Download**. Choosing *Personalized* preconfigures the samples with your credential and removes a few steps from your development setup process.

## Install SDK and samples

PDF Accessibility Auto-Tag API is available as SDKs in Java and Python.

<InlineAlert slots="text"/>

Please allow-list the following hostnames before using Adobe PDF Services SDK:<ul><li>ims-na1.adobelogin.com</li><li>cpf-ue1.adobe.io</li><li>senseicore-ue1.adobe.io (for versions below 1.x.x)</li></ul>

### Java

Jumpstart your development by bookmarking or downloading the following key resources:

-   This document
-   [API reference (Javadoc)](https://opensource.adobe.com/pdfservices-java-sdk-samples/apidocs/beta/)
-   [Java sample code](https://github.com/adobe/pdfservices-java-sdk-samples/tree/beta)
-   [Java library](https://www.adobe.com/go/pdftoolsapi_java_maven). The Maven project contains the .jar file.

#### Authentication

Once you complete the [Get API credentials](quickstarts/#get-api-credentials), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

- **Personalized Download**: The samples download zip contains a private.key file and an adobe-dc-pdf-services-sdk-java-samples with a preconfigured pdfservices-api-credentials.json file.
- **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, you can either run the samples in the zip directly, or you can replace the pdfservices-api-credentials.json and private.key files in the [Java sample code](https://github.com/adobe/pdfservices-java-sdk-samples/tree/beta) with those in the zip.

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

The quickest way to get up and running is to download the personalized code samples during the Get API credentials workflow. These samples provide everything from ready-to-run sample code, an embedded credential json file, and pre-configured connections to dependencies.

1. Download and extract the [Java sample project](https://github.com/adobe/pdfservices-java-sdk-samples/tree/beta).
2. Cd to the project directory (which contains pom.xml file) and build the sample project with Maven using this command in terminal: `mvn clean install`.
3. You can import the samples Maven project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDF
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

##### Option 2: Generic samples setup

If you did not choose **Personalized Code Sample Download** during the credential setup process:

1. Download and extract the [Java sample project](https://github.com/adobe/pdfservices-java-sdk-samples/tree/beta).
2. Copy the downloaded zip to the directory that you set-up for this project and unzip the files there.
3. In the top-level directory of your samples, find and replace following files with the one present in the downloaded zip file from [Get API credentials](quickstarts/#get-api-credentials) step:
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


### Python

Jumpstart your development by bookmarking or downloading the following key resources:

-   This document
-   [Python API reference](https://opensource.adobe.com/pdfservices-python-sdk-samples/apidocs/beta/)
-   [Python sample code](https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta)
-   [Python SDK](https://www.adobe.com/go/pdfservices_python_pypi)

#### Authentication

Once you complete the [Get API credentials](quickstarts/#get-api-credentials), a zip file automatically downloads that contains content whose structure varies based on whether you opted to download personalized code samples. The zip file structures are as follows:

- **Personalized Download**: The samples download.zip contains a private.key file and an adobe-dc-pdfservices-sdk-python-samples directory. Each sample directory contains the sample code as well as a preconfigured pdfservices-api-credentials.json file.
- **Non Personalized Download**: The samples download zip contains the private.key file and a pdfservices-api-credentials.json file.

After downloading the zip, you can either run the samples in the zip directly, or you can replace the pdfservices-api-credentials.json and private.key files in the [Python sample code](https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta) with those in the zip.

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

The quickest way to get up and running is to download the personalized code samples during the Get API credentials workflow. These samples provide everything from ready-to-run sample code, an embedded credential json file, and pre-configured connections to dependencies.

1. Download and extract the [Python sample project](https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta).
2. Cd to the project directory (which contains requirements.txt file) and build the sample project using this command in terminal: `pip install -r requirements.txt`.
3. You can import the samples project into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
python src/autotagpdf/autotag_pdf.py
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

##### Option 2: Generic samples setup

If you did not choose **Personalized Code Sample Download** during the credential setup process:

1. Download and extract the [Python sample project](https://github.com/adobe/pdfservices-python-sdk-samples/tree/beta).
2. Copy the downloaded zip to the directory that you set-up for this project and unzip the files there.
3. In the top-level directory of your samples, find and replace following files with the one present in the downloaded zip file from [Get API credentials](quickstarts/#get-api-credentials) step:
   1. pdfservices-api-credentials.json
   2. private.key
4. Cd to the project directory (which contains requirements.txt file) and build the sample project using this command in terminal: `pip install -r requirements.txt`.
5. You can import the samples into your preferred IDE and run the samples from there or run the below commands from terminal:

###### To generate tagged PDF of version 1.7 from the sample file

```javascript 
python src/autotagpdf/autotag_pdf.py
```

Note: The above commands run on the input file “autotagPdfInput.pdf” present in “src/main/resources” directory and generate result in “output” directory inside the project. If the output files already exist, the commands will report an error.

<InlineAlert slots="text" />
Other sample programs in the SDK let you try out API options including generating a tagging report, and shifting headings so that the document title is only H1.
