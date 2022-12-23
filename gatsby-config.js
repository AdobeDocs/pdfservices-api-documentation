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
            path: '../document-services/apis/interstitial/'
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
                        title: 'Document Generation API',
                        path: 'overview/document-generation-api/index.md'
                    },
                    {
                        title: 'PDF Electronic Seal API',
                        path: 'overview/pdf-electronic-seal-api/index.md'
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
                        title: 'PDF Accessibility Auto-Tag API',
                        path: 'overview/pdf-accessibility-auto-tag-api/index.md'
                    },
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
                                title: 'Using Our APIs',
                                path: 'overview/pdf-services-api/howtos/api-usage.md'
                            },
                            {
                                title: 'Region Configs for APIs',
                                path: 'overview/pdf-services-api/howtos/service-region-configuration-for-apis.md'
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
                        path: 'overview/releasenotes.md'
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
                            }
                        ]

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
                        title: 'Inline Images',
                        path: 'overview/document-generation-api/inlineimages.md'
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
                        path: 'overview/releasenotes.md'
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
                        path: 'overview/pdf-extract-api/howtos',
                        pages: [
                            {
                                title: 'Overview',
                                path: 'overview/pdf-extract-api/howtos/index.md'
                            },
                            {
                                title: 'PDF Extract API',
                                path: 'overview/pdf-extract-api/howtos/extract-api.md'
                            },
                            {
                                title: 'Using Our APIs',
                                path: 'overview/pdf-extract-api/howtos/api-usage.md'
                            }
                        ]
                    },
                    {
                        title: 'Release Notes',
                        path: 'overview/releasenotes.md'
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
                subTitle: '',
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
                        title: 'Legacy to Modern viewer',
                        path: 'overview/pdf-embed-api/modernviewer.md'
                    },
                    {
                        title: 'Release Notes',
                        path: 'overview/pdf-embed-api/releasenotes.md'
                    },
                ]
            },                   
            {
                title: 'PDF Electronic Seal API                       ',
                subTitle: 'Beta Program',
                path: 'overview/pdf-electronic-seal-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/pdf-electronic-seal-api/index.md'
                    },
                    {
                        title: 'Prerequisites',
                        path: 'overview/pdf-electronic-seal-api/prerequisites.md'
                    },
                    {
                        title: 'Quickstarts',
                        path: 'overview/pdf-electronic-seal-api/quickstarts.md'
                    }
                ]
            },
            {
                title: 'PDF Electronic Seal API                       ',
                subTitle: 'Beta Program',
                path: 'overview/pdf-electronic-seal-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/pdf-electronic-seal-api/index.md'
                    },
                    {
                        title: 'Prerequisites',
                        path: 'overview/pdf-electronic-seal-api/prerequisites.md'
                    },
                    {
                        title: 'Quickstarts',
                        path: 'overview/pdf-electronic-seal-api/quickstarts.md'
                    }
                ]
            },
            {
                title: 'PDF Accessibility Auto-Tag API',
                subTitle: 'Early Access Program',
                path: 'overview/pdf-accessibility-auto-tag-api/index.md',
                pages: [
                    {
                        title: 'Overview',
                        path: 'overview/pdf-accessibility-auto-tag-api/index.md'
                    },
                    {
                        title: 'Quickstarts',
                        path: 'overview/pdf-accessibility-auto-tag-api/quickstarts.md'
                    },
                    {
                        title: 'How Tos',
                        subTitle: '',
                        path: 'overview/pdf-accessibility-auto-tag-api/howtos',
                        pages: [
                            {
                                title: 'Overview',
                                path: 'overview/pdf-accessibility-auto-tag-api/howtos/index.md'
                            },
                            {
                                title: 'PDF Accessibility Auto-Tag API',
                                path: 'overview/pdf-accessibility-auto-tag-api/howtos/accessibility-auto-tag-api.md'
                            },
                            {
                                title: 'Using Our APIs',
                                path: 'overview/pdf-accessibility-auto-tag-api/howtos/api-usage.md'
                            }
                        ]
                    },
                    {
                        title: 'Release Notes',
                        path: 'overview/releasenotes.md'
                    },
                    {
                        title: 'PDF Services API Licensing',
                        path: 'overview/pdf-accessibility-auto-tag-api/dcserviceslicensing.md'
                    },
                    {
                        title: 'Usage Limits',
                        path: 'overview/pdf-accessibility-auto-tag-api/dcserviceslicensing.md#usage-limits'
                    }
                ]
            },
            {
                title: 'Usage Limits and Licensing',
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
                title: 'API Status',
                path: 'overview/status.md'
            },
            {
                title: 'Archives',
                subTitle: '',
                path: 'overview/policies.md',
                pages: [
                    {
                        title: 'Version Support Policy',
                        path: 'overview/policies.md',
                    },
                    {
                        title: 'v2.2.0',
                        path: 'overview/2.2.0/',
                        pages: [
                            {
                                title: 'Introduction',
                                path: 'overview/2.2.0/index.md'
                            },
                            {
                                title: 'PDF Services API',
                                subTitle: '',
                                path: 'overview/2.2.0/pdf-services-api/index.md',
                                pages: [
                                    {
                                        title: 'Overview',
                                        path: 'overview/2.2.0/pdf-services-api/index.md'
                                    },
                                    {
                                        title: 'How Tos',
                                        path: 'overview/2.2.0/pdf-services-api/howtos',
                                        pages: [
                                            {
                                                title: 'Overview',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/index.md'
                                            },
                                            {
                                                title: 'Create PDF',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/create-pdf.md'
                                            },
                                            {
                                                title: 'Export PDF',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/export-pdf.md'
                                            },
                                            {
                                                title: 'Combine PDF Files',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/combine-pdf.md'
                                            },
                                            {
                                                title: 'OCR PDF',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/ocr-pdf.md'
                                            },
                                            {
                                                title: 'Compress PDFs',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/compress-pdf.md'
                                            },
                                            {
                                                title: 'Linearize PDF',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/linearize-pdf.md'
                                            },
                                            {
                                                title: 'Protect PDF',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/protect-pdf.md'
                                            },
                                            {
                                                title: 'Remove Protection',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/remove-protection.md'
                                            },
                                            {
                                                title: 'Insert Pages',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/insert-pages.md'
                                            },
                                            {
                                                title: 'Replace Pages',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/replace-pages.md'
                                            },
                                            {
                                                title: 'Delete Pages',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/delete-pages.md'
                                            },
                                            {
                                                title: 'Reorder Pages',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/reorder-pages.md'
                                            },
                                            {
                                                title: 'Rotate Pages',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/rotate-pages.md'
                                            },
                                            {
                                                title: 'Split PDF',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/split-pdf.md'
                                            },
                                            {
                                                title: 'Extract PDF',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/extract-pdf.md'
                                            },
                                            {
                                                title: 'Get PDF Properties',
                                                path: 'overview/2.2.0/pdf-services-api/howtos/pdf-properties.md'
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Version - Support policy',
                                        path: 'overview/2.2.0/pdf-services-api/policies.md'
                                    },
                                    {
                                        title: 'Release notes',
                                        path: 'overview/2.2.0/pdf-services-api/releasenotes.md'
                                    },
                                    {
                                        title: 'PDF Services API Licensing',
                                        path: 'overview/2.2.0/pdf-services-api/dcserviceslicensing.md'
                                    },
                                    {
                                        title: 'Usage Limits',
                                        path: 'overview/2.2.0/pdf-services-api/dcserviceslicensing.md#usage-limits'
                                    }
                                ]
                            },
                            {
                                title: 'Document Generation API',
                                subTitle: '',
                                path: 'overview/2.2.0/document-generation-api/index.md',
                                pages: [
                                    {
                                        title: 'Overview',
                                        path: 'overview/2.2.0/document-generation-api/index.md'
                                    },
                                    {
                                        title: 'Quickstarts',
                                        path: 'overview/2.2.0/document-generation-api/quickstarts.md'
                                    },
                                    {
                                        title: 'Template Tags',
                                        path: 'overview/2.2.0/document-generation-api/templatetags.md'
                                    },
                                    {
                                        title: 'Fragments',
                                        path: 'overview/2.2.0/document-generation-api/fragments.md'
                                    },
                                    {
                                        title: 'Apply styling and formatting',
                                        path: 'overview/2.2.0/document-generation-api/stylingformattingtags.md'
                                    },
                                    {
                                        title: 'Hyperlink',
                                        path: 'overview/2.2.0/document-generation-api/hyperlink.md'
                                    },
                                    {
                                        title: 'Dynamic Table Constructs ',
                                        path: 'overview/2.2.0/document-generation-api/dynamictableconstructs.md'
                                    },
                                    {
                                        title: 'Word Add-in',
                                        path: 'overview/2.2.0/document-generation-api/wordaddin.md'
                                    },
                                    {
                                        title: 'Release Notes',
                                        path: 'overview/2.2.0/pdf-services-api/releasenotes.md'
                                    },
                                    {
                                        title: 'PDF Services API Licensing',
                                        path: 'overview/2.2.0/document-generation-api/dcserviceslicensing.md'
                                    },
                                    {
                                        title: 'Usage Limits',
                                        path: 'overview/2.2.0/document-generation-api/dcserviceslicensing.md#usage-limits'
                                    }
                                ]
                            },
                            {
                                title: 'PDF Extract API',
                                subTitle: '',
                                path: 'overview/2.2.0/pdf-extract-api/index.md',
                                pages: [
                                    {
                                        title: 'Overview',
                                        path: 'overview/2.2.0/pdf-extract-api/index.md'
                                    },
                                    {
                                        title: 'Quickstarts',
                                        path: 'overview/2.2.0/pdf-extract-api/quickstarts.md'
                                    },
                                    {
                                        title: 'How Tos',
                                        subTitle: '',
                                        path: 'overview/2.2.0/pdf-extract-api/howtos',
                                        pages: [
                                            {
                                                title: 'Overview',
                                                path: 'overview/2.2.0/pdf-extract-api/howtos/index.md'
                                            },
                                            {
                                                title: 'PDF Extract API',
                                                path: 'overview/2.2.0/pdf-extract-api/howtos/extract-api.md'
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Release Notes',
                                        path: 'overview/2.2.0/pdf-services-api/releasenotes.md'
                                    },
                                    {
                                        title: 'PDF Services API Licensing',
                                        path: 'overview/2.2.0/pdf-extract-api/dcserviceslicensing.md'
                                    },
                                    {
                                        title: 'Usage Limits',
                                        path: 'overview/2.2.0/pdf-extract-api/dcserviceslicensing.md#usage-limits'
                                    }
                                ]
                            },
                            {
                                title: 'PDF Accessibility Auto-Tag API',
                                path: 'overview/2.2.0/pdf-accessibility-auto-tag-api/index.md',
                                pages: [
                                    {
                                        title: 'Overview',
                                        path: 'overview/2.2.0/pdf-accessibility-auto-tag-api/index.md'
                                    },
                                    {
                                        title: 'Quickstarts',
                                        path: 'overview/2.2.0/pdf-accessibility-auto-tag-api/quickstarts.md'
                                    },
                                    {
                                        title: 'How Tos',
                                        subTitle: '',
                                        path: 'overview/2.2.0/pdf-accessibility-auto-tag-api/howtos',
                                        pages: [
                                            {
                                                title: 'Overview',
                                                path: 'overview/2.2.0/pdf-accessibility-auto-tag-api/howtos/index.md'
                                            },
                                            {
                                                title: 'PDF Accessibility Auto-Tag API',
                                                path: 'overview/2.2.0/pdf-accessibility-auto-tag-api/howtos/accessibility-auto-tag-api.md'
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Release Notes',
                                        path: 'overview/2.2.0/pdf-services-api/releasenotes.md'
                                    },
                                    {
                                        title: 'PDF Services API Licensing',
                                        path: 'overview/2.2.0/pdf-accessibility-auto-tag-api/dcserviceslicensing.md'
                                    },
                                    {
                                        title: 'Usage Limits',
                                        path: 'overview/2.2.0/pdf-accessibility-auto-tag-api/dcserviceslicensing.md#usage-limits'
                                    }
                                ]
                            }
                        ]
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
