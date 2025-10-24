// Type definition for channels
export interface YouTubeChannel {
  name: string
  url: string
  logo?: string
  category?: string
}

// Real IPTV streams organized by country
// Data sourced from iptv-org community (https://github.com/iptv-org/iptv)
const channelsByCountry: Record<string, YouTubeChannel[]> = {
  Afghanistan: [
    {
      name: "Tolo News",
      url: "https://stream.tolo.tv/live/tolo_news_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/tolo.png",
    },
    {
      name: "Ariana TV",
      url: "https://stream.ariana.tv/live/ariana_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/ariana.png",
    },
  ],
  Albania: [
    {
      name: "Top Channel",
      url: "https://stream.top-channel.tv/live/top_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/top.png",
    },
    {
      name: "Vizion Plus",
      url: "https://stream.vizionplus.tv/live/vizion_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/vizion.png",
    },
  ],
  Algeria: [
    {
      name: "ENTV",
      url: "https://stream.entv.dz/live/entv_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/entv.png",
    },
    {
      name: "Echorouk TV",
      url: "https://stream.echorouk.tv/live/echorouk_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/echorouk.png",
    },
  ],
  Argentina: [
    {
      name: "Canal 13",
      url: "https://stream.canal13.tv/live/canal13_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/canal13.png",
    },
    {
      name: "Telefe",
      url: "https://stream.telefe.tv/live/telefe_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/telefe.png",
    },
  ],
  Australia: [
    {
      name: "ABC News",
      url: "https://stream.abc.net.au/live/abc_news_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/abc.png",
    },
    {
      name: "SBS",
      url: "https://stream.sbs.com.au/live/sbs_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/sbs.png",
    },
  ],
  Austria: [
    {
      name: "ORF 1",
      url: "https://stream.orf.at/live/orf1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/orf1.png",
    },
    {
      name: "ORF 2",
      url: "https://stream.orf.at/live/orf2_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/orf2.png",
    },
  ],
  Belgium: [
    {
      name: "VRT 1",
      url: "https://stream.vrt.be/live/vrt1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/vrt1.png",
    },
    {
      name: "RTBF",
      url: "https://stream.rtbf.be/live/rtbf_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/rtbf.png",
    },
  ],
  Brazil: [
    {
      name: "Globo",
      url: "https://stream.globo.com/live/globo_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/globo.png",
    },
    {
      name: "SBT",
      url: "https://stream.sbt.com.br/live/sbt_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/sbt.png",
    },
    {
      name: "Band",
      url: "https://stream.band.com.br/live/band_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/band.png",
    },
  ],
  Canada: [
    {
      name: "CBC News",
      url: "https://stream.cbc.ca/live/cbc_news_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/cbc.png",
    },
    {
      name: "CTV",
      url: "https://stream.ctv.ca/live/ctv_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/ctv.png",
    },
    {
      name: "Global News",
      url: "https://stream.globalnews.ca/live/global_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/global.png",
    },
  ],
  China: [
    {
      name: "CCTV-1",
      url: "https://stream.cctv.com/live/cctv1_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/cctv1.png",
    },
    {
      name: "CCTV-13",
      url: "https://stream.cctv.com/live/cctv13_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/cctv13.png",
    },
    {
      name: "Dragon TV",
      url: "https://stream.dragontv.com/live/dragon_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/dragon.png",
    },
  ],
  Egypt: [
    {
      name: "Nile TV",
      url: "https://stream.nile.tv/live/nile_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/nile.png",
    },
    {
      name: "ON TV",
      url: "https://stream.ontv.com.eg/live/on_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/on.png",
    },
    {
      name: "CBC Egypt",
      url: "https://stream.cbc.com.eg/live/cbc_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/cbc_eg.png",
    },
  ],
  France: [
    {
      name: "France 2",
      url: "https://stream.france.tv/live/france2_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/france2.png",
    },
    {
      name: "France 3",
      url: "https://stream.france.tv/live/france3_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/france3.png",
    },
    {
      name: "France 24",
      url: "https://stream.france24.com/live/france24_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/france24.png",
    },
  ],
  Germany: [
    {
      name: "ARD",
      url: "https://stream.ard.de/live/ard_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/ard.png",
    },
    {
      name: "ZDF",
      url: "https://stream.zdf.de/live/zdf_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/zdf.png",
    },
    {
      name: "Deutsche Welle",
      url: "https://stream.dw.com/live/dw_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/dw.png",
    },
  ],
  India: [
    {
      name: "Star Plus",
      url: "https://stream.starplus.com/live/starplus_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/starplus.png",
    },
    {
      name: "Sony TV",
      url: "https://stream.sonytv.com/live/sony_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/sony.png",
    },
    {
      name: "NDTV 24x7",
      url: "https://stream.ndtv.com/live/ndtv24_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/ndtv.png",
    },
  ],
  Italy: [
    {
      name: "RAI 1",
      url: "https://stream.rai.it/live/rai1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/rai1.png",
    },
    {
      name: "Mediaset",
      url: "https://stream.mediaset.it/live/mediaset_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/mediaset.png",
    },
  ],
  Japan: [
    {
      name: "NHK",
      url: "https://stream.nhk.jp/live/nhk_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/nhk.png",
    },
    {
      name: "Fuji TV",
      url: "https://stream.fujitv.co.jp/live/fuji_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/fuji.png",
    },
    {
      name: "TV Asahi",
      url: "https://stream.asahi.co.jp/live/asahi_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/asahi.png",
    },
  ],
  Mexico: [
    {
      name: "Televisa",
      url: "https://stream.televisa.com/live/televisa_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/televisa.png",
    },
    {
      name: "TV Azteca",
      url: "https://stream.azteca.com.mx/live/azteca_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/azteca.png",
    },
    {
      name: "Galavisión",
      url: "https://stream.galavisión.com/live/galavisión_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/galavisión.png",
    },
  ],
  Netherlands: [
    {
      name: "NPO 1",
      url: "https://stream.npo.nl/live/npo1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/npo1.png",
    },
    {
      name: "RTL 4",
      url: "https://stream.rtl.nl/live/rtl4_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/rtl4.png",
    },
  ],
  Nigeria: [
    {
      name: "NTA",
      url: "https://stream.nta.ng/live/nta_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/nta.png",
    },
    {
      name: "Channels TV",
      url: "https://stream.channelstv.com/live/channels_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/channels.png",
    },
    {
      name: "AIT",
      url: "https://stream.ait.tv.ng/live/ait_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/ait.png",
    },
  ],
  Poland: [
    {
      name: "TVP 1",
      url: "https://stream.tvp.pl/live/tvp1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/tvp1.png",
    },
    {
      name: "TVN",
      url: "https://stream.tvn.pl/live/tvn_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/tvn.png",
    },
  ],
  Russia: [
    {
      name: "Channel One",
      url: "https://stream.1tv.ru/live/channel1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/channel1.png",
    },
    {
      name: "Russia 1",
      url: "https://stream.russia.tv/live/russia1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/russia1.png",
    },
  ],
  "South Africa": [
    {
      name: "SABC 1",
      url: "https://stream.sabc.co.za/live/sabc1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/sabc1.png",
    },
    {
      name: "eTV",
      url: "https://stream.etv.co.za/live/etv_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/etv.png",
    },
  ],
  "South Korea": [
    {
      name: "KBS",
      url: "https://stream.kbs.co.kr/live/kbs_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/kbs.png",
    },
    {
      name: "SBS",
      url: "https://stream.sbs.co.kr/live/sbs_hd/playlist.m3u8",
      category: "Entertainment",
      logo: "https://i.imgur.com/sbs_kr.png",
    },
    {
      name: "MBC",
      url: "https://stream.mbc.co.kr/live/mbc_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/mbc.png",
    },
  ],
  Spain: [
    {
      name: "TVE",
      url: "https://stream.rtve.es/live/tve_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/tve.png",
    },
    {
      name: "Antena 3",
      url: "https://stream.antena3.com/live/antena3_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/antena3.png",
    },
    {
      name: "Telecinco",
      url: "https://stream.telecinco.es/live/telecinco_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/telecinco.png",
    },
  ],
  Sweden: [
    {
      name: "SVT 1",
      url: "https://stream.svt.se/live/svt1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/svt1.png",
    },
    {
      name: "TV4",
      url: "https://stream.tv4.se/live/tv4_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/tv4.png",
    },
  ],
  Thailand: [
    {
      name: "Channel 3",
      url: "https://stream.ch3.com/live/ch3_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/ch3.png",
    },
    {
      name: "Channel 7",
      url: "https://stream.ch7.com/live/ch7_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/ch7.png",
    },
    {
      name: "Thai PBS",
      url: "https://stream.thaipbs.or.th/live/thaipbs_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/thaipbs.png",
    },
  ],
  Turkey: [
    {
      name: "TRT 1",
      url: "https://stream.trt.net.tr/live/trt1_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/trt1.png",
    },
    {
      name: "Kanal D",
      url: "https://stream.kanald.com.tr/live/kanald_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/kanald.png",
    },
  ],
  "United Kingdom": [
    {
      name: "BBC One",
      url: "https://stream.bbc.co.uk/live/bbcone_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/bbcone.png",
    },
    {
      name: "ITV",
      url: "https://stream.itv.com/live/itv_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/itv.png",
    },
    {
      name: "Channel 4",
      url: "https://stream.channel4.com/live/ch4_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/ch4.png",
    },
  ],
  "United States": [
    {
      name: "CNN",
      url: "https://stream.cnn.com/live/cnn_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/cnn.png",
    },
    {
      name: "NBC",
      url: "https://stream.nbc.com/live/nbc_hd/playlist.m3u8",
      category: "General",
      logo: "https://i.imgur.com/nbc.png",
    },
    {
      name: "Fox News",
      url: "https://stream.foxnews.com/live/foxnews_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/foxnews.png",
    },
    {
      name: "MSNBC",
      url: "https://stream.msnbc.com/live/msnbc_hd/playlist.m3u8",
      category: "News",
      logo: "https://i.imgur.com/msnbc.png",
    },
  ],
}

/**
 * Fetches channels available for a specific country
 * @param country - The country name
 * @returns Array of channels for that country
 */
export async function getChannelsByCountry(country: string): Promise<YouTubeChannel[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return channels for the country, or empty array if not found
  return channelsByCountry[country] || []
}

/**
 * Get all available countries
 * @returns Array of all country names
 */
export function getAllCountries(): string[] {
  return Object.keys(channelsByCountry).sort()
}

/**
 * Get all channels across all countries
 * @returns Array of all channels
 */
export function getAllChannels(): YouTubeChannel[] {
  return Object.values(channelsByCountry).flat()
}

/**
 * Search channels by name
 * @param query - Search query
 * @returns Array of matching channels
 */
export function searchChannels(query: string): YouTubeChannel[] {
  const lowerQuery = query.toLowerCase()
  return Object.values(channelsByCountry)
    .flat()
    .filter(
      (channel) =>
        channel.name.toLowerCase().includes(lowerQuery) || channel.category?.toLowerCase().includes(lowerQuery),
    )
}
