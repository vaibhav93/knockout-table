# Kockout Table

This plugin provides a powerful yet easy implementation of tables using knockout by providing a custom component
```sh
<ko-table params="list: people, options: {}"></ko-table>
```

### [Try out demo](http://vaibhav93.github.io/knockout-table/)
## Features
  - Provide table data from your viewModel (Array/ObservableArray)
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
While defining your app,js
```sh
define(['knockout','kotable',function(ko){
/* Your app code */
}])
```