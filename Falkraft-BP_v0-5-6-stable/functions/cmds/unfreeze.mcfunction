## Unfreeze
tag @s[tag=freeze] remove freeze
inputpermission set @s[tag=!freeze] movement enabled
inputpermission set @s[tag=!freeze] camera enabled
effect @s[tag=!freeze] weakness 0 0 true
ability @s[tag=!freeze] worldbuilder true
ability @s[tag=!freeze, tag=op] mayfly true
ability @s[tag=!freeze] mute false