---
title: How Tos | PDF Services API | Adobe PDF Services
---
# How Tos

<p>
The samples and documentation here should get you quickly up and running
with the PDF Services SDK. These code examples illustrate how to perform
PDF actions using the SDK, including:

- Creating a PDF from multiple formats, including HTML, Microsoft
  Office documents, and text files
- Exporting a PDF to other formats or an image
- Combining entire PDFs or specified page ranges
- Using OCR to make a PDF file searchable with a custom locale
- Compress PDFs with compression level and Linearize PDFs
- Protect PDFs with password(s) and Remove password protection from
  PDFs
- Common page operations, including inserting, replacing, deleting,
  reordering, and rotating
- Splitting PDFs into multiple files
- Extract PDF as JSON: the content, structure & renditions of table
  and figure elements along with Character Bounding Boxes
- Get the properties of a PDF file like page count, PDF version, file size, compliance levels, font info, permissions and more
- Improving the accessibility of PDFs (Available under Early Access Program)

</p>

## Service region configuration

Adobe PDF Services SDKs use `US (United States)` as a default region to process all the documents.
Once you purchase PDF Services SDK, the SDKs can be configured to process the documents in a specified region that is listed below.
Currently, PDF Services SDKs has support for the following regions :

|Region Code | Name         |
| ------------| ------------|
| `US`       | United States (default)|
| `EU`       | Europe |

In addition to
the details below, you can refer to working code samples:

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/ExportPDFWithSpecifiedRegion.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/blob/master/ExportPDFWithSpecifiedRegion/Program.cs)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/customconfigurations/export-pdf-with-specified-region.js)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/master/src/extractpdf/extract_txt_from_pdf_with_specified_region.py)

Available properties:

-   **region**: Default: `US`. All documents will be processed in the specified region.

Override the `region` property via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Python" />

### Java

```javascript
ClientConfig clientConfig = ClientConfig.builder()
    .setRegion(Region.EU)
    .build();
```

### .NET

```javascript
ClientConfig clientConfig = ClientConfig.ConfigBuilder()
    .SetRegion(Region.EU)
    .Build();
```

### Node.js

```javascript
const clientConfig = new ClientConfig({
    region: Region.EU
});
```

### Python

```javascript
client_config = ClientConfig(
    region=Region.US
)
```

## Proxy Server Configuration

The Java and Node SDK enables connection to API calls through Proxy via Client Configurations.
Also, it supports username and password based authentication for the proxy server.
It allows the clients to use SDK within the network where all outgoing calls have to
go through a proxy and are allowed only if allow-listed on the proxy. Please refer to the
following sample for details.

### Java
- [Java Sample for Proxy Server Config](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithProxyServer.java )
- [Java Sample for Proxy Server Config With Basic Authentication](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithAuthenticatedProxyServer.java )

### Java Proxy Server configuration

Available properties:

- **host**: The proxy Server Hostname (DNS or IP Address)
- **scheme**: Default: http. Scheme of the proxy server i.e. http or https.
- **port**: Default: 80 for http, 443 for https. Port on which proxy server is listening.
- **username**: Username for the authentication.
- **password**: Password for the authentication.

### Node.js
- [Node Sample for Proxy Server Config](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/customconfigurations/create-pdf-with-proxy-server.js)
- [Node Sample for Proxy Server Config With Basic Authentication](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/customconfigurations/create-pdf-with-authenticated-proxy-server.js)

### Node Proxy Server configuration

Available properties:

- **host**: The proxy Server Hostname (DNS or IP Address)
- **scheme**: Default: http. Scheme of the proxy server i.e. http or https.
- **port**: Port on which proxy server is listening.
- **username**: Username for the authentication.
- **password**: Password for the authentication.

### Python

- [Python Sample for Proxy Server Config](https://github.com/adobe/pdfservices-python-sdk-samples/blob/main/src/customconfigurations/create_pdf_with_proxy_server.py)
- [Python Sample for Proxy Server Config With Basic Authentication](https://github.com/adobe/pdfservices-python-sdk-samples/blob/main/src/customconfigurations/create_pdf_with_authenticated_proxy_server.py)

### Python Proxy Server configuration

Available properties:

- **host**: The proxy Server Hostname (DNS or IP Address)
- **scheme**: Default: http. Scheme of the proxy server i.e. http or https.
- **port**: Default: 80 for http, 443 for https. Port on which proxy server is listening.
- **username**: Username for the authentication.
- **password**: Password for the authentication.

All these properties are wrapped within the `proxyServerConfig` object. Further, `username` and `password` is to be provided
inside the nested object `usernamePasswordCredentials`.

Set the above properties using a custom `ProxyServerConfig` class, and use `ClientConfig` class to configure proxy server.

**Sample showing proxy server configuration without authentication.**

<CodeBlock slots="heading, code" repeat="3" languages="Java, Node JS, Python" />

### Java

```java
ProxyServerConfig proxyServerConfig = new ProxyServerConfig.Builder()
    .withHost("PROXY_HOSTNAME")
    .withProxyScheme(ProxyScheme.HTTPS)
    .withPort(443)
    .build();

ClientConfig clientConfig = ClientConfig.builder()
    .withConnectTimeout(10000)
    .withSocketTimeout(40000)
    .withProxyServerConfig(proxyServerConfig)
    .build();
```

### Node.js

```js
const proxyServerConfig = new ProxyServerConfig({
    host: "PROXY_HOSTNAME",
    port: 443,
    scheme: ProxyScheme.HTTP
});

const clientConfig = new ClientConfig({
    proxyServerConfig
});
```

### Python

```python
proxy_server_config = ProxyServerConfig(
    host="PROXY_HOSTNAME",
    port=443,
    scheme=ProxyScheme.HTTP,
)

client_config = ClientConfig(
    proxy_server_config=proxy_server_config
)
```

**Sample showing proxy server configuration with authentication.**

<CodeBlock slots="heading, code" repeat="3" languages="Java, Node JS, Python" />

### Java

```java
ProxyServerConfig proxyServerConfig = new ProxyServerConfig.Builder()
    .withHost("PROXY_HOSTNAME")
    .withProxyScheme(ProxyScheme.HTTPS)
    .withPort(443)
    .withCredentials(new UsernamePasswordCredentials("USERNAME", "PASSWORD"))
    .build();

ClientConfig clientConfig = ClientConfig.builder()
    .withConnectTimeout(10000)
    .withSocketTimeout(40000)
    .withProxyServerConfig(proxyServerConfig)
    .build();
```

### Node.js

```js
const proxyServerConfig = new ProxyServerConfig({
    host: "PROXY_HOSTNAME",
    port: 443,
    scheme: ProxyScheme.HTTP,
    credentials: new UsernamePasswordCredentials({
        username: "USERNAME",
        password: "PASSWORD"
    })
});

const clientConfig = new ClientConfig({
    proxyServerConfig
});
```

### Python

```python
proxy_server_config = ProxyServerConfig(
    host="PROXY_HOSTNAME",
    port=443,
    scheme=ProxyScheme.HTTP,
    credentials=UsernamePasswordCredentials(
        username="USERNAME",
        password="PASSWORD"
    )
)

client_config = ClientConfig(
    proxy_server_config=proxy_server_config
)
```


## Custom timeout configuration

The APIs use inferred timeout properties and provide defaults. However,
the SDK supports custom timeouts for the API calls. You can tailor the
timeout settings for your environment and network speed. In addition to
the details below, you can refer to working code samples:

-   [Java](https://github.com/adobe/pdfservices-java-sdk-samples/blob/master/src/main/java/com/adobe/pdfservices/operation/samples/customconfigurations/CreatePDFWithCustomTimeouts.java)
-   [.NET](https://github.com/adobe/PDFServices.NET.SDK.Samples/blob/master/CreatePDFWithCustomTimeouts/Program.cs)
-   [Node.js](https://github.com/adobe/pdfservices-node-sdk-samples/blob/master/src/customconfigurations/create-pdf-with-custom-timeouts.js)
-   [Python](https://github.com/adobe/pdfservices-python-sdk-samples/blob/main/src/customconfigurations/create_pdf_with_custom_timeouts.py)

### Java timeout configuration

Available properties:

-   **connectTimeout**: Default: 2000. The maximum allowed time in
    milliseconds for creating an initial HTTPS connection.
-   **socketTimeout**: Default: 10000. The maximum allowed time in
    milliseconds between two successive HTTP response packets.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Java" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.builder()
    .withConnectTimeout(3000)
    .withSocketTimeout(20000)
    .build();
```

### .NET timeout configuration

Available properties:

-   **timeout**: Default: 400000. The maximum allowed time in
    milliseconds for establishing a connection, sending a request, and
    getting a response.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages=".NET" />

### 

```javascript
ClientConfig clientConfig = ClientConfig.ConfigBuilder()
    .WithTimeout(40000)
    .Build();
```

### Node.js timeout configuration

Available properties:

-   **timeout**: Default: 10000. The maximum allowed time in milliseconds before the request times out. If the request
    takes longer than `timeout`, the request will be aborted.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Node JS" />

### 

```javascript
const clientConfig = new ClientConfig({
    timeout: 15000
})
```  

### Python timeout configuration

Available properties:

- **connectTimeout**: Default: 4000. The number of milliseconds
    Requests will wait for the client to establish a connection to
    Server.
- **readTimeout**: Default: 10000. The number of milliseconds the
    client will wait for the server to send a response.

Override the timeout properties via a custom `ClientConfig` class:

<CodeBlock slots="heading, code" repeat="1" languages="Python" />

### 

```javascript
client_config = ClientConfig(
    connect_timeout=4000,
    read_timeout=10000
)
```
