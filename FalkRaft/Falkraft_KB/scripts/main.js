import {world} from "@minecraft/server";


world.afterEvents.entityHurt.subscribe(
    (
        {
            hurtEntity,
            damageSource
        }
    ) => {
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
        damageSource.damagingEntity.addEffect(
            "weakness",
            10, {
                amplifier: 255,
                showParticles: false
            }
        );
        damageSource.damagingEntity.runCommand("playsound note.bell @s ~~~ 0.25");
        hurtEntity.clearVelocity();
        hurtEntity.applyImpulse(
            {
                x: newdir.x / 4.25,
                y: 0.33,
                z: newdir.z / 4.25
            }
        );
    }
);
