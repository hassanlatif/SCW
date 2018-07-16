angular.module('scwApp', [])
.service('Resources', function($q, $http) {

  return {
    querySingleResource: function(id) {
      $http.get('https://jsonplaceholder.typicode.com/posts/'+id).then(function(response){
        console.log(response.data.title);
      },  function(err){console.log("Failed to fetch Resource: ", err)});
    },

    queryMultResourcesSeq: function(ids) {
      return ids.reduce(function (q, id) {
        return q.then(function() {
          return $http.get('https://jsonplaceholder.typicode.com/posts/'+id).then(function(response){
            console.log(response.data.title);
          },  function(err){console.log("Failed to fetch Resource: ", err)});
        });
      }, $q.when());
    }
  };

})
.controller('ResourceController', ['Resources', function(Resources) {
  var resourcesVM = this;

  var ids = [1,2,3];

  // console.log("Fetching Asynchronous resources in parallel:");
  // ids.forEach(function(id) {
  //   Resources.querySingleResource(id);
  // });


  console.log("Fetching Asynchronous resources sequentially:");
  Resources.queryMultResourcesSeq([1,2,3]).then(function() {
    console.log("All Resources fetched sequentially.")
  });


}]);