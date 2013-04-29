var gBaseItems = {
	'chicken food': {cost: 2.00, type: 'food'},
	gold:           {cost: 1.00, type: 'gold'},
	egg:            {cost: 0.50, type: 'egg'},

	pitchfork:      {cost: 1.00, type: 'weapon', damage: [1, 2], style: 'farmer'},
	'straw hat':    {cost: 0.50, type: 'headgear', armour: 0.5},
	'cloth vest':   {cost: 0.50, type: 'armour',   armour: 0.5},
	'bear feet':    {cost: 2.00, type: 'footwear', armour: 0.0},
};
var gMiscItems = {};

var gAdjectives = 
{
	'shiny': {cost: 0.50, damage: [1, 2], armour: 1.0},
	
};

function item_generate(cost)
{
	var base_item = null;
	for (var i=0; i<100; ++i)
	{
	    var items = Object.keys(gBaseItems);
	    base_item = items[Math.floor(Math.random()*(items.length))];
		var item = gBaseItems[base_item];
		if (base_item != 'gold' && item.cost < cost)
			break;
	}
	if (base_item == null)
		return null;
		
	var item      = clone(gBaseItems[base_item]);
	var item_name = base_item;

	for (var i=0; i<10; ++i)
	{
		var adjectives = Object.keys(gAdjectives);
		var adjective  = adjectives[Math.floor(Math.random()*(adjectives.length))];

		if ((item.cost + gAdjectives[adjective].cost < cost || chance(0.05)) &&
			item_name.search(adjective)==-1)
		{
			item.cost += gAdjectives[adjective].cost;
			if (typeof(item.damage)!='undefined' && typeof(gAdjectives[adjective].damage)!='undefined')
			{
				item.damage[0] += gAdjectives[adjective].damage[0];
				item.damage[1] += gAdjectives[adjective].damage[1];
			}
			if (typeof(item.armour)!='undefined' && typeof(gAdjectives[adjective].armour)!='undefined')
			{
				item.armour += gAdjectives[adjective].armour;
			}
			item_name = adjective + ' ' + item_name;
		}
	}
	gMiscItems[item_name] = item;

	return item_name;
}

function item_get(item_name)
{
	var item = gBaseItems[item_name];
	if (typeof(item)=='undefined')
		item = gMiscItems[item_name];
	return item;
}

function item_getdamage(item_name)
{
	var item = item_get(item_name);
	return Math.floor(item.damage[0] + (1+item.damage[1]-item.damage[0]) * Math.random());
}

function item_getcost(item_name)
{
	return item_get(item_name).cost;
}
function item_gettype(item_name)
{
	return item_get(item_name).type;
}
