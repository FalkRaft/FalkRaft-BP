import { world, system, EntityDamageCause } from "@minecraft/server";

system.runInterval(() => {
    const players = world.getAllPlayers().filter(player => player.isValid);
    world.getDimension("overworld").runCommand("function main");
    world.getDimension("nether").runCommand("function main");
    world.getDimension("the_end").runCommand("function main");
    for (i = 0; i < players.length; i++) {
        const player = players[i];
        player.removeTag("is_onGround");
        player.removeTag("is_jumping");
        player.removeTag("is_flying");
        player.removeTag("is_falling");
        if (player.isOnGround) {
            player.addTag("is_onGround");
        }
        if (player.isJumping) {
            player.addTag("is_jumping");
        }
        if (player.isFlying) {
            player.addTag("is_flying");
        }
        if (player.isFalling) {
            player.addTag("is_falling");
        }
    }
});

world.afterEvents.entityHurt.subscribe((
    {
        hurtEntity,
        damageSource
    }) => {
    switch (damageSource.cause) {
        case EntityDamageCause.entityAttack: {
            const hitloc = damageSource.damagingEntity.location;
            const beinghitloc = hurtEntity.location;
            const direction = {
                x: beinghitloc.x - hitloc.x,
                y: beinghitloc.y - hitloc.y,
                z: beinghitloc.z - hitloc.z
            };
            const magnitude = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.z, 2));
            const newdir = {
                x: direction.x / magnitude,
                z: direction.z / magnitude
            };
            hurtEntity.applyKnockback(newdir.x, newdir.z, 0.5, 0.5);
        }
        case EntityDamageCause.projectile: {
            damageSource.damagingEntity.runCommand("playsound note.bell @s ~~~ 0.25");
        }
        default: {
            /// To prevent client-server desync when standing on top of a boat or falsely flying with an elytra.
            hurtEntity.applyKnockback(0, 0, 0, -63);
        }
    }
});