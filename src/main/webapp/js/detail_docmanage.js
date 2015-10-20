var app = angular.module('detail_docmanage', []);
var app = angular.module('detail_docmanage').controller('detaildocController', function (docmanageService, $http, $scope) {
    
    $scope.file;
    $scope.document = {};
    $scope.categorys = {};
    $scope.detaildoc = {};

    $scope.saveDocument = function () {
        saveDocument();

    };

    $scope.update = function (doc) {
        docmanageService.detail_docmanage = doc;
        location.href = "#/document";
       
    };

    getDocManageDetail();
    function getDocManageDetail() {
        $http.get('/getdocmanagedetail').success(function (data) {
            $scope.detaildoc = data;
        });
    }

    //console.log(documentService.detail_docmanage);
    function saveDocument() {
        $http.post('/savedocument', $scope.document).success(function (data) {
        });
    }

    $scope.deleteDocument = function () {
        $('.modal-backdrop.in').css('display', 'none');
        $http.post('/deletedocument', $scope.detaildoc).success(function (data) {
            location.href = "#/doc_manage";
        });
    };

    $scope.detaildoc = function (doc) {
        console.log(doc);

    };

    $scope.lodeCategory = {};
    function getCategory() {
        $http.get('/getcategorys').success(function (data) {
            $scope.lodeCategory = data;
        });
    }
    getCategory();


    $scope.saveFile = function () {
        var fd = new FormData();
        fd.append('files', $scope.file);
        $http.post('/savefile', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (data) {
            console.log(data);
            $scope.document.file = data;
        });
    };

    $('.datepicker.form-control').datepicker({
        changeYear: true,
        yearRange: "-100:+100",
        dateFormat: 'yy-mm-dd'
    });


});

app.directive('fileModel', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});

app.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});
