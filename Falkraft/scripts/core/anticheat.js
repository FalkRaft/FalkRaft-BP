import { world } from '@minecraft/server';
import 'core/loader.js';
import 'core/optimisations.js';

//execute the function on itself
//function anticheat

//Block Anticheat
world.runCommandAsync('clear @a[tag=!admin] bedrock');
world.runCommandAsync('clear @a[tag=!admin] barrier');
world.runCommandAsync('clear @a[tag=!admin] border_block');
world.runCommandAsync('clear @a[tag=!admin] end_portal_frame');
world.runCommandAsync('clear @a[tag=!admin] spawn_egg');
world.runCommandAsync('clear @a[tag=!admin] command_block');
world.runCommandAsync('clear @a[tag=!admin] chain_command_block');
world.runCommandAsync('clear @a[tag=!admin] repeating_command_block');
world.runCommandAsync('clear @a[tag=!admin] command_block_minecart');
world.runCommandAsync('clear @a[tag=!admin] structure_block');
world.runCommandAsync('clear @a[tag=!admin] structure_void');
world.runCommandAsync('clear @a[tag=!admin] jigsaw');

// send a notification to admin when a player without admin tag holds these items
world.runCommandAsync('tag @a[tag=!admin,hasitem={item=bedrock,item=barrier,item=border_block,item=end_portal_frame,item=spawn_egg,item=command_block,item=chain_command_block,item=repeating_command_block,item=command_block_minecart,item=structure_block,item=structure_void,item=jigsaw}] add report');

// ban a player without tag admin with tag ban
world.runCommandAsync('kick @a[tag=!admin,tag=ban] cheating – cheating is prohibited on this server.');

//execute the function on itself
//function anticheat