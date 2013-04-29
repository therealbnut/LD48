var monster_fight =
{
	init: function(player, map, tile)
	{
		var monster = tile.monster;
		choose_flavour([
			"You and the " + monster.name + "prepare to fight!",
			"The " + monster.name + " uses the terrain to its advantage.",
			"The " + monster.name + " doesn't look so tought.",
			"What's a " + monster.name + " anyway?"
		]);
		set_options([
			"Flee monster",
			"Use " + player.weapon,
			"Prepare to block",
			"Use health potion"
		]);
	},
	choose: function(player, map, tile, choice)
	{
		var monster = tile.monster;
		switch (choice)
		{
			case 0:
			{
				choose_result([
					"You run from the " + monster.name + ", totally worth it.",
					"You point off into the distance, 'It's the queen!', then make your escape while the " + monster.name + " is distracted.",
					"You ask the " +monster.name+ " for a raincheck, suprisingly it agrees."
				]);
				state_set(state_move);
				break;
			}
			case 1:
			{
				var m_dmg = item_getdamage(player.weapon);
				monster.health -= m_dmg;
				if (monster.health <= 0)
				{
					var item_name = item_generate(monster.level);
					var gold      = monster.level - item_getcost(item_name);
					player_additem(player, 'gold', gold);
					if (item_name != null)
					{
						console.log('item_name: ' + item_name);
						choose_result([
							"You kill the " + monster.name + " and loot it, you find a " + item_name + " and " + gold + " gold piece(s).",
						]);
						player_additem(player, item_name);
					}
					else
					{
						choose_result([
							"You kill the " + monster.name + " and loot it, you find " + gold + " gold piece(s).",
						]);
					}
					tile.monster = null;
					state_set_from_tile(tile);
				}
				else
				{
					choose_result([
						"You hit the " + monster.name + " for " + m_dmg + " hp, it now has "+monster.health+"."
					]);
				}
				break;
			}
		}
	}
};

function monster_create(dist)
{
	var level = Math.ceil(dist*(Math.random()*0.5+0.5));
	return {
		name:   "3 headed purple people eater",
		level:  level,
		damage: [4, 10],
		health: 5
	};
}
