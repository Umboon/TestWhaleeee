angular.module('app', ['ngRoute', 'document', 'user', 'show_user', 'view_document', 'category', 'report_up', 'detail', 'detail_user', 'docforcategory', 'formtopic_up', 'form_dowload', 'record_log', 'doc_manage', 'detail_docmanage','formup_manage']);
angular.module('app').controller('homeController', function ($http, $scope) {

    $scope.categorys = {};
    $scope.searchCategory = {};
    $scope.userLogin = {};

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
        console.log('click' + searchCategory.cate);
        $http.post('/searchbycategory', $scope.searchCategory).success(function (data) {
            location.href = "#/docforcategory";
        });
    };

    getUserLogin();
    function getUserLogin() {
        $http.get('/getuserlogin').success(function (data) {
            $scope.userLogin = data;
            console.log(data);
        });
    }



    $scope.checkAdmin = function () {
        if ($scope.userLogin.status == 'Admin') {
            return true;
        }
        else {
            return false;
        }
        //console.log($scope.userLogin.status == 'Admin');
    };
    $scope.checkAdminOrTeacher = function () {
        if (($scope.userLogin.status == 'Admin') || ($scope.userLogin.status == 'Teacher')) {
            return true;
        }
        else {
            return false;
        }
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
            .when('/formtopic_up', {
                controller: 'formtopicupController',
                templateUrl: 'page/formtopic_up.html'
            })
            .when('/form_dowload', {
                controller: 'formdowloadController',
                templateUrl: 'page/form_dowload.html'
            })
            .when('/record_log', {
                controller: 'recordlogController',
                templateUrl: 'page/record_log.html'
            })
            .when('/doc_manage', {
                controller: 'docmanageController',
                templateUrl: 'page/doc_manage.html'
            })
            .when('/detail_docmanage', {
                controller: 'detaildocController',
                templateUrl: 'page/detail_docmanage.html'
            })
             .when('/formup_manage', {
                controller: 'formupmanageController',
                templateUrl: 'page/formup_manage.html'
            })
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
    
}).factory('docmanageService', function () {
    return {
        detail_docmanage: {}
    };
//}).factory('formmanageService',function (){
//    return {
//        detail_formup: {}
//    };
});




