/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])
  .factory('userinfoService',function(){
    var role={};
    var user={};
    return{
      setRoleInfo:function(roleid){
      //  role.roleid=roleid;
        role.roleid=roleid;
        console.log('setting roleid',role)
      },

      getRoleInfo: function () {

        return role;

      },

      setUsermobile: function (mobile) {

        user.mobile=mobile;
        console.log('setting mobile',mobile)
      },
      getUsermobile: function () {

        return user.mobile;
      },
      setUserinfo:function(data){
      user.otp=data.users.otp;
        user.userId=data.users.userId;

        console.log('setting userinfo',user)
      },

      getUserInfo: function () {

        return user;

      }
    }
  })

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('HomeCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state) {
  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

    ionicMaterialInk.displayEffect();

  $scope.homeLogin= function () {
    $state.go('app.login');
  };
  $scope.homeRegistration= function () {
    $state.go('app.registration');
  };
  $scope.homeCustomerLogin= function () {
    $state.go('app.customer_login');
  }
})


    .controller('LoginCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.distributorLogin= function (distributor,distributorForm) {
       if(distributorForm.$valid){
         console.log(distributorForm,distributor);
         $state.go('app.distributor_login');
       }
      }
      $scope.retailerLogin= function (retailer,retailerForm) {
        if(retailerForm.$valid){
          console.log(retailerForm,retailer);
          $state.go('app.retailer_login');
        }
      }

      $scope.customerLogin= function (customer,customerForm) {
        if(customerForm.$valid){
          console.log(customerForm,customer);
          $state.go('app.customer_login');
        }
      }

      $scope.forgotPassword= function () {
        $state.go('app.forgot_password');
      };

    })

    .controller('RegCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state,$http,userinfoService) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.customer={};
      $scope.retailer={};
      $scope.regsuccess=false;


      $scope.toggle= function (roleid) {

        if(roleid=='4'){
          $scope.retailershow=true;
          $scope.customershow=false;
        }
        else{
          $scope.customershow=true;
          $scope.retailershow=false;
        }

      }
      $http.get('http://10.10.10.58/gulf_v1/webservices/services.php/regionlist').then(function(results){
       $scope.regions=results.data.regionList;
     console.log('regions', $scope.regions);
      }).catch(function (error) {
        alert('Something went wrong!!!!')

      })

      $scope.changedresion= function (reregion) {
/*
        console.log($scope.retailer,$scope.retailer.STATE_PK_ID);
*/
        $http.get('http://10.10.10.58/gulf_v1/webservices/services.php/statelist/'+reregion).then(function(results){
          $scope.states=results.data.States;
          console.log('sates for region',  $scope.states);
        })
      }

      $scope.changedstate= function (state) {
        console.log('sates for cites',state)
        $http.get('http://10.10.10.58/gulf_v1/webservices/services.php/citylist/'+state).then(function(results){
          $scope.cities=results.data.cities;
          console.log('cities',  $scope.cities);
        })
      }

      $scope.changedcity= function (city) {
        console.log('city for distributor',city)
        $http.get('http://10.10.10.58/gulf_v1/webservices/services.php/distributerlist/'+0).then(function(results){
          $scope.distributers=results.data.Distributers;
          console.log('distributers', $scope.distributers);
        })
      }

      $scope.retailerRegistration= function (retailer,retailerRegForm) {

        if(retailerRegForm.$valid)
          console.log('retailer',retailer);
        console.log('reatiler form',retailer);
        $http({
          method:'POST',
          url:'http://10.10.10.58/gulf_v1/webservices/services.php/registration',
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          data:'city='+retailer.city+'&distributor='+retailer.distributor+'&dob='+'12/12/2090'+'&email='+retailer.email+'&fname='+retailer.fname+'&mobile='+retailer.mobile+'&region='+retailer.region+'&roleid='+retailer.roleid+'&state='+retailer.state+'&firmname='+retailer.firmname

          /*'city='+'12'+'&distributor='+'16'+'&dob='+'12/12/1091'+'&email='+'g@rg.com'+
          '&fname='+'13'+'&mobile='+'4213432499'+'&region='+'3'+'&roleid='+'4'+
          '&state='+'13'+'&firmname='+'abc'*/
        }).success(function (data, status, headers, config) {

          userinfoService.setRoleInfo(retailer.roleid);
          userinfoService.setUsermobile(retailer.mobile)
          userinfoService.setUserinfo(data);
          $scope.regsuccess=true;
          console.log('registration data for retailer',data)

            $timeout(callAtTimeout, 3000);
          //console.log(success.users)
        })
          .error(function(data, status, headers, config){
          console.log(data, status, headers, config)
        })

        function callAtTimeout() {
          console.log("Timeout occurred");
          $state.go('app.otp');
        }


        // $state.go('app.login');
        }

      $scope.customerRegistration= function (customer,customerRegForm) {

        if(customerRegForm.$valid){
          console.log("eneted in customer registration",customer);
          userinfoService.setRoleInfo(customer.roleid)
          $http({
            method:'POST',
            url:'http://10.10.10.58/gulf_v1/webservices/services.php/registration',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:'fname='+customer.fname+'&mobile='+customer.mobile+'&roleid='+customer.roleid
          }).success(function (data, status, headers, config) {
            userinfoService.setUserinfo(data);
            $scope.regsuccess=true;
           $timeout(callAtTimeout, 3000);
            console.log(data, status, headers, config)  })
            .error(function(data, status, headers, config){
            console.log(data, status, headers, config)
          })


        }
      }
      function callAtTimeout() {
        console.log("Timeout occurred");
        $state.go('app.otp');
      }

    })
    .controller('DistLoginCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state,$ionicHistory) {
        // Set eader


        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.distLogin= function (distributor,distLoginForm) {

        if(distLoginForm.$valid){
          console.log(distLoginForm,distributor);
          $state.go('app.distributor_home');
        }
      }

    })

/*    .controller('DistRegCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('RetailRegCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })*/

    .controller('DistResetPassCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('DistHomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state,$ionicHistory) {
      $ionicHistory.clearHistory();
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.distributorProfile= function () {
        $state.go('app.distributor_my_profile');
      };
      $scope.distributorProductDetail= function () {
        $state.go('app.distributor_product_detail');
      };
      $scope.distTarget= function () {
        $state.go('app.target_os_p');
      };
      $scope.notification= function () {
        $state.go('app.notification');
      };
      $scope.brandStories= function () {
        $state.go('app.brand_stories');
      };
      $scope.feedbackQuery= function () {
        $state.go('app.feedback_query');
      };
      $scope.changePassword= function () {
        $state.go('app.change_password');
      };
      $scope.distributorOrder= function () {
        $state.go('app.distributor_create_order');
      };
    })

    .controller('DistProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('DistProductDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('DistOrderCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.distributorOrder= function () {
        $state.go('app.distributor_create_order');
      };
    })

    .controller('CreateDistOrderCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

      $scope.qty = 1;
      $scope.increment = function(){
        $scope.qty ++;
      }
      $scope.decrement = function(){
        $scope.qty --;
      };

        $scope.addOrder= function (product) {
           // alert("<<<<<<<<<<<<111111");
           alert("details",product);
        }

        var ctrl = this;
       /* $scope.addOrder= function (product) {
            console.log(product);

        }*/
        /*ctrl.add = add;*/
        ctrl.data = [
            {
                name: "AiA",
                code: "AI101",
                limit: 25000,
                account: "Life Insurance"
            },
            {
                name: "Cargills",
                code: "CF001",
                limit: 30000,
                account: "Food City"
            }
        ];
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('DistOrderDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();


    })

    .controller('TargetOSCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('ChannelPartnerCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.news= function () {
        $state.go('app.news');
      };
      $scope.productKnowledge= function () {
        $state.go('app.product_knowledge');
      };
      $scope.chooseChampion= function () {
        $state.go('app.choose_champion');
      };
      $scope.notification= function () {
        $state.go('app.notification');
      };
      $scope.brandStories= function () {
        $state.go('app.brand_stories');
      };
      $scope.feedbackQuery= function () {
        $state.go('app.feedback_query');
      };
      $scope.dashBoard= function () {
        $state.go('app.dashboard');
      };
    })

    .controller('notificationCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$http,API_ENDPOINT ) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

      $http.get(API_ENDPOINT.url+'/services.php/notilimit/0/5').then(function (result) {


          $scope.notifications=result.data.NotificationList;
        console.log( $scope.notifications);
    }).catch(function (error) {

        alert("Error on notifocation request")
      })

      })

    .controller('ChangePassCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('NewsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('CustomerFeedbackCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('RetailerHomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.retailerProfile= function () {
        $state.go('app.retailer_my_profile');
      };
      $scope.retailerProductDetail= function () {
        $state.go('app.retailer_product_detail');
      };
      $scope.retailerOrder= function () {
        $state.go('app.retailer_order');
      };
      $scope.notification= function () {
        $state.go('app.notification');
      };
      $scope.brandStories= function () {
        $state.go('app.brand_stories');
      };
      $scope.feedbackQuery= function () {
        $state.go('app.feedback_query');
      };
      $scope.changePassword= function () {
        $state.go('app.change_password');
      };
    })

    .controller('RetailerProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('ForgotPasswordCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$http) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();


      $scope.forgotpass=function(mobile){
        $http({
          method:'POST',
          url:'http://10.10.10.58/gulf_v1/webservices/services.php/forgotpassword/'+mobile,
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          }

        }).then(function (data) {

          $scope.userinfo=data.data.users;
          console.log(data);
          $scope.message=data.data.Message;

          alert(data);
          // 'new_password='+createpass.password+'&confirm_password='+createpass.conPassword

        })


      }
    })

    .controller('brandStoriesCtrl', function($http,$scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,brandstoryService,API_ENDPOINT) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
      $http.get(API_ENDPOINT.url+'/brand_story.php/brandstory/0/5').then(function (result) {

        console.log(result.data);
        $scope.brandstory=result.data.brandstory;

      });
    })

    .controller('feedbackQueryCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('RetailerProductDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('RetailerCreatteCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

  .controller('customerLoginCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.customerLogin1= function (customer,customerLoginForm) {
      if(customerLoginForm.$valid){
        console.log(customerLoginForm,customer);
        $state.go('app.channel_partner');
      }
    }
  })

  .controller('RetailerLoginCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.retailLogin= function (retailer,retailerLoginForm) {

      if(retailerLoginForm.$valid){
        console.log(retailerLoginForm,retailer);
        $state.go('app.retailer_home');
      }
    }
  })

  .controller('RetailerOrderCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.retailerCreateOrder= function () {
      $state.go('app.retailer_create_order');
    };
    /*$scope.distributorProfile= function () {
      $state.go('app.retailer_order');
    };*/
  })

  /*.controller('retailerNotificationCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

   /!* $scope.distributorProfile= function () {
      $state.go('app.retailer_notification');
    };*!/
  })*/

  .controller('brandStoriesCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

  })

  /*.controller('retailerFeedbackQueryCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

  })*/

  .controller('ChangePasswordCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

  })
  /*function MyCtrl($scope) {
      $scope.value= 'foo';

      $scope.$watch('value', function(value) {
          console.log(value);
      });
  }*/
    /*.controller('RadioCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })*/

    /*.controller('RadioCtrl', function($scope) {
    $scope.active = 'breakfast';
    $scope.setActive = function(type) {
        $scope.active = type;
    };
    $scope.isActive = function(type) {
        return type === $scope.active;
    };
})
    .controller('NameCtrl', function ($scope){
        $scope.firstName = 'John';
        $scope.lastName = 'Smith';
    });*/

    /*.controller('LoginCtrl', function($scope) {
        $scope.wks =  {number: 1, validity: true}
    })
    .directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope) {
            scope.$watch('wks.number', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.wks.number = oldValue;
                }
            });
        }
    };
})*/
    /*.controller('MyCtrl', function($scope) {

        var ctrl = this;

        $scope.addOrder= function (product) {
            console.log(product);

        }
        /!*ctrl.add = add;*!/
        ctrl.data = [
            {
                name: "AiA",
                code: "AI101",
                limit: 25000,
                account: "Life Insurance"
            },
            {
                name: "Cargills",
                code: "CF001",
                limit: 30000,
                account: "Food City"
            }
        ]

        ////////
        /!*function add(index) {
            window.alert("Added: " + index);
        }*!/
    })*/


    .controller('ExampleController', ['$scope', function($scope) {
        $scope.data = {
            singleSelect: null,
            multipleSelect: [],
            option1: 'option-1',
        };
    }])
  .controller('brandvideoCtrl', function ($scope,$http) {

 /*    $scope.videos = [
     {
     title: "My first video",
     date: "1-1-2015",
     thumbnails: "http://i.ytimg.com/vi/bJp1ptX4F3M/maxresdefault.jpg",
     },
     {
     title: "My second video",
     date: "5-7-2015",
     thumbnails: "http://i.ytimg.com/vi/NA2VerbOyt0/maxresdefault.jpg",
     }
     ]*/

    $scope.playerVars = {
      rel: 0,
      showinfo: 0,
      modestbranding: 0,
    }
    $scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';
   /* $scope.videos = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAnAi9xKNqI_xNGDKHtFZrInz5l_QkMqNs',
      type: 'video',
      maxResults: '5',
      part: 'id,snippet',
      q: 'creatorup',
      order: 'date',
      channelId: 'UCeEqIv7lVwOOLnwxuuhQFuQ',
    }*/
   /* $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        console.log (child);

        $scope.videos.push(child);
      });
    });*/
  })

  .controller('brandaudioCtrl', function ($scope,$http) {


  })
  .controller('otpCtrl', function ($scope,$http,$state,userinfoService) {

    $scope.userOtp="Use OTP: "+userinfoService.getUserInfo().otp

    console.log("getting otp:",userinfoService.getUserInfo());

    $scope.verifyotp= function (otp) {
     var userId= userinfoService.getUserInfo().userId;
     console.log('userId',userinfoService.getUserInfo().userId);


      $http.get('http://10.10.10.58/gulf_v1/webservices/services.php/verifyOTP/'+userId+'/'+otp).then(function (data) {

        console.log(data.data.otpStatus);

        if(data.data.otpStatus.status==2){
          alert(data.data.otpStatus.message+" "+"Please regenerate");
        } else if(data.data.otpStatus.status==1){
          alert(data.data.otpStatus.message+" "+"Please regenerate");
        } else if(data.data.otpStatus.status==3){
          $state.go('app.create_password')
        } else if(data.data.otpStatus.status==0){
          alert(data.data.otpStatus.message+" "+"Please regenerate");
        }
      /*  if("OTP Expired"==data.otpStatus.status){
          alert(data.otpStatus.status);
        }
        alert('failed');
*/

      }).catch(function (error) {

      })

    }

  })
  .controller('CreatePasswordCtrl', function ($scope,$http,userinfoService,$state) {

    $scope.createNewPassword= function (createpass ,createPassForm) {
      var userId= userinfoService.getUserInfo().userId;
      $http({
        method:'POST',
        url:'http://10.10.10.58/gulf_v1/webservices/services.php/firstusercredential',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"

        },
        data:'new_password='+createpass.password+'&confirm_password='+createpass.conPassword+'&userId='+userId

      }).then(function (data) {
        alert(data);
        var roleId=userinfoService.getRoleInfo().roleid;
        if(roleId==5){
          $state.go('app.channel_partner');
        } else if(roleId==4){
          $state.go('app.retailer_home');
        }

        // 'new_password='+createpass.password+'&confirm_password='+createpass.conPassword

      })

    }


  })

;
