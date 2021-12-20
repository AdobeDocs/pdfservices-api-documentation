# Apply styling and formatting

Apply styling and formatting in the generated output document using the HTML based constructs.

- Add line breaks in the text.

- Set color and font size of a text.

- Set text as bold and italic.

- Underline text.

- Create [Hyperlinks](../document-generation-api/hyperlink.md#how-it-works).

## How It Works

Basic styling for the text tags can be provided from the input json data.

JSON representation of the input data:

```json
{
    "LMS Certificate": {
                "Employee Name": "Sarah Rose",
                "Certification Program": "Certificate in Life and Thoughts of <span style=\"font-weight: bold \">Dr. BR Ambedkar </span> ",
                "Completion Date": "01/03/2021"
        }
}
```

![image](../images/consolidated_styling_formatting.png)

## Styling and Formatting rules

Styling for the text tag can be provided using the json data through the HTML based constructs. The constructs follows the additional rules as listed below :

- HTML tags supported are <span\>, nested span, <br\> (new line), <b\> (bold), <strong\> (strong), <em\> (emphasis), <i\> (italic), <u\> (underline).

- Either use Inline custom css inside the span tag to style the data or use basic styling tags such as <b\> (bold), <i\> (italic) and <u\> (underline).

- Styling precedence works as per the general convention of (local  - > global) scope for nested HTML span.

- Any HTML tags which are not supported will be ignored.

## Inline styling attributes supported

- font-size : xpt ;  x=dynamic positive integer, 1pt =1/72 inch ( point (pt) is the only supported unit for font size.)

- font-weight : bold;

- font-style : italic;

- text-decoration : underline;

- color : ff6347;

JSON representation of the input data:

```json
{
  "Notes Section": "Has the Board of directors established a basic policy <span style=\"font-size: 12pt;\">regarding legal compliance<span style=\"font-weight: bold; font-style: italic;\"> (hereinafter referred to as the Legal Compliance policy) </span></span><a href=\"http://www.samplewebsite.com/\">Board</a>in accordance to the institution's <span style=\"text-decoration : underline; color:ff6347;\">corporate management policy</span> <span style=\"color: red;\">and disseminated it throughout the institution</span>"
}
```
![image](../images/styling_attributes_sample.png)

![image](../images/styling_attributes1.png)

## Tags Supported

- <span\>

- <a\> (anchor)

- <br\> (new line)

- <b\> (bold)

- <strong\> (strong)

- <em\> (emphasis)

- <i\> (italic)

- <u\> (underline)

JSON representation of the input data:

```json
{
  "Notes Section": "Has the Board of directors established a basic policy <span style=\"font-size: 12pt;\">regarding legal compliance <b><i>(hereinafter referred to as the Legal Compliance policy)</i></b><a href=\"http://www.samplewebsite.com/\">Board</a> in accordance to the institution's <br><u>corporate management policy</u> and disseminated it throughout the institution"
}
```
![image](../images/styling_tags_sample.png)

![image](../images/styling_tags1.png)



