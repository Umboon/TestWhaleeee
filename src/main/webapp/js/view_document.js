angular.module('view_document', []);
angular.module('view_document').controller('view_documentController', function ($http, $scope) {

    $scope.searchData = {};
    $scope.documents = {};

    function getDocuments() {
        $http.get('/getdocuments').success(function (data) {
            $scope.documents = data;
            console.log($scope.documents);
        });

    }
    getDocuments();
    
    $scope.getDocuments = function (){
        getDocuments();
    };

    $scope.dowload = function (dld) {
        location.href = '/getfile/' + dld.file.id;
    };


     $scope.search = function (){
         $http.post('/searchdocument',$scope.searchData).success(function (data){
             if(!!data.content[0].id){
                 console.log('true');
                 $scope.documents = data;
             }
             $scope.documents = data;
             
         });
     };

});

