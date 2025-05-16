## Sneak Detection
### Mark as not sneaking
execute as @a at @s if entity @s[y=~1.5, dy=0] run scoreboard players set @s wiki:q.is_sneaking 0
### Mark as sneaking
execute as @a at @s unless entity @s[y=~1.5, dy=0] if entity @s[y=~0.7, dy=0] run scoreboard players add @s wiki:q.is_sneaking 1

## Your Commands Here (Examples)