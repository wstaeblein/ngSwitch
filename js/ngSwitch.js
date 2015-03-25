(function() {

    var app = angular.module('ngSwitch', []);

	app.directive('switch', function(){
		return {
			restrict: 'E',
			replace: true,
			transclude: false,
			scope: { value: '=' },
			template: '<div class="ngswitch" ng-click="toggle()">' +
					  '<span></span>' +
					  '<div><span></span></div>' +
					  '</div>',
			compile: function(element, attrs) {
				// Valores default
				attrs.showtext = attrs.showtext || '1';
				attrs.colors = attrs.colors || 'green|#BABABA';
				attrs.ontext = (attrs.ontext || 'ON').replace(' ', ' ');
				attrs.speed = attrs.speed || '200';

				$('div > span', element).css('backgroundColor', attrs.colors.split('|')[1]);
				$('> span', element).text(attrs.ontext);

				element.width(22 + $('> span', element).width());

				return function(scope, element, attrs) { 
					
					// Função para ligar / desligar o switch
					var setSwitch = function(Status) {
						var speed = parseInt(attrs.speed, 10);
						var obj = $('div', element);
						
						if (scope.value == true) {
							// Liga
							if (attrs.showtext == '1') { $('> span', element).show(); }
							obj.animate({ left: (element.width() - 16) + 'px' }, speed, function() { 
								$('span', obj).css('backgroundColor', attrs.colors.split('|')[0]);
							});

						} else {
							// Desliga
							obj.animate({ left: '1px' }, speed, function() { 
								$('span', obj).css('backgroundColor', attrs.colors.split('|')[1]);	
								if (attrs.showtext == '1') { $('> span', element).hide(); }							
							});
						}					
					}

					scope.$watch('value', function(newval) { setSwitch(newval); });
					
					// Responde ao click no switch
					scope.toggle = function() {  
						scope.value = !scope.value;
					}
				}
			}
		}
	});
} ());