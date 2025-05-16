## Movement Detection
### Mark as not moving
execute as @a at @s positioned ~~10000~ if entity @e[type=leash_knot,r=0.1252] run scoreboard players set @s wiki:q.is_moving 0
### Mark as moving
execute as @a at @s positioned ~~10000~ unless entity @e[type=leash_knot,r=0.1252] run scoreboard players add @s wiki:q.is_moving 1

## Walk Detection
### Mark as not walking
scoreboard players set @a wiki:q.is_walking 0
### Mark as walking
execute as @a at @s positioned ~~10000~ if entity @e[type=leash_knot,rm=0.21585,r=0.2805] run scoreboard players set @s wiki:q.is_walking 1

## Sprint Detection
### Mark as not sprinting
scoreboard players set @a wiki:q.is_sprinting 0
### Mark as sprinting
execute as @a at @s positioned ~~10000~ if entity @e[type=leash_knot, rm=0.2806,r=0.9] run scoreboard players set @s wiki:q.is_sprinting 1

## Update Point
### Delete previous point
execute as @e[type=leash_knot] at @s unless entity @s[y=-80,dy=9974] run kill @s
### Mark current point
execute at @a positioned ~~10000~ run summon leash_knot ~~~

## Your Commands Here (Examples)