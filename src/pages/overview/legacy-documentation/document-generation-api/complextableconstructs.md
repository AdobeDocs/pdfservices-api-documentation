---
title: Complex Table Constructs | Document Generation API | Adobe PDF Services
---
# Complex Table Constructs
Add additional properties to table tags to apply advanced functionalities on table.

## Dynamically expand table rows or columns
Specify the cell extension property inside the table cell to indicate whether to expand table rows vertically or columns horizontally.

JSON representation of the input data:

```json
{
  "subscriptions": [
    {
      "name": "Adobe Document API",
      "price": "99"
    },
    {
      "name": "Adobe Marketing API",
      "price": "199"
    },
    {
      "name": "Adobe Design API",
      "price": "299"
    }

  ]
}
```

- **Repeat table rows vertically** - *{{subscriptions.name:**cell-extension(vertical)**}}* tag lets the engine know that cells will be extended in vertical direction.

![Table gets vertically extended as table rows are repeated](../images/vertical-extension1.png)

- **Repeat table columns horizontally** - *{{subscriptions.name:**cell-extension(horizontal)**}}* tag lets the engine know that cells will be extended in horizontal direction.

![Table gets horizontally extended as table columns are repeated](../images/horizontal-extension1.png)



<InlineAlert slots="text"/>

Default extension is vertical. If cell-extension construct is not provided, then table will be extended in vertical direction.
## Dynamic table columns
Discard a column or set of columns in a table from the final generated document as follows :

- [Discard column if empty](../document-generation-api/complextableconstructs.md#discard-column-if-empty).
- [Discard column if condition evaluates to true](../document-generation-api/complextableconstructs.md#discard-column-if-condition-evaluates-to-true).

### Discard column if empty
Column in a table can be discarded if every element of an array in the input json is empty or null.

**How to use** <br/>
Add discard-if-empty construct with boolean false/true along with the template tag to activate discard if empty feature for the corresponding column.

JSON representation of the input data:

*Json 1*

```json
{
  "Project": [
    {
      "Name": "ABC Infra",
      "Milestone": "First Milestone",
      "DateComplete": "24/06/2021",
      "Notes": ""
    },
    {
      "Name": "ABC Infra",
      "Milestone": "Second Milestone",
      "DateComplete": "24/06/2022",
      "Notes": ""
    },
    {
      "Name": "DEF Computer Labs",
      "Milestone": "First Milestone",
      "DateComplete": "12/12/2021",
      "Notes": ""
    },
    {
      "Name": "DEF Computer Labs",
      "Milestone": "Second Milestone",
      "DateComplete": "12/12/2021",
      "Notes": ""
    }
  ]
}
```

*Json2*

```json
{
  "Project": [
    {
      "Name": "ABC Infra",
      "Milestone": "First Milestone",
      "DateComplete": "24/06/2021"
    },
    {
      "Name": "ABC Infra",
      "Milestone": "Second Milestone",
      "DateComplete": "24/06/2022"
    },
    {
      "Name": "DEF Computer Labs",
      "Milestone": "First Milestone",
      "DateComplete": "12/12/2021"
    },
    {
      "Name": "DEF Computer Labs",
      "Milestone": "Second Milestone",
      "DateComplete": "12/12/2021"
    }
  ]
}
```
![Adding discard-if-empty construct with boolean false/true along with the template tag to activate discard if empty feature for the corresponding column](../images/discard_column_if_empty.png)

{{Project.Notes:**discard-if-empty(true)**}} tag lets the engine discard the particular column if every element of an array in the input json is either empty or null.

**Note**: The row above the authored row will be considered as a header row. Cell from the header row will be discarded along with discarded column.

![Header Row of Development Milestones table](../images/header_row1.png)

![Header Row of Conversion tracking table](../images/header_row2.png)

![Development Milestones table without header row](../images/without_header_row.png)

### Discard column if condition evaluates to true
Column in the table can be discarded If condition provided in the discard-if(expr(**condition**)) evaluates to true. Add discard-if(expr(**condition**)) construct along with the template tag to activate discard if feature for the corresponding column.

JSON representation of the input data:

```json
{
  "Conversion": [
    {
      "Month": "July, 2021",
      "Rate": 10,
      "Method": "Payout by Cheque"
    },
    {
      "Month": "September, 2021",
      "Rate": 30,
      "Method": "Payout by Cheque"
    },
    {
      "Month": "Dec, 2021",
      "Rate": 20,
      "Method": "Payout by Cheque"
    },
    {
      "Month": "April, 2022",
      "Rate": 20,
      "Method": "Payout by Cheque"
    },
    {
      "Month": "Dec, 2022",
      "Rate": 30,
      "Method": "Payout by Cheque"
    }
  ]
}
```

![Added discard-if(expr(**condition**)) construct along with the template tag to activate discard if feature for the corresponding column](../images/discard_if_condition_true.png)

{{Conversion.Rate:**discard-if(expr($sum(Conversion.Rate)!= 100))**}} tag lets the engine discard the particular column if condition provided in the **expr** construct evaluates to true.

## Dynamic table rows
Discard a row or set of rows in a table from the final generated document.

### Discard row if condition evaluates to true
A row in the table can be discarded only when the condition in the discard-row-if(expr(**condition**),**context**) evaluates to true in the provided context. Add this construct along with the template tag to discard the row based on the provided condition.

For Example: {{TABLE_CONTEXT.PROPERTY:**discard-row-if(expr(PROPERTY = "TEST_VALUE"),TABLE_CONTEXT)**}}

JSON representation of the input data:
```json
{
  "Conversion": [
    {
      "Month": "July, 2021",
      "Rate": 10,
      "Method": "Payout by Cheque"
    },
    {
      "Month": "Dec, 2021",
      "Rate": 20,
      "Method": "Payout by Cheque"
    },
    {
      "Month": "Dec, 2022",
      "Rate": 40,
      "Method": "Payout by Cheque"
    },
    {
      "Month": "Dec, 2021",
      "Rate": 80,
      "Method": "Payout by Cheque"
    },
    {
      "Month": "April, 2022",
      "Rate": 100,
      "Method": "Payout by Cash"
    },
    {
      "Month": "Dec, 2022",
      "Rate": 45,
      "Method": "Payout by Cheque"
    }
  ]
}
```
![Added discard-row-if(expr(condition),context) construct along with the template tag to activate discard row if feature for the corresponding rows](../images/discard_row_if_condition_true.png)
In a row, if multiple “discard-row-if” are used, then the row will be discarded if any one of the conditions evaluates to true.

**Note**: The header row is also removed when all the rows are discarded thus removing the complete table.

## Conditions inside tables
An additional construct **eval** is introduced for conditionals inside tables, which is required while evaluating
conditions based on fields of the table currently being expanded. The expression inside **eval** is an array
of objects where each entry of object serves as context to evaluate the condition in the corresponding row of table.

JSON representation of the input data:

```json
{
  "company": [
    {
      "name": "ABC",
      "supportsX" : "TRUE"
    },
    {
      "name": "XYZ",
      "supportsX": "FALSE"
    }

  ]
}
```

![Index based conditional evaluation inside table](../images/ConditionsInsideTables.png)
In the above example, the array of objects on which the condition needs to be evaluated (*company*) is provided in
**eval**, and the expr contains the actual condition `supportsX="TRUE"`. The condition is evaluated based on each
entry of the array and applied to the corresponding row in the output table.
