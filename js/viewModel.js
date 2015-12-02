$(document).ready(function () {


    var viewModel = {
        admins: ko.observableArray([
            {
                id: '2323',
                email: 'vaibhav.b.bansal@oracle.com'
        },
            {
                id: '1276',
                email: 'nitesh.kumar@oracle.com'
        }
    ])
    }

    ko.applyBindings(viewModel);
})