---
title: Inline Images | Document Generation API | Adobe PDF Services
description: |
  Add inline images via JSON using the img element with HTTPS URLs.

---
# Inline Images

Add inline images in the document through json data using the `<img>` tag.

## How It Works

Image url can be provided in the input json data using html img tag. 

JSON representation of the input data:

```json
{
  "ContentBlock": "sample image - <img src=\"https://documentcloud.adobe.com/dc-docgen-app/assets/dc_icon.png\">"
}
```
![Representation of sample json data](../../images/inline-image-json.png)

In the above example, the tag **ContentBlock** contains an **img** HTML element. This image will be downloaded and placed in the final document as shown below.
![Adding inline image in the document through json data using image `<img>` tag](../../images/inline-image.png)

**Note:** Only https urls are supported.
