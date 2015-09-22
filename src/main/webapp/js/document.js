var app = angular.module('document', ['checklist-model']);
var app = angular.module('document').controller('documentController', function (documentService,$scope, $http) {

    $scope.file;
    $scope.document = documentService.detail;
    $scope.categorys = {};

    $scope.saveDocument = function () {
        saveDocument();

    };
    
    if(!!$scope.document.category){
        getCategory($scope.document.category.id);
    }
    else{
        getCategory(1);
    }
    
    
    $scope.lodeCategory = {};
    function getCategory(id) {
        $http.get('/getcategorys').success(function (data) {
            $scope.lodeCategory = data;
            $scope.document.category = data.content[id-1];
        });
    }
    
    
   function saveDocument(){
         $http.post('/savedocument', $scope.document).success(function (data) {
        });
    }

    $scope.deleteDocument = function () {
        $http.post('/deletedocument', $scope.document).success(function (data) {

        });
    };
    
    $scope.clearDoc = function (){
        $scope.document = {};
    };

  
     $scope.saveFile = function () {
        var fd = new FormData();
        fd.append('files', $scope.file);
        $http.post('/savefile', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (data){
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

