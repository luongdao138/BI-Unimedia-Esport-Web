// Default options for the plugin.

const onPlayerReady = (
  player: {
    addClass: (arg0: string) => void
    addChild: any
    controlBar: {
      seekForward: any
      addChild: any
      seekBack: any
      liveDuration: any
    }
    bigPlayButton: any
  },
  options: {
    forward: number
    forwardIndex: any
    back: number
    backIndex: any
    time?: number
    timeDisplay?: boolean
  }
) => {
  player.addClass('vjs-seek-buttons')

  if (options.forward && options.forward > 0) {
    player.controlBar.seekForward = player.controlBar.addChild(
      'seekButton',
      {
        direction: 'forward',
        seconds: options.forward,
      },
      options.forwardIndex
    )
    player.bigPlayButton.addChild(
      'seekButton',
      {
        direction: 'forward',
        seconds: options.forward,
      },
      options.forwardIndex
    )
  }

  if (options.back && options.back > 0) {
    player.controlBar.seekBack = player.controlBar.addChild(
      'seekButton',
      {
        direction: 'back',
        seconds: options.back,
      },
      options.backIndex
    )
    player.bigPlayButton.addChild(
      'seekButton',
      {
        direction: 'back',
        seconds: options.back,
      },
      options.backIndex
    )
  }

  if (options.timeDisplay && options.time && options.time >= 0) {
    player.controlBar.liveDuration = player.controlBar.addChild('seekButton', {
      direction: 'time',
      seconds: options.time,
    })
  }
}

export default onPlayerReady
