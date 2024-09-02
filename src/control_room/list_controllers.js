var osa = require('osa')

const UpdateActions = require('../actions')

module.exports = function (self) {
	function script() {
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
			self.log('info', 'There are ' + result.length + ' controllers available')

			console.log(result)

			self.availableControllers = result
			UpdateActions(self)
		}
	}

	osa(script, responseHandler)

}
