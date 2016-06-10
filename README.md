# Anonymous Suggestion Box app

## Introduction

Powered by Flybase.io and Javascript, this handy suggestion box lets you present your visitors with a form to send suggestions.

This can be modified to be any type of contact type form pretty quickly.

This is meant to be simple to modify, you can use `index.html` to add new records and then `suggestions.html` to view them.

Any form field you add will appear in the suggestions page.

You will need a [flybase.io](https://flybase.io/) account to use this app.

Update `assets/app.js` with your flybase API key and app name.

## Form Fields

To add fields, you just add them to the `index.html` file, with meta data to tell the app how to use it:

```
<div class='form-element'>
	<label for='subject'>Subject</label>
	<input type="text" id='subject' data-label="Subject" data-order="1" placeholder='' class='form-input' required>
</div>
```

- `data-label` will tell the app the actual Label to display in the index
- `data-order` is the sort order to display it by.

When data is saved, it will save a `_meta` field which contains sort order, etc for displaying.

This is meant to all be auto-generating and quick and dirty so feel free to modify and play around with it.