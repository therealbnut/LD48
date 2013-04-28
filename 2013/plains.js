var state_plains_enter =
{
	init: function(player, map, tile)
	{
		var monster = tile.monster;
		if (monster != null)
		{
			choose_flavour([
				"You encounter a " + monster.name + "!",
				"A " + monster.name + " leaps out of the tall grass",
				"Why does a " + monster.name + " suddenly appear, Every time you are near?",
				"You hear a " + monster.name + " in the bushes, it hears you too.",
				"A " + monster.name + " sees you approaching, this ought to be good."
			]);
			set_options([
				"Flee monster.",
				"Fight monster."
			]);
		}
		else
		{
			choose_flavour([
				"There's nothing to see here"
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
						"You run from the " + monster.name,
						"You run away screaming.",
						"Good idea."
					]);
				}
				else
				{
					choose_result([
						"You decide to find something more interesting.",
						"You reminisce on last time you were here as you leave."
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
						"Time to fight.",
						"You crouch down in the grass ready to fight!"
					]);
					state_set(monster_fight);
				}
				else
				{
					choose_result([
						"You look around, there's nothing here.",
						"There's nothing here but grass and blood.",
						"There's nothing but blood, perhaps the market has a jug..."
					]);
				}
			}
		}
	}
};

