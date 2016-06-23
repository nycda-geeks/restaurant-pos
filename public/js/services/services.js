var services = angular.module('ngdemo.services', ['ngResource']);

services.factory('UsersFactory', function ($resource) {
    return $resource('/v1/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('UserFactory', function ($resource) {
    return $resource('/v1/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

services.factory('RolesFactory', function ($resource) {
    return $resource('/v1/roles', {}, {
        query: { method: 'GET', isArray: true }
    })
});