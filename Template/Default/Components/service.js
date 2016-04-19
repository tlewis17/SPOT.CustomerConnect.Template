﻿(function() {
    'use strict';

    angular
        .module('app')
        .service('configService', configService)
        .service('userService', userService)
        .service('dataService', dataService)
        .service('apiConfig', apiConfig);

    
    userService.$inject = [];
    apiConfig.$inject = [];
    dataService.$inject = ['$http', '$q', 'apiConfig'];
    configService.$inject = ['dataService'];

    function apiConfig() {
        this.setURL = function (url) {
            this.url = url;
        }

        this.getURL = function () {
            return this.url;
        }

        this.setSessionId = function (sessionId) {
            this.sessionId = sessionId;
        }

        this.getSessionId = function () {
            return this.sessionId;
        }

        this.setAccountKey = function (accountKey) {
            this.accountKey = accountKey;
        }

        this.getAccountKey = function () {
            return this.accountKey;
        }

        this.setPublishableId = function (publishableId) {
            this.publishableId = publishableId;
        }

        this.getPublishableId = function () {
            return this.publishableId;
        }

        this.getFileResourceUrl = function (fileName) {
            return this.getURL().replace('/q', '/g') + '?Id=' + this.getPublishableId() + '&Action=GetFileResource&Name=' + fileName
        }
    }

    function configService(dataService) {
        this.setProfile = function (profile) {
            this.profile = profile;
        }

        this.getProfile = function () {
            return this.profile;
        }

        this.setCSSPath = function (path) {
            this.CSSPath = path;
        }

        this.getCSSPath = function (path) {
            return this.CSSPath;
        }
    }
    
    function userService() {
        this.setEmail = function (email) {
            this.email = email;
        }

        this.getEmail = function () {
            return this.email;
        }

        this.setCaptchaValid = function (captchaValid) {
            this.captchaValid = captchaValid;
        }

        this.getCaptchaValid = function () {
            return this.captchaValid;
        }

        this.setPassword = function (password) {
            this.password = password;
        }

        this.getPassword = function () {
            return this.password;
        }

        this.setCustomer = function (customer) {
            this.customer = customer;
        }

        this.getCustomer = function () {
            return this.customer;
        }

        this.setMessages = function (messages) {
            this.messages = messages;
        }

        this.getMessages = function () {
            return this.messages;
        }

        this.unreadMessageCount = function () {
            var count = null;

            if (!this.messages) {
                return 0;
            }

            for (var x = 0; x < this.messages.length; x++) {
                if (this.messages[x].ReadDateTime == null) {
                    count += 1;
                }
            }

            return count;
        }
    }

    function dataService($http, $q, apiConfig) {
        // AR
        var ar = {
            getARBalance: function () {
                return (createRequest('ARBalance', null).then(handleSuccess, handleError));
            },

            getARActivity: function () {
                return (createRequest('ARCurrentActivity', null).then(handleSuccess, handleError));
            },

            getPayments: function () {
                return (createRequest('ARPaymentsDetail', null).then(handleSuccess, handleError));
            },

            getStatement: function (statementId) {
                return (createRequest('ARStatementDetail', { statementId: statementId }).then(handleSuccess, handleError));
            },

            getAllStatements: function () {
                return (createRequest('ARStatementsList', null).then(handleSuccess, handleError));
            },

            savePayment: function (cardOnFileId, cardNo, cardExp, addCardToAccount, amount) {
                return (createRequest('SavePayment', {
                    cardOnFileId: cardOnFileId, cardNo: cardNo,
                    cardExp: cardExp, addCardToAccount: addCardToAccount, amount: amount
                }).then(handleSuccess, handleError));
            }
        }

        // Customer
        var customer = {
            convertToDelivery: function () {
                return (createRequest('ConvertToDelivery', null).then(handleSuccess, handleError));
            },

            getCustomer: function () {
                return (createRequest('CustomerDetail', null).then(handleSuccess, handleError));
            },

            getGiftCards: function () {
                return (createRequest('RetrieveGiftCards', null).then(handleSuccess, handleError));
            },

            issueAward: function (award) {
                return (createRequest('IssueAward', { awardId: award }).then(handleSuccess, handleError));
            },

            notifyPickup: function (storeId, timeRequested) {
                return (createRequest('NotifyPickup', { storeId: storeId, timeRequested: timeRequested }).then(handleSuccess, handleError));
            },

            redeemGiftCard: function (giftCardNumber) {
                return (createRequest('GiftCardRedeem', { giftCardNumber: giftCardNumber }).then(handleSuccess, handleError));
            },

            retrieveGiftCardBalance: function () {
                return (createRequest('GiftCardBalance', { giftCardNumber: giftCardNumber }).then(handleSuccess, handleError));
            },

            saveCustomer: function (body) {
                return (createRequest('SaveCustomer', body).then(handleSuccess, handleError));
            },

            signupCustomer: function (body) {
                return (createRequest('Signup', body).then(handleSuccess, handleError));
            }
        }

        // Invoice
        var invoice = {
            getInvoiceDetails: function (invoiceId) {
                return (createRequest('InvoiceDetail', { invoiceId: invoiceId }).then(handleSuccess, handleError));
            },
            
            getInvoiceList: function (filterTypeId, startDate, endDate) {
                return (createRequest('InvoicesList', { filterTypeId: filterTypeId, startDate: startDate, endDate: endDate }).then(handleSuccess, handleError));
            },

            getInvoiceListGarment: function (garmentDesc, descriptor) {
                return (createRequest('InvoicesByGarment', { garmentDesc: garmentDesc, descriptor: descriptor }).then(handleSuccess, handleError));
            }
        }

        // Route
        var route = {
            getRouteDeliveryZones: function () {
                return (createRequest('GetDeliveryZones', null).then(handleSuccess, handleError));
            },

            getPendingCancellations: function () {
                return (createRequest('PendingCancellations', null).then(handleSuccess, handleError));
            },

            getPendingPickups: function () {
                return (createRequest('PendingPickups', null).then(handleSuccess, handleError));
            },

            saveCancellation: function (cancellation) {
                return (createRequest('CancellationRequest', cancellation).then(handleSuccess, handleError));
            },

            savePickup: function (pickup) {
                return (createRequest('PickupRequest', pickup).then(handleSuccess, handleError));
            }
        }

        // Settings
        var settings = {
            getNotifications: function () {
                return (createRequest('GetNotifications', null).then(handleSuccess, handleError));
            },

            getPreferences: function () {
                return (createRequest('GetPreferences', null).then(handleSuccess, handleError));
            },

            getSettings: function () {
                return (createRequest('GetSettings', null).then(handleSuccess, handleError));
            },

            getStates: function () {
                return (createRequest('GetStates', null).then(handleSuccess, handleError));
            },

            getTimeSlots: function () {
                return (createRequest('GetTimeSlots', null).then(handleSuccess, handleError));
            },

            storeJSON: function (name, json) {
                return (createRequest('StoreJSON', { name: name, json: json }).then(handleSuccess, handleError));
            },

            retrieveJSON: function (name) {
                return (createRequest('RetrieveJSON', { name: name }).then(handleSuccess, handleError));
            },

            validateCaptcha: function (response) {
                return (createRequest('ValidateCaptcha', { response: response }).then(handleSuccess, handleError));
            }
        }

        // Store
        var store = {
            getStoreList: function () {
                return (createRequest('StoreList', null).then(handleSuccess, handleError));
            }
        }

        // User
        var user = {
            changePassword: function(password) {
                return (createRequest('ChangePassword', { newPassword: password }).then(handleSuccess, handleError));
            },

            login: function(emailAddress, password) {
                return (createRequest('Login', { user: emailAddress, password: password }).then(handleSuccess, handleError));
            },

            logout: function () {
                return (createRequest('Logoff', null).then(handleSuccess, handleError));
            },

            passwordReminder: function (requestInfo) {
                return (createRequest('RememberPasswordRequest', requestInfo).then(handleSuccess, handleError));
            },

            finishPasswordReminder: function (requestInfo) {
                return (createRequest('RememberPasswordFinish', requestInfo).then(handleSuccess, handleError));
            },

            sendMessage: function (subject, body, invoiceid) {
                return (createRequest('MessageToManagerNoUser', { subject: subject, message: body, invoiceid: invoiceid }).then(handleSuccess, handleError));
            },

            getMessages: function () {
                return (createRequest('GetMessages', null).then(handleSuccess, handleError));
            },

            readMessage: function (messageId) {
                return (createRequest('ReadMessage', { messageId: messageId }).then(handleSuccess, handleError));
            },

            deleteMessage: function (messageId) {
                return (createRequest('DeleteMessage', { messageId: messageId }).then(handleSuccess, handleError));
            }

        }

        // Util
        var util = {
            getFileResource: function (fileName) {
                return (getFileResource(fileName).then(handleSuccess, handleError));
            }
        }

        // Dependency
        return ({
            ar: ar,
            customer: customer,
            invoice: invoice,
            route: route,
            settings: settings,
            store: store,
            user: user,
            util: util
        });

        function createRequest(requestType, body) {
            return ($http({
                method: 'post',
                url: apiConfig.getURL(),
                data: '{"RequestType":"' + requestType + '","AccountKey":"' + apiConfig.getAccountKey() + '","SessionID":"' + apiConfig.getSessionId() + '","Body":"' + CustomerConnect.Util.base64._encode(JSON.stringify(body)) + '","UserAgent":"' + navigator.userAgent.toString() + '"}',
                async: true,
                contentType: "application/json",
                dataType: "json",
                headers: {'Content-Type': null}
            }));
        }

        function getFileResource(fileName) {
            return ($http({
                method: 'get',
                url: apiConfig.getFileResourceUrl(fileName),
                async: true
            }))
        }

        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError(response) {
            return (response.data);
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (!angular.isObject(response.data) || !response.data.message) {
                return ($q.reject("An unknown error occurred."));
            }
            // Otherwise, use expected error message.
            return ($q.reject(response.data));
        }
        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess(response) {
            return (response.data);
        }
    }
})();