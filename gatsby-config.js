/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  siteMetadata: {
    home: {
      title: 'Products',
      path: '../../apis'
    },
    pages: [
      {
        title: 'Adobe Document Services',
        path: '../../../document-services'
      },
      {
        title: 'APIs',
        menu: [{
          title: 'Document Generation',
          description: 'Generate PDF and Word documents from custom Word templates',
          path: '../document-services/doc-generation/'
        }, {
          title: 'PDF Extract',
          description: 'Extract text, tables, images, and document structure',
          path: '../document-services/pdf-extract/'
        }, {
          title: 'PDF Embed',
          description: 'Embed high-fidelity PDFs in web apps with analytics',
          path: '../document-services/pdf-embed/'
        }, {
          title: 'PDF Services',
          description: 'Create, combine and export PDFs',
          path: '../document-services/pdf-services/'
        }]
      },
      {
        title: 'Use Cases',
        path: '../document-services/use-cases.md'
      },
      {
        title: 'Pricing',
        path: '../document-services/pdf-pricing'
      },
      {
        title: 'Resources',
        menu: [{
          title: 'Developer Resources',
          path: '../document-services/pdf-resources/'
        }, {
          title: 'Forum',
          path: 'https://community.adobe.com/t5/document-services-apis/bd-p/Document-Cloud-SDK?page=1&sort=latest_replies&filter=all'
        }, {
          title: 'Use Cases',
          path: '../document-services/sales-proposals-and-contracts/'
        }]
      },
      {
        title: 'Get Started',
        path: process.env.GETTING_STARTED
      },
      {
        title: 'Documentation',
        menu: [
          {
            title: 'Overview',
            path: 'overview'
          },
          {
            title: 'Document Generation API',
            path: 'overview/document-generation-api/index.md'
          },
          {
            title: 'PDF Extract API',
            path: 'overview/pdf-extract-api/index.md'
          },
          {
            title: 'PDF Embed API',
            path: 'overview/pdf-embed-api/index.md'
          },
          {
            title: 'PDF Services API',
            path: 'overview/pdf-services-api/index.md'
          }
        ]
      },
    ],
    subPages: [
      {
        title: 'PDF Services API',
        path: 'overview/pdf-services-api/index.md',
        pages: [
          {
            title: 'Overview',
            path: 'overview/pdf-services-api/index.md'
          },
          {
            title: 'How Tos',
            path: 'overview/pdf-services-api/howtos',
            pages: [
              {
                title: 'Overview',
                path: 'overview/pdf-services-api/howtos/index.md'
              },
              {
                title: 'Create PDF',
                path: 'overview/pdf-services-api/howtos/create-pdf.md'
              },
              {
                title: 'Export PDF',
                path: 'overview/pdf-services-api/howtos/export-pdf.md'
              },
              {
                title: 'Extract PDF',
                path: 'overview/pdf-services-api/howtos/extract-pdf.md'
              },
              {
                title: 'Combine PDF Files',
                path: 'overview/pdf-services-api/howtos/combine-pdf.md'
              },
              {
                title: 'OCR PDF',
                path: 'overview/pdf-services-api/howtos/ocr-pdf.md'
              },
              {
                title: 'Compress PDFs',
                path: 'overview/pdf-services-api/howtos/compress-pdf.md'
              },
              {
                title: 'Linearize PDF',
                path: 'overview/pdf-services-api/howtos/linearize-pdf.md'
              },
              {
                title: 'Protect PDF',
                path: 'overview/pdf-services-api/howtos/protect-pdf.md'
              },
              {
                title: 'Remove Protection',
                path: 'overview/pdf-services-api/howtos/remove-protection.md'
              },
              {
                title: 'Insert Pages',
                path: 'overview/pdf-services-api/howtos/insert-pages.md'
              },
              {
                title: 'Replace Pages',
                path: 'overview/pdf-services-api/howtos/replace-pages.md'
              },
              {
                title: 'Delete Pages',
                path: 'overview/pdf-services-api/howtos/delete-pages.md'
              },
              {
                title: 'Reorder Pages',
                path: 'overview/pdf-services-api/howtos/reorder-pages.md'
              },
              {
                title: 'Rotate Pages',
                path: 'overview/pdf-services-api/howtos/rotate-pages.md'
              },
              {
                title: 'Split PDF',
                path: 'overview/pdf-services-api/howtos/split-pdf.md'
              },
              {
                title: 'PDF Properties',
                path: 'overview/pdf-services-api/howtos/pdf-properties.md'
              }
            ]
          },
          {
            title: 'Version - Support policy',
            path: 'overview/pdf-services-api/policies.md'
          },
          {
            title: 'Release notes',
            path: 'overview/pdf-services-api/releasenotes.md'
          },
          {
            title: 'PDF Services API Licensing',
            path: 'overview/pdf-services-api/dcserviceslicensing.md'
          },
        ]
      },
      {
        title: 'PDF Extract API',
        path: 'overview/pdf-extract-api/index.md',
        pages: [
          {
            title: 'Overview',
            path: 'overview/pdf-extract-api/index.md'
          },
          {
            title: 'How Tos',
            path: 'overview/pdf-extract-api/howtos/howtos.md'
          },
          {
            title: 'Extract API',
            path: 'overview/pdf-extract-api/howtos/extract-api.md'
          },
          {
            title: 'API Licensing',
            path: 'overview/pdf-extract-api/dcserviceslicensing.md'
          },
          {
            title: 'Release Notes',
            path: 'docs/pdf-extract-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'Document Generation API',
        path: 'overview/document-generation-api/index.md',
        pages: [
          {
            title: 'Overview',
            path: 'overview/document-generation-api/index.md'
          },
          {
            title: 'Quickstarts',
            path: 'overview/document-generation-api/quickstarts.md'
          },
          {
            title: 'Template Tags',
            path: 'overview/document-generation-api/templatetags.md'
          },
          {
            title: 'Word Add-in',
            path: 'overview/document-generation-api/wordaddin.md'
          },
          {
            title: 'API Licensing',
            path: 'overview/document-generation-api/dcserviceslicensing.md'
          },
          {
            title: 'Release Notes',
            path: 'overview/document-generation-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'PDF Embed API',
        path: 'overview/pdf-embed-api/index.md',
        pages: [
          {
            title: 'Overview',
            path: 'overview/pdf-embed-api/index.md',
          },
          {
            title: 'PDF Embed API basics',
            path: 'overview/pdf-embed-api/howtos.md'
          },
          {
            title: 'UI customization',
            path: 'overview/pdf-embed-api/howtos_ui.md'
          },
          {
            title: 'Comments and Markup',
            path: 'overview/pdf-embed-api/howtos_comments.md'
          },
          {
            title: 'Analytics',
            path: 'overview/pdf-embed-api/howtodata.md'
          },
          {
            title: 'Handle search engine indexing',
            path: 'overview/pdf-embed-api/searchengineindexing.md'
          },
          {
            title: 'Release notes',
            path: 'overview/pdf-embed-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'Archives',
        path: 'overview/pdf-services-api/policies.md',
        pages: [
          {
            title: 'v2.0.0',
            path: 'https://opensource.adobe.com/pdftools-sdk-docs/release/2.0.0/',
          },
          {
            title: 'v1.3.0',
            path: 'https://opensource.adobe.com/pdftools-sdk-docs/release/1.3.0/',
          },
          {
            title: 'v1.2.0',
            path: 'https://opensource.adobe.com/pdftools-sdk-docs/release/1.2.0/',
          },
          {
            title: 'v1.1.0',
            path: 'https://opensource.adobe.com/pdftools-sdk-docs/release/1.1.0/',
          },
          {
            title: 'v1.0.0',
            path: 'https://opensource.adobe.com/pdftools-sdk-docs/release/1.0.0/',
          }
        ]
      },
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/document-services/docs/'
};
