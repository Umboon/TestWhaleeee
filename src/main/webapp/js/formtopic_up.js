var dow = angular.module('formtopic_up', []);
var dow = angular.module('formtopic_up').controller('formtopicupController', function ($http, $scope) {

    $scope.form = {};
    $scope.topicform = {};
    $scope.ferror = {};

    $scope.saveFormTopic = function () {
        $scope.topicform.file = $scope.form;
        $http.post('/saveformtopic', $scope.topicform).success(function (data) {
            getFormTopic();
            $scope.clearForm();
            growl("บันทึกสำเร็จ", 'msg-green', 'top');
        }).error(function (data) {
            $scope.ferror = data;
            growl("กรุณากรอกชื่อแบบฟอร์ม",'msg-red','top');
        });
    };

    $scope.formfiles = {};
    function getFormTopic() {
        $http.get('/getformtopic').success(function (data) {
            $scope.formfiles = data;

        });
    }
    getFormTopic();

    $scope.clearForm = function () {
        $scope.topicform = {};

    };


    $scope.changeForm = function () {
        var fd = new FormData();
        fd.append('forms', $scope.form);
        $http.post('/saveform', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (data) {
            $scope.form = data;
        });
    };





});

dow.directive('fileModel', function ($parse) {
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

dow.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});