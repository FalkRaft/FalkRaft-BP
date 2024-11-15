#executes the function on itself
#function optimizations

#turns every player with the tab 'hub' invisible
effect @a[tag=hub] invisibility 3 1 true

#avoids lighting recalculation by giving every player night vision
effect @a[tag=!survworld, tag=!hub] night_vision 15 1 true

#executes the function on itself
#function optimizations