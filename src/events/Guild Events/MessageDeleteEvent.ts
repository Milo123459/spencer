import { RunFunction } from '../../interfaces/Event';
import { Anything } from '../../interfaces/Anything';
import { Message, TextChannel, Util } from 'discord.js';

export const run: RunFunction = async (client, message: Message) => {
	if (message?.author?.bot) return;
	const GuildConfigSchema = await client.db.load('guildconfig');
	const GuildConfig = await GuildConfigSchema.findOne({
		Guild: message.guild.id,
	});
	if (!GuildConfig) return;
	if ((GuildConfig as Anything)?.MessageLogsChannel) {
		const channel: TextChannel = client.channels.cache.get(
			(GuildConfig as Anything).MessageLogsChannel
		) as TextChannel;
		if (!channel) return;
		if (!channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
		await channel.send(
			client.embed(
				{
					description: `
                    Message deleted by ${message.author.tag} (${
						message.author
					}) in ${message.channel}.
                    **Content**
                    ${Util.escapeMarkdown(message.content)}`,
					color: 'RED',
				},
				message
			)
		);
	} else return;
};
export const name: string = 'messageDelete';
