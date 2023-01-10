---
title: Document Services APIs | Document Generation API | Inline Images
---
# Inline Images

Add inline images in the document through json data using the <img\> tag.

## How It Works

You can provide the input image url by making use of html img tag in json. 

JSON representation of the input data:

```json
{
  "ContentBlock": "This is a sample image - <img src=\"https://documentcloud.adobe.com/dc-docgen-app/assets/dc_icon.png\">"
}
```
![Representation of sample json data](../images/inlineImageJson.png)

In the above example, the tag <b>ContentBlock</b> contains an <b><img\></b> html tag. This image will be downloaded and placed in the final document as shown below.
![Adding inline image in the document through json data using image <img\> tag](../images/inlineImage.png)

<b>Note:</b> Only https urls are supported.
