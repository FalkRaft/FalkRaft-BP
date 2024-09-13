import { world, system } from '@minecraft/server';
import { commands } from './commands.js';

/// Other Variables
// world.scoreboard.removeObjective("lcps");
// world.scoreboard.removeObjective("rcps");

// world.scoreboard.addObjective("lcps", "Attack CPS: ");
// world.scoreboard.addObjective("rcps", "Place CPS: ");

// let lcps = 0;
// let rcps = 0;

/// Other Functions
// function isPlayerNotInServer(playerName) {
//     const players = world.getPlayers();
//     players.forEach(
//         (player) => {
//             if (player.name === playerName) {
//                 return false; // Player is in the server
//             }
//         }
//     )
//     return true; // Player is not in the server
// }

/// Server Titles
export const serverChatTitle = "§a[§cFalk§bRaft§a]§r";
export const serverConsoleTitle = "[FalkRaft]";

/// Flag Variables
//if (world.scoreboard.getObjectives() == ["total_FLAGS", "FLY_FLAGS"]) {
world.scoreboard.removeObjective("TOTAL_FLAGS");
world.scoreboard.removeObjective("FLY_FLAGS");
//} else {
world.scoreboard.addObjective("TOTAL_FLAGS", "TOTAL_FLAGS");
world.scoreboard.addObjective("FLY_FLAGS", "FLY_FLAGS");
//}
// let tflags = 0; /// Total Flags
// let flyflags = 0; /// Fly Flags

// To prevent watchdog terminations in case something goes wrong.
system.beforeEvents.watchdogTerminate.subscribe(
    (terminateReason) => {
        cancel = true;
        world.sendMessage(`${serverChatTitle} A watchdog terminate event was successfully canceled. Terminate reason: ${terminateReason}`);
    }
);

function load() {
    world.setDynamicProperty("defaultname", "FalkRaft");
    system.runInterval(
        () => {
            let players = world.getAllPlayers();
            players.forEach(
                (player) => {
                    player.runCommand("function load");
                    player.setDynamicProperty("velocity", player.getVelocity());
                }
            );
        }, 0
    );
}

world.afterEvents.entityLoad.subscribe(
    (data) => {
        const projectile = data.entity;
        if (projectile.getComponent("projectile")) {
            const thrower = projectile.getComponent("projectile").owner;
            if (thrower && thrower.id === "minecraft:player") {
                const playerVel = thrower.getVelocity();
                const projVel = projectile.getVelocity();
                projectile.applyImpulse(
                    {
                        x: (projVel.x + playerVel.x) * 2,
                        y: (projVel.y + playerVel.y) * 2,
                        z: (projVel.z + playerVel.z) * 2
                    }
                )
            }
        }
    }
)

/// Player Join Message
/**
 * @deprecated This behaviour is deprecated because we're using Scythe anticheat to display a message when a player joins.
 */
// world.afterEvents.playerSpawn.subscribe(
//     () => {
//         let players = world.getAllPlayers();
//         players.forEach(
//             (player) => {
//                 if (player.hasTag("hub")) {
//                     player.runCommand("tell @s Welcome to §l§cFalk§bRaft§r! This is the place where you can play games and earn rewards!\n");
//                     if (player.isOp() && player.isOp()) {
//                         player.runCommand("tell @s §l§eMake sure education features and beta api features are enabled!");
//                     }
//                 }
//             }
//         )
//     }
// );

/// Custom Commands
commands();

// world.afterEvents.entityHitEntity.subscribe(
//     () => {
//         let players = world.getAllPlayers();
//         players.forEach(
//             (player) => {
//                 player.runCommand("scoreboard players add @s lcps 1");
//                 lcps += 1;
//                 if (lcps > 15) {
//                     player.addEffect(
//                         "weakness",
//                         60, {
//                             amplifier: 255,
//                             showParticles: false
//                         }
//                     );
//                 }
//                 system.waitTicks(20);
//                 player.runCommand("scoreboard players remove @s lcps 1");
//                 lcps -= 1;
//             }
//         );
//     }
// );

// world.afterEvents.playerPlaceBlock.subscribe(
//     () => {
//         let players = world.getAllPlayers();
//         players.forEach(
//             (player) => {
//                 player.runCommand("scoreboard players add @s rcps 1");
//                 rcps += 1;
//                 if (rcps > 15) {
//                     player.runCommand("ability @s worldbuilder false");
//                 } else {
//                     player.runCommand("ability @s worldbuilder true");
//                 }
//                 system.waitTicks(20);
//                 player.runCommand("scoreboard players remove @s rcps 1");
//                 rcps -= 1;
//             }
//         );
//     }
// );

load();
anticheat();

console.info(`${serverConsoleTitle} Script loaded successfully!`);
world.sendMessage(`${serverChatTitle} Script loaded successfully!`);
