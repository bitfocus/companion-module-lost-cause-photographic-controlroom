var osa = require('osa')

module.exports = function (controllerName, newState) {
	const controlRoom = Application('ControlRoom');

	controlRoom.includeStandardAdditions = true;

	var ctlr = undefined;

	if (controllerName == '') {
		ctlr = controlRoom.controllers[0];
	} else {
		ctlr = controlRoom.controllers.byId(controllerName);
	}

	var oldState = ctlr.state();

	ctlr.state = newState;

	return { name: ctlr.name(), state: newState, oldState: oldState };
}
