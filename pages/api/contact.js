import fetch from "node-fetch";

export default async function ContactHandler(req, res) {
	switch (req.method) {
		case "POST":
			// send notification to webhook in Discord server
			await fetch(process.env.CONTACT_DISCORD_WEBHOOK, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					username: "dansmith.tech",
					avatar_url:
						"https://www.dansmith.tech/images/discord-avatar.png",
					content: "New contact form submission:",
					embeds: [
						{
							author: {
								name: req.body.email,
							},
							title: req.body.name,
							description: req.body.body,
							color: 169459,
						},
					],
				}),
			})
				.then((data) => {
					res.status(200).json({
						success: true,
						message: "Discord notification sent.",
					});
				})
				.catch((err) => {
					res.status(500).json({
						success: false,
						message: "Problem sending Discord notification.",
					});
				});
			break;
		default:
			res.status(500).json({
				success: false,
				message: "Incorrect request method: " + method,
			});
			break;
	}
}
