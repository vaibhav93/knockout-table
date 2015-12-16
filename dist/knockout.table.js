(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on knockout.
        define(['knockout'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(ko);
    }
}(function (ko) {
    ko.components.register('ko-table', {
        viewModel: function (params) {
            var self = this;
            //current active page
            self.currentPage = ko.observable(1);
            var EODpage; //end of data
            var fetchedTillPage = null;

            if (ko.isObservable(params.list) || Array.isArray(params.list)) {
                self.list = params.list;

            } else { //loazyload data
                self.list = ko.observableArray([]);
                self.currentPage.subscribe(function (newPage) {
                    console.log(newPage);
                    self.lazyloadData();
                });
                var bgData = [];
                params.list(self.currentPage(), params.options.pageRecords).then(function (res) {
                    self.list(res);
                    self.lazyloadData();
                });
            }


            self.lazyloadData = function () {
                var lazyloadPromises = [];
                var currentPage = self.currentPage();
                var noOfPagesToLoad;
                if (!fetchedTillPage) {
                    noOfPagesToLoad = 3;
                    fetchedTillPage = 1;
                } else
                    noOfPagesToLoad = 3 - (fetchedTillPage - currentPage);
                console.log('fetched till: ' + fetchedTillPage);
                for (i = 1; i <= noOfPagesToLoad; i++)
                    lazyloadPromises.push(params.list(fetchedTillPage + i, params.options.pageRecords));
                console.log(lazyloadPromises);
                $.whenall(lazyloadPromises).then(function () {
                    var i;
                    if (typeof arguments[1] === 'string') {
                        self.list.pushAll(arguments[0]);
                        i = 1;
                    } else {
                        for (i = 0; i < arguments.length; i++) {
                            self.list.pushAll(arguments[i][0]);
                        }
                    }

                    fetchedTillPage = fetchedTillPage + i;
                });

            };
            //object to hold observables for filter inputs
            self.filter = {};

            //Array to store keys in user object array
            self.listKeys = ko.observableArray([]);

            //Check if a column has filter enabled for it
            self.ifFilter = function (col) {
                if (col.hasOwnProperty("filter")) {
                    if (col.filter)
                        return true;
                    else
                        return false;
                } else {
                    return false;
                }
            };

            //Initialize filter object with obsrevables for each filtered column
            if (params.hasOwnProperty("options")) {
                self.options = params.options;
                if (params.options.hasOwnProperty("columns")) {
                    ko.utils.arrayForEach(params.options.columns, function (col) {
                        if (self.ifFilter(col)) {
                            self.filter[col.key] = ko.observable("");
                        }
                    });
                } else { //if columns are not specified get a list of all keys present in user object
                    //to form table headers
                    self.list.subscribe(function (change) {
                        var keys = [];
                        if (change[0].status === 'added' && change[0].index === 0) {
                            console.log('yay, I Ran');
                            keys = Object.keys(change[0].value);
                            ko.utils.arrayForEach(keys, function (key) {
                                self.listKeys.push(key);
                            });
                        }
                    }, null, "arrayChange");
                    //                    var unwrappedArray = ko.utils.unwrapObservable(self.list);
                    //                    self.listKeys = Object.keys(unwrappedArray[0]);
                }
            }

            //width of column
            self.getWidth = function (col) {
                if (col.hasOwnProperty("width"))
                    return col.width;
                else
                    return "";
            };

            //<table> css class
            self.getTableClass = function () {
                if (params.options.hasOwnProperty("tableClass"))
                    return params.options.tableClass;
                else
                    return "";
            };

            //total number of pages according to no. of records per page.
            self.totalPages = ko.computed(function () {
                return Math.ceil(self.list().length / params.options.pageRecords);
            });

            self.setCurrentPage = function (pageNo) {
                self.currentPage(pageNo);
            };

            self.gotoFirst = function () {
                self.currentPage(1);
            };

            self.gotoLast = function () {
                self.currentPage(self.totalPages());
            };

            //current pagination list
            self.currentPaginationList = ko.computed(function () {
                var currentPage = ((self.currentPage / 4) % 1 === 0) ? self.currentPage() : (self.currentPage() - 1);
                var bottom = Math.floor(currentPage / 4) * 4;
                var top = bottom + 5;
                if (top > self.totalPages())
                    top = self.totalPages() + 1;
                var list = [];
                for (var i = bottom + 1; i < top; i++)
                    list.push(i);
                return list;
            });

            self.gotoNextPagination = function () {
                var currentPage = self.currentPage();
                var bottom = Math.floor(currentPage / 5) * 5;
                if (bottom === 0)
                    bottom++;
                self.currentPage(bottom + 4);
            };

            //filtered list of records
            self.filteredItems = ko.computed(function () {
                return ko.utils.arrayFilter(self.list(), function (item) {
                    for (var prop in self.filter) {
                        var value;
                        if (ko.isObservable(item[prop]))
                            value = item[prop]();
                        else
                            value = item[prop];
                        var filter = self.filter[prop]();
                        if (filter.length > 0) {
                            if (value.toLowerCase().indexOf(filter) < 0)
                                return false;
                        }
                    }
                    return true;
                });
            });

            //list for records displayed on current active page
            self.pageList = ko.computed(function () {

                if (params.options.hasOwnProperty("pageRecords")) {
                    var pageRecords = params.options.pageRecords;
                    var begin = (self.currentPage() - 1) * pageRecords;
                    var end = begin + pageRecords;
                    return self.filteredItems().slice(begin, end);
                }
                return self.filteredItems();
            });

        },
        template: '<table style="width:100%" data-bind="css:getTableClass()">\
                <thead>\
                    <div data-bind="if: options.hasOwnProperty(&quot;columns&quot;)">\
                        <tr data-bind="foreach:options.columns">\
                            <th data-bind="attr:{width:$parent.getWidth($data)}">\
                                <span data-bind="text: $data.hasOwnProperty(&quot;name&quot;)?$data.name:$data.key"></span></th>\
                        </tr>\
                        <tr data-bind="foreach:options.columns">\
                            <th>\
                                <div data-bind="if : $parent.ifFilter($data)">\
                                    <input data-bind="textInput: $parent.filter[$data.key]">\
                                <div>\
                            </th>\
                        </tr>\
                    </div>\
                    <div data-bind="if: !options.hasOwnProperty(&quot;columns&quot;)">\
                        <tr data-bind="foreach:listKeys">\
                            <th>\
                                <span data-bind="text: $data"></span></th>\
                        </tr>\
                    </div>\
                </thead>\
                <div data-bind="if: options.hasOwnProperty(&quot;columns&quot;)">\
                    <tbody data-bind="foreach: pageList">\
                        <tr data-bind="foreach: $parent.options.columns">\
                            <td data-bind="text: $parentContext.$data[$data.key]"></td>\
                        </tr>\
                    </tbody>\
                </div>\
                <div data-bind="if: !options.hasOwnProperty(&quot;columns&quot;)">\
                    <tbody data-bind="foreach: list">\
                        <tr data-bind="foreach: $parent.listKeys">\
                            <td data-bind="text: $parentContext.$data[$data]"></td>\
                        </tr>\
                    </tbody>\
                </div>\
            </table>\
            <div data-bind="if: options.hasOwnProperty(&quot;pageRecords&quot;)">\
                <ul class="pagination pull-right">\
                    <li>\
                        <a href="javascript:void(0)" data-bind="click: function(){gotoFirst()}" aria-label="Previous">\
                        <span aria-hidden="true">&laquo;</span></a>\
                    </li>\
                    <!-- ko foreach: currentPaginationList -->\
                    <li data-bind="css:{active:$data==$parent.currentPage()}"><a href="javascript:void(0)" data-bind="text:$data,click: function(){$parent.setCurrentPage($data)}"></a></li>\
                    <!-- /ko -->\
                    <!-- ko if: currentPaginationList().slice(0).pop()!=totalPages() -->\
                    <li><a href="javascript:void(0)" data-bind="click:function(){gotoNextPagination()}">...</a></li>\
                    <!-- /ko -->\
                    <li>\
                        <a href="javascript:void(0)" data-bind="click: function(){gotoLast()}" aria-label="Next">\
                    <span aria-hidden="true">&raquo;</span>\
                    </a>\
                    </li>\
                </ul>\
            </div>'
    });

}));