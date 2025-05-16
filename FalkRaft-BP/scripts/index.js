import * as oldmc from "mojang-minecraft";

const world = oldmc.world;

world.events.tick.subscribe(data => {
    const dimensions = {
        overworld: world.getDimension("overworld"),
        nether: world.getDimension("nether"),
        end: world.getDimension("the_end")
    };
    dimensions.overworld.runCommand("function main");
    dimensions.nether.runCommand("function main");
    dimensions.end.runCommand("function main");
    if (data.currentTick % 100 == 0) {
        console.error(`Tick: ${data.currentTick}\tDeltaTime: ${data.deltaTime}`);
        dimensions.overworld.runCommand(`say Tick: ${data.currentTick}\tDeltaTime: ${data.deltaTime}`);
        dimensions.nether.runCommand(`say Tick: ${data.currentTick}\tDeltaTime: ${data.deltaTime}`);
        dimensions.end.runCommand(`say Tick: ${data.currentTick}\tDeltaTime: ${data.deltaTime}`);
    }
    const players = world.getPlayers();
    for (const player of players) {
        const horizontalSpeed = player.velocity.x + player.velocity.z;
        player.removeTag("moving");
        player.removeTag("walking");
        player.removeTag("sprinting");
        player.removeTag("sneaking");
        if (horizontalSpeed * 20 < 0 || horizontalSpeed * 20 > 0) player.addTag("moving");
        if (horizontalSpeed * 20 < 4.2 || horizontalSpeed * 20 > -4.2) player.addTag("walking");
        if (horizontalSpeed * 20 < 5.5 || horizontalSpeed * 20 > -5.5) player.addTag("sprinting");
        if (player.isSneaking) player.addTag("sneaking");
    }
});

world.events.entityHit.subscribe(data => {
    const hitloc = data.entity.location;
    const beinghitloc = data.hitEntity.location;
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
    let KBStrength = 0.5;
    if (data.entity.hasTag("sprinting")) KBStrength += 1.05;
    data.hitEntity.setVelocity({x: newdir.x * KBStrength, y: KBStrength, z: newdir.z * KBStrength});
    data.entity.runCommand("playsound note.bell @s ~~~ 0.1");
});