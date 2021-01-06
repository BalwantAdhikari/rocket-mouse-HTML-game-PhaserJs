import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
import AnimationKeys from '../consts/AnimationKeys'
import RocketMouse from '~/game/RocketMouse'

export default class Preloader extends Phaser.Scene
{
        constructor()
        {
            super(SceneKeys.Preloader)
        }

        preload()
        {
            this.load.image(
                TextureKeys.Background,
                'house/bg_repeat_340x640.png'
            )

            this.load.image(
                TextureKeys.MouseHole,
                'house/object_mousehole.png'
            )

            this.load.image(TextureKeys.Window1, 'house/object_window1.png')
            this.load.image(TextureKeys.Window2, 'house/object_window2.png')
            this.load.image(TextureKeys.Bookcase1, 'house/object_bookcase1.png')
            this.load.image(TextureKeys.Bookcase2, 'house/object_bookcase2.png')
            this.load.image(TextureKeys.LaserEnd, 'house/object_laser_end.png')
            this.load.image(TextureKeys.LaserMiddle, 'house/object_laser.png')

            // load as an atlas
            this.load.atlas(
                TextureKeys.RocketMouse,
                'characters/rocket-mouse.png',
                'characters/rocket-mouse.json'
            )
        }

        create()
        {
            // create the run animation
            this.anims.create({
                key: AnimationKeys.RocketMouseRun, // name of this animation
                // helper to generate frames
                frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
                    start: 1,
                    end: 4,
                    prefix: 'rocketmouse_run',
                    zeroPad: 2,
                    suffix: '.png'
                }),
                frameRate: 10,
                repeat: -1 // -1 to loop forever
            })

            // fall animation
            this.anims.create({
                key: AnimationKeys.RocketMouseFall,
                frames: [{
                    key: TextureKeys.RocketMouse,
                    frame: 'rocketmouse_fall01.png'
                }]
            })

            // fly animation
            this.anims.create({
                key: AnimationKeys.RocketMouseFly,
                frames: [{
                    key: TextureKeys.RocketMouse,
                    frame: 'rocketmouse_fly01.png'
                }]
            })

            // create the flames animation
            this.anims.create({
                key: AnimationKeys.RocketFlamesOn,
                frames: this.anims.generateFrameNames(TextureKeys.RocketMouse,{
                    start: 1,
                    end: 2,
                    prefix: 'flame',
                    suffix: '.png'
                }),
                frameRate: 10,
                repeat: -1
            })

            // create the dead animation
            this.anims.create({
                key: AnimationKeys.RocketMouseDead,
                frames: this.anims.generateFrameNames(TextureKeys.RocketMouse,
                    {
                        start: 1,
                        end: 2,
                        prefix: 'rocketmouse_dead',
                        zeroPad: 2,
                        suffix: '.png'
                    }),
                    frameRate: 10
            })

            // now start the game scene
            this.scene.start(SceneKeys.Game)
        }
}