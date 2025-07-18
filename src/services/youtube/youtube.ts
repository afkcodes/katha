import 'event-target-polyfill';
import 'react-native-url-polyfill/auto';
import 'text-encoding-polyfill';
import 'web-streams-polyfill';
import Innertube, { ClientType } from 'youtubei.js';
import { timeFunction } from '~/utils/common';
import { type ParsedData, parseYouTubeData } from '~/utils/youtube';

let ytClient: undefined | Innertube;

export const createYtClient = () =>
  Innertube.create({
    retrieve_player: true,
    enable_session_cache: false,
    generate_session_locally: false,
    client_type: ClientType.ANDROID,
  });

export const createClient = async () => {
  if (ytClient !== undefined) {
    return ytClient;
  }
  ytClient = (await timeFunction(createYtClient, 'ytClient init')).result;
  return ytClient!;
};

export async function getBasicInfo(videoId: string) {
  try {
    const info = await ytClient?.getBasicInfo(videoId);
    const parsedData: ParsedData = parseYouTubeData(info as any);
    console.log(parsedData);
    return parsedData;
  } catch (error) {
    console.error('Error fetching video info:', error);
  }
}
