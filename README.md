# FalkRaft-BP
This is the BP that builds the features of FalkRaft.



![pack_icon](https://github.com/FalkRaft/FalkRaft-BP/assets/164064272/cc43b25d-68f3-4b5b-8af9-dc6f0fbbf5c3)
NOTE: It is still currently in development - alpha. Do not distribute it to other users (except Thomas, Jasper, your other devices and your friends who you have very good trust with in Minecraft technicals). Some things may break if not used properly and you may get content logs.

Functions:
- load:
	- runs the following function files:
		- anticheat
		- optimizations
	- anticheat:
		- clears the players illegal items without the tag ‘admin’.
		- items are: command blocks, command block minecarts, 	structure blocks and structure voids, border blocks, and jigsaw 	blocks.
	- Optimizations:
		- gives every player with the tag ‘hub’ invisibility to make it easier 	on the graphics card/processor.
		- gives every player without the tag ‘survworld’ (survival world) 	night vision to avoid lightning recalculation.
	- Kits:
  		- all of the kits for fighting.
  		- the ones with 'Self' in the name, execpt for the 'clearKit', because it works on both NPCs and players, only works on the players - ones without 'Self' 		in their name only work for NPCs.

Function commands:
- /function load
- /function anticheat
- /function optimizations
- /function custom_commands/falkraftHelp
- /function kits/glasscannon(Self)
- /function kits/nodebuff(Self)
- /function kits/tank(Self)
- /function kits/crystal(Self)

Ones in development:
- animation.json files for loading the function files and thing that function files can’t.
- script files (in JavaScript) for the behaviours that function files can’t.


The other function files that are not listed here are the kits functions for PvP, and the FalkRaft ‘help’ command (in development).
Fell free to test the behaviour pack and/or use the function files for your worlds.
If you have a problem with the manifest.json file that is about UUIDs, then you may change them. You can generate one by going to this link: https://www.uuidgenerator.net
