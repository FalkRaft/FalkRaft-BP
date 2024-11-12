# clear illegal items without the 'admin' tag
execute as @a at @s if entity @s [tag=!op, tag=!admin, hasitem={item=command_block, item=repeating_command_block, item=chain_command_block, item=command_block_minecart, item=structure_block,item=jigsaw, item=structure_void, item=spawn_egg, item=border_block}] run clear @s [tag=!admin, hasitem={item=command_block, item=repeating_command_block, item=chain_command_block, item=command_block_minecart, item=structure_block, item=jigsaw, item=structure_void, item=spawn_egg, item=border_block}]

# report any players with the 'report' tag without the 'admin' tag to staff/admins
execute if entity @a [tag=report, tag=!admin] as @a [tag=report, tag=!admin] at @s run tellraw @a[tag=admin] {"rawtext":[{"text":"[FalkRaft] Player: §e"},{"selector":"@a[tag=report]"},{"text":"§r, is §chacking§r! Please go through their anticheat logs, inspect them and ban them if they are hacking!"}]}

function varfuncs/isAirborne

## anti gamemode
# execute if entity @a [
#     tag=!admin,
#     m=!c
# ] run gamemode default @a [
#     tag=!admin,
#     m=!c
# ]

## Anti CBE
# kill any command block minecarts and NPCs around any player without the tag 'admin' and 'op'
execute as @a at @s if entity @s[tag=!op, tag=!admin] run kill @e[type=command_block_minecart,r=6]
execute as @a at @s if entity @s[tag=!op, tag=!admin] run kill @e[type=npc,r=6]
