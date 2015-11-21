angular.module('todoApp', [])
  .controller('TodoListController', function ($scope, $http) {
    var todoList = this

    // Simple GET request example:

    $http.get('/profile').then(function (response) {
      $scope.name = response.data.displayName
      $scope.photo = response.data.photos[0].value

    }, function (response) {
      console.log(response)
    })

    todoList.post = function () {
      value = {message: $scope.text}
      $http.post('/post', value).then(function (response) {
        window.location = "location.html"
        console.log(response)
      }, function (response) {
        console.log(response)
      })
    }

  })
