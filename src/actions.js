var osa = require('osa')

const TogglePin = require('./control_room/toggle_pin')
const SetState = require('./control_room/set_state')

module.exports = function (self) {
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
					type: 'dropdown', //type: 'textinput',
					label: 'Controller',
					default: '',
					choices: self.availableControllers,
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
				},
			],
			callback: (action, context) => {
				self.log('info', 'Toggle! ' + action.options.controller + ' pin ' + action.options.gpipin)

				osa(TogglePin, action.options.controller, action.options.gpipin, responseHandler)
			},
		},
		all_off: {
			name: 'All Off',
			description: 'Turn off all pins on a controller.',
			options: [
				{
					id: 'controller',
					type: 'dropdown',
					label: 'Controller',
					default: '',
					choices: self.availableControllers,
				},
			],
			callback: (action, context) => {
				self.log('info', 'All Off! ' + action.options.controller)

				osa(SetState, action.options.controller, 0, responseHandler)
			},
		},
	})
}
