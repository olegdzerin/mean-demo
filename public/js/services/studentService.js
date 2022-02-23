angular.module('StudentService', [])
// super simple service
// each function returns a promise object
.factory('Student', ['$http',function($http) {
   return {
      get : function() {
         return $http.get('/api/students');
      },
      create : function(student) {
         return $http.post('/api/students/send', student);
      },
      delete : function(id) {
         return $http.delete('/api/students/' + id);
      }
   }
}]);