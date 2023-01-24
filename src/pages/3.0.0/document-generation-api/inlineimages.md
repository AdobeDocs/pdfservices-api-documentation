---
title: Document Services APIs | Document Generation API | Inline Images
---
# Inline Images

Add inline images in the document through json data using the <img\> tag.

## How It Works

Image url can be provided in the input json data using html img tag. 

JSON representation of the input data:

```json
{
  "ContentBlock": "sample image - <img src=\"https://documentcloud.adobe.com/dc-docgen-app/assets/dc_icon.png\">"
}
```
![Representation of sample json data](src/pages/3.0.0/images/inlineImageJson.png)

In the above example, the tag <b>ContentBlock</b> contains an <b><img\></b> html tag with src value "https://documentcloud.adobe.com/dc-docgen-app/assets/dc_icon.png". This image will be downloaded and placed in the final document as shown below.
![Adding inline image in the document through json data using image <img\> tag](src/pages/3.0.0/images/inlineImage.png)

<b>Note:</b> Only https urls are supported.
