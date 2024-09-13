# for NPCs
#armour head -> feet
replaceitem entity @initiator slot.armor.head 0 netherite_helmet 1 0 {"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @initiator slot.armor.chest 0 netherite_chestplate 1 0 {"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @initiator slot.armor.legs 0 netherite_leggings 1 0 {"item_lock":{"mode":"lock_in_slot"}}
replaceitem entity @initiator slot.armor.feet 0 netherite_boots 1 0 {"item_lock":{"mode":"lock_in_slot"}}

#hotbar
replaceitem entity @initiator slot.hotbar 0 netherite_sword 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @initiator slot.hotbar 1 obsidian 64 0 {"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @initiator slot.hotbar 2 end_crystal 64 0 {"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @initiator slot.hotbar 3 respawn_anchor 64 0 {"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @initiator slot.hotbar 4 glowstone 64 0 {"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @initiator slot.hotbar 5 flint_and_steel 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @initiator slot.hotbar 6 golden_apple 64 0 {"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @initiator slot.hotbar 7 netherite_pickaxe 1 0 {"item_lock":{"mode":"lock_in_inventory"}}
replaceitem entity @initiator slot.hotbar 8 ender_pearl 16 0 {"item_lock":{"mode":"lock_in_inventory"}}

#inventory
replaceitem entity @initiator slot.inventory 0 tnt 64 0 {"item_lock":{"mode":"lock_in_inventory"}}