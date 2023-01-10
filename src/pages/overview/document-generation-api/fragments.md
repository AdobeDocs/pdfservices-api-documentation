---
title: Fragments | Document Generation API | Adobe PDF Services
---
# Fragments

Fragments are special tags which enables users to write a composition using text tags or other fragments. Fragments introduce re-usability among the tags and enable users to create multiple such compositions and use them in their templates.

## How to use ?

To use fragments in the API, user will need to create a **fragments** json and pass it as a parameter in the api request body or they can use SDKs as well.

Below is a json defining fragments related to an **address** and a **name** use-case.
```json
{
  "addressDetails" : "<br>{{streetDetails}}<br>{{localityDetails}}",
  "streetDetails":"<span style=\"color: 0000FF;\">{{addressline1}}<br>{{addressline2}}<br>{{addressline3}}",
  "localityDetails" : "<span style=\"color: 006400;\">{{city}},<i>{{state}}</i>-<b>{{pincode}}</b>",
  "fullname": "<span style=\"color: ff0000;\">{{firstname}} {{lastnameStyled}}",
  "lastnameStyled": "<span STYLE=\"font-size:14mm\"><b><i>{{lastname}}</i></b>"
}
```

In the above json, we have defined fragments named `addressDetails`, `streetDetails`, `localityDetails` related to the **address** use-case and,  `fullname` and `lastnameStyled` for the **name** use-case. Below is the explanation of the fragments defined above: 

The `addressDetails` fragment composes `streetDetails` and `localityDetails` fragment tags.

The `streetDetails` fragment composes `addressline1`, `addressline2` and `addressline3` text tags.

The `localityDetails` fragment composes `state`, `city` and `pincode` text tags.

The `fullname` fragment composes `firstname` text tag and a `lastnameStyled` fragment tag.

The `lastnameStyled` fragment composes `lastname` text tag.

To resolve the text tags used in the above fragments, the **jsonDataForMerge** json would be:

```json
{
  "addressline1": "Sample Address Line 1",
  "addressline2": "Sample Address Line 2",
  "addressline3": "Sample Address Line 3",
  "city": "Sample City",
  "state": "Sample State",
  "pincode": "42132xx",
  "zip": "Sample zip",
  "firstname": "John",
  "lastname": "Roy",
  "country": "India",
  "street": "Sample Street",
  "postcode": "Sample PostCode",
  "arr" : [1,2,3]
}
```
There is one more way to define **fragments** json which can be used to organize related fragments together and separate unrelated fragments into another object, then all such objects can be combined in a json array. 
```json
[
  {
    "addressDetails": "<br>{{streetDetails}}<br>{{localityDetails}}",
    "streetDetails": "<span style=\"color: 0000FF;\">{{addressline1}}<br>{{addressline2}}<br>{{addressline3}}",
    "localityDetails": "<span style=\"color: 006400;\">{{city}},<i>{{state}}</i>-<b>{{pincode}}</b>"
  },
  {
    "fullname": "<span style=\"color: ff0000;\">{{firstname}} {{lastnameStyled}}",
    "lastnameStyled": "<span STYLE=\"font-size:14mm\"><b><i>{{lastname}}</i></b>"
  }
]
```

In the above json array, first json object corresponds to the **address** related fragments and second for **name** related fragments

<InlineAlert slots="text"/>

To resolve the value of nested fragment like `streetDetails` above, the same object containing the parent fragment i.e. `addressDetails` will be looked up. This is how the nested fragments are resolved.

<InlineAlert slots="text"/>

If there are name collisions in the fragment keys within multiple objects, the first object (containing the key) in the list, will be used to resolve it.

Below are the sample input and output documents snapshots describing the use of fragments.

Here the `addressDetails` fragment is used in the Word document template file.

![Address Input fragment](../images/address_input.png)

The output document generated will look like:

![Output of address fragment in document](../images/address_output.png)

Similarly,  the `fullname` fragment can be used like this in the word document template file.

![Name Input fragment](../images/name_input.png)

And the output document generated will look like:

![Output of name fragment in document](../images/name_output.png)

## Other supported constructs

### Conditionals
Evaluate value of fragments based on the conditions.

JSON representation of the input data:
```json
[
  {
    "addressDetails": "<br>{{streetDetails}}<br>{{localityDetails}}",
    "streetDetails": "<span style=\"color: 0000FF;\">{{addressline1}}<br>{{addressline2}}<br>{{addressline3}}</span>",
    "localityDetails": "<span style=\"color: 006400;\">{% conditional-section expr(country=\"India\") %}{{street}} {{postcode}} {{city}},<i>{{country}}</i> {% end-section %}{% conditional-section expr(country=\"USA\") %}{{street}}{{city}} {{state}} {{zip}},<i>{{country}}</i> {% end-section %}</span>"
  },
  {
    "fullname": "<span style=\"color: ff0000;\">{{firstname}} {{lastnameStyled}}</span>",
    "lastnameStyled": "<span STYLE=\"font-size:14mm\"><b><i>{{lastname}}</i></b></span>"
  }
]
```
The `localityDetails` fragment contains a conditional phrase that is evaluated based on the `country` text tag.
The format of `localityDetails` for India is
`street`
`postCode` `city`,
`country`. The format of `localityDetails` for the USA is
`street`
`city` `state` `zip`,
`country`.

![Output of fragment with condition in document](../images/fragments-condition.png)


### Optional
Setting a tag inside the fragment as *optional* will replace the tag with an empty string if it is not present either in input or fragment json data.

JSON representation of the input data:
```json
[
  {
    "fullname": "{{firstname}} {{middlename:optional(true)}} {{lastname}}"
  },
  {
    ...
  }
]
```

In the above fragment, there is an optional property used with `middlename` tag. Since the optional property is set to true, the `middlename` tag will be replaced by an empty string if it does not exist.

![Output of fragment with optional value in document](../images/fragments-optional.png)

### Default
A *default value* can be specified for a tag inside the fragment. 

JSON representation of the input data:
```json
[
  {
    "team": "ABC, {{organisation:default-val(\"Org\")}}"
  },
  {
    ...
  }
]
```

In the above fragment, if the `organisation` tag does not exist either in input or fragment json data, then default value (i.e. "Org") will be used.

![Output of fragment with default value in document](../images/fragments-default.png)

### Prefix
A *prefix value* can be specified for a tag inside the fragment.

JSON representation of the input data:
```json
[
  {
    "doctor": "{{doctorName:prefix(\"Dr. \")}}",
    "doctorName": "{{firstname}} {{lastname}}"
  },
  {
    ...
  }
]
```
In the above fragment, `doctor` tag further contains `doctorName` tag, to which a prefix value is specified. So, the prefix value (i.e. "Dr. ") will be added before the value of the `doctorName` tag in the output.

![Output of fragment with prefix in document](../images/fragments-prefix.png)

## Limitations

<ul>
<br />
<li>The Expressions and Jsonata functions are not supported inside the fragments.</li>
</ul>
