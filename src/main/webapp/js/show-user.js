angular.module('show_user', []);
angular.module('show_user').controller('show_usercontroller', function ($http, $scope) {

    $scope.users = {};
    getUser();
    function getUser() {
        $http.get('/getuser').success(function (data) {

            $scope.users = data;

        });
    }
    ;

   
   


 $scope.detailuser = function (dtu){
       $http.post('/setuserdetail',dtu).success(function (data){
           location.href = "#/detail_user";
       });  
    };

});