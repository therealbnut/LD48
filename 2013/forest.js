var state_forest_enter =
{
	init: function(player, map, tile)
	{
		var monster = tile.monster;
		if (monster != null)
		{
			choose_flavour([
				"You encounter a " + monster.name + "!",
				"A " + monster.name + " peers out from behind a tree.",
				"You encounter a " + monster.name + " swinging from a branch.",
				"A " + monster.name + " was pretending it was a tree, you weren't fooled.",
				"You see a tree, just a regular old " + monster.name + " tree, no wait!",
				"A " + monster.name + " slaps you with a glove and proposes a duel!",
				"A giant squirrel, scary beyond all reason, jumps out from behind a tree, no wait, phew, it was just a " + monster.name + "."
			]);
			set_options([
				"Flee monster.",
				"Fight monster."
			]);
		}
		else
		{
			choose_flavour([
				"There's nothing but trees here.",
				"Nothing here but trees.",
				"Trees, pinecones and angry bears, nothing exciting here."
			]);
			set_options([
				"Go somewhere else.",
				"Look around."
			]);
		}

	},
	choose: function(player, map, tile, choice)
	{
		var monster = tile.monster;
		switch (choice)
		{
			case 0:
			{
				if (monster != null)
				{
					choose_result([
						"You quietly slip behind a tree, the " + monster.name + " is amazed as you vanish.",
						"You pretend to be a tree, thankfully " + monster.name + " are not known for their intellect.",
						"Mistaking a tree for the " + monster.name + " you charge, and get away cleanly."
					]);
				}
				else
				{
					choose_result([
						"There's nothing here but pinecones.",
						"Strange clouds...",
						"All these trees look the same.",
						"You decide to do a landscape painting of all the trees, a 'minimalist' painting! It wins second prize in the regional competition, too bad there are only bears in this region, damn snob bears."
					]);
				}
				state_set(state_move);
				break;
			}
			case 1:
			{
				if (monster != null)
				{
					choose_result([
						"You fight the " + monster.name,
						"You run from the " + monster.name + ".",
						"You roll to escape, only joking, this game can't do that.",
						"If this could roll to escape you'd get a " + Math.floor(1+10*Math.random()) + ", but that doesn't matter anyway."
					]);
					state_set(monster_fight);
				}
				else
				{
					choose_result([
						"There's nothing here, nothing but trees.",
						"Blood, bloodity blood blood, and pinecones.",
						"You pick up a pinecone, and call it George. Hello George."
					]);
				}
			}
		}
	}
};

