var state_desert_enter =
{
	init: function(player, map, tile)
	{
		var monster = tile.monster;
		if (monster != null)
		{
			choose_flavour([
				"You encounter a " + monster.name + "!",
				"A " + monster.name + " rolls down a nearby dune.",
				"You encounter a " + monster.name + " making a sand angel.",
				"You wave to a " + monster.name + " thinking it's a friend, it's not.",
				"You see a mirage " + monster.name + ", no wait, it's real.",
				"That's not a cactus, it's a " + monster.name + "!",
				"Water, water, every where... no wait, that's sand... and a " + monster.name + "."
			]);
			set_options([
				"Flee monster.",
				"Fight monster."
			]);
		}
		else
		{
			choose_flavour([
				"There's nothing but sand here.",
				"Nothing here but sand.",
				"Sand and cactuses, neither are fun for fighting."
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
						"You run from the " + monster.name + ", the sand makes it hard.",
						"You roll down a dune and hope the " + monster.name + " doesn't see you.",
						"It's too hot in the desert for fighting, good idea."
					]);
				}
				else
				{
					choose_result([
						"There's nothing here but mirages.",
						"Are you walking in circles...?",
						"All these dunes look like each other"
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
						"You run away screaming.",
						"Good idea."
					]);
					state_set(monster_fight);
				}
				else
				{
					choose_result([
						"There's nothing here, nothing but sand and scorpions.",
						"There's nothing here but sand and blood, bloody sand.",
						"There's nothing but blood, mmmm, so thirsty..."
					]);
				}
			}
		}
	}
};

