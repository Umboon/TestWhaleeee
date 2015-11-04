angular.module('category', []);
angular.module('category').controller('categorycontroller', function ($http, $scope) {

    $scope.category = {};
    $scope.showDeleteCategory = {};

    $scope.saveCategory = function () {
       if(!!$scope.category.cate){
            $http.post('/savecategory', $scope.category).success(function (data) {
            getCategory();
            $scope.clearData();
            growl("บันทึกสำเร็จ",'msg-green','buttom');

       
       });
       }
        else{
            growl("กรุณากรอกชื่อหมวดเอกสาร",'msg-red','top');
        }
    };
    $scope.deleteCategory = function (cat) {
        $http.post('/deletecategory', cat).success(function (data) {
            //location.href="#/category";
            getCategory();
            

        });
    };
    
    $scope.lodeCategory = {};
    function getCategory(){
        $http.get('/getcategorys').success(function (data){
            $scope.lodeCategory = data;
           
        });
    }
    getCategory();
    
   
   $scope.clearData = function (){
       $scope.category = {};
   };
   
   $scope.action = function (cat){
       $scope.category = cat;
   };
   
   
  
   $scope.clickDelete = function (cate){
       $scope.showDeleteCategory = cate;
    };


});
