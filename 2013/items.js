var gBaseItems = {
	'chicken food': {cost: 2.00, type: 'food'},
	gold:           {cost: 1.00, type: 'gold'},
	egg:            {cost: 0.50, type: 'egg'},

	pitchfork:         {cost: 1.00, type: 'weapon', damage: [0, 1], style: 'farmer'},
	gauntlet:          {cost: 1.50, type: 'weapon', damage: [2, 3], style: 'warrior'},
	dagger:            {cost: 3.00, type: 'weapon', damage: [3, 4], style: 'warrior'},
	mace:              {cost: 4.00, type: 'weapon', damage: [4,12], style: 'warrior'},
	sickle:            {cost: 3.00, type: 'weapon', damage: [3, 4], style: 'warrior'},
	club:              {cost: 3.00, type: 'weapon', damage: [3, 4], style: 'warrior'},
	morningstar:       {cost: 4.00, type: 'weapon', damage: [4,15], style: 'warrior'},
	shortspear:        {cost: 3.00, type: 'weapon', damage: [3, 4], style: 'rogue'},
	longspear:         {cost: 3.00, type: 'weapon', damage: [3, 4], style: 'rogue'},
	quarterstaff:      {cost: 4.00, type: 'weapon', damage: [4, 5], style: 'wizard'},
	spear:             {cost: 2.00, type: 'weapon', damage: [2, 3], style: 'rogue'},
	crossbow:          {cost: 2.00, type: 'weapon', damage: [2, 3], style: 'rogue'},
	javelin:           {cost: 4.00, type: 'weapon', damage: [4, 5], style: 'warrior'},
	axe:               {cost: 5.00, type: 'weapon', damage: [5, 9], style: 'warrior'},
	hammer:            {cost: 4.00, type: 'weapon', damage: [4, 5], style: 'warrior'},
	handaxe:           {cost: 3.00, type: 'weapon', damage: [3, 4], style: 'warrior'},
	sword:             {cost: 4.00, type: 'weapon', damage: [4, 5], style: 'warrior'},
	battleaxe:         {cost: 5.00, type: 'weapon', damage: [5,12], style: 'warrior'},
	scimitar:          {cost: 3.00, type: 'weapon', damage: [3, 4], style: 'warrior'},
	trident:           {cost: 4.00, type: 'weapon', damage: [4, 5], style: 'warrior'},
	warhammer:         {cost: 6.00, type: 'weapon', damage: [6,17], style: 'warrior'},
	falchion:          {cost: 2.00, type: 'weapon', damage: [2, 3], style: 'warrior'},
	glaive:            {cost: 3.00, type: 'weapon', damage: [3, 5], style: 'warrior'},
	staff:             {cost: 6.00, type: 'weapon', damage: [6,14], style: 'wizard'},
	'wizard\'s staff': {cost: 9.00, type: 'weapon', damage: [9,12], style: 'wizard'},
	'mage\'s staff':   {cost: 8.00, type: 'weapon', damage: [8,22], style: 'wizard'},
	
	
	'straw hat':    {cost: 0.50, type: 'headgear', armour: 0.5},
	'cloth vest':   {cost: 0.50, type: 'armour',   armour: 0.5},
	'bear feet':    {cost: 2.00, type: 'footwear', armour: 0.0},
};
var gMiscItems = {};

var gAdjectives = 
{
	'shiny':         {cost:  0.10, damage: [  0.1,  0.5], armour:  0.5},
	'cheating':      {cost: 20.00, damage: [ 10.0, 20.0], armour: 20.0},
	'epic':          {cost:  5.00, damage: [  5.0,  8.0], armour:  7.0},
	'ancient':       {cost:  8.00, damage: [  2.0,  3.0], armour:  2.0},
	'old':           {cost:  0.50, damage: [  0.0,  0.5], armour:  0.0},
	'weathered':     {cost:  0.50, damage: [  0.0,  0.5], armour:  0.5},
	'filthy':        {cost:  0.50, damage: [  0.0,  1.0], armour:  0.5},
	'crude':         {cost:  0.50, damage: [  0.0,  1.0], armour:  0.5},
	'slippery':      {cost:  1.00, damage: [  0.0,  0.5], armour:  2.0},
	'shadow':        {cost:  2.00, damage: [  0.0,  0.5], armour:  3.0},
	'light':         {cost:  1.00, damage: [  0.0,  1.0], armour:  0.5},
	'heavy':         {cost:  2.00, damage: [  1.0,  2.0], armour:  1.5},
	'huge':          {cost:  3.00, damage: [  2.0,  3.0], armour:  2.5},
	'gigantic':      {cost:  4.00, damage: [  3.0,  4.0], armour:  3.5},
	'giant':         {cost:  5.00, damage: [  4.0,  5.0], armour:  4.5},
	'unpredictable': {cost: 15.00, damage: [-40.0, 50.0], armour:  0.0},
	'arcane':        {cost: 25.00, damage: [ 10.0, 15.0], armour:  5.0},
	'useless':       {cost: 25.00, damage: [-10.0,  5.0], armour:  0.0},
	'expensive':     {cost: 25.00, damage: [  0.0,  1.0], armour:  1.0},
	'poached':       {cost:  1.00, damage: [  0.0,  0.0], armour:  0.5},
	'short':         {cost: -1.00, damage: [ -1.0,  0.0], armour:  0.5},
	'long':          {cost:  1.00, damage: [  0.0,  1.0], armour:  1.5}
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
function item_getstyle(item_name)
{
	return item_get(item_name).style;
}
function item_gettype(item_name)
{
	return item_get(item_name).type;
}
