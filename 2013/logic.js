var gMap    = null;
var gPlayer = null;
var gFarm   = null;
var gMarket = null;

var gTileElements   = null;
var gPlayerElement  = null;
var gResultElement  = null;
var gFlavourElement = null;
var gOptionElements = null;

var gStateHandler = null;

function set_result(txt)
{
	if (txt == null)
	{
		gResultElement.style.display = "none";
	}
	else
	{
		gResultElement.innerHTML = txt;
		gResultElement.style.display = "";
	}
}
function choose_result(items)
{
	set_result(items[Math.floor(Math.random()*items.length)]);
}
function set_flavour(txt)
{
	gFlavourElement.innerHTML = txt;
}
function choose_flavour(items)
{
	set_flavour(items[Math.floor(Math.random()*items.length)]);
}
function set_options(options)
{
	for (var i=options.length; i<4; ++i)
	{
		gOptionElements[i].parentNode.style.display = "none";
	}
	for (var i=0; i<options.length; ++i)
	{
		gOptionElements[i].innerHTML = options[i];
		gOptionElements[i].parentNode.style.display = "";
	}
}

function current_tile(map, player)
{
	return get_tile(map, player.x, player.y);
}

function state_set(handler)
{
	gStateHandler = handler;
	gStateHandler.init(gPlayer, gMap, current_tile(gMap, gPlayer));
	farm_update(gFarm);
	console.log(gPlayer.inventory);
}

function state_set_from_tile(tile)
{
	var handler = null;
	switch (tile.type)
	{
		case 'farm':   handler = state_farm_enter;   break;
		case 'market': handler = state_market_enter; break;
		case 'forest': handler = state_forest_enter; break;
		case 'plains': handler = state_plains_enter; break;
		case 'desert': handler = state_desert_enter; break;
	}
	state_set(handler);
}

function chance(val)
{
	return (Math.random() < val);
}

function begin()
{
	gTileElements   = document.getElementById('map').getElementsByTagName('td');
	gPlayerElement  = document.getElementById('player');
	gResultElement  = document.getElementById('result');
	gFlavourElement = document.getElementById('flavour');
	gOptionElements = document.getElementById('options').getElementsByTagName('span');
	
	gMap    = map_create();
	gPlayer = player_create();

	gFarm   = get_tile(gMap, gPlayer.x, gPlayer.y);
	gMarket = get_tile(gMap, gPlayer.x-1, gPlayer.y);

	gFarm.chickens = 3;
	set_result(null);
	state_set(state_farm_enter);

	map_redraw(gMap, gTileElements, gPlayer.x, gPlayer.y);
	player_redraw(gPlayer, gPlayerElement);
}

function choose(choice)
{
	gStateHandler.choose(gPlayer, gMap, current_tile(gMap, gPlayer), choice);

	map_redraw(gMap, gTileElements, gPlayer.x, gPlayer.y);
	player_redraw(gPlayer, gPlayerElement);
}
