'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
    this.products = [
        {
            name: "Mac Book",
            description: "Our goal with MacBook was to do the impossible: engineer a full‑size experience into the lightest and most compact Mac notebook ever. That meant reimagining every element to make it not only lighter and thinner but also better. The result is more than just a new notebook. It’s the future of the notebook. And now, with sixth‑generation Intel processors, improved graphics performance, faster flash storage, and up to 10 hours of battery life,* MacBook is even more capable.",
            price: "1500",
            image: "/img/MACBOOKPRO.jpg"
        },
        {
            name: "IPhone",
            description: "iPhone 6s and iPhone 6s Plus also introduce a transformative new approach to photography called Live Photos, bringing still images to life by capturing a moment in motion. Live Photos, 3D Touch and other advancements in the new iPhones are powered by the Apple-designed A9 chip, the most advanced chip ever in a smartphone, delivering faster performance and great battery life.",
            price: "3000",
            image: "/img/apple-iphone se 16gb-silver-450x350.png"
        }
    ];
}]);


