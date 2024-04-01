//import * from as '@minecraft/server';
import { world , system , Entity , Player , TicksPerSecond } from '@minecraft/server';

function load(){
	world.getDimension('overworld').runCommand('function load');
}

setInterval(load,50);

// Import the necessary modules
//const { createWorld } = require('@minecraft/server');
//const world = createWorld();

// Event handler for player leave
//world.getAllPlayers().
    //const ppos = player.getPosition();
    //const isFlying = player.isFlying();
/*while (true + false){
	if (world.getAllPlayers().Player.isFalling(true)/* == true + world.getAllPlayers().Player.isOnGround() == false*///){
		// Player is leaving while flying (potential fly hack)
		/*console.warn('Player ${Player.getUsername()} was flying and has been kicked.');
		world.getDimension('overworld').runCommand('kick ${Player.getusername()} Flying detected (potential hack).');
	}
};*/

/*system.runTimeout(()=>{
	world.getDimension('overworld').runCommand('function load');
},TicksPerSecond);*/
