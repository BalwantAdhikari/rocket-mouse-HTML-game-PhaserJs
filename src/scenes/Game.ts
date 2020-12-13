import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
import AnimationKeys from '../consts/AnimationKeys'

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite

    private mouseHole!: Phaser.GameObjects.Image

    private window1!: Phaser.GameObjects.Image
    private window2!: Phaser.GameObjects.Image

    constructor()
    {
        super(SceneKeys.Game)
    }

    preload()
    {
        
    }

    create()
    {

        // store the width and height of the game screen
        const width = this.scale.width
        const height = this.scale.height

        this.background = this.add.tileSprite(
            0, 0,
            width, height,
            TextureKeys.Background
        )
        .setOrigin(0)
        .setScrollFactor(0, 0) // keep from scrolling

        this.mouseHole = this.add.image(
            Phaser.Math.Between(900, 1500), // x value
            501, // y value
            TextureKeys.MouseHole
        )

        this.window1 = this.add.image(
            Phaser.Math.Between(900, 1300),
            200,
            TextureKeys.Window1
        )

        this.window2 = this.add.image(
            Phaser.Math.Between(1600, 2000),
            200,
            TextureKeys.Window2
        )

        const mouse = this.physics.add.sprite(
            width * 0.5, // middle of screen
            height - 30,
            TextureKeys.RocketMouse, // atlas key given in preload()
            'rocketmouse_fly01.png'
        )
        .setOrigin(0.5, 1) // set origin to feet
        .play(AnimationKeys.RocketMouseRun)

        const body = mouse.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)

        body.setVelocityX(200)

        this.physics.world.setBounds(
            0, 0, // x, y
            Number.MAX_SAFE_INTEGER, height - 30 // width and height
        )

        this.cameras.main.startFollow(mouse)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
    }

    update(t: number, dt: number)
    {
        this.wrapMouseHole()

        this.wrapWindows()

        // scroll the background
        this.background.setTilePosition(this.cameras.main.scrollX)
    }

    private wrapMouseHole()
    {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        if (this.mouseHole.x + this.mouseHole.width < scrollX)
        {
            this.mouseHole.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 1000
            )
        }
    }

    private wrapWindows()
    {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        let width = this.window1.width * 2 // doubled to add some padding
        if(this.window1.x + width < scrollX)
        {
            this.window1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )
        }

        width = this.window2.width * 2
        if(this.window2.x + width < scrollX)
        {
            this.window2.x = Phaser.Math.Between(
                this.window1.x + width,
                this.window1.x + width + 800
            )
        }
    }

}