const avatars = [
  'https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_545452.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_A06A42.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_C18D42.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_FF4500.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_FF8717.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_FFB000.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_FFD635.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_DDBD37.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_D4E815.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_94E044.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_46A508.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_46D160.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_0DD3BB.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_25B79F.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_008985.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_0079D3.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_7193FF.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_4856A3.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_7E53C1.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_FF66AC.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_DB0064.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_EA0027.png',
  'https://www.redditstatic.com/avatars/avatar_default_02_FF585B.png'

]

const getRandomAvatar = () => {
  return avatars[Math.floor(Math.random() * avatars.length)];
}

export { getRandomAvatar }
