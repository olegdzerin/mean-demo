angular.module('MainCtrl', []).controller('MainController', ['$scope', function($scope) {
    $scope.tagline = 'Welcome to tutorials point angular app!';
 }]
 );

 angular.module('MainCtrl', []).controller('MainController',
   ['$scope','$http','Student',function($scope, $http, Student) {
    $scope.tagline = 'Welcome to tutorials point angular app!';
   $scope.formData = {};
   $scope.loading = true;
   $scope.id = '';
   $http.get('/api/studentslist').
   then(function(response) {
       response.data
      $scope.student = response.data;
  }
 );
   // CREATE 
   // when submitting the add form, send the text to the node API
   $scope.createStudent = function() {
      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.formData.name != undefined) {
         $scope.loading = true;
         // call the create function from our service (returns a promise object)
         Student.create($scope.formData)
         // if successful creation, call our get function to get all the new Student
         .then(function (response){
            $scope.student = response.data;
            $scope.loading = false;
            $scope.formData = {}
         },    function (error){
         });
      }
   };
   // DELETE

   // delete a todo after checking it
   $scope.deleteStudent = function() {
      $scope.loading = true;
      if ($scope.id != '') {
            Student.delete($scope.id)
      // if successful delete, call our get function to get all the new Student
      .then(function(response) {
         $scope.loading = false;
       //  new list of Student
      });
      }
    
   };
}]);