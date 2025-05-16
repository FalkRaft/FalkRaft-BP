## Sleep Detection
### Mark as not sleeping
execute as @a at @s if entity @s[y=~0.3, dy=0] scoreboard players set @s wiki:q.is_sleeping 0
### Mark as sleeping
execute as @a at @s unless entity @s[y=~0.3, dy=0] run scoreboard players add @s wiki:q.is_sleeping 1

## Your Commands Here (Examples)