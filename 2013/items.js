var gItems = {
	chicken_food: {
		cost: 2,
		type: 'food'
	},
	gold: {
		cost: 1,
		type: 'gold'
	},
	egg: {
		cost: 0.50,
		type: 'egg'
	}
};

function item_getcost(item_name)
{
	return gItems[item_name].cost;
}
function item_gettype(item_name)
{
	return gItems[item_name].type;
}
