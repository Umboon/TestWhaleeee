var dow = angular.module('formtopic_up', []);
var dow = angular.module('formtopic_up').controller('formtopicupController', function ($http, $scope) {

    $scope.form = {};
    $scope.topicform = {};
    $scope.ferror = {};

    $scope.saveFormTopic = function () {
        $scope.topicform.file = $scope.form;
        $http.post('/saveformtopic', $scope.topicform).success(function (data) {
            getFormTopic();
            $scope.clearForm();//เรียกใช้ ฟังก์ชั่น clearForm เพื่อเคลียร์ข้อมูลที่บันทึกไปแล้ว
            $("#complete-dialog-saveformtopic").modal('show');//แสดงไดอะล็อก"บันทึกสำเร็จ"
        }).error(function (data) {
            $scope.ferror = data;
            growl("กรุณากรอกข้อมูลแบบฟอร์ม", 'msg-red', 'top');
        });
//        if (!!$scope.ferror.violations.file) {
//            $scope.ferror.violations.file.message = "";
//        }
        $("#formdoc").val("");
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
        //$scope.formfiles = {};
    };
    
    getUserUpload();
    function getUserUpload() {
        $http.get('/getuserupload').success(function (data) {
            $scope.topicform.user = data;
            console.log(data);
            return data;
        });
    }


    $scope.changeForm = function () {
        $("#formdoc").val();
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