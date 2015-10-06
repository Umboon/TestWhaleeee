angular.module('detail_user',[]);
angular.module('detail_user').controller('detailUserController',function (userService,$http,$scope){
     
    $scope.user = {};
    $scope.detailuser = {};
    
    
   // console.log(userService.detail_user);
    $scope.saveUser = function (){
        $http.post('/saveuser',$scope.user).success(function (data){
            getUser();
           // growl("Save Success","success","top");
            
        }).error(function (data){
          //  growl("Save Error","danger","top");
        });
    };
    
    $scope.updateUser = function (dtu){
        userService.detail_user = dtu;
        
        location.href="#/user";
    };
    
    getUserDetail();
    function getUserDetail(){
        $http.get('/getuserdetail').success(function (data){
            $scope.detailuser = data;
        });
    }
    
    $scope.detailuser = function (dtu){
      console.log(dtu);  
    };
    
    
   $scope.clearUser = function (){
      $scope.user = {};
   };
    
    
    $scope.users = {};
    function getUser(){
        $http.get('/getuser').success(function (data){
            $scope.users = data;
        });
    }
    
    getUser();
    
       $scope.deleteUser = function () {
           $('.modal-backdrop.in').css('display','none');
        $http.post('/deleteuser', $scope.detailuser).success(function (data) {
           location.href = "#/show_user";
        });
    };
    
});