angular.module('user',['checklist-model']);
angular.module('user').controller('userController',function($scope,$http){
    
    $scope.user = {};
    
    
    $scope.saveUser = function (){
        $http.post('/saveuser',$scope.user).success(function (data){
            getUser();
           // growl("Save Success","success","top");
            
        }).error(function (data){
          //  growl("Save Error","danger","top");
        });
    };
    
    
   
    
    
    $scope.users = {};
    function getUser(){
        $http.get('/getuser').success(function (data){
            $scope.users = data;
        });
    }
    
    getUser();
    
});


