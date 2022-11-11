---
title: Document Services APIs | Document Generation API | Inline Images
---
# Inline Images

Add inline images in the document through json data using the <img\> tag.

## How It Works

You can provide the input image url by making use of html img tag in json. This is one such sample json.

```json
{
  "ContentBlock": "This is my chart:<br><img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/php-charts/overview/php-charts-graphs-index-data-label.png\">"
}
```
![Representation of sample json data](../images/inlineImageJson.png)
Now you can use this tag in template and directly insert the image provided into the final document.

![Adding inline image in the document through json data using image <img\> tag](../images/inlineImage.png)

