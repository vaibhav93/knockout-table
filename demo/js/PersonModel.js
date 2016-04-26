var PersonModel = function () {
    this.firstName = ko.observable("");
    this.options = {
        tableClass: 'table table-hover',
        selectable: false,
        pageRecords: 5,
        responsive:false,
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
            },
            {
                key: 'address.state',
                name: 'State',
                filter: true
            },
            {
                key: 'html-template',
                name: 'Remove',
//                class: 'hidden-xs',
                html:true
            }
        ]
    };
    this.getPage = function(pageNo,records){
        return $.getJSON('http://nameless-sun-2869.getsandbox.com/sidemenu?pageNo='+pageNo+'&records='+records)
    };
    this.people = ko.observableArray(
    [
            {
                id: '1223',
                email: 'vaibhav.b.bansal@gmail.com',
                added: '12/10/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '4533',
                email: 'nitesh.kumar@gmail.com',
                added: '24/11/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '8697',
                email: 'abhisek.parida@gmail.com',
                added: '22/09/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9878',
                email: 'saurabh.sahu@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9877',
                email: 'sourav.poddar@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '1223',
                email: 'vaibhav.b.bansal@gmail.com',
                added: '12/10/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '4533',
                email: 'nitesh.kumar@gmail.com',
                added: '24/11/2015',
                address:{
                    state:'Maharashtra'
                }                
            },
            {
                id: '8697',
                email: 'abhisek.parida@gmail.com',
                added: '22/09/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9878',
                email: 'saurabh.sahu@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9877',
                email: 'sourav.poddar@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '1223',
                email: 'vaibhav.b.bansal@gmail.com',
                added: '12/10/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '4533',
                email: 'nitesh.kumar@gmail.com',
                added: '24/11/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '8697',
                email: 'abhisek.parida@gmail.com',
                added: '22/09/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9878',
                email: 'saurabh.sahu@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9877',
                email: 'sourav.poddar@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '1223',
                email: 'vaibhav.b.bansal@gmail.com',
                added: '12/10/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '4533',
                email: 'nitesh.kumar@gmail.com',
                added: '24/11/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '8697',
                email: 'abhisek.parida@gmail.com',
                added: '22/09/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9878',
                email: 'saurabh.sahu@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9877',
                email: 'sourav.poddar@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '1223',
                email: 'vaibhav.b.bansal@gmail.com',
                added: '12/10/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '4533',
                email: 'nitesh.kumar@gmail.com',
                added: '24/11/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '8697',
                email: 'abhisek.parida@gmail.com',
                added: '22/09/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9878',
                email: 'saurabh.sahu@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9877',
                email: 'sourav.poddar@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '1223',
                email: 'vaibhav.b.bansal@gmail.com',
                added: '12/10/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '4533',
                email: 'nitesh.kumar@gmail.com',
                added: '24/11/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '8697',
                email: 'abhisek.parida@gmail.com',
                added: '22/09/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9878',
                email: 'saurabh.sahu@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            },
            {
                id: '9877',
                email: 'sourav.poddar@gmail.com',
                added: '11/12/2015',
                address:{
                    state:'Maharashtra'
                }
            }
    ]
    );

    this.addPerson = function () {
        this.people.push({
            name: this.firstName()
        })
    };
    this.reset = function () {
        this.people.removeAll();
        this.firstName("");

    };
}
ko.applyBindings(new PersonModel());