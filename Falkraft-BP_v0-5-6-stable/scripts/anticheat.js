import { world, system } from "@minecraft/server";

export function anticheat() {
    let players = world.getAllPlayers();
    players.forEach(
        (player) => {
            system.runInterval(
                () => {
                    /**
                     * We are using Scythe anticheat for the anticheat detection.
                     * We are doing this to save on development time and have a wider range of anticheat detection.
                     */
                    player.setDynamicProperty("coords", (player.location.x, player.location.y, player.location.z));
                    if (player.getGameMode() == "creative") {
                        player.setDynamicProperty("reach", 5);
                    } else {
                        player.setDynamicProperty("reach", 3);
                    }
                }, 0
            );
        }
    );
}