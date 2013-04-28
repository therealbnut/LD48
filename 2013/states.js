var state_move =
{
	init: function(player, map, tile)
	{
		choose_flavour([
			"Which way would you like to go?",
			"Where next?"
		]);
		set_options([
			"Go north",
			"Go east",
			"Go south",
			"Go west"
		]);
	},
	choose: function(player, map, tile, choice)
	{
		player_move(player, choice);
		tile = current_tile(map, player);
		state_set_from_tile(tile);
	}
}
