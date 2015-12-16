# Kockout Table

This plugin provides a powerful yet easy implementation of tables using knockout by providing a custom component
```sh
<ko-table params="list: people, options: {}"></ko-table>
```

### [Try out demo](http://vaibhav93.github.io/knockout-table/)
## Features
  - Provide table data from your viewModel (ObservableArray)
  - Lazy load data for each page
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
## How to Use
```sh
<ko-table params="list: persons, options: VMoptions"> </ko-table> 
```
<ko-table> component takes two arguments. An observable array on your view model to populate the table and an 'options' object on your view model to customize the table.
```sh
var viewModel = function(){
    this.VMoptions = {
        tableClass:'table table-striped',    //Optional. Specifies class for <table> tag
        pageRecords: 5,                      //Optional. Number of records per page. 
        columns:[                            //Optional.If not specfied all keys in your data will appear on table.
            { 
                key:'name',                  //Required if columns is specified.
                name:'Name',        //Optional.This specifies table column header. If not given,key becomes header
                filter:true                  //Optional. false if not specified.
            },
            { 
                key:'address'                // key:'address', name:'address', filter:false
            }
        ]
    };
    this.persons = ko.observableArray([
    { name:'Bob', address: 'New Delhi', dob:'14-03-1993'},
    { name: 'Harry', address : 'Mumbai', dob:'10-07-1990'}
    ]);
}
ko.applyBindings(new viewModel());
```
### Lazy Load data
Lazy loading requires user to define afunction on his viewModel which takes page number and Records per page as two arguments and returns a promise. In the background, this plugin fetches 3 pages ahead of the current page in order to improve performance.
```sh
<ko-table params="list: getPage, options: VMoptions"> </ko-table> 
```
```sh
var viewModel = function(){
    this.VMoptions = {
        tableClass:'table table-striped',    //Optional. Specifies class for <table> tag
        pageRecords: 5,                      //Optional. Number of records per page. 
        columns: [
            {
                key: 'id', // take data from this key in your object array
                name: 'ID', //name to display on column header
                filter: true, //true or false. if not specified default:false
                width: '' //optional col width in px or perc
            },
            {
                key: 'email',
                name: 'E-Mail',
                filter: true
            }
        ]
    };
    this.getPage = function(pageNo,records){
        return $.getJSON('http://nameless-sun-2869.getsandbox.com/sidemenu?pageNo='+pageNo+'&records='+records);
    };
}
ko.applyBindings(new viewModel());
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