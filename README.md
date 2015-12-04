# Kockout Table

This plugin provides a powerful yet easy implementation of tables using knockout by providing a custom component
```sh
<ko-table params="list: people, options: {}"></ko-table>
```

### [Try out demo](http://vaibhav93.github.io/knockout-table/)
## Features
  - Provide table data from your viewModel (ObservableArray)
  - Choose any number of keys from the objects on your array.
  - Reordering of columns
  - Specify column widths and headers
  - Filter columns
  - Custom css classes for tables and rows so that you can customize according to your CSS framework
  - Pagination
  - AMD (Require.js) compatible

## Installation
#### Option 1
```sh
<script src="js/knockout.js"></script> 
<script src="js/knockout.table.min.js"></script> 
```
#### Option 2
In your requirejs config, include plugin in path
```sh
requirejs.config({
    paths:{
    knockout: 'js/lib/knockout.min'
    kotable: 'js/lib/knockout.table.min'
    ...
    }
});
```
While defining your app.js
```sh
define(['knockout','kotable',function(ko){
/* Your app code */
}])
```
## Todos

 - Write Tests
 - Add sort option
 - Render HTML content in cell
 - Serial number column as option

## Development

Want to contribute? Great!

Knockout Table uses Gulp for fast developing.

Open your favorite Terminal and run these commands.

```sh
$ git clone https://github.com/vaibhav93/knockout-table.git
$ npm install
```
Make changes,add features and build by running
```sh
$ gulp
```
License
----
MIT