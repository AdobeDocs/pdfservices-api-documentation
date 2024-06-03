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
            path: 'https://acrobatservices.adobe.com/dc-integration-creation-app-cdn/main.html'
        },
        pages: [
            {
                title: 'Adobe Acrobat Services',
                subTitle: '',
                path: '../../../document-services/'
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
                        title: 'PDF Accessibility Auto-Tag',
                        description: 'Auto-tag PDF content to improve accessibility',
                        path: '../document-services/apis/pdf-accessibility-auto-tag/'
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
                        title: 'Electronic Seal API',
                        description: 'Electronically seal PDF documents at scale to provide document athenticity and identity',
                        path: '../document-services/apis/electronic-seal-api/'
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
                path: '../document-services/pricing/main'
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
                    path: process.env.LICENSING || 'https://developer.adobe.com/document-services/docs/overview/limits/'
                },{
                    title: 'Sales FAQ',
                    path: '../document-services/faq/sales/'
                },
                {
                    title: 'Tech Support FAQ',
                    path: '../document-services/faq/tech-support/'
                },
                {
                    title: 'Contact Us',
                    path: '../document-services/pricing/contact/'
                }
                ]
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
                        title: 'PDF Accessibility Auto-Tag API',
                        path: 'overview/pdf-accessibility-auto-tag-api/index.md'
                    },
                    {
                        title: 'PDF Extract API',
                        path: 'overview/pdf-extract-api/index.md'
                    },
                    {
                        title: 'Document Generation API',
                        path: 'overview/document-generation-api/index.md'
                    },
                    {
                        title: 'PDF Electronic Seal API',
                        path: 'overview/pdf-electronic-seal-api/index.md'
                    },
                    {
                        title: 'PDF Embed API',
                        path: 'overview/pdf-embed-api/index.md'
                    }
                ]
            },
            {
                title: "REST APIs",
                path: 'apis/index.md'
            }
        ],
        subPages: [
            {
                title: 'Introduction',
                path: 'overview/index.md'
            },
            {
                title: 'PDF Services API',
                subTitle: '',
                path: 'overview/pdf-services-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/pdf-services-api/index.md'
                    },
                    {
                        title: 'Getting Started',
                        path: 'overview/pdf-services-api/gettingstarted.md'
                    },
                    {
                        title: 'Quickstarts',
                        path: 'overview/pdf-services-api/quickstarts',
                        pages: [
                            {
                                title:'Node.js',
                                path: 'overview/pdf-services-api/quickstarts/nodejs/index.md'
                            },
                            {
                                title:'Java',
                                path: 'overview/pdf-services-api/quickstarts/java/index.md'
                            },
                            {
                                title:'.NET',
                                path: 'overview/pdf-services-api/quickstarts/dotnet/index.md'
                            },
                            {
                                title:'Python',
                                path: 'overview/pdf-services-api/quickstarts/python/index.md'
                            }
                        ]
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
                                title: 'Region Configs for APIs',
                                path: 'overview/pdf-services-api/howtos/service-region-configuration-for-apis.md'
                            },
                            {
                                title: 'External Storage for APIs',
                                path: 'overview/pdf-services-api/howtos/pdf-external-storage-sol.md'
                            },
                            {
                                title: 'Webhook Notification for APIs',
                                path: 'overview/pdf-services-api/howtos/webhook-notification.md'
                            },
                            {
                                title: 'SDK Utilities',
                                path: 'overview/pdf-services-api/howtos/sdk-utilities.md'
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
                            },
                            {
                                title: 'PDF Accessibility Auto-Tag',
                                path: 'overview/pdf-services-api/howtos/pdf-accessibility-auto-tag-pdf.md'
                            },
                            {
                                title: 'PDF Electronic Seal',
                                path: 'overview/pdf-services-api/howtos/electronic-seal-api.md'
                            },
                            {
                                title: 'PDF Watermark',
                                path: 'overview/pdf-services-api/howtos/pdf-watermark-api.md'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'PDF Accessibility Auto-Tag API',
                path: 'overview/pdf-accessibility-auto-tag-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/pdf-accessibility-auto-tag-api/index.md'
                    },
                    {
                        title: 'Getting Started',
                        path: 'overview/pdf-accessibility-auto-tag-api/gettingstarted.md'
                    },
                    {
                        title: 'Quickstarts',
                        path: 'overview/pdf-accessibility-auto-tag-api/quickstarts',
                        pages: [
                            {
                                title:'Node.js',
                                path: 'overview/pdf-accessibility-auto-tag-api/quickstarts/nodejs/index.md'
                            },
                            {
                                title:'Java',
                                path: 'overview/pdf-accessibility-auto-tag-api/quickstarts/java/index.md'
                            },
                            {
                                title:'.NET',
                                path: 'overview/pdf-accessibility-auto-tag-api/quickstarts/dotnet/index.md'
                            },
                            {
                                title:'Python',
                                path: 'overview/pdf-accessibility-auto-tag-api/quickstarts/python/index.md'
                            }
                        ]
                    },
                    {
                        title: 'How Tos',
                        subTitle: '',
                        path: 'overview/pdf-accessibility-auto-tag-api/howtos/index.md',
                        pages: [
                            {
                                title: 'PDF Accessibility Auto-Tag API',
                                path: 'overview/pdf-accessibility-auto-tag-api/howtos/accessibility-auto-tag-api.md'
                            },
                        ]
                    }
                ]
            },
            {
                title: 'PDF Extract API',
                subTitle: '',
                path: 'overview/pdf-extract-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/pdf-extract-api/index.md'
                    },
                    {
                        title: 'Getting Started',
                        path: 'overview/pdf-extract-api/gettingstarted.md'
                    },
                    {
                        title: 'Quickstarts',
                        path: 'overview/pdf-extract-api/quickstarts',
                        pages: [
                            {
                                title:'Node.js',
                                path: 'overview/pdf-extract-api/quickstarts/nodejs/index.md'
                            },
                            {
                                title:'Java',
                                path: 'overview/pdf-extract-api/quickstarts/java/index.md'
                            },
                            {
                                title:'.NET',
                                path: 'overview/pdf-extract-api/quickstarts/dotnet/index.md'
                            },
                            {
                                title:'Python',
                                path: 'overview/pdf-extract-api/quickstarts/python/index.md'
                            }
                        ]
                    },
                    {
                        title: 'How Tos',
                        subTitle: '',
                        path: 'overview/pdf-extract-api/howtos/index.md',
                        pages: [
                            {
                                title: 'PDF Extract API',
                                path: 'overview/pdf-extract-api/howtos/extract-api.md'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Document Generation API',
                subTitle: '',
                path: 'overview/document-generation-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/document-generation-api/index.md'
                    },
                    {
                        title: 'Getting Started',
                        path: 'overview/document-generation-api/gettingstarted.md'
                    },
                    {
                        title: 'Quickstarts',
                        path: 'overview/document-generation-api/quickstarts',
                        pages: [
                            {
                                title:'Node.js',
                                path: 'overview/document-generation-api/quickstarts/nodejs/index.md'
                            },
                            {
                                title:'Java',
                                path: 'overview/document-generation-api/quickstarts/java/index.md'
                            },
                            {
                                title:'.NET',
                                path: 'overview/document-generation-api/quickstarts/dotnet/index.md'
                            },
                            {
                                title:'Python',
                                path: 'overview/document-generation-api/quickstarts/python/index.md'
                            }
                        ]

                    },
                    {
                        title:'How Tos',
                        path: 'overview/document-generation-api/templatetags.md',
                        pages: [
                            {
                                title: 'Template Tags',
                                path: 'overview/document-generation-api/templatetags.md'
                            },
                            {
                                title: 'Table Tag with Markers',
                                path: "overview/document-generation-api/tablewithmarkers.md"
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
                                title: 'Inline Images',
                                path: 'overview/document-generation-api/inlineimages.md'
                            },
                            {
                                title: 'Complex Table Constructs ',
                                path: 'overview/document-generation-api/complextableconstructs.md'
                            },
                            {
                                title: 'Word Add-in',
                                path: 'overview/document-generation-api/wordaddin.md'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'PDF Electronic Seal API',
                subTitle: '',
                path: 'overview/pdf-electronic-seal-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/pdf-electronic-seal-api/index.md'
                    },
                    {
                        title: 'Getting Started',
                        path: 'overview/pdf-electronic-seal-api/gettingstarted.md'
                    },
                    {
                        title: 'Quickstarts',
                        path: 'overview/pdf-electronic-seal-api/quickstarts',
                        pages: [
                            {
                                title:'Node.js',
                                path: 'overview/pdf-electronic-seal-api/quickstarts/nodejs/index.md'
                            },
                            {
                                title:'Java',
                                path: 'overview/pdf-electronic-seal-api/quickstarts/java/index.md'
                            },
                            {
                                title:'.NET',
                                path: 'overview/pdf-electronic-seal-api/quickstarts/dotnet/index.md'
                            },
                            {
                                title:'Python',
                                path: 'overview/pdf-electronic-seal-api/quickstarts/python/index.md'
                            }
                        ]

                    },
                    {
                        title: 'How Tos',
                        subTitle: '',
                        path: 'overview/pdf-electronic-seal-api/howtos/index.md',
                        pages: [
                            {
                                title: 'PDF Electronic Seal API',
                                path: 'overview/pdf-electronic-seal-api/howtos/electronic-seal-api.md'
                            },
                        ]
                    }
                ]
            },
            {
                title: 'PDF Embed API',
                subTitle: '',
                path: 'overview/pdf-embed-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/pdf-embed-api/index.md',
                    },
                    {
                        title: 'Getting Started',
                        path: 'overview/pdf-embed-api/gettingstarted.md',
                    },
                    {
                        title: 'How Tos',
                        subTitle: '',
                        path: 'overview/pdf-embed-api/howtos',
                        pages: [
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
                                title: 'Legacy to Modern viewer',
                                path: 'overview/pdf-embed-api/modernviewer.md'
                            }
                        ]
                    },
                    {
                        title: 'Release Notes',
                        path: 'overview/pdf-embed-api/releasenotes.md'
                    }
                ]
            },
            {

                title: 'Licensing and Usage Limits',
                path: 'overview/limits.md'
            },
            {
                title: 'Security, Privacy and Compliance',
                path: 'overview/security.md'
            },
            {
                title: 'Version and Release Notes',
                path: 'overview/releasenotes.md'
            },
            {
                title: 'Support',
                path: 'overview/support.md'
            },
            {
                title: 'FAQ',
                path: 'overview/faq.md'
            },
            {
                title: 'API Status',
                path: 'overview/status.md'
            },
            {
                title: 'Legacy Documentation',
                subTitle: '',
                path: 'overview/legacy-documentation/index.md',
                pages: [
                    {
                        title: 'Introduction',
                        path: 'overview/legacy-documentation/index.md'
                    },
                    {
                        title: 'PDF Services API',
                        subTitle: '',
                        path: 'overview/legacy-documentation/pdf-services-api/index.md',
                        pages: [
                            {
                                title: 'Overview',
                                path: 'overview/legacy-documentation/pdf-services-api/index.md'
                            },
                            {
                                title: 'How Tos',
                                path: 'overview/legacy-documentation/pdf-services-api/howtos',
                                pages: [
                                    {
                                        title: 'Overview',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/index.md'
                                    },
                                    {
                                        title: 'Create PDF',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/create-pdf.md'
                                    },
                                    {
                                        title: 'Export PDF',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/export-pdf.md'
                                    },
                                    {
                                        title: 'Combine PDF Files',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/combine-pdf.md'
                                    },
                                    {
                                        title: 'OCR PDF',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/ocr-pdf.md'
                                    },
                                    {
                                        title: 'Compress PDFs',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/compress-pdf.md'
                                    },
                                    {
                                        title: 'Linearize PDF',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/linearize-pdf.md'
                                    },
                                    {
                                        title: 'Protect PDF',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/protect-pdf.md'
                                    },
                                    {
                                        title: 'Remove Protection',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/remove-protection.md'
                                    },
                                    {
                                        title: 'Insert Pages',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/insert-pages.md'
                                    },
                                    {
                                        title: 'Replace Pages',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/replace-pages.md'
                                    },
                                    {
                                        title: 'Delete Pages',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/delete-pages.md'
                                    },
                                    {
                                        title: 'Reorder Pages',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/reorder-pages.md'
                                    },
                                    {
                                        title: 'Rotate Pages',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/rotate-pages.md'
                                    },
                                    {
                                        title: 'Split PDF',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/split-pdf.md'
                                    },
                                    {
                                        title: 'Extract PDF',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/extract-pdf.md'
                                    },
                                    {
                                        title: 'Get PDF Properties',
                                        path: 'overview/legacy-documentation/pdf-services-api/howtos/pdf-properties.md'
                                    }
                                ]
                            },
                            {
                                title: 'Version - Support policy',
                                path: 'overview/legacy-documentation/pdf-services-api/policies.md'
                            },
                            {
                                title: 'Release notes',
                                path: 'overview/legacy-documentation/pdf-services-api/releasenotes.md'
                            },
                            {
                                title: 'PDF Services API Licensing',
                                path: 'overview/legacy-documentation/pdf-services-api/dcserviceslicensing.md'
                            },
                            {
                                title: 'Usage Limits',
                                path: 'overview/legacy-documentation/pdf-services-api/dcserviceslicensing.md#usage-limits'
                            }
                        ]
                    },
                    {
                        title: 'Document Generation API',
                        subTitle: '',
                        path: 'overview/legacy-documentation/document-generation-api/index.md',
                        pages: [
                            {
                                title: 'Overview',
                                path: 'overview/legacy-documentation/document-generation-api/index.md'
                            },
                            {
                                title: 'Quickstarts',
                                path: 'overview/legacy-documentation/document-generation-api/quickstarts.md'
                            },
                            {
                                title: 'Template Tags',
                                path: 'overview/legacy-documentation/document-generation-api/templatetags.md'
                            },
                            {
                                title: 'Fragments',
                                path: 'overview/legacy-documentation/document-generation-api/fragments.md'
                            },
                            {
                                title: 'Apply styling and formatting',
                                path: 'overview/legacy-documentation/document-generation-api/stylingformattingtags.md'
                            },
                            {
                                title: 'Hyperlink',
                                path: 'overview/legacy-documentation/document-generation-api/hyperlink.md'
                            },
                            {
                                title: 'Dynamic Table Constructs ',
                                path: 'overview/legacy-documentation/document-generation-api/dynamictableconstructs.md'
                            },
                            {
                                title: 'Word Add-in',
                                path: 'overview/legacy-documentation/document-generation-api/wordaddin.md'
                            },
                            {
                                title: 'Release Notes',
                                path: 'overview/legacy-documentation/pdf-services-api/releasenotes.md'
                            },
                            {
                                title: 'PDF Services API Licensing',
                                path: 'overview/legacy-documentation/document-generation-api/dcserviceslicensing.md'
                            },
                            {
                                title: 'Usage Limits',
                                path: 'overview/legacy-documentation/document-generation-api/dcserviceslicensing.md#usage-limits'
                            }
                        ]
                    },
                    {
                        title: 'PDF Extract API',
                        subTitle: '',
                        path: 'overview/legacy-documentation/pdf-extract-api/index.md',
                        pages: [
                            {
                                title: 'Overview',
                                path: 'overview/legacy-documentation/pdf-extract-api/index.md'
                            },
                            {
                                title: 'Quickstarts',
                                path: 'overview/legacy-documentation/pdf-extract-api/quickstarts.md'
                            },
                            {
                                title: 'How Tos',
                                subTitle: '',
                                path: 'overview/legacy-documentation/pdf-extract-api/howtos',
                                pages: [
                                    {
                                        title: 'Overview',
                                        path: 'overview/legacy-documentation/pdf-extract-api/howtos/index.md'
                                    },
                                    {
                                        title: 'PDF Extract API',
                                        path: 'overview/legacy-documentation/pdf-extract-api/howtos/extract-api.md'
                                    }
                                ]
                            },
                            {
                                title: 'Release Notes',
                                path: 'overview/legacy-documentation/pdf-services-api/releasenotes.md'
                            },
                            {
                                title: 'PDF Services API Licensing',
                                path: 'overview/legacy-documentation/pdf-extract-api/dcserviceslicensing.md'
                            },
                            {
                                title: 'Usage Limits',
                                path: 'overview/legacy-documentation/pdf-extract-api/dcserviceslicensing.md#usage-limits'
                            }
                        ]
                    },
                    {
                        title: 'PDF Accessibility Auto-Tag API',
                        path: 'overview/legacy-documentation/pdf-accessibility-auto-tag-api/index.md',
                        pages: [
                            {
                                title: 'Overview',
                                path: 'overview/legacy-documentation/pdf-accessibility-auto-tag-api/index.md'
                            },
                            {
                                title: 'Quickstarts',
                                path: 'overview/legacy-documentation/pdf-accessibility-auto-tag-api/quickstarts.md'
                            },
                            {
                                title: 'How Tos',
                                subTitle: '',
                                path: 'overview/legacy-documentation/pdf-accessibility-auto-tag-api/howtos',
                                pages: [
                                    {
                                        title: 'Overview',
                                        path: 'overview/legacy-documentation/pdf-accessibility-auto-tag-api/howtos/index.md'
                                    },
                                    {
                                        title: 'PDF Accessibility Auto-Tag API',
                                        path: 'overview/legacy-documentation/pdf-accessibility-auto-tag-api/howtos/accessibility-auto-tag-api.md'
                                    }
                                ]
                            },
                            {
                                title: 'Release Notes',
                                path: 'overview/legacy-documentation/pdf-services-api/releasenotes.md'
                            },
                            {
                                title: 'PDF Services API Licensing',
                                path: 'overview/legacy-documentation/pdf-accessibility-auto-tag-api/dcserviceslicensing.md'
                            },
                            {
                                title: 'Usage Limits',
                                path: 'overview/legacy-documentation/pdf-accessibility-auto-tag-api/dcserviceslicensing.md#usage-limits'
                            }
                        ]
                    }
                ]
            },
        ]
    },
    plugins: [`@adobe/gatsby-theme-aio`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
        ignore: [`**/legacy-documentation`]
      }
    }
    ],
    pathPrefix: process.env.PATH_PREFIX || '/document-services/docs/',
};
