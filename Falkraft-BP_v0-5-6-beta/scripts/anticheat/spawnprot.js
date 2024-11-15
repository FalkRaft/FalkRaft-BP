import { world } from "@minecraft/server";

/**
 * @param {Vector3} coords1 
 * @param {Vector3} coords2 
 * @param {string[]} tags 
 */
export function SpawnProtection(coords1 = {x: 0, y: 0, z: 0}, coords2 = {x: 0, y: 0, z: 0}, tags = ["op"]) {
    world.beforeEvents.playerBreakBlock.subscribe(
        (data) => {
            const player = data.player;

            // Check if the player has any of the specified tags
            if (tags.some(tag => player.hasTag(tag))) return;

            const playerLoc = player.location;
            const minX = Math.min(coords1.x, coords2.x);
            const maxX = Math.max(coords1.x, coords2.x);
            const minY = Math.min(coords1.y, coords2.y);
            const maxY = Math.max(coords1.y, coords2.y);
            const minZ = Math.min(coords1.z, coords2.z);
            const maxZ = Math.max(coords1.z, coords2.z);

            // Check if the player is within the protected area
            if (
                playerLoc.x >= minX && playerLoc.x <= maxX &&
                playerLoc.y >= minY && playerLoc.y <= maxY &&
                playerLoc.z >= minZ && playerLoc.z <= maxZ
            ) {
                data.cancel = true; // Cancel the block break event
                //player.sendMessage("§cYou cannot break blocks in the protected spawn area.");
            }
        }
    );
}
