/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

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

.controller('HomeCtrl', function($scope, $state) {

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

    .controller('RegCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
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

      $scope.retailerRegistration= function (retailer,retailerRegForm) {

        if(retailerRegForm.$valid){
          console.log(retailerRegForm,retailer);
          $state.go('app.login');
        }
      }
      $scope.customerRegistration= function (customer,customerRegForm) {

        if(customerRegForm.$valid){
          console.log(customerRegForm,customer);
          $state.go('app.login');
        }
      }
    })
    .controller('DistLoginCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
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

      $scope.distLogin= function (distributor,distLoginForm) {

        if(distLoginForm.$valid){
          console.log(distLoginForm,distributor);
          $state.go('app.distributor_home');
        }
      }

    })

    .controller('DistRegCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
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
    })

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

    .controller('DistHomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
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

    .controller('DistProductDetailCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
    })

    .controller('DistOrderCtrl', function($scope, $timeout, ionicMaterialMotion, $state) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

      $scope.distributorOrder= function () {
        $state.go('app.distributor_create_order');
      };
    })

    .controller('CreateDistOrderCtrl', function($scope, $timeout, ionicMaterialMotion) {

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

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
    })

    .controller('DistOrderDetailCtrl', function($scope, $timeout, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
    })

    .controller('TargetOSCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
    })

    .controller('ChannelPartnerCtrl', function($scope, $state, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

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
    })

    .controller('notificationCtrl', function($scope, $timeout, ionicMaterialMotion, $http, API_ENDPOINT ) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
      $http.get(API_ENDPOINT.url+'/services.php/notilimit/0/5').then(function (result) {


          $scope.notifications=result.data.NotificationList;
        console.log( $scope.notifications);
    }).catch(function (error) {

        alert("Error on notifocation request")
      })

      })

    .controller('ChangePassCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
    })

    .controller('NewsCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

    })

    .controller('CustomerFeedbackCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

    })

    .controller('RetailerHomeCtrl', function($scope, $timeout, ionicMaterialMotion, $state) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

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

    .controller('RetailerProfileCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

    })

    .controller('ForgotPasswordCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

    })

    .controller('brandStoriesCtrl', function($http, $scope, $timeout, ionicMaterialMotion, brandstoryService, API_ENDPOINT) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

      $http.get(API_ENDPOINT.url+'/brand_story.php/brandstory/0/5').then(function (result) {

        console.log(result.data);
        $scope.brandstory=result.data.brandstory;

      });
    })

    .controller('feedbackQueryCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

    })

    .controller('RetailerProductDetailCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
    })

    .controller('RetailerCreatteCtrl', function($scope, $timeout, ionicMaterialMotion) {

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);
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
        $state.go('app.login');
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
;
