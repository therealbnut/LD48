var state_plains_enter =
{
	init: function(player, map, tile)
	{
		choose_flavour([
			"You're at your farm, there are starved chickens on the ground, you monster.",
			"This used to be a farm, now all that remains is a pile of starved chickens."
		]);
		set_options([
			"Leave this god forsaken place",
			"Wish you had fed the chickens",
			"Wonder where all the eggs went"
		]);
	},
	choose: function(player, map, tile, choice)
	{
		switch (choice)
		{
			case 0:
			{
				choose_result([
					"You decide to leave the farm.",
					"Time to leave the farm."
				]);
				state_set(state_move);
				break;
			}
		}
	}
};

