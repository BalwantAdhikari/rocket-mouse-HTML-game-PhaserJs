import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    preload()
    {
        this.load.image('background', 'house/bg_repeat_340x640.png')

        // load as an atlas
        this.load.atlas(
            'rocket-mouse',
            'characters/rocket-mouse.png',
            'characters/rocket-mouse.json'
        )
    }

    create()
    {
        // store the width and height of the game screen
        const width = this.scale.width
        const height = this.scale.height

        this.add.tileSprite(0, 0, width, height, 'background')
            .setOrigin(0)

        this.add.sprite(
            width * 0.5, // middle of screen
            height * 0.5,
            'rocket-mouse', // atlas key given in preload()
            'rocketmouse_fly01.png'
        )
    }

}