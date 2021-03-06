var app = angular.module('detail', []);
var app = angular.module('detail').controller('detailController', function (documentService , $http, $scope) {

    $scope.file;
    $scope.document = {};
    $scope.categorys = {};
    $scope.details = {};
   
    $scope.saveDocument = function () {
        saveDocument();

    };

     $scope.update = function (doc){
         documentService.detail = doc;//เรียกใช้ documentService เพื่อให้ไฟล์ที่ต้องการแก้ไขค้างอยู่
         location.href="#/document";//เรียกใช้ location.href เพื่อให้ย้อนกลับไปที่หน้าของการกรอกข้อมูล
         
     };

    getDocumentDetail();
    function getDocumentDetail(){
        $http.get('/getdocumentdetail').success(function (data){
            $scope.details = data; 
        });
    }
    
    console.log(documentService.detail);
    function saveDocument() {
        $http.post('/savedocument', $scope.document).success(function (data) {
        });
    }

    $scope.deleteDocument = function () {
        $('.modal-backdrop.in').css('display','none');//เมื่อโชว์ไดอะล็อกแสดงการลบแล้ว สามารถกลับไปใช้งานได้ปกติ
        $http.post('/deletedocument', $scope.details).success(function (data) {
             location.href = "#/report_up";//เรียกใช้ location.href เพื่อให้ย้อนกลับไปที่หน้าประวัติการอัพโหลดเอกสาร
        });
    };

    $scope.details = function (doc) {
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



