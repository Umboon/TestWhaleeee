var dow = angular.module('form_up',[]);
var dow = angular.module('form_up').controller('formupController',function ($http,$scope){
    
    $scope.form = {};
//    $scope.docform = {};
    
     $scope.saveForm = function () {
        var fd = new FormData();
        fd.append('forms', $scope.form);
        $http.post('/saveform', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (data){
//            console.log(data);
//            $scope.docform.form = data;
        });
    };
    
    
    $scope.clearForm = function (){
        $scope.form = {};
    };
    
    
});

dow.directive('formModel', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.formModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].forms[0]);
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