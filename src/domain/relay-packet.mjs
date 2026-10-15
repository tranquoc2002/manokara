/** Wire-compatible patches compare with the last acknowledged complete scene. */
const dynamicFields = new Set(['writerId', 'time', 'playlistTime', 'sampledAt', 'playing', 'paused',
  'counting', 'countdownRemaining', 'uploadDelayMs', 'audioPower', 'audioBass', 'audioLowMid',
  'audioMid', 'audioVocal', 'audioTreble']);

export function createRelayPacket(snapshot, previous) {
  const keys = Object.keys(snapshot);
  // A removed field cannot be expressed by a merge patch; send a full replacement.
  const partial = !!previous && keys.length === Object.keys(previous).length &&
    keys.every(key => Object.hasOwn(previous, key) && (dynamicFields.has(key) || Object.is(snapshot[key], previous[key])));
  if (!partial) return { partial: false, packet: snapshot };
  return { partial: true, packet: Object.fromEntries(keys.filter(key => key === 'writerId' ||
    dynamicFields.has(key) && !Object.is(snapshot[key], previous[key])).map(key => [key, snapshot[key]])) };
}
