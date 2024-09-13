import { world } from "@minecraft/server";

export function commands() {
    world.beforeEvents.chatSend.subscribe(
        (msg) => {
            switch (msg.message) {
                case "!ping":
                    msg.cancel = true;
                    msg.sender.sendMessage("This is a test...");
                    break;
                default: break;
            }
            // if (player.isOp() || player.hasTag("op")) {
            //     switch (message) {
            //         case config.customcommands.gmc.aliases:
            //             msg.cancel = true;
            //             player.setGameMode(GameMode.creative);
            //             player.sendMessage(`${serverChatTitle} Changed your gamemode to survival.`);
            //             break;
            //         case config.customcommands.gms.aliases:
            //             msg.cancel = true;
            //             player.setGameMode(GameMode.creative);
            //             player.sendMessage(`${serverChatTitle} Changed your gamemode to creative.`);
            //         case config.customcommands.gmsp.aliases:
            //             msg.cancel = true;
            //             player.setGameMode(GameMode.creative);
            //             player.sendMessage(`${serverChatTitle} Changed your gamemode to spectator.`);
            //         case config.customcommands.gma.aliases:
            //             msg.cancel = true;
            //             player.setGameMode(GameMode.creative);
            //             player.sendMessage(`${serverChatTitle} Changed your gamemode to adventure.`);
            //         case config.customcommands.help.aliases:
            //             msg.cancel = true;
            //             player.runCommandAsync("function cmds/helpOp");
            //         case config.customcommands.op.aliases + config.customcommands.op.arguments:
            //             msg.cancel = true;
            //             const pl = player.name;
            //             player.runCommand(`op ${pl}`);
            //         default: break;
            //     }
            // }
        }
    );
}