'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider.when("/show_product/:product_id", {
        templateUrl : "view2/view2.html",
        controller: "View2Ctrl",
        controllerAs: "view2"
    })
        .otherwise({
            templateUrl: "view1/view1.html",
            controller: "View1Ctrl",
            controllerAs: "view1"
        });
}])
    .run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
        $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
            console.log('Current route name: ' + $location.path());
            // Get all URL parameter
            console.log($routeParams);
        });
    }]);
app.service('Products',function(){
    return [
        {
            id: 1,
            name: "Mac Book",
            description: "Our goal with MacBook was to do the impossible: engineer a full‑size experience into the lightest and most compact Mac notebook ever. That meant reimagining every element to make it not only lighter and thinner but also better. The result is more than just a new notebook. It’s the future of the notebook. And now, with sixth‑generation Intel processors, improved graphics performance, faster flash storage, and up to 10 hours of battery life,* MacBook is even more capable.",
            price: "1500",
            image: "img/MACBOOKPRO.jpg",
            image_width: "400",
            reviews: ["For my first Mac I am very happy with it. Shipping was fast and it came in perfect condition. The only bad was the product box being dented but other then that the Mac was beautiful and flawless. Highly recommend this seller.",
            "This computer is one of the best purchases I have made in quite some time."]
        },
        {
            id: 2,
            name: "IPhone",
            description: "iPhone 6s and iPhone 6s Plus also introduce a transformative new approach to photography called Live Photos, bringing still images to life by capturing a moment in motion. Live Photos, 3D Touch and other advancements in the new iPhones are powered by the Apple-designed A9 chip, the most advanced chip ever in a smartphone, delivering faster performance and great battery life.",
            price: "3000",
            image: "img/apple-iphone se 16gb-silver-450x350.png",
            image_width: "300",
            reviews: []
        }
    ];
});
