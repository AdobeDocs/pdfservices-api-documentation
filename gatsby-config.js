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
        path: '../../'
      },
      {
        title: 'APIs',
        menu: [{
          title: 'Document Generation',
          description: 'Generate PDF and Word documents from custom Word templates',
          path: '../../doc-generation/'
        }, {
          title: 'PDF Extract',
          description: 'Extract text, tables, images, and document structure',
          path: '../../pdf-extract/'
        }, {
          title: 'PDF Embed',
          description: 'Embed high-fidelity PDFs in web apps with analytics',
          path: '../../pdf-embed/'
        }, {
          title: 'PDF Services',
          description: 'Create, combine and export PDFs',
          path: '../../pdf-services/'
        }]
      },
      {
        title: 'Use Cases',
        path: '../../use-cases.md'
      },
      {
        title: 'Pricing',
        path: '../../pdf-pricing'
      },
      {
        title: 'Resources',
        menu: [{
          title: 'Developer Resources',
          path: '../../pdf-resources/'
        }, {
          title: 'Forum',
          path: 'https://community.adobe.com/t5/document-services-apis/bd-p/Document-Cloud-SDK?page=1&sort=latest_replies&filter=all'
        }, {
          title: 'Use Cases',
          path: '../../sales-proposals-and-contracts/'
        }]
      },
      {
        title: 'Get Started',
        path: 'latest/gettingstarted.md'
      },
      {
        title: 'Documentation',
        menu:[
          {
            title: 'v2.1.0',
            path: 'latest'
          },
          {
            title: 'v2.0.0',
            path: '2.0.0'
          },
          {
            title: 'v1.3.0',
            path: '1.3.0'
          }
        ],
      },

    ],
    subPages: [
      {
        title: 'PDF Services API',
        path: 'latest/pdf-services-api/index.md',
        pages: [
          {
            title: 'Overview',
            path: 'latest/pdf-services-api/index.md'
          },
          {
            title: 'How Tos',
            path: 'latest/pdf-services-api/howtos',
            pages: [
              {
                title: 'Overview',
                path: 'latest/pdf-services-api/howtos/index.md'
              },
              {
                title: 'Create PDF',
                path: 'latest/pdf-services-api/howtos/create-pdf.md'
              },
              {
                title: 'Export PDF',
                path: 'latest/pdf-services-api/howtos/export-pdf.md'
              },
              {
                title: 'Combine PDF Files',
                path: 'latest/pdf-services-api/howtos/combine-pdf.md'
              },
              {
                title: 'OCR PDF',
                path: 'latest/pdf-services-api/howtos/ocr-pdf.md'
              },
              {
                title: 'Compress PDFs',
                path: 'latest/pdf-services-api/howtos/compress-pdf.md'
              },
              {
                title: 'Linearize PDF',
                path: 'latest/pdf-services-api/howtos/linearize-pdf.md'
              },
              {
                title: 'Protect PDF',
                path: 'latest/pdf-services-api/howtos/protect-pdf.md'
              },
              {
                title: 'Remove Protection',
                path: 'latest/pdf-services-api/howtos/remove-protection.md'
              },
              {
                title: 'Insert Pages',
                path: 'latest/pdf-services-api/howtos/insert-pages.md'
              },
              {
                title: 'Replace Pages',
                path: 'latest/pdf-services-api/howtos/replace-pages.md'
              },
              {
                title: 'Delete Pages',
                path: 'latest/pdf-services-api/howtos/delete-pages.md'
              },
              {
                title: 'Reorder Pages',
                path: 'latest/pdf-services-api/howtos/reorder-pages.md'
              },
              {
                title: 'Rotate Pages',
                path: 'latest/pdf-services-api/howtos/rotate-pages.md'
              },
              {
                title: 'Split PDF',
                path: 'latest/pdf-services-api/howtos/split-pdf.md'
              },
              {
                title: 'PDF Properties',
                path: 'latest/pdf-services-api/howtos/pdf-properties.md'
              }
            ]
          },
          {
            title: 'Version - Support policy',
            path: 'latest/pdf-services-api/policies.md'
          },
          {
            title: 'Release notes',
            path: 'latest/pdf-services-api/releasenotes.md'
          },
          {
            title: 'PDF Services API Licensing',
            path: 'latest/pdf-services-api/dcserviceslicensing.md'
          },
        ]
      },
      {
        title: 'PDF Extract API',
        path: 'latest/pdf-extract-api/index.md',
        pages: [
          {
            title: 'How Tos',
            path: 'latest/pdf-extract-api/howtos.md'
          },
          {
            title: 'Extract API',
            path: 'latest/pdf-extract-api/extract-api.md'
          },
          {
            title: 'API Licensing',
            path: 'latest/pdf-extract-api/dcserviceslicensing.md'
          },
          {
            title: 'Release Notes',
            path: 'latest/pdf-extract-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'Document Generation API',
        path: 'latest/document-generation-api/index.md',
        pages: [
          {
            title: 'Quickstarts',
            path: 'latest/document-generation-api/quickstarts.md'
          },
          {
            title: 'Template Tags',
            path: 'latest/document-generation-api/templatetags.md'
          },
          {
            title: 'Word Add-in',
            path: 'latest/document-generation-api/wordaddin.md'
          },
          {
            title: 'API Licensing',
            path: 'latest/document-generation-api/dcserviceslicensing.md'
          },
          {
            title: 'Release Notes',
            path: 'latest/document-generation-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'PDF Embed API',
        path: 'latest/pdf-embed-api/index.md',
        pages: [
          {
            title: 'PDF Embed API basics',
            path: 'latest/pdf-embed-api/howtos.md'
          },
          {
            title: 'UI customization',
            path: 'latest/pdf-embed-api/howtos_ui.md'
          },
          {
            title: 'Comments and Markup',
            path: 'latest/pdf-embed-api/howtos_comments.md'
          },
          {
            title: 'Analytics',
            path: 'latest/pdf-embed-api/howtodata.md'
          },
          {
            title: 'Handle search engine indexing',
            path: 'latest/pdf-embed-api/searchengineindexing.md'
          },
          {
            title: 'Release notes',
            path: 'latest/pdf-embed-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'PDF Services API',
        path: '2.0.0/pdf-services-api/index.md',
        pages: [
          {
            title: 'Overview',
            path: '2.0.0/pdf-services-api/index.md'
          },
          {
            title: 'How Tos',
            path: '2.0.0/pdf-services-api/howtos',
            pages: [
              {
                title: 'Overview',
                path: '2.0.0/pdf-services-api/howtos/index.md'
              },
              {
                title: 'Create PDF',
                path: '2.0.0/pdf-services-api/howtos/create-pdf.md'
              },
              {
                title: 'Export PDF',
                path: '2.0.0/pdf-services-api/howtos/export-pdf.md'
              },
              {
                title: 'Combine PDF Files',
                path: '2.0.0/pdf-services-api/howtos/combine-pdf.md'
              },
              {
                title: 'OCR PDF',
                path: '2.0.0/pdf-services-api/howtos/ocr-pdf.md'
              },
              {
                title: 'Compress PDFs',
                path: '2.0.0/pdf-services-api/howtos/compress-pdf.md'
              },
              {
                title: 'Linearize PDF',
                path: '2.0.0/pdf-services-api/howtos/linearize-pdf.md'
              },
              {
                title: 'Protect PDF',
                path: '2.0.0/pdf-services-api/howtos/protect-pdf.md'
              },
              {
                title: 'Remove Protection',
                path: '2.0.0/pdf-services-api/howtos/remove-protection.md'
              },
              {
                title: 'Insert Pages',
                path: '2.0.0/pdf-services-api/howtos/insert-pages.md'
              },
              {
                title: 'Replace Pages',
                path: '2.0.0/pdf-services-api/howtos/replace-pages.md'
              },
              {
                title: 'Delete Pages',
                path: '2.0.0/pdf-services-api/howtos/delete-pages.md'
              },
              {
                title: 'Reorder Pages',
                path: '2.0.0/pdf-services-api/howtos/reorder-pages.md'
              },
              {
                title: 'Rotate Pages',
                path: '2.0.0/pdf-services-api/howtos/rotate-pages.md'
              },
              {
                title: 'Split PDF',
                path: '2.0.0/pdf-services-api/howtos/split-pdf.md'
              },
            ]
          },
          {
            title: 'Version - Support policy',
            path: '2.0.0/pdf-services-api/policies.md'
          },
          {
            title: 'Release notes',
            path: '2.0.0/pdf-services-api/releasenotes.md'
          },
          {
            title: 'PDF Services API Licensing',
            path: '2.0.0/pdf-services-api/dcserviceslicensing.md'
          },
        ]
      },
      {
        title: 'PDF Extract API',
        path: '2.0.0/pdf-extract-api/index.md',
        pages: [
          {
            title: 'How Tos',
            path: '2.0.0/pdf-extract-api/howtos.md'
          },
          {
            title: 'Extract API',
            path: '2.0.0/pdf-extract-api/extract-api.md'
          },
          {
            title: 'API Licensing',
            path: '2.0.0/pdf-extract-api/dcserviceslicensing.md'
          },
          {
            title: 'Release Notes',
            path: '2.0.0/pdf-extract-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'Document Generation API',
        path: '2.0.0/document-generation-api/index.md',
        pages: [
          {
            title: 'Quickstarts',
            path: '2.0.0/document-generation-api/quickstarts.md'
          },
          {
            title: 'Template Tags',
            path: '2.0.0/document-generation-api/templatetags.md'
          },
          {
            title: 'Word Add-in',
            path: '2.0.0/document-generation-api/wordaddin.md'
          },
          {
            title: 'API Licensing',
            path: '2.0.0/document-generation-api/dcserviceslicensing.md'
          },
          {
            title: 'Release Notes',
            path: '2.0.0/document-generation-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'PDF Services API',
        path: '1.3.0/pdf-services-api/index.md',
        pages: [
          {
            title: 'Overview',
            path: '1.3.0/pdf-services-api/index.md'
          },
          {
            title: 'How Tos',
            path: '1.3.0/pdf-services-api/howtos',
            pages: [
              {
                title: 'Overview',
                path: '1.3.0/pdf-services-api/howtos/index.md'
              },
              {
                title: 'Create PDF',
                path: '1.3.0/pdf-services-api/howtos/create-pdf.md'
              },
              {
                title: 'Export PDF',
                path: '1.3.0/pdf-services-api/howtos/export-pdf.md'
              },
              {
                title: 'Combine PDF Files',
                path: '1.3.0/pdf-services-api/howtos/combine-pdf.md'
              },
              {
                title: 'OCR PDF',
                path: '1.3.0/pdf-services-api/howtos/ocr-pdf.md'
              },
              {
                title: 'Compress PDFs',
                path: '1.3.0/pdf-services-api/howtos/compress-pdf.md'
              },
              {
                title: 'Linearize PDF',
                path: '1.3.0/pdf-services-api/howtos/linearize-pdf.md'
              },
              {
                title: 'Protect PDF',
                path: '2.0.0/pdf-services-api/howtos/protect-pdf.md'
              },
              {
                title: 'Remove Protection',
                path: '1.3.0/pdf-services-api/howtos/remove-protection.md'
              },
              {
                title: 'Insert Pages',
                path: '2.0.0/pdf-services-api/howtos/insert-pages.md'
              },
              {
                title: 'Replace Pages',
                path: '1.3.0/pdf-services-api/howtos/replace-pages.md'
              },
              {
                title: 'Delete Pages',
                path: '2.0.0/pdf-services-api/howtos/delete-pages.md'
              },
              {
                title: 'Reorder Pages',
                path: '1.3.0/pdf-services-api/howtos/reorder-pages.md'
              },
              {
                title: 'Rotate Pages',
                path: '1.3.0/pdf-services-api/howtos/rotate-pages.md'
              },
              {
                title: 'Split PDF',
                path: '1.3.0/pdf-services-api/howtos/split-pdf.md'
              },
            ]
          },
          {
            title: 'Version - Support policy',
            path: '1.3.0/pdf-services-api/policies.md'
          },
          {
            title: 'Release notes',
            path: '1.3.0/pdf-services-api/releasenotes.md'
          },
          {
            title: 'PDF Services API Licensing',
            path: '1.3.0/pdf-services-api/dcserviceslicensing.md'
          },
        ]
      },
      {
        title: 'PDF Extract API',
        path: '1.3.0/pdf-extract-api/index.md',
        pages: [
          {
            title: 'How Tos',
            path: '1.3.0/pdf-extract-api/howtos.md'
          },
          {
            title: 'Extract API',
            path: '1.3.0/pdf-extract-api/extract-api.md'
          },
          {
            title: 'API Licensing',
            path: '1.3.0/pdf-extract-api/dcserviceslicensing.md'
          },
          {
            title: 'Release Notes',
            path: '1.3.0/pdf-extract-api/releasenotes.md'
          },
        ]
      },
      {
        title: 'Document Generation API',
        path: '1.3.0/document-generation-api/index.md',
        pages: [
          {
            title: 'Quickstarts',
            path: '1.3.0/document-generation-api/quickstarts.md'
          },
          {
            title: 'Template Tags',
            path: '1.3.0/document-generation-api/templatetags.md'
          },
          {
            title: 'Word Add-in',
            path: '1.3.0/document-generation-api/wordaddin.md'
          },
          {
            title: 'API Licensing',
            path: '1.3.0/document-generation-api/dcserviceslicensing.md'
          },
          {
            title: 'Release Notes',
            path: '1.3.0/document-generation-api/releasenotes.md'
          },
        ]
      },
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/document-services/docs/'
};
