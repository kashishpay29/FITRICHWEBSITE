/**
 * Photography used across the site — all vegetarian dishes and spices.
 * These are royalty-free Unsplash placeholders; swap any entry for FitRich's own photography.
 */
const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export const img = (id, w) => unsplash(id, w)

export const images = {
  // Spices
  heroSpoons: '1509358271058-acd22cc93898',
  spiceBowls: '1532336414038-cf19250c5757',
  spiceFlatlay: '1596040033229-a9821ebd058d',
  // Vegetarian dishes
  vegThali: '1589778655375-3e622a9fc91c',
  paneerMakhani: '1631452180539-96aca7d48617',
  palakPaneer: '1589647363585-f4a7d3877b10',
  paneerCurry: '1589135233689-d56032e9680a',
  paneerTikka: '1567188040759-fb8a883dc6d8',
  paneerRice: '1588166524941-3bf61a9c41db',
  dalTadka: '1755090154817-58d9d36ec988',
  dalRice: '1756821753226-c0fc88056cf7',
  choleBhature: '1788602564560-9bcbf0f9acb6',
  vegBiryani: '1697155406055-2db32d47ca07',
  bhindi: '1788621138183-dda1ef14b032',
  masalaDosa: '1668236543090-82eba5ee5976',
  dosaLeaf: '1743517894265-c86ab035adef',
  bananaLeaf: '1625398407796-82650a8c135f',
  paniPuri: '1586357507341-3fbe59f2a5d9',
  chaat: '1610192244261-3f33de3f55e4',
  samosa: '1601050690597-df0568f70950',
  samosaPlatter: '1601050690117-94f5f6fa8bd7',
  pavBhaji: '1606491956689-2ea866880c84',
}
