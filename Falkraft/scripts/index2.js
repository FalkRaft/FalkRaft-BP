import { world } from "@minecraft/server";
//import "./functions/start.mcfunction";

// Load the necessary modules
//const system = world/*.registerSystem*/(0, 0);

// Execute the function
/*system.executeCommand(`function start`, (commandResult) => {
    if (commandResult.error) {
        console.error(`Error executing function: ${commandResult.error}`);
    } else {
        console.log(`Function executed successfully!`);
    }
}); */

/*system.afterEvents.scriptEventReceive.subscribe((event) => {
  const {
  	id,           // returns string (wiki:test)
  	initiator,    // returns Entity
    message,      // returns string (Hello World)
    sourceBlock,  // returns Block
    sourceEntity, // returns Entity
    sourceType,   // returns MessageSourceType
  } = event;
});*/

//const player = event.data.sender;
//world.runCommandAsync('function start');

//const player = name('Minemanner1227')
//player.runCommand('function start');

import './scripts/core/loader.js';