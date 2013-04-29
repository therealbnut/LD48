function farm_update(farm)
{
	if (farm.chickens > 0 && chance(0.1))
	{
		farm.chickens -= 1;
	}
	// console.log('chickens: ' + farm.chickens);
}

var state_farm_enter =
{
	init: function(player, map, tile)
	{
		var chickens = tile.chickens;
		if (chickens <= 0)
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
		}
		else if (chickens == 1)
		{
			choose_flavour([
				"As you arrive at the farm a half starved chicken peers out from the weeds.",
				"Arriving at the farm you realise you forgot to feed the chickens, one remains."
			]);
			set_options([
				"Leave the farm, I'm sure this chicken will do better",
				"Feed the remaining chicken",
				"Collect the eggs, if there are any..."
			]);
		}
		else if (chickens <= 10)
		{
			choose_flavour([
				"You're at your farm, there are chickens in the yard. Bok, bok!",
				"You are at your farm, the chickens seem well fed. Yum!",
				"You stand at the entrance to your farm and breath in the fresh country air."
			]);
			set_options([
				"Go on an adventure!",
				"Feed the chickens, someone has to",
				"See if the chickens have left any edible surprises"
			]);
		}
		else
		{
			choose_flavour([
				"You're at the farm, a wave of chickens washes over you.",
				"Chickenocalypse!",
				"Chickens go in, pies come out. At least they would if the pie machine wasn't overflowing."
			]);
			set_options([
				"Escape the chicken infested farm",
				"Despite all signs to the contrary, give the chickens more food",
				"Collect the eggs for a giant sized omelette",
				"Put the chickens in a gladitorial contest to breed a race of super chickens!"
			]);
		}
	},
	choose: function(player, map, tile, choice)
	{
		switch(choice)
		{
			case 0:
				choose_result([
					"You decide to leave the farm.",
					"Time to leave the farm."
				]);
				state_set(state_move);
				break;
			case 1:
				if (!player_removeitem(player, 'chicken food'))
				{
					choose_result([
						"You would feed the chickens, if you had some food...",
						"You could feed them rocks, but you don't have any chicken food.",
						"No chicken food here, try the market.",
						"The market might have some chicken food, you do not."
					]);
				}
				else
				{
					if (tile.chickens >= 2)
					{
						var new_count = Math.floor(0.8 + tile.chickens * Math.random() * 0.125);
						if (new_count > 1)
						{
							choose_result([
								new_count + " chickens come out from behond the shed, I don't remember those ones...",
								"Suddenly " + new_count + " chickens spontaneously appear!",
								"A cloud of angry bees flies past leaving " + new_count + " chickens in their wake."
							]);
							tile.chickens += new_count;
						}
						else if (new_count > 0)
						{
							choose_result([
								"With a terrible screech a chicken claws its way free of the earth.",
								"A chicken falls to the ground and starts to shake, a fountain of goo erupts from the chicken as another chicken crawls from its back.",
								"A meteor hits the ground near the chickens and a new chicken crawls from the crater.",
								"Awful music is heard from the chicken shed, moments later a baby chicken emerges.",
								"A large man in a rabbit suit drops off some eggs, the chickens consume all but one. From this one a baby chicken emerges."
							]);
							tile.chickens += new_count;					
						}
						else
						{
							choose_result([
								"The chickens look quite hungry.",
								"They're still hungry, they're always hungry."
							]);
						}					
					}
					else if (tile.chickens == 1)
					{
						choose_result([
							"Poor thing.",
							"If only you'd fed them earlier.",
						]);
					}
					else
					{
						choose_result([
							"Well that was depressing.",
							"Nothing happens, of course.",
						]);
					}
				}
				state_set(state_farm_enter);
				break;
			case 2:
				{
					var new_eggs = Math.floor((tile.chickens+2) * Math.random());
					if (new_eggs > 0)
					{
						player_additem(player, 'egg', new_eggs);
						if (new_eggs > 1)
						{
							choose_result([
								"You find "+new_eggs+" eggs.",
								"You collect "+new_eggs+" eggs. Why can't you hold all these eggs!?",
								"Suddenly "+new_eggs+" leap free from the bushes and into your mouth.",
								"What a haul, "+new_eggs+" eggs!"
							]);
						}
						else
						{
							choose_result([
								"You find an egg, just one, perhaps these chickens would be better at pies.",
								"Only one egg, maybe it's time to feed them properly.",
								"You found two eggs, but one of them was imaginary.",
								"You found an egg, congratulations."
							]);
						}	
					}
					else
					{
						choose_result([
							"You don't find any eggs, if only you had more chickens.",
							"You found an egg, but the smell made you reconsider collecting it.",
							"No eggs here."
						]);
					}
				}
				state_set(state_farm_enter);
				break;
			case 3:
				var old_tile_chickens = tile.chickens;
				tile.chickens = 1 + Math.floor(tile.chickens * (Math.random() * 0.5 + 0.125));
				choose_result([
					old_tile_chickens + " chickens went in, " + tile.chickens + " chickens came out.",
					"When the feathers settle you're left with " + tile.chickens + " super chickens.",
					"You used to have, " + old_tile_chickens + " chickens, but then you had a crazy idea, now you have less.",
					"Turns out you need a few more generations for that to work, you have " + tile.chickens  + " chickens left.",
					"You only have " + tile.chickens + " now, but your dinner menu is sorted for a month!"
				]);
				state_set(state_farm_enter);
				break;
		}
	}
};

