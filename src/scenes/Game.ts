import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
import AnimationKeys from '../consts/AnimationKeys'

export default class Game extends Phaser.Scene
{
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

        this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
            .setOrigin(0)

        this.add.sprite(
            width * 0.5, // middle of screen
            height * 0.5,
            TextureKeys.RocketMouse, // atlas key given in preload()
            'rocketmouse_fly01.png'
        )
        .play(AnimationKeys.RocketMouseRun)
    }

}