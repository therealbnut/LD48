var monster_fight = {
	
};

function monster_create(dist)
{
	var level = Math.ceil(dist*(Math.random()*0.5+0.5));
	return {
		name:   "3 headed purple people eater",
		level:  level,
		damage: [4, 10],
		health: 100
	};
}
