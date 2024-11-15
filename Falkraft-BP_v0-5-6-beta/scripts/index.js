import { world, system, EntityComponentTypes, Player, Entity } from '@minecraft/server';
import { ActionFormData, FormCancelationReason } from '@minecraft/server-ui';
import { commands } from './commands.js';
import { customkb } from './kb.js';
import { SpawnProtection } from "./anticheat/spawnprot.js";
//import { mcbe } from "./class.js";

export async function getTimeOfDay() {
    return Date.now();
}

export async function getGameTime() {
    return world.getAbsoluteTime();
}

/// Server Titles
export const serverChatTitle = "§l§a[§cFalk§bRaft§a]§r";
export const serverConsoleTitle = "[FalkRaft]";

system.afterEvents.scriptEventReceive.subscribe(
    (data) => {
        switch (data.id.toLocaleLowerCase() + data.message.toLocaleLowerCase()) {
            case "falkraft:reload" + "":
                data.initiator.runCommand("reload");
                break;
            case "falkraft:reload" + "all":
                data.initiator.runCommand("reload all");
            case "falkraft:getpos" + "":
                data.initiator.runCommand(`tellraw @s {"rawtext":[{"text":"${data.initiator.location.x} ${data.initiator.location.y} ${data.initiator.location.z}"}]}`);
            case "falkraft:getpos" + "allplayers":
                for (const player of world.getAllPlayers()) {
                    data.initiator.runCommand(`tellraw ${data.initiator.nameTag} {"rawtext":[{"text":"${player.location.x} ${player.location.y} ${player.location.z}"}]}`);
                }
                data.initiator.runCommand(`tellraw @s {"rawtext":[{"text":"${data.initiator.location.x} ${data.initiator.location.y} ${data.initiator.location.z}"}]}`);
            default:
                data.initiator.runCommand(`tellraw @s {"rawtext":[{"translate":"§cThe following id: §e${data.id}§r§c, did not correspond to one of the actions."}]}`);
                break;
        }
    }
);

// To prevent watchdog terminations in case something goes wrong.
system.beforeEvents.watchdogTerminate.subscribe(
    (terminateReason) => {
        system.run(
            () => {
                terminateReason.cancel = true;
                world.sendMessage(`${serverChatTitle} A watchdog terminate event was successfully canceled. Terminate reason: ${terminateReason}`);
                console.warn(`${serverChatTitle} A watchdog terminate event was successfully canceled. Terminate reason: ${terminateReason}`);
            }
        );
    }
);

world.afterEvents.worldInitialize.subscribe(
    () => {
        world.clearDynamicProperties();
    }
);

function load() {
    system.runInterval(
        () => {
            const players = world.getAllPlayers();
            //world.getDimension("overworld").runCommand("function load");
            //world.getDimension("nether").runCommand("function load");
            //world.getDimension("the_end").runCommand("function load");
            for (const player of players) {
                player.setDynamicProperty("velocity", player.getVelocity());
                player.setDynamicProperty("viewdirection", player.getViewDirection());
                player.runCommand("execute as @e[type=item,r=5] at @s run tp @s @s");

                //const inventory = player.getComponent(EntityComponentTypes.Inventory);
                const selectedSlot = player.getComponent(EntityComponentTypes.Inventory).container.getSlot(player.selectedSlotIndex);
                const item = selectedSlot.getItem();

                if (player.isOp()) {
                    player.addTag("op");
                }

                // if (
                //     !player.isOp() 
                //     && item.typeId == "minecraft:command_block" 
                //     || item.typeId == "minecraft:repeating_command_block" 
                //     || item.typeId == "minecraft:chain_command_block" 
                //     || item.typeId == "minecraft:command_block_minecart"
                // ) {
                //     selectedSlot.setItem("minecraft:air");
                // }
            }
        }, 0
    );
}

/**
 * @param {Player} player
 * @param {Entity} entity 
 * @returns {void} none
*/
function entitySpawnActions(entity = undefined, player = undefined) {
    if (player.typeId == "minecraft:player" || entity.typeId == "minecraft:player") {
        player.clearDynamicProperties();
        player.setDynamicProperty("deviceType", player.clientSystemInfo.platformType);
        player.setDynamicProperty("maxRenderDistance", player.clientSystemInfo.maxRenderDistance);
        player.setDynamicProperty("memoryTier", player.clientSystemInfo.memoryTier);
    } else {
        entity.clearDynamicProperties();
    }
}

world.afterEvents.entitySpawn.subscribe(
    (data) => {
        const entity = data.entity;
        if (data.entity.typeId == "minecraft:player") {
            const player = data.entity;
            entitySpawnActions(player);
        } else {
            entitySpawnActions(entity);
        }
    }
);

world.afterEvents.entityLoad.subscribe(
    (data) => {
        const entity = data.entity;
        if (entity.typeId == "minecraft:player") {
            const welcomeui = new ActionFormData;
            welcomeui.title(`Welcome to ${serverChatTitle}!`).body(`\tThis is where you can play our minigames and have fun!`)
            .show(entity).then(
                (response) => {
                    if (response.cancelationReason == FormCancelationReason.UserClosed) {
                        entity.sendMessage("§cYou have exited the UI.");
                    }
                }
            );
        }
    }
);

/// Anti-gamemode
world.beforeEvents.playerGameModeChange.subscribe(
    (data) => {
        if (!data.player.isOp()) {
            data.cancel = true;
        }
    }
);

/// Anti-nuker
const worldSpawn = {
    x: world.getDefaultSpawnLocation().x,
    y: world.getDefaultSpawnLocation().y,
    z: world.getDefaultSpawnLocation().z
};
const coords1 = {
    x: worldSpawn.x - 128,
    y: worldSpawn.y - 128,
    z: worldSpawn.z - 128
};
const coords2 = {
    x: worldSpawn.x + 128,
    y: worldSpawn.y + 128,
    z: worldSpawn.z + 128
};
SpawnProtection(coords1, coords2, ["op, admin"]);

world.afterEvents.entityDie.subscribe(
    (data) => {
        data.damageSource.damagingEntity.addEffect(
            "regeneration",
            20, {
                showParticles: true,
                amplifier: 8
            }
        );
        data.deadEntity.teleport(
            {
                x: 0,
                y: 0,
                z: 0
            }
        );
    }
);

/// Custom Commands
commands();

/// Load necessary function files.
load();

/// Custom KB
customkb();

console.log(`${serverConsoleTitle} Script loaded successfully!`);
world.sendMessage(`${serverChatTitle} Script loaded successfully!`);
