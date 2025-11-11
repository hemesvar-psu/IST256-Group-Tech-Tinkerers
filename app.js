// Developed by: Intizor Hoshimova
// app.js
// Gadget Gurus AngularJS Application

const app = angular.module("gadgetGurusApp", []);

// ----------------------
// REST API SERVICE
// ----------------------
app.service("ApiService", function($http) {
  const BASE_URL = "http://localhost:8080/api"; // Change this to your backend URL

  // Shopper Endpoints
  this.getShoppers = () => $http.get(`${BASE_URL}/shoppers`);
  this.saveShopper = data => $http.post(`${BASE_URL}/shoppers`, data);

  // Product Endpoints
  this.getProducts = () => $http.get(`${BASE_URL}/products`);
  this.saveProduct = data => $http.post(`${BASE_URL}/products`, data);

  // Cart Endpoints
  this.addToCart = data => $http.post(`${BASE_URL}/cart`, data);
  this.getCart = () => $http.get(`${BASE_URL}/cart`);

  // Shipping Endpoints
  this.saveShipping = data => $http.post(`${BASE_URL}/shipping`, data);

  // Billing Endpoints
  this.saveBilling = data => $http.post(`${BASE_URL}/billing`, data);

  // Return Endpoints
  this.submitReturn = data => $http.post(`${BASE_URL}/returns`, data);
});

// ----------------------
// BILLING CONTROLLER
// ----------------------
app.controller("BillingController", function($scope, ApiService) {
  $scope.billing = {};
  $scope.alertMessage = "";
  $scope.alertType = "";
  $scope.jsonOutput = "";

  $scope.submitBilling = function() {
    $scope.billing.timestamp = new Date().toLocaleString();

    ApiService.saveBilling($scope.billing)
      .then(() => {
        $scope.alertMessage = "Billing details saved successfully!";
        $scope.alertType = "success";
        $scope.jsonOutput = JSON.stringify($scope.billing, null, 4);
        $scope.billing = {};
      })
      .catch(err => {
        $scope.alertMessage = "Error saving billing details.";
        $scope.alertType = "danger";
        console.error(err);
      });
  };
});

// ----------------------
// RETURNS CONTROLLER
// ----------------------
app.controller("ReturnsController", function($scope, ApiService) {
  $scope.returnData = {};
  $scope.alertMessage = "";
  $scope.alertType = "";
  $scope.jsonOutput = "";

  $scope.submitReturn = function() {
    $scope.returnData.timestamp = new Date().toLocaleString();

    ApiService.submitReturn($scope.returnData)
      .then(() => {
        $scope.alertMessage = "Return request submitted successfully!";
        $scope.alertType = "success";
        $scope.jsonOutput = JSON.stringify($scope.returnData, null, 4);
        $scope.returnData = {};
      })
      .catch(err => {
        $scope.alertMessage = "Error submitting return!";
        $scope.alertType = "danger";
        console.error(err);
      });
  };
});
