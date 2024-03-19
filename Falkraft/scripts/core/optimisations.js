import { world } from '@minecraft/server';
import 'core/loader.js';

//executes the function on itself
//function optimizations

//turns every player with the tab 'hub' invisible
world.runCommandAsync('effect @a[tag=hub] invisibility 1 1 true')

//avoids lighting recalculation by giving every player night vision
world.runCommandAsync('effect @a night_vision 3 1 true')

//executes the function on itself
//function optimizations