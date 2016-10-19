﻿(function () {
    'use strict';

    angular
    .module('app')
    .controller('SuspendController', SuspendController);

    SuspendController.$inject = ['$scope', 'blockUI', 'dialogs', 'settingsService', 'dataService', 'userService', 'configService'];

    function SuspendController($scope, blockUI, dialogs, settingsService, dataService, userService, configService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'SuspendController';

        activate();

        function activate() {
            $scope.Customer = userService.getCustomer();
            $scope.Settings = configService.getProfile();
            $scope.Cancellation = { Comments: '' };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                minDate: moment(),
                maxDate: moment().add(3, 'months')
            };

            $scope.dateFormat = $scope.Settings.General["Data Formats"]["Date Format"].toLowerCase().split("m").join("M"); // Lowercase, then replace all m to M.

            $scope.scheduleCancellation = function () {
                dataService.route.saveCancellation($scope.Cancellation).then(function (data) {
                    if (!data.Failed) {
                        dialogs.notify('Success', 'Your temporary suspension of service has been scheduled from ' + moment($scope.Cancellation.FromDate).format('MM-DD-YYYY') + ' to ' + moment($scope.Cancellation.ToDate).format('MM-DD-YYYY') + '.');
                        $scope.cancellationForm.$setPristine();
                        $scope.Cancellation = { FromDate: null, ToDate: null, Comments: '' };
                    } else {
                        dialogs.error('Error', 'Your suspension was not able to be scheduled. Please try again.');
                    }
                });
            };

            $scope.pendingSuspensions = function () {
                dataService.route.getPendingCancellations().then(function (data) {
                    if (!data.Failed) {
                        var dlg = dialogs.create(settingsService.path + 'Components/Dialogs/Suspensions.html', 'SuspensionsController', data.ReturnObject);
                    } else {
                        dialogs.error('Error', 'Unable to display pending suspensions.');
                    }
                });
            };
        };
    };
})();