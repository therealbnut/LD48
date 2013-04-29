var state_market_enter =
{
	init: function(player, map, tile)
	{
		choose_flavour([
			"You're at the market, you have " + player_getquantity(player, 'gold') + " gold.",
			"You have " + player_getquantity(player, 'gold') + " gold, and all day to spend it at the market!",
			"The market welcomes you, but you only have " + player_getquantity(player, 'gold') + " gold, spend it wisely!",
			"The market has many wonderful things, for someone with gold, unfortunately you have " + player_getquantity(player, 'gold') + ".",
			"You can buy and sell things at the market, as long as you can afford it that is...",
			"You decide to stay a while, and listen to the market.",
		]);
		set_options([
			"Go elsewhere",
			"Buy chicken food",
			"Sell eggs",
			"Sell unused inventory"
		]);
	},
	choose: function(player, map, tile, choice)
	{
		switch(choice)
		{
			case 0:
				choose_result([
					"Market day! Is not this day.",
					"Stupid market, never liked it anyway.",
					"Who needs that market anyway.",
					"You leave the market happy with all you might have purchased, or had stolen.",
					"The time for markets is not this time."
				]);
				state_set(state_move);
				break;
			case 1:
				if (!player_removeitem(player, 'gold', item_getcost('chicken food')))
				{
					choose_result([
						"You don't have enough money to buy chicken food.",
						"You need "+item_getcost('chicken food')+
							" gold pieces for chicken food, you have " + player_getquantity(player,'gold'),
						"No chicken food here, try the market.",
						"The market might have some chicken food, you do not."
					]);
				}
				else
				{
					player_additem(player, 'chicken food');
					choose_result([
						"After hours of haggling, you buy some chicken food for " + item_getcost('chicken food') +
							" gold pieces.",
						"You but some chicken food for " + item_getcost('chicken food') + " gold pieces.",
						"After searching the whole market you eventually find some chicken food for " + item_getcost('chicken food') +
							" gold pieces.",
						"You buy some chicken food and try some, delicious!",
						"You buy some chicken food, it's half sawdust, but that's why it was so cheap!"
					]);
				}
				state_set(state_market_enter);
				break;
			case 2:
				var egg_count = player_getquantity(player,'egg');
				if (egg_count == 0)
				{
					choose_result([
						"You don't have any eggs to sell!",
						"Go get some eggs and come back later.",
						"You have no eggs, the stall holder looks angrily at you.",
						"You have no eggs, the stall holder offers to sell you some, you decline.",
						"Hmm, no eggs, if only you had some way of getting some...",
						"You don't have any eggs, where are you going to get eggs at this hour!?"
					]);
				}
				else
				{
					var new_gold = egg_count * item_getcost('egg') * 0.5;
					player_removeitem(player, 'egg', egg_count);
					player_additem(player, 'gold', new_gold);
					if (egg_count > 1)
					{
						choose_result([
							egg_count + " eggs sold, cha-ching!",
							egg_count + " eggs sold, " + new_gold + " gold pieces gained!",
							"You make " + new_gold + " gold pieces, this might actually be worth it!",
							"You finally get rid of " + egg_count + " eggs, someone's flooding the market..."
						]);						
					}
					else
					{
						choose_result([
							"You sell one egg, good job.",
							"You sell an egg and make " + new_gold + " gold pieces, bargain!",
							"The foolish stall holder buys your egg for " + new_gold + " gold pieces, sucker!",
							"You sell a rotten egg, muhahaha!"
						]);
					}
				}
				state_set(state_market_enter);
				break;
			case 3:
			{
				var sell_count = 0;
				var new_gold = 0;
				for (var item_name in player.inventory)
				{
					if (item_name != 'gold')
					{
						var item_count = player_getquantity(player, item_name);
						new_gold   += item_count * item_getcost(item_name) * 0.5;
						sell_count += item_count;
						player_removeitem(player, item_name, item_count);
					}
				}
				if (sell_count > 0)
				{
					player_additem(player, 'gold', new_gold);
					choose_result([
						"You sell " + sell_count + " item(s), for "+new_gold+" gold.",
						"You make "+new_gold+" gold pieces!",
						"You sell all your stuff for a measly "+new_gold+" gold pieces, hopefully you didn't need any of that...",
						"You sold "+sell_count+"items, you don't want to know how much you made."
					]);					
				}
				else
				{
					choose_result([
						"You have nothing to sell.",
						"The stall holder chases you out, come back when you have something to sell!",
						"Perhaps you should go adventuring so you have sometihng to sell...",
						"After haggling for hours you both agree that you've got nothing to sell."
					]);
				}

				state_set(state_market_enter);
			}
			break;
		}
	}
};

