import { world , system } from "@minecraft/server";

world.beforeEvents.chatSend.subscribe((msg) => {
	const message = msg.message.toLowerCase();
	const player = message.sender;
	switch (msg.message) {
		case '/??':
			msg.cancel = true;
			player.runCommandAsync('function custom_commands/falkraftHelp');
			break;
		default: break;
	}
});
