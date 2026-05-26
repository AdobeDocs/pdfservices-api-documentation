---
title: Hyperlink | Document Generation API | Adobe PDF Services
description: |
  Add hyperlinks in generated documents by embedding anchor markup in JSON string values.

---
# Hyperlink

Add hyperlink in the document through json data using anchor `<a>` tag.
 
## How It Works

JSON representation of the input data:

```json
{
  "Notes Section": "Please refer to our terms and conditions over <a href=\"https://www.adobe.com/legal/terms.html\">here</a>"
}
```
![Added hyperlink in the document through json data using anchor `<a>` tag](../../images/anchor-tag-sample.png)

![Formatted output in the document when anchor tag is resolved](../../images/anchor-tag1.png)
