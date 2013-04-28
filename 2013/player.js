function player_create()
{
	return {
		x: 0, y: 0,
		style: 'farmer',

		weapon:   'pitchfork',
		headgear: 'straw_hat',
		armour:   'cloth',
		footwear: 'bear_feet',

		inventory: {
			chicken_food: 2,
			gold: 2
		}
	};
}

function player_additem(player, item_name, quantity)
{
	if (typeof(quantity)=='undefined')
		quantity = 1;
	if (quantity != 0)
	{
		if (typeof(player.inventory[item_name])=='undefined')
			player.inventory[item_name] = 0;
		player.inventory[item_name] += quantity;		
	}
}
function player_removeitem(player, item_name, quantity)
{
	if (typeof(quantity)=='undefined')
		quantity = 1;
	if (quantity != 0)
	{
		if (typeof(player.inventory[item_name])=='undefined')
			return false;
		if (player.inventory[item_name] < quantity)
			return false;
		player.inventory[item_name] -= quantity;
		if (player.inventory[item_name] == 0)
			delete player.inventory[item_name];		
	}
	return true;
}
function player_getquantity(player, item_name)
{
	if (typeof(player.inventory[item_name])=='undefined')
		return 0;
	return player.inventory[item_name];
}

function player_move(player, choice)
{
	switch (choice)
	{
		case 0: player.y += 1; break;
		case 1: player.x += 1; break;
		case 2: player.y -= 1; break;
		case 3: player.x -= 1; break;
	}
	console.log('move to: ' + player.x + ', ' + player.y);
}

function player_redraw(player, element)
{
	element.className = player.style;
}
