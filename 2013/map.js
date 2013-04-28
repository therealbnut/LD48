function get_tile_id(x,y) {return x+','+y;}

function make_tile(type, x, y)
{
	var style   = type;
	var monster = null;
	if (type == 'farm' || type == 'market')
	{
		style = type;
	}
	else
	{
		style   = type+'0'+Math.floor(1+(4*Math.random()));
		monster = monster_create(Math.sqrt(x*x+y*y));
	}
	return 	{type: type, style: style, monster: monster};
}

function _raw_get_tile_type(map, x, y)
{
	var tile = map[get_tile_id(x,y)];
	if (typeof(tile)=='undefined')
		return 'undefined';
	return tile.type;
}

function get_tile(map, x, y)
{
	var idx = get_tile_id(x,y);
	if (typeof(map[idx])=='undefined')
	{
		var has_forest = 0;
		var has_plains = 0;
		var has_desert = 0;
		for (var dy=-1; dy<=1; ++dy)
		for (var dx=-1; dx<=1; ++dx)
		{
			var type = _raw_get_tile_type(x+dx,y+dy);
			has_forest += (type=='forest')?1:0;
			has_plains += (type=='plains')?1:0;
			has_desert += (type=='desert')?1:0;
			if (has_forest>0 && has_desert>0)
			{
				map[idx] = make_tile('plains', x, y);
			}
			else if (has_forest>0)
			{
				map[idx] = make_tile(chance(0.8) ? 'forest' : 'plains', x, y);
			}
			else if (has_desert>0)
			{
				map[idx] = make_tile(chance(0.8) ? 'desert' : 'plains', x, y);
			}
			else
			{
				map[idx] = make_tile(chance(0.3) ? 'plains' : (chance(0.5) ? 'forest' : 'desert'), x, y);
			}
		}
	}
	return map[idx];
}

function map_create()
{
	map = {};
	map[get_tile_id(0,0)]  = make_tile('farm', 0, 0);
	map[get_tile_id(-1,0)] = make_tile('market', -1, 0);
	return map;
}

function map_redraw(map, tiles, x, y)
{
	var i=0;
	for (var dy=-1; dy<=1; ++dy)
	for (var dx=-1; dx<=1; ++dx)
	{
		tiles[i].className = get_tile(map, x+dx, y-dy).style;
		++i;
	}
}
function map_tile_type(map, x, y)
{
	return get_tile(map, x, y)
}
