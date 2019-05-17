var game = new Phaser.Game(600, 700);

var pers = prompt("Veillez indiquer votre nom : ", "")
var acceleration = 660;

var myGame = {

	preload: function()
	{
		//Chargement de médias(images, son, etc...) de mon jeu

		game.load.image('fond', 'assets/fond.png'); // chargement de l'image de fond

		game.load.image('joueur', 'assets/jojo.png');

		game.load.image('enemi', 'assets/balle.png')

	},

	create: function()
	{
		//Affichage de éléments de mon jeu

		game.physics.startSystem(Phaser.Physics.ARCADE); // Appel de la physique avec le mode arcade

		game.add.sprite(0, 130, 'fond'); //Affichage de l'image de fond


		this.joueur = game.add.sprite(300, 600, 'joueur');
		this.joueur.anchor.set(0.5);
		game.physics.arcade.enable(this.joueur); //Application de la physique à notre joueur

		this.cursor = game.input.keyboard.createCursorKeys(); // accés aux touches

		this.enemis = game.add.group() //Forme un groupe d'enemi

		this.timer = game.time.events.loop(200, this.ajoutEnemi, this);

		//Partie score

		this.score = 0;

		this.labelScore = game.add.text(20, 20, "0", {font: '30px Arial', fill: '#fff'});

		this.labelName = game.add.text(20, 80, pers, {font: '20px Arial', fill: '#fff'});

		this.labelAutor = game.add.text(20, 660, "By David Dem", {font: '20px Arial italic', fill: 'aqua'});



	},
	update: function()
	{

		//Toutes la logique de mon jeu
		game.physics.arcade.overlap(this.joueur, this.enemis, this.RecomGame, null, this);

		this.joueur.body.velocity.x = 0;
		this.joueur.body.velocity.y = 0;


		if(this.cursor.left.isDown)
		{
			this.joueur.body.velocity.x = acceleration * -1 ;
		}

		if(this.cursor.right.isDown)
		{
			this.joueur.body.velocity.x =acceleration ;
		}

		if(this.cursor.up.isDown)
		{
			this.joueur.body.velocity.y = acceleration * -1 ;
		}

		if(this.cursor.down.isDown)
		{
			this.joueur.body.velocity.y =acceleration ;
		}

		if(this.joueur.inWorld == false)
		{
			this.RecomGame();
		}

	},

	RecomGame: function()
	{
		
		game.state.start('Voyage');
	},

	ajoutEnemi: function()
	{
		var position = Math.floor(Math.random() * 550) + 1;

		var enemi = game.add.sprite(position, -50, 'enemi'); //Position
		game.physics.arcade.enable(enemi);
		enemi.body.gravity.y = 200 //J'utilise les enemis Pour faire tombé les énémis vers le bas 

		this.enemis.add(enemi) // Ajoute l'enemi dans le groupe enemis

		this.score += 10;
		this.labelScore.text = this.score;

		enemi.checkWorldBounds = true;
		enemi.outOfBoundsKill = true;
	}
};


game.state.add('Voyage', myGame);

game.state.start('Voyage');