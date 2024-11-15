import ChatCommand from './index.js'
import { commands } from './index.js';

ChatCommand.create('Help', 'Help Command: Shows all available commands', ['h', 'help'], false, false, 
    (player) => {
        const helpMessage = commands
            .filter(command => !command.permissions || command.permissions(player))
            .map(
                command => {
                    const alias = command.alias.length > 0 ? `[${command.alias.join(', ')}] ` : '';
                    const description = command.description ? command.description : '';
                    return `§7${command.command} - ${alias}${description}`;
                }
            )
            .join('\n');
        player.sendMessage(`§aAvailable Commands\n${helpMessage}\n`);
    }
);