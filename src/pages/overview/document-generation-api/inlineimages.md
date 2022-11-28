---
title: Document Services APIs | Document Generation API | Inline Images
---
# Inline Images

Add inline images in the document through json data using the <img\> tag.

## How It Works

You can provide the input image url by making use of html img tag in json. Below is the example json data.

```json
{
  "ContentBlock": "This is my chart:<br><img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/php-charts/overview/php-charts-graphs-index-data-label.png\">"
}
```
![Representation of sample json data](../images/inlineImageJson.png)

In the above example, the tag <b>ContentBlock</b> contains an <b><img\></b> html tag with src value "https://canvasjs.com/wp-content/uploads/images/gallery/php-charts/overview/php-charts-graphs-index-data-label.png". This image will be downloaded and placed in the final document as shown below.
![Adding inline image in the document through json data using image <img\> tag](../images/inlineImage.png)

<b>Note:</b> Currently only https url's are supported as value for src for the inline images.

