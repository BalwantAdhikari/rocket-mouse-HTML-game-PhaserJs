import Phaser from 'phaser'

import SceneKeys from '../consts/SceneKeys'

export default class GameOver extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.GameOver)
    }

    create()
    {
        // object destructuring
        const { width, height } = this.scale

        // x, y will be middle of screen
        const x = width * 0.5
        const y = height * 0.5

        // add the text with some styling
        this.add.text(x, y, 'Press SPACE to Play Again', {
            fontSize: '32px',
            color: '#FFFFFF',
            backgroundColor: '#000000',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)

        // listen for the Space bar getting pressed once
        this.input.keyboard.once('keydown-SPACE', () => {
            // stop the GameOver scene
            this.scene.stop(SceneKeys.GameOver)

            // stop and restart the Game scene
            this.scene.stop(SceneKeys.Game)
            this.scene.start(SceneKeys.Game)
        })
    }
}