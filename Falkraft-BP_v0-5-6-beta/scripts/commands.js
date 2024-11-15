import { GameMode, system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

/**
 * Deprecated: We are using Scythe anticheat to use the report command.
 * @param {import("@minecraft/server").ChatSendBeforeEvent} msg 
 * @returns {import("@minecraft/server-ui").ActionFormData} 
 */
/*async function reportUI(msg) {
    const players = world.getAllPlayers().sort((a, z) => a.name.toLowerCase()[0] - z.name.toLowerCase()[0]);
    const reportForm = new ActionFormData;
    reportForm.title({ translate: `§lReport a Player\n§r§8§o${players.length} player(s) online` })
    .body("§lReport a Player");
    for (const player of players) {
        reportForm.button(player.name);
    }
    reportForm.show(msg.sender).then(
        (response) => {
            if (response.selection !== undefined) {
                const reportedPlayer = players[response.selection];
                //world.sendMessage({translate: ` To all admins, §c${reportedPlayer.name} was reported!`});
                msg.sender.runCommand(`tell @a[tag=op] §c${reportedPlayer.name} was reported!`);
                for (const player of players) {
                    if (player.isOp()) {
                        msg.sender.sendMessage({ translate: `§c${reportedPlayer.name} was reported!` });
                        //msg.sender.runCommand(`tell ${player.name} ${reportedPlayer.name} was reported!`);
                    }
                }
                msg.sender.sendMessage({ translate: `Sucessfully reported ${reportedPlayer.name}` });
                //msg.sender.sendMessage(`Sucessfully reported ${reportedPlayer.name}`);
            }
        }
    );
}*/

/**
 * @param {import("@minecraft/server").Player} player 
 * @param {import("@minecraft/server").GameMode} gamemode 
 */
export async function gamemodeSet(player, gamemode) {
    player.setGameMode(gamemode);
}

/**
 * Deprecated: We are using Scythe anticheat to use the vanish command.
 * @param {import('@minecraft/server').Player} player 
 * @returns {void} none
 */
/*async function vanish(player) {
    if (player.isOp()) {
        const previousgamemode = player.getGameMode();
        if (player.getGameMode() == GameMode.spectator) {
            player.setGameMode(previousgamemode);
            world.sendMessage({translate: `§e${player.name} joined the game`});
            //player.runCommand(`tellraw @a {"rawtext":[{"text":"§e${player.name} joined the game"}]}`);
        } else {
            player.setGameMode(GameMode.spectator);
            world.sendMessage({translate: `§e${player.name} left the game`});
            //player.runCommand(`tellraw @a {"rawtext":[{"text":"§e${player.name} left the game"}]}`);
        }
    }
}*/

export function commands() {
    world.beforeEvents.chatSend.subscribe(
        (msg) => {
            switch (msg.message.toLowerCase()) {
                /*case ".tps":
                    msg.cancel = true;
                    msg.sender.runCommandAsync("gamerule dodaylightcycle true");
                    const currentTicks = world.getAbsoluteTime();
                    system.runTimeout(
                        () => {
                            const ticksSinceTimeReset = world.getAbsoluteTime();
                            const tps = ticksSinceTimeReset - currentTicks;
                            msg.sender.sendMessage(`The tps is ${tps}.`);
                            msg.sender.runCommandAsync("gamerule dodaylightcycle false");
                        }, 20
                    );
                    break;*/
                case ".gmc":
                    if (msg.sender.isOp()) {
                        system.run(
                            async () => {
                                msg.cancel = true;
                                //msg.sender.setGameMode(GameMode.creative);
                                await gamemodeSet(msg.sender, GameMode.creative);
                            }
                        );
                    }
                    break;
                case ".gms":
                    if (msg.sender.isOp()) {
                        system.run(
                            async () => {
                                msg.cancel = true;
                                //msg.sender.setGameMode(GameMode.survival);
                                await gamemodeSet(msg.sender, GameMode.survival);
                            }
                        );
                    }
                    break;
                case ".gmsp":
                    if (msg.sender.isOp()) {
                        system.run(
                            async () => {
                                msg.cancel = true;
                                //msg.sender.setGameMode(GameMode.spectator);
                                await gamemodeSet(msg.sender, GameMode.spectator);
                            }
                        );
                    }
                    break;
                case ".gma":
                    if (msg.sender.isOp()) {
                        system.run(
                            async () => {
                                msg.cancel = true;
                                //msg.sender.setGameMode(GameMode.adventure);
                                await gamemodeSet(msg.sender, GameMode.adventure);
                            }
                        );
                    }
                    break;
                case ".kits":
                    msg.cancel = true;
                    system.run(
                        async () => {
                            const kits = new ActionFormData();
                            await kits.title("§lChoose one of our built-in kits.")
                            .body({translate: "§lKits§r:\n\t-§eNodebuff§r - Contains: potions, diamond armour and sword, golden carrots, and ender pearls.\n\t-§eCrystals§r - Contains: end crytals, obsidian, diamond pickaxe, netherite armour and sword, and enchanted golden apples.\n\t-§eTank§r - Contains: potions of turtle master, enchanted golden apples, totems, netherite armour, and an iron sword.\n\t-§eGlass Cannon§r - Contains: iron armour, netherite sword, harming splash potions, strength, speed and jump boost effects."})
                            .button({translate: "Nodebuff"})
                            .button({translate: "Crystals"})
                            .button({translate: "Tank"})
                            .body({translate: "Glass Cannon"})
                            .show(msg.sender).then(
                                (response) => {
                                    if (response.canceled) return;
                                    switch (response.selection) {
                                        case 0:
                                            msg.sender.runCommand("function kits/nodebuff");
                                            break;
                                        case 1:
                                            msg.sender.runCommand("function kits/crystal");
                                            break;
                                        case 2:
                                            msg.sender.runCommand("function kits/tank");
                                            break;
                                        case 3:
                                            msg.sender.runCommand("function kits/glassCannon");
                                            break;
                                        default: break;
                                    }
                                }
                            );
                        }
                    );
                    break;
                default: break;
            }
        }
    );
}