angular.module('app', ['ngRoute', 'document', 'user', 'show_user', 'view_document', 'category', 'report_up', 'detail', 'detail_user','docforcategory']);
angular.module('app').controller('homeController', function ($http, $scope) {

    $scope.categorys = {};
    $scope.searchCategory = {};
    
    function getCategorys() {
        $http.get('/getcategorys').success(function (data) {
            $scope.categorys = data;

        });
    }
    getCategorys();

    $scope.getCategory = function () {
        getCategorys();
    };

    $scope.clickCategory = function (searchCategory) {
        $scope.searchCategory.keyWord = searchCategory.cate;
        $scope.searchCategory.searchBy = "";
        console.log($scope.searchCategory.keyWord);
        console.log('click'+searchCategory.cate);
        $http.post('/searchbycategory', $scope.searchCategory).success(function (data) {
             location.href="#/docforcategory";
        });
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
            })
            .when('/detail_user', {
                controller: 'detailUserController',
                templateUrl: 'page/detail_user.html'
            })
            .when('/docforcategory', {
                controller: 'docforcateController',
                templateUrl: 'page/docforcategory.html'
            })
//            .when('/form_up', {
//                controller: 'formupController',
//                templateUrl: 'page/form_up.html'
//            })
//             .when('/form_dowload', {
//                controller: 'formdowloadController',
//                templateUrl: 'page/form_dowload.html'
//            })

            .otherwise({
                redirectTo: '/'
            });

}).factory('documentService', function () {
    return {
        detail: {}
    };
}).factory('userService', function () {
    return {
        detail_user: {}
    };
});




