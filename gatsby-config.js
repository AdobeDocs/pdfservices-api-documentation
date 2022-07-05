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
  flags: {
    DEV_SSR: false
  },
  siteMetadata: {
    docs: {
      title: 'Get credentials',
      path:  process.env.GETTING_STARTED || 'getting-started'
    },
    pages: [
      {
        title: 'Adobe Document Services',
        path: '../../../document-services/homepage'
      },
      {
        title: 'APIs',
        menu: [
          {
            title: 'PDF Services',
            description: 'Create, combine and export PDFs',
            path: '../document-services/apis/pdf-services/'
          },
          {
            title: 'PDF Extract',
            description: 'Extract text, tables, images, and document structure',
            path: '../document-services/apis/pdf-extract/'
          },
          {
            title: 'Document Generation',
            description: 'Generate PDF and Word documents from custom Word templates',
            path: '../document-services/apis/doc-generation/'
          },
          {
            title: 'PDF Embed',
            description: 'Embed high-fidelity PDFs in web apps with analytics',
            path: '../document-services/apis/pdf-embed/'
          },
          {
            title: 'Sign API',
            description: 'Integrate e-signatures into your platform or application',
            path: '../document-services/apis/sign-api/'
          },
          {
            title: 'Power Automate Connector',
            description: 'Build workflows on Microsoft Power Platform easily',
            path: '../document-services/apis/microsoft-pa-integration/'
          }
        ]
      },
      {
        title: 'Use Cases',
        path: '../document-services/use-cases/agreements-and-contracts/sales-proposals-and-contracts.md'
      },
      {
        title: 'Pricing',
        path: '../document-services/pricing/#main'
      },
      {
        title: 'Resources',
        menu: [{
          title: 'Developer Resources',
          path: '../document-services/resources/'
        }, {
          title: 'Forum',
          path: 'https://community.adobe.com/t5/document-services-apis/bd-p/Document-Cloud-SDK?page=1&sort=latest_replies&filter=all'
        }, {
          title: 'Licensing',
          path: process.env.LICENSING || 'https://developer.adobe.com/document-services/docs/overview/pdf-services-api/dcserviceslicensing?aio_internal'
        }]
      },
      {
        title: 'Documentation',
        menu: [
          {
            title: 'Overview',
            path: 'overview'
          },
          {
            title: 'PDF Services API',
            path: 'overview/pdf-services-api/index.md'
          },
          {
            title: 'Document Generation API',
            path: 'overview/document-generation-api/index.md'
          },
          {
            title: 'Digital Seal API',
            path: 'overview/digital-seal-api/index.md'
          },
          {
            title: 'PDF Extract API',
            path: 'overview/pdf-extract-api/index.md'
          },
          {
            title: 'PDF Embed API',
            path: 'overview/pdf-embed-api/index.md'
          },
        ]
      },
    ],
    subPages: [
      {
        title: 'Introduction',
        path: 'overview/index.md'
      },
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
                title: 'Extract PDF',
                path: 'overview/pdf-services-api/howtos/extract-pdf.md'
              },
              {
                title: 'Get PDF Properties',
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
          {
            title: 'Usage Limits',
            path: 'overview/pdf-services-api/dcserviceslicensing.md#usage-limits'
          }
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
            title: 'Fragments',
            path: 'overview/document-generation-api/fragments.md'
          },
          {
            title: 'Apply styling and formatting',
            path: 'overview/document-generation-api/stylingformattingtags.md'
          },
          {
            title: 'Hyperlink',
            path: 'overview/document-generation-api/hyperlink.md'
          },
          {
            title: 'Dynamic Table Constructs ',
            path: 'overview/document-generation-api/dynamictableconstructs.md'
          },
          {
            title: 'Word Add-in',
            path: 'overview/document-generation-api/wordaddin.md'
          },
          {
            title: 'Release Notes',
            path: 'overview/pdf-services-api/releasenotes.md'
          },
          {
            title: 'PDF Services API Licensing',
            path: 'overview/document-generation-api/dcserviceslicensing.md'
          },
          {
            title: 'Usage Limits',
            path: 'overview/document-generation-api/dcserviceslicensing.md#usage-limits'
          }
        ]
      },
      {
        title: 'Digital Seal API',
        path: 'overview/digital-seal-api/index.md',
        pages: [
          {
            title: 'Overview',
            path: 'overview/digital-seal-api/index.md'
          },
          {
            title: 'Prerequisites',
            path: 'overview/digital-seal-api/prerequisites.md'
          },
          {
            title: 'Quickstarts',
            path: 'overview/digital-seal-api/quickstarts.md'
          }
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
            title: 'Quickstarts',
            path: 'overview/pdf-extract-api/quickstarts.md'
          },
          {
            title: 'How Tos',
            path: 'overview/pdf-extract-api/howtos',
            pages: [
              {
                title: 'Overview',
                path: 'overview/pdf-extract-api/howtos/index.md'
              },
              {
                title: 'PDF Extract API',
                path: 'overview/pdf-extract-api/howtos/extract-api.md'
              }
            ]
          },
          {
            title: 'Release Notes',
            path: 'overview/pdf-services-api/releasenotes.md'
          },
          {
            title: 'PDF Services API Licensing',
            path: 'overview/pdf-extract-api/dcserviceslicensing.md'
          },
          {
            title: 'Usage Limits',
            path: 'overview/pdf-extract-api/dcserviceslicensing.md#usage-limits'
          }
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
            title: 'UI Customization',
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
        path: 'overview/policies.md',
        pages: [
          {
            title: 'Version Support Policy',
            path: 'overview/policies.md',
          },
          {
            title: 'v2.1.0',
            path: 'https://opensource.adobe.com/pdftools-sdk-docs/release/2.1.0/',
          },
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
