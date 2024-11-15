import { EntityComponentTypes, EntityDamageCause, world } from "@minecraft/server";

export function customkb() {

    /// KnockBack Strength
    const kbX = 0.25;
    const kbY = 0.33;

    world.afterEvents.entityDie.subscribe(
        (data) => {
            if (data.deadEntity.typeId != "minecraft:player" && data.damageSource.damagingEntity.typeId != "minecraft:player") {
                world.sendMessage(`§e${data.deadEntity.typeId}§r died to §e${data.damageSource.damagingEntity.typeId}§r`);
            } else if (data.deadEntity.typeId != "minecraft:player" && data.damageSource.damagingEntity.typeId == "minecraft:player") {
                world.sendMessage(`§e${data.deadEntity.typeId}§r died to §e${data.damageSource.damagingEntity.nameTag}§r`);
            }
        }
    );

    world.afterEvents.entityHurt.subscribe(
        (
            {
                hurtEntity,
                damageSource,
                damage
            }
        ) => {
            if (!damageSource.damagingEntity) return;
            const entityName = hurtEntity.nameTag;
            const currentHealth = hurtEntity.getComponent(EntityComponentTypes.Health).currentValue

            const hitloc = damageSource.damagingEntity.location;
            const beinghitloc = hurtEntity.location;
            const direction = {
                x: beinghitloc.x - hitloc.x,
                y: beinghitloc.y - hitloc.y,
                z: beinghitloc.z - hitloc.z
            };
            const magnitude = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
            const newdir = {
                x: direction.x / magnitude,
                z: direction.z / magnitude
            };

            switch (damageSource.cause) {
                case EntityDamageCause.entityAttack:
                    hurtEntity.applyKnockback(newdir.x, newdir.z, kbX, kbY);
                    damageSource.damagingEntity.addEffect(
                        "weakness",
                        9, {
                            showParticles: false,
                            amplifier: 255
                        }
                    );
                    if (hurtEntity.typeId != "minecraft:player") {
                        damageSource.damagingEntity.runCommand(`tellraw @s {"rawtext":[{"translate": "You dealt §c${damage}§r HP of damage to §e${hurtEntity.typeId}§r and is on §c${currentHealth}§r HP!"}]}`);
                    } else {
                        damageSource.damagingEntity.runCommand(`tellraw @s {"rawtext":[{"translate": "§e${entityName}§r is on §c${currentHealth}§r HP!"}]}`);
                    }
                    break;
                case EntityDamageCause.projectile:
                    hurtEntity.applyKnockback(newdir.x, newdir.z, kbX, kbY);
                    hurtEntity.runCommand("playsound random.orb");
                    if (hurtEntity.typeId != "minecraft:player") {
                        damageSource.damagingEntity.runCommand(`tellraw @s {"rawtext":[{"translate": "You dealt §c${damage}§r HP of damage to §e${hurtEntity.typeId}§r and is on §c${currentHealth}§r HP!"}]}`);
                    } else {
                        damageSource.damagingEntity.runCommand(`tellraw @s {"rawtext":[{"translate": "§e${entityName}§r is on §c${currentHealth}§r HP!"}]}`);
                    }
                    break;
                case EntityDamageCause.sonicBoom:
                    hurtEntity.applyKnockback(newdir.x, newdir.z, (kbX * 10), (kbY * 10));
                    break;
                case EntityDamageCause.blockExplosion:
                    hurtEntity.applyKnockback(newdir.x, newdir.z, (kbX * 15), (kbY * 15));
                    break;
                case EntityDamageCause.entityExplosion:
                    hurtEntity.applyKnockback(newdir.x, newdir.z, (kbX * 20), (kbY * 20));
                    break;
                default: break;
            }
        }
    );

    world.afterEvents.entityHitEntity.subscribe(
        (data) => {
            if (data.damagingEntity.hasTag("combohit")) {
                data.damagingEntity.setDynamicProperty("strength", 1);
                const strength = data.damagingEntity.getDynamicProperty("strength");
                ++strength;
                data.hitEntity.applyDamage(
                    1, {
                        cause: EntityDamageCause.entityAttack
                    }
                );
                data.damagingEntity.addEffect(
                    "strength",
                    5, {
                        showParticles: false,
                        amplifier: strength
                    }
                );
            } else {
                const hitloc = data.damagingEntity.location;
                const beinghitloc = data.hitEntity.location;
                const direction = {
                    x: beinghitloc.x - hitloc.x,
                    y: beinghitloc.y - hitloc.y,
                    z: beinghitloc.z - hitloc.z
                };
                const magnitude = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
                const newdir = {
                    x: direction.x / magnitude,
                    z: direction.z / magnitude
                };
                data.hitEntity.applyKnockback(newdir.x, newdir.z, 0, 0);
                if (data.damagingEntity.getEffect("weakness")) {
                    data.damagingEntity.runCommand("effect @s weakness 0 0 true");
                }
            }
        }
    );
}
