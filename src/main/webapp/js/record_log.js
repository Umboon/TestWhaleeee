angular.module('record_log', []);
angular.module('record_log').controller('recordlogController', function ($http, $scope) {

    $scope.recordlog = {};
    $scope.recordlogArray = [];
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;


    function getRecordLog() {
        $http.get('/getrecordlog', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            //$scope.recordlog = data;
            console.log($(data.content).length);
            for(i = 0 ; i < $(data.content).length ; i++){
                 $scope.recordlogArray[i]= data.content[i];
              $scope.recordlogArray[i].dateLogin = moment(data.content[i].dateLogin).format("DD-MM-YYYY : HH:mm:ss");
               console.log(data.content[i].dateLogin);
                 console.log(new Date(data.content[i].dateLogin)+'kjkhkl');
                 
            }
            $scope.recordlog = $scope.recordlogArray;
            
        });
    }
    getRecordLog();
    
    $scope.getRecordLog = function (){
        getRecordLog();  
    };
    
    $scope.selectSize = function (){
        getRecordLog();
        
    };

});