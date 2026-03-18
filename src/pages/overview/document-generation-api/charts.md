---
title: Charts | Document Generation API | Adobe PDF Services
---
# Charts

To dynamically insert a chart in the document, add the chart as placeholder and edit the chart and excel data.

## How It Works

To insert a chart in the document, add the chart as a placeholder in the document template. The chart placeholder is transformed into a chart in the output document by providing the chart data in the input JSON data.
The following types of graphs are supported:

- Line
- Column
- Pie

Steps to add chart in the document:

- **Open your Word document** and place the cursor where you want the chart to appear.
- **Go to the “Insert” tab** on the Ribbon.
- **Click on “Chart”** in the Illustrations group.
- **Choose the type of chart** you want from the list (e.g. column, line, pie) and click “OK”.
- An **Excel spreadsheet** will open with sample data. Replace this data with your own tags.
- **Close the Excel** window once you’ve entered your data. The chart in Word will update automatically.

![Edit chart data in Excel](../images/insert-chart-in-document.png)

<InlineAlert slots="text"/>

Include only the chart data in the Excel sheet, omitting any additional text.

## Line Chart

**Steps to insert a line chart in the document:**

- Add the line chart as a placeholder in the document template.

![Placeholder for line chart](../images/line-chart-placeholder.png)

- Edit the chart data in the Excel by right click on chart and select "Edit Data in Excel".

![Edit chart data in Excel](../images/excel-line-chart.png)

**JSON representation of the input data:**

```json
{
  "Title": "Sales Data",
  "sales": [
    {
      "quarter": "Q1",
      "phone": 3800,
      "tablet": 2450
    },
    {
      "quarter": "Q2",
      "phone": 4300,
      "tablet": 2700
    },
    {
      "quarter": "Q3",
      "phone": 5100,
      "tablet": 3150
    },
    {
      "quarter": "Q4",
      "phone": 6000,
      "tablet": 3600
    }
  ]
}
```

**Output chart in document after processing.**

![Output of line chart in document](../images/output-line-chart.png)

## Column Chart

**Steps to insert a column chart in the document:**

- Add the column chart as a placeholder in the document template.

![Placeholder for column chart](../images/column-chart-placeholder.png)

- Edit the chart data in the Excel by right click on chart and select "Edit Data in Excel".

![Edit chart data in Excel](../images/excel-column-chart.png)

**JSON representation of the input data:**

```json
{
  "Title": "Vehicle Sales Data",
  "sales": [
    {
      "month": "July",
      "EV": 700000,
      "ICE": 1500000
    },
    {
      "month": "August",
      "EV": 750000,
      "ICE": 1450000
    },
    {
      "month": "September",
      "EV": 800000,
      "ICE": 1400000
    },
    {
      "month": "October",
      "EV": 850000,
      "ICE": 1350000
    }
  ]
}

```

**Output chart in document after processing.**

![Output of line chart in document](../images/output-column-chart.png)

## Pie Chart

**Steps to insert a pie chart in the document:**

- Add the pie chart as a placeholder in the document template.

![Placeholder for pie chart](../images/pie-chart-placeholder.png)

- Edit the chart data in the Excel by right click on chart and select "Edit Data in Excel".

![Edit chart data in Excel](../images/excel-pie-chart.png)

**JSON representation of the input data:**

```json
{
  "Title": "Car Sales by Quarters",
  "carSales": [
    {
      "quarter": "1st Qtr",
      "value": 1500
    },
    {
      "quarter": "2nd Qtr",
      "value": 2000
    },
    {
      "quarter": "3rd Qtr",
      "value": 1800
    },
    {
      "quarter": "4th Qtr",
      "value": 2200
    }
  ]
}
```

**Output chart in document after processing.**

![Output of pie chart in document](../images/output-pie-chart.png)

<InlineAlert slots="text"/>

- Do not use charts within repeating section tags.
- Ensure that the chart data in Excel starts from the first cell (A1).