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
      title: 'Adobe Document Services',
      path: '/document-services/'
    },
    pages: [
      {
        title: 'Documentation',
        path: '/'
      },
      {
        title: 'APIs',
        menu: [
          {
            title: 'PDF Services API',
            path: 'pdf-services-api'
          },
          {
            title: 'PDF Embed API',
            path: 'pdf-embed-api'
          },
          {
            title: 'Document Generation API',
            path: 'document-generation-api'
          },
          {
            title: 'Document Generation API',
            path: 'document-generation-api'
          },
          {
            title: 'PDF Extract API',
            path: 'pdf-extract-api'
          }
        ]
      },
      {
        title: 'Community Forum',
        path: 'https://community.adobe.com/t5/document-cloud-sdk/bd-p/Document-Cloud-SDK?page=1&sort=latest_replies&filter=all#://'
      },
    ],
    subPages: [
      {
        title: 'Overview',
        path: 'pdf-extract-api/index.md'
      },
      {
        title: 'How Tos',
        path: 'pdf-extract-api/howtos.md'
      },
      {
        title: 'Extract API',
        path: 'pdf-extract-api/extract-api.md'
      },
      {
        title: 'API Licensing',
        path: 'pdf-extract-api/dcserviceslicensing.md'
      },
      {
        title: 'Release Notes',
        path: 'pdf-extract-api/releasenotes.md'
      },
      {
        title: 'Quickstart',
        path: 'pdf-services-api/index.md'
      },
      {
        title: 'How Tos',
        path: 'pdf-services-api/howtos',
        pages: [
          {
            title: 'Overview',
            path: 'pdf-services-api/howtos/index.md'
          },
          {
            title: 'Create PDF',
            path: 'pdf-services-api/howtos/create-pdf.md'
          },
          {
            title: 'Export PDF',
            path: 'pdf-services-api/howtos/export-pdf.md'
          },
          {
            title: 'Combine PDF Files',
            path: 'pdf-services-api/howtos/combine-pdf.md'
          },
          {
            title: 'OCR PDF',
            path: 'pdf-services-api/howtos/ocr-pdf.md'
          },
          {
            title: 'Compress PDFs',
            path: 'pdf-services-api/howtos/compress-pdf.md'
          },
          {
            title: 'Linearize PDF',
            path: 'pdf-services-api/howtos/linearize-pdf.md'
          },
          {
            title: 'Protect PDF',
            path: 'pdf-services-api/howtos/protect-pdf.md'
          },
          {
            title: 'Remove Protection',
            path: 'pdf-services-api/howtos/remove-protection.md'
          },
          {
            title: 'Insert Pages',
            path: 'pdf-services-api/howtos/insert-pages.md'
          },
          {
            title: 'Replace Pages',
            path: 'pdf-services-api/howtos/replace-pages.md'
          },
          {
            title: 'Delete Pages',
            path: 'pdf-services-api/howtos/delete-pages.md'
          },
          {
            title: 'Reorder Pages',
            path: 'pdf-services-api/howtos/reorder-pages.md'
          },
          {
            title: 'Rotate Pages',
            path: 'pdf-services-api/howtos/rotate-pages.md'
          },
          {
            title: 'Split PDF',
            path: 'pdf-services-api/howtos/split-pdf.md'
          },
          {
            title: 'PDF Properties',
            path: 'pdf-services-api/howtos/pdf-properties.md'
          }
        ]
      },
      {
        title: 'Version - Support policy',
        path: 'pdf-services-api/policies.md'
      },
      {
        title: 'Release notes',
        path: 'pdf-services-api/releasenotes.md'
      },
      {
        title: 'PDF Services API Licensing',
        path: 'pdf-services-api/dcserviceslicensing.md'
      },
      {
        title: 'Quickstarts',
        path: 'pdf-embed-api/index.md'
      },
      {
        title: 'PDF Embed API basics',
        path: 'pdf-embed-api/howtos.md'
      },
      {
        title: 'UI customization',
        path: 'pdf-embed-api/howtos_ui.md'
      },
      {
        title: 'Comments and Markup',
        path: 'pdf-embed-api/howtos_comments.md'
      },
      {
        title: 'Analytics',
        path: 'pdf-embed-api/howtodata.md'
      },
      {
        title: 'Handle search engine indexing',
        path: 'pdf-embed-api/searchengineindexing.md'
      },
      {
        title: 'Release notes',
        path: 'pdf-embed-api/releasenotes.md'
      },
      {
        title: 'Overview',
        path: 'document-generation-api/index.md'
      },
      {
        title: 'Quickstarts',
        path: 'document-generation-api/quickstarts.md'
      },
      {
        title: 'Template Tags',
        path: 'document-generation-api/templatetags.md'
      },
      {
        title: 'Word Add-in',
        path: 'document-generation-api/wordaddin.md'
      },
      {
        title: 'API Licensing',
        path: 'document-generation-api/dcserviceslicensing.md'
      },
      {
        title: 'Release Notes',
        path: 'document-generation-api/releasenotes.md'
      },
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/document-services/docs/'
};
