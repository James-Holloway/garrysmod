
var IN_ENGINE = navigator.userAgent.indexOf( "Valve Source Client" ) != -1;
var IS_SPAWN_MENU = false

var App = angular.module( 'MenuApp', [ 'ngRoute', 'tranny', 'ui' ] );

App.config(function ( $routeProvider, $locationProvider, $controllerProvider, $compileProvider )
{
	$locationProvider.hashPrefix('');
	$compileProvider.aHrefSanitizationWhitelist( /^\s*(https?|s?ftp|mailto|tel|file|asset):/ );
	$compileProvider.imgSrcSanitizationWhitelist( /^\s*((https?|ftp|file|blob|asset):|data:image\/)/ );
	
	$routeProvider.when('/', { templateUrl: 'template/main.html' } );
	$routeProvider.when('/addons/', { templateUrl: 'template/addon_list.html' } );
	$routeProvider.when('/newgame/', { templateUrl: 'template/newgame.html' } );
	$routeProvider.when('/servers/', { templateUrl: 'template/servers.html' } );
	$routeProvider.when('/demos/', { templateUrl: 'template/demos.html' } );
	$routeProvider.when('/saves/', { templateUrl: 'template/saves.html' } );
	$routeProvider.when('/dupes/', { templateUrl: 'template/dupes.html' } );
} );

// This is a bit silly
App.filter( 'gamemodeFilter', function() {
	return function( inputs, searchText ) {
		if ( !searchText ) return inputs;
		searchText = searchText.toLowerCase();

		var output = [];
		angular.forEach( inputs, function( input ) {
			var found = false;
			
			if ( input.name.toLowerCase().indexOf( searchText ) != -1 ) found = true;
			if ( !found && input.info && input.info.title.toLowerCase().indexOf( searchText ) != -1 ) found = true;
			
			if ( found ) output.push( input ); 
		} );
		return output;
	};
} );

function UpdateDigest( scope, timeout )
{
	if ( !scope ) return;
	if ( scope.DigestUpdate ) return;

	scope.DigestUpdate = setTimeout( function ()
	{
		scope.DigestUpdate = 0;
		scope.$digest();

	}, timeout )
}

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
App.filter( 'startFrom', function ()
{
	return function ( input, start )
	{
		start = +start; //parse to int
		return input.slice( start );
	}
} );

function RegisterController(controllerName, constructorFunction)
{
	return App.controller(controllerName, constructorFunction);
}
