## Set Player States
### Not gliding
execute as @a at @s if entity @s[y=~0.7, dy=0] run scoreboard players set @s wiki:q.is_gliding 0
### Not crawling
execute as @a at @s if entity @s[y=~0.7, dy=0] run scoreboard players set @s wiki:q.is_crawling 0
### Not swimming
execute as @a at @s if entity @s[y=~0.7, dy=0] run scoreboard players set @s wiki:q.is_swimming 0

## Detect Player States
### Gliding
execute as @a[hasitem={item=elytra,location=slot.armor.chest}] at @s unless entity @s[y=~0.7,dy=0] if entity @s[y=~0.3,dy=0] if block ~~1.01~ air if block ~~-0.01~ air rotated ~ 0 if block ^^1.01^-1 air if block ^^-0.01^-1 air if block ^^1.01^1 air if block ^^-0.01^1 air run scoreboard players add @s wiki:q.is_gliding 1
### Crawling
execute as @a[scores={wiki:q.is_gliding=0}] at @s unless entity @s[y=~0.7,dy=0] if entity @s[y=~0.3,dy=0] unless block ~~~ water unless block ~~1.01~ water run scoreboard players add @s wiki:q.is_crawling 1
### Swimming
execute as @a[scores={wiki:q.is_gliding=0,wiki:q.is_crawling=0}] at @s unless entity @s[y=~0.7, dy=0] if entity @s[y=~0.3,dy=0] run scoreboard players add @s wiki:q.is_swimming 1

## Your Commands Here (Examples)