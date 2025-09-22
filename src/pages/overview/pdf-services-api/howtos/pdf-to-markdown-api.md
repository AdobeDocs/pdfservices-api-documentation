---
title: PDF to Markdown API | Adobe PDF Services
description: Learn about the PDF to Markdown API service that converts PDF documents into well-formatted Markdown text.
---

# PDF to Markdown API

The PDF to Markdown API (included with the PDF Services API) is a cloud-based web service that automatically converts PDF documents – native or scanned – into well-formatted Markdown text. This service preserves the document's structure and formatting while converting it into a format that's widely used for LLM flows, content authoring and documentation.

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
- Proper alt text and captions maintained

##### Tables

- Converted to Markdown table syntax
- Column alignment preserved
- Cell content formatting maintained
- Complex table structures supported

#### Element Types and Paths

The API recognizes and converts the following structural elements:

| Category  | Element Type      | Description                                               |
| --------- | ----------------- | --------------------------------------------------------- |
| Aside     | Aside             | Content which is not part of regular content flow         |
| Figure    | Figure            | Non-reflowable constructs like graphs, images, flowcharts |
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

- LLM-friendly content ingestion and prompt creation
- Training/Fine-tuning LLM with PDFs
- Content migration from PDF to documentation platforms
- Legacy document conversion
- Content repurposing for modern documentation systems
- Integration with Markdown-based workflows
- Automated document processing pipelines
- Searchable internal knowledge repositories

## API Limitations

### File Constraints

- **File Size**: Maximum of 100MB per file
- **Page Count**:
  - Non-scanned PDFs: Up to 400 pages
  - Scanned PDFs: Up to 150 pages
- **Page Dimensions**: Between 6" and 17.5" in either dimension

### Processing Limits

- **Rate Limits**: Maximum 25 requests per minute
- **Language Support**: Optimized for English, supports other Latin-based languages
- **OCR Quality**: Dependent on scan quality (minimum 200 DPI recommended)

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
