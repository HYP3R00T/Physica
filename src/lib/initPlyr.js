import Plyr from 'plyr'

export default () => {
  document.addEventListener('astro:page-load', () => {
    const players = Plyr.setup('#player', {
      controls: [
        'play',
        'progress',
        'current-time',
        'mute',
        // 'volume',
        'settings',
        'fullscreen',
      ],
      settings: ['captions', 'quality', 'speed', 'loop'],
      keyboard: { focused: true },
      autoplay: false,
      ratio: '16:9',
      clickToPlay: true,
      invertTime: false,
      tooltips: { controls: true, seek: true },
      quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      },
      youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
      },
    })

    // Broadcast Plyr events globally so components can react reliably
    if (players && players.length > 0) {
      players.forEach((p) => {
        ;['play', 'playing', 'pause', 'ended'].forEach((eventName) => {
          p.on(eventName, () => {
            document.dispatchEvent(new CustomEvent(`plyr:${eventName}`))
          })
        })
      })
    }

    return players
  })
}
