angular.module('ionicApp', ['ionic', 'ngMap'])

  .controller('MarkerRemoveCtrl', function ($scope, $ionicLoading, $interval) {
    $scope.positions = []

    $scope.$on('mapInitialized', function (event, map) {
      $scope.map = map
    })

    $scope.centerOnMe = function () {
      $scope.positions = []

      $ionicLoading.show({
        template: 'Loading...'
      })

      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        $scope.positions.push({lat: position.coords.latitude,lng: position.coords.longitude})
        console.log(pos)
        $scope.map.setCenter(pos)
        $ionicLoading.hide()
      })

    }

    $interval(function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        x.innerHTML = 'Geolocation is not supported by this browser.'
      }
    }, 1000)

    function showPosition (position) {
      console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude)
      $scope.loc = {lat: position.coords.latitude,lng: position.coords.longitude}
      $scope.$apply()
    }

  })
