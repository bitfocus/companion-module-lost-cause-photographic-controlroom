var osa = require('osa')

module.exports = function (controllerName, pin) {
	const controlRoom = Application('ControlRoom');

	controlRoom.includeStandardAdditions = true;

	var ctlr = undefined;

	if (controllerName == '') {
		ctlr = controlRoom.controllers[0];
	} else {
		ctlr = controlRoom.controllers.byId(controllerName);
	}

	controlRoom.toggle(ctlr, { pin: pin });

	return { name: ctlr.name(), state: ctlr.state() };
}
