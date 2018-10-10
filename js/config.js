app.config(function($routeProvider){
    $routeProvider
        .when('/',{
        templateUrl:'templates/views/main.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
        .when('/hairPage',{
        templateUrl:'templates/views/hairlist.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
        .when('/bodyPage',{
        templateUrl:'templates/views/bodylist.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
		.when('/nailPage',{
        templateUrl:'templates/views/naillist.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
		.when('/facePage',{
        templateUrl:'templates/views/facelist.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
		.when('/loginPage',{
        templateUrl:'templates/views/login.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
		.when('/regisPage',{
        templateUrl:'templates/views/regis.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
		.when('/contactPage',{
        templateUrl:'templates/views/contacts.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
		.when('/ordersPage',{
        templateUrl:'templates/views/orders.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    }).when('/delivpayPage',{
        templateUrl:'templates/views/delivPay.html',
        controller:'mainCtrl',
        controllerAs:'ctrl'
    })
		.otherwise({
        redirectTo: '/'
    })
    })