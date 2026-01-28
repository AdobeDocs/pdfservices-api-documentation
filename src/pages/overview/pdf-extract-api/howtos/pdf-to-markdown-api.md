---
title: PDF to Markdown | Adobe PDF Services
description: Learn about the PDF to Markdown service that converts PDF documents into well-formatted LLM-friendly Markdown text.
---

# PDF to Markdown

The PDF to Markdown API (included with the PDF Services API) is a cloud-based web service that automatically converts PDF documents – native or scanned – into well-formatted LLM-friendly Markdown text. This service preserves the document's structure and formatting while converting it into a format that's widely used for LLM flows, content authoring and documentation.

## Structured Information Output Format

The output of a PDF to Markdown operation includes:

- A primary `.md` file containing the converted Markdown content

### Output Structure

The following is a summary of key elements in the converted Markdown:

#### Elements

Ordered list of semantic elements converted from the PDF document, preserving the natural reading order and document structure. The conversion handles:

- Text content with proper Markdown syntax
- Document hierarchy and structure
- Inline formatting and emphasis
- Links and references
- Images and figures
- Tables and complex layouts

#### Content Types

The API processes various content types as follows:

##### Text Elements

- **Headings**: Converted to appropriate Markdown heading levels (H1-H6)
- **Paragraphs**: Preserved with proper spacing and formatting
- **Lists**: Both ordered and unordered lists with proper nesting
- **Text Emphasis**: Bold, italic, and other text formatting
- **Links**: Preserved with proper Markdown link syntax

##### Images and Figures

- Provided as base64-embedded images in the Markdown output
- Referenced correctly in the Markdown output
- Original quality preserved
- Proper alt-text and captions maintained

##### Tables

- Converted to Markdown table syntax
- Column alignment preserved
- Cell content formatting maintained
- Complex table structures supported

#### Element Types and Paths

The API recognizes and converts the following structural elements:

| Category  | Element Type      | Description                                               |
| --------- | ----------------- | --------------------------------------------------------- |
| Aside     | Aside             | Content that is not part of the regular content flow      |
| Figure    | Figure            | Non-reflowable constructs such as graphs, images, and flowcharts |
| Footnote  | Footnote          | Footnote                                                  |
| Headings  | H, H1, H2, etc    | Heading levels                                            |
| List      | L, Li, Lbl, Lbody | List and list item elements                               |
| Paragraph | P, ParagraphSpan  | Paragraphs and paragraph segments                         |
| Reference | Reference         | Links                                                     |
| Section   | Sect              | Logical section of the document                           |
| StyleSpan | StyleSpan         | Styling variations within text                            |
| Table     | Table, TD, TH, TR | Table elements                                            |
| Title     | Title             | Document title                                            |

### Reading Order

The reading order in the output Markdown maintains:

- Natural document flow
- Proper content hierarchy
- Column-based layouts
- Page transitions
- Inline elements and references

## Use Cases

The PDF to Markdown API is particularly valuable for:

- **LLM and RAG ingestion**: Convert PDFs to Markdown for chunking, embeddings, and retrieval-augmented generation (RAG).
- **Prompt and context packaging**: Produce Markdown that is easy to paste, structure, and cite in prompts and agent workflows.
- **Training data preparation**: Create LLM fine-tuning datasets from PDF content after review, cleanup, and labeling.
- **Doc-as-code workflows**: Bring PDF content into Git-based review, versioning, diffing, and static-site generators.
- **Knowledge base publishing**: Migrate PDFs into documentation platforms and internal wikis as clean, editable Markdown.
- **Legacy and archive modernization**: Convert historical PDFs so they become searchable, editable, and maintainable.
- **Automated document processing**: Standardize PDF-to-text conversion inside ETL and document-processing pipelines.
- **Enterprise search and indexing**: Feed converted Markdown into internal search systems and knowledge repositories.
- **Compliance and audit readiness**: Make PDF policies, SOPs, and manuals searchable and easier to review for changes.
- **Content QA and change tracking**: Compare converted Markdown across document versions to detect updates and regressions.
- **Analytics and classification**: Use Markdown output for topic modeling, tagging, deduplication, and routing workflows.
- **Localization workflows**: Convert to Markdown as a starting point for translation and multi-language documentation.

## API Limitations

For File Constraints and Processing Limits, see [Licensing and Usage Limits](../dcserviceslicensing/).

### Document Requirements

- Files must be unprotected or allow content copying
- No support for:
  - Hidden objects (JavaScript, OCG)
  - XFA and fillable forms
  - Complex annotations
  - CAD drawings or vector art
  - Password-protected content

## REST API

See our public API Reference for [PDF to Markdown API](../../../apis/#tag/PDF-To-Markdown).
