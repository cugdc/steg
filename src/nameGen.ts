const countryHeaders: string[] = [
  'The Regime of %s',
  'The Federation of %s',
  'Democratic Republic of %s',
  'Principality of %s',
  'The People\'s Republic of %s',
]

const funnyHeaders: string[]  = [
  'The Shallow Pit of %s',
  'The Long Stick of %s',
  '%s is My City',
  '%stown',
  'Grandpa and %s\'s Land',
  'The Fluffy Kingdom of %s',
  '%s is The Senate',
  'The Totally Radical Crib of %s',
]

const regularNames: string[]  = [
  'Evan',
  'Tsarovia',
  'The Great Dutchee',
  'Nenlin',
  'M\'quv',
  'Grant',
  'Order and Peace',
  'David',
  'Steoffani',
  'Litler',
  'Napoli',
  'Arslan',
]

const funnyNames: string[]  = [
  'Napoli the Pig',
  'Skrek\'s Left Nostril',
  'Skrek\'s Right Nostril',
  'Percent S',
  'Obi-Won Chernobi',
  'Kimmie the Wooh',
  'Danny Doledo',
  'Steg',
  'Muscle Leany',
]

export function generateName(isFunny: boolean): string {
  const names = isFunny ? funnyNames : regularNames;
  const headers = isFunny ? funnyHeaders : countryHeaders;

  const headerIdx = Math.floor(Math.random() * headers.length);
  const nameIdx = Math.floor(Math.random() * names.length);

  return headers[headerIdx].replace('%s', names[nameIdx])
}
