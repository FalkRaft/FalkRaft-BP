## Freeze
tag @s[tag=!freeze] add freeze
inputpermission set @s[tag=freeze] movement disabled
inputpermission set @s[tag=freeze] camera disabled
effect @s[tag=freeze] weakness 999999999 255 true
ability @s[tag=freeze] worldbuilder false
ability @s[tag=freeze] mayfly false
ability @s[tag=freeze] mute true
tellraw @s {"translate": [{"text": "[Falkraft] Froze: "}, {"selector": "@a[tag=freeze]"}]}