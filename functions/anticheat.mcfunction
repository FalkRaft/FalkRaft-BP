# clear illegal items without the 'admin' tag
execute as @a at @s if entity @s[tag=!admin,hasitem={item=command_block,item=repeating_command_block,item=chain_command_block,item=command_block_minecart,item=structure_block,item=jigsaw,item=structure_void,item=spawn_egg,item=border_block}] run clear @s[tag=!admin,hasitem={item=command_block,item=repeating_command_block,item=chain_command_block,item=command_block_minecart,item=structure_block,item=jigsaw,item=structure_void,item=spawn_egg,item=border_block}]

# report any players with the 'report' tag without the 'admin' tag to staff/admins
execute if entity @a[tag=report,tag=!admin] as @a[tag=report,tag=!admin] at @s run tellraw @a[tag=admin] {"rawtext":[{"text":"Player: §e"},{"selector":"@a[tag=report]"},{"text":"§r, is §chacking§r! Please go through their anticheat logs, inspect them and ban them if they are hacking!"}]}



### anti gamemode ###
execute if entity @a[tag=!admin,m=!c] run gamemode default @a[tag=!admin,m=!c]



### anti CBE ###

# Detect redstone blocks and torches around command blocks
#execute as @a at @s if block ^^^6 redstone_block if block ^^^6 command_block run fill ~-7 ~-7 ~-7 ~7 ~7 ~7 air 0 replace redstone_block
#execute as @a at @s if block ^^^6 redstone_torch if block ^^^6 command_block run fill ~-7 ~-7 ~-7 ~7 ~7 ~7 air 0 replace redstone_torch

# kill any command block minecarts and NPCs around any player without the tag 'admin'
execute as @a at @s if entity @s[tag=!admin] run kill @e[type=command_block_minecart,r=6]
execute as @a at @s if entity @s[tag=!admin] run kill @e[type=npc,r=6]