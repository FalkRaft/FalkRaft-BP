import { Player } from "@minecraft/server";

export default {
    "customcommands": {
        "prefix": "!",
        "help": {
            "enabled": true,
            "description": "The command list for FalkRaft",
            "args": "none",
            "requiredTags": ["op"],
            "aliases": ["?", "help"]
        },
        "op": {
            "enabled": true,
            "description": "Grants a player operator status.",
            "args": "<player name>",
            "arguments": `${Player.name}`,
            "requiredTags": ["op", "admin"],
            "aliases": ["op"]
        },
        "deop": {
            "enabled": true,
            "description": "Revokes a player operator status.",
            "args": "<player name>",
            "requiredTags": ["op", "admin"],
            "aliases": ["deop"]
        },
        "gmc": {
            "enabled": true,
            "description": "Change yourself into creative mode.",
            "args": "none",
            "requiredTags": ["op"],
            "aliases": ["gmc"]
        },
        "gms": {
            "enabled": true,
            "description": "Change yourself into survival mode.",
            "args": "none",
            "requiredTags": ["op"],
            "aliases": ["gms"]
        },
        "gmsp": {
            "enabled": true,
            "description": "Change yourself into spectator mode.",
            "args": "none",
            "requiredTags": ["op"],
            "aliases": ["gmsp"]
        },
        "gma": {
            "enabled": true,
            "description": "Change yourself into adventure mode.",
            "args": "none",
            "requiredTags": ["op"],
            "aliases": ["gma"]
        }
    }
}