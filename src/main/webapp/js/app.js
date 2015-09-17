angular.module('app', ['ngRoute', 'document', 'user', 'show_user', 'view_document', 'category', 'form', 'report_up', 'detail']);
angular.module('app').controller('homeController', function ($http, $scope) {

    $scope.categorys = {};

    function getCategorys() {
        $http.get('/getcategorys').success(function (data) {
            $scope.categorys = data;

        });
    }
    getCategorys();

    $scope.getCategory = function () {
        getCategorys();
    };



}).config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: 'page/home.html'
    })
            .when('/category', {
                controller: 'categorycontroller',
                templateUrl: 'page/category.html'
            })
            .when('/document', {
                controller: 'documentController',
                templateUrl: 'page/document.html'
            })
            .when('/view_document', {
                controller: 'view_documentController',
                templateUrl: 'page/view_document.html'
            })
            .when('/user', {
                controller: 'userController',
                templateUrl: 'page/user.html'
            })
            .when('/show_user', {
                controller: 'show_usercontroller',
                templateUrl: 'page/show_user.html'
            })
            .when('/form', {
                controller: 'formController',
                templateUrl: 'page/form.html'
            })
            .when('/report_up', {
                controller: 'reportUpController',
                templateUrl: 'page/report_upload.html'
            })
            .when('/detail', {
                controller: 'detailController',
                templateUrl: 'page/detail.html'
            }).otherwise({
        redirectTo: '/'
    });

}).factory('documentService',function (){
    return {
        detail:{}
    };
});




