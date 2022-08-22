---
title: Document Services APIs | PDF Embed API | Search Engine Indexing
---
# Handle search engine indexing

<p>PDFs displayed using the PDF Embed API are not indexed and won't appear
in search engine results by default since the API doesn't store a direct
reference of the PDF URL in the DOM. In order to index the PDF so that
text appears in a search result, the URL of the PDF must be available in
the website DOM. Search engine bots start by reading the website content
and navigate all the links in the DOM.

Search engine indexing and optimisation of any website can only be
controlled by the website developers. One **approach** which enables PDF
indexing via the PDF Embed API involves using sitemaps.
</p>

## Sitemap

A *sitemap* is a file which contains information about the pages and
other files on the website and the relationships between them. A sitemap
tells search engines which pages and files are important in the website
and also provides valuable information about those files. It helps
search engines find the content, crawl the website more efficiently, and
index the content.

In order to enable indexing of PDF files displayed using PDF Embed API,
website developers can add the PDF URL to the sitemap. For example, to
add an URL to an XML sitemap of a website:

```
<url>
   <loc>https://example.com/PDFs/example.pdf</loc>
</url>
```

Every `<url>` tag must contain a `<loc>` tag which would contain the URL
of the PDF. You can have multiple `<url>` tags to add URLs of different
PDF files.

The search engines will crawl these links found in the sitemap and index
the PDF content accordingly.

## Alternative approaches

For developers who don't wish to use sitemaps, there are alternative
approaches to enable search engine PDF indexing. The URL of the PDF file
should already be available in the website to enable indexing. Website
developers can trap the click of the PDF link and open the PDF using PDF
Embed API. Developers can create as many user experiences as possible
with this approach using the different configurations provided by PDF
Embed API.

Here are some of the ways to implement this:

-   Auto-click on the PDF link after the webpage loads completely and
    open the PDF in the desired embed mode.
-   Create a separate webpage to display the PDFs in full window embed
    mode by passing the PDF reference.
-   Open the PDF in line within the context of the webpage.
-   Open the PDF on top of the webpage using the lightbox embed mode
    provided by PDF Embed API.

Find the working code samples
[here](https://www.adobe.com/go/pdfembedapi_samples) under
`/More Samples/Handle Search Engine Indexing/`.

<InlineAlert slots="text"/>

These are only suggestions, and it is up to the website developer how
they do the actual implementation depending on the design and
structure of the website.
