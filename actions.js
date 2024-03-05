var osa = require('osa')

module.exports = function (self) {

	function togglePin(controllerName, pin) {
		const controlRoom = Application('ControlRoom');

		controlRoom.includeStandardAdditions = true;

		var ctlr = undefined;

		if (controllerName == "") {
			ctlr = controlRoom.controllers[0];
		} else {
			ctlr = controlRoom.controllers.byId(controllerName);
		}

		controlRoom.toggle(ctlr, { pin: pin });

		return { name: ctlr.name(), state: ctlr.state() }
	}

	function setState(controllerName, newState) {
		const controlRoom = Application('ControlRoom');

		controlRoom.includeStandardAdditions = true;

		var ctlr = undefined;

		if (controllerName == "") {
			ctlr = controlRoom.controllers[0];
		} else {
			ctlr = controlRoom.controllers.byId(controllerName);
		}

		var oldState = ctlr.state();

		ctlr.state = newState;

		return { name: ctlr.name(), state: newState, oldState: oldState }
	}

	function listControllers() {
		const controlRoom = Application('ControlRoom');

		controlRoom.includeStandardAdditions = true;

		var ctlrs = [].slice.call(controlRoom.controllers());

		return ctlrs.map((c) => ({id: c.serialNumber(), label: c.name()}) );
	}

	function responseHandler(err, result, log) {
		// var stringToPrint;

		self.log('debug', 'Response Log: ' + log)

		if (err) {
			// console.error(err)
			self.log('error', 'OSA script returned error: ' + err)
		} else {
			// console.log(result)
			self.log('info', result.name + ' now has state ' + result.state)
		}
	}

	self.setActionDefinitions({
		gpi_key: {
			name: 'GPI Key',
			description: 'Toggle a GPI function.',
			options: [
				{
					id: 'controller',
					type: 'dropdown',//type: 'textinput',
					label: 'Controller',
					default: '',
					choices: self.availableControllers
				},
				{
					type: 'dropdown',
					label: 'GPI Function',
					id: 'gpipin',
					default: 1,
					choices: [
						{ id: '1', label: 'GPI Pin 1' },
						{ id: '2', label: 'GPI Pin 2' },
						{ id: '3', label: 'GPI Pin 3' },
						{ id: '4', label: 'GPI Pin 4' },
						{ id: '5', label: 'GPI Pin 5' },
						{ id: '6', label: 'GPI Pin 6' },
						{ id: '7', label: 'GPI Pin 7' },
					],
				}
			],
			callback: (action, context) => {
				self.log('info', 'Toggle! ' + action.options.controller + ' pin ' + action.options.gpipin)

				osa(togglePin, action.options.controller, action.options.gpipin, responseHandler)
			},
		},
		all_off: {
			name: 'All Off',
			description: 'Turn off all pins on a controller.',
			options: [
				{
					id: 'controller',
					type: 'dropdown',//type: 'textinput',
					label: 'Controller',
					default: '',
					choices: self.availableControllers
				},
			],
			callback: (action, context) => {
				self.log('info', 'All Off! ' + action.options.controller)

				osa(setState, action.options.controller, 0, responseHandler)
			},
		}
	})
}
