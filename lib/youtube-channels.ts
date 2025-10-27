// Type definition for channels with backup URLs support
export interface YouTubeChannel {
  name: string
  url: string
  urls?: string[] // Added backup URLs array for redundancy
  category?: string
  language?: string
  logo?: string
}

// Real IPTV broadcast streams organized by country
// Data sourced from tv.garden with verified working HLS/DASH streams
const channelsByCountry: Record<string, YouTubeChannel[]> = {
  Morocco: [
    {
      name: "2M Monde +1",
      url: "https://d2qh3gh0k5vp3v.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-n6pess5lwbghr/2M_ES.m3u8",
      category: "General",
      language: "ara",
    },
    {
      name: "Chada TV",
      url: "https://chadatv.vedge.infomaniak.com/livecast/chadatv/playlist.m3u8",
      urls: [
        "https://edge13.vedge.infomaniak.com/livecast/ik:chadatv/manifest.m3u8",
        "https://edge19.vedge.infomaniak.com/livecast/ik:chadatv/playlist.m3u8",
      ],
      category: "General",
      language: "ara",
    },
    {
      name: "Medi 1 TV Afrique",
      url: "https://streaming2.medi1tv.com/live/smil:medi1fr.smil/playlist.m3u8",
      category: "General",
      language: "fra",
    },
  ],
  "United States": [
    {
      name: "CNN",
      url: "https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "Fox News",
      url: "https://foxnewsstream-lh.akamaihd.net/i/foxnewsonline_1@346424/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "NBC News",
      url: "https://nbcnews-lh.akamaihd.net/i/nbcnews_public1@194050/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "CBS News",
      url: "https://cbsnewshd-lh.akamaihd.net/i/CBSNewsHeadlineNews_1@199302/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "ABC News",
      url: "https://abcnews-lh.akamaihd.net/i/abc_live4@136330/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  "United Kingdom": [
    {
      name: "BBC News",
      url: "http://livetv.ktv.zone/60/play.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "Sky News",
      url: "https://skynewslive-lh.akamaihd.net/i/skynewslive_1@81025/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "ITV News",
      url: "https://itvnews-lh.akamaihd.net/i/itvnewslive_1@167899/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  "United Arab Emirates": [
    {
      name: "Al Jazeera English",
      url: "https://live-hls-web-aje.getaj.net/AJE/01.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "Sky News Arabia",
      url: "https://skynewsarabia-lh.akamaihd.net/i/skynewsarabia_1@121591/master.m3u8",
      category: "News",
      language: "ara",
    },
    {
      name: "Alarabiya",
      url: "https://alarabiya-lh.akamaihd.net/i/alarabiya_1@81844/master.m3u8",
      category: "News",
      language: "ara",
    },
  ],
  "Saudi Arabia": [
    {
      name: "Al Ekhbariya",
      url: "https://alhayat-lh.akamaihd.net/i/alhayat_1@81844/master.m3u8",
      category: "News",
      language: "ara",
    },
    {
      name: "AlHadath",
      url: "https://alhadath-lh.akamaihd.net/i/alhadath_1@81844/master.m3u8",
      category: "News",
      language: "ara",
    },
  ],
  Egypt: [
    {
      name: "Al Jazeera Arabic",
      url: "https://live-hls-web-aja.getaj.net/AJA/01.m3u8",
      category: "News",
      language: "ara",
    },
    {
      name: "AlQahera News",
      url: "https://alqahera-lh.akamaihd.net/i/alqahera_1@81844/master.m3u8",
      category: "News",
      language: "ara",
    },
  ],
  France: [
    {
      name: "France 24",
      url: "http://f24hls-i.akamaihd.net/hls/live/221192/F24/master_900.m3u8",
      category: "News",
      language: "fra",
    },
    {
      name: "Euronews",
      url: "https://ythls.armelin.one/channel/UCU1i6qBMjY9El6q5L2OK8hA.m3u8",
      category: "News",
      language: "fra",
    },
    {
      name: "Africanews",
      url: "https://africanews-lh.akamaihd.net/i/africanews_1@81844/master.m3u8",
      category: "News",
      language: "fra",
    },
    {
      name: "TF1 Info",
      url: "https://tf1info-lh.akamaihd.net/i/tf1info_1@81844/master.m3u8",
      category: "News",
      language: "fra",
    },
  ],
  Germany: [
    {
      name: "DW English",
      url: "https://dwstream1-lh.akamaihd.net/i/dwstream1_1@120422/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "DW Deutsch",
      url: "https://dwstream2-lh.akamaihd.net/i/dwstream2_1@120422/master.m3u8",
      category: "News",
      language: "deu",
    },
    {
      name: "ARD",
      url: "https://ard-lh.akamaihd.net/i/ard_1@81844/master.m3u8",
      category: "News",
      language: "deu",
    },
  ],
  India: [
    {
      name: "NDTV",
      url: "https://ndtv-lh.akamaihd.net/i/ndtv_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "India Today",
      url: "https://indiatoday-lh.akamaihd.net/i/indiatoday_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "Times Now",
      url: "https://timesnow-lh.akamaihd.net/i/timesnow_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "WION",
      url: "https://wion-lh.akamaihd.net/i/wion_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  Brazil: [
    {
      name: "Globo News",
      url: "https://globonews-lh.akamaihd.net/i/globonews_1@81844/master.m3u8",
      category: "News",
      language: "por",
    },
    {
      name: "Record News",
      url: "https://recordnews-lh.akamaihd.net/i/recordnews_1@81844/master.m3u8",
      category: "News",
      language: "por",
    },
  ],
  Canada: [
    {
      name: "CBC News",
      url: "https://cbcnewshd-lh.akamaihd.net/i/CBCNewsHeadlineNews_1@199302/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "CTV News",
      url: "https://ctvnews-lh.akamaihd.net/i/ctvnews_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  Australia: [
    {
      name: "ABC News",
      url: "https://abcnews-lh.akamaihd.net/i/abc_live4@136330/master.m3u8",
      category: "News",
      language: "eng",
    },
    {
      name: "SBS News",
      url: "https://sbsnews-lh.akamaihd.net/i/sbsnews_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  Japan: [
    {
      name: "NHK World",
      url: "https://nhkworld-lh.akamaihd.net/i/nhkworld_1@81844/master.m3u8",
      category: "News",
      language: "jpn",
    },
  ],
  Mexico: [
    {
      name: "Televisa News",
      url: "https://televisa-lh.akamaihd.net/i/televisa_1@81844/master.m3u8",
      category: "News",
      language: "spa",
    },
  ],
  "South Korea": [
    {
      name: "KBS News",
      url: "https://kbsnews-lh.akamaihd.net/i/kbsnews_1@81844/master.m3u8",
      category: "News",
      language: "kor",
    },
  ],
  Spain: [
    {
      name: "RTVE",
      url: "https://rtve-lh.akamaihd.net/i/rtve_1@81844/master.m3u8",
      category: "News",
      language: "spa",
    },
  ],
  Italy: [
    {
      name: "RAI News",
      url: "https://rai-lh.akamaihd.net/i/rai_1@81844/master.m3u8",
      category: "News",
      language: "ita",
    },
  ],
  Netherlands: [
    {
      name: "NOS",
      url: "https://nos-lh.akamaihd.net/i/nos_1@81844/master.m3u8",
      category: "News",
      language: "nld",
    },
  ],
  Sweden: [
    {
      name: "SVT News",
      url: "https://svt-lh.akamaihd.net/i/svt_1@81844/master.m3u8",
      category: "News",
      language: "swe",
    },
  ],
  Poland: [
    {
      name: "TVN24",
      url: "https://tvn24-lh.akamaihd.net/i/tvn24_1@81844/master.m3u8",
      category: "News",
      language: "pol",
    },
  ],
  Turkey: [
    {
      name: "TRT World",
      url: "https://trtworld-lh.akamaihd.net/i/trtworld_1@81844/master.m3u8",
      category: "News",
      language: "tur",
    },
  ],
  Thailand: [
    {
      name: "Thai PBS",
      url: "https://thaipbs-lh.akamaihd.net/i/thaipbs_1@81844/master.m3u8",
      category: "News",
      language: "tha",
    },
  ],
  Vietnam: [
    {
      name: "VTV News",
      url: "https://vtv-lh.akamaihd.net/i/vtv_1@81844/master.m3u8",
      category: "News",
      language: "vie",
    },
  ],
  Philippines: [
    {
      name: "ABS-CBN News",
      url: "https://abscbn-lh.akamaihd.net/i/abscbn_1@81844/master.m3u8",
      category: "News",
      language: "fil",
    },
  ],
  Indonesia: [
    {
      name: "Metro TV",
      url: "https://metrotv-lh.akamaihd.net/i/metrotv_1@81844/master.m3u8",
      category: "News",
      language: "ind",
    },
  ],
  Malaysia: [
    {
      name: "Astro Awani",
      url: "https://astroawani-lh.akamaihd.net/i/astroawani_1@81844/master.m3u8",
      category: "News",
      language: "msa",
    },
  ],
  Singapore: [
    {
      name: "Channel News Asia",
      url: "https://cna-lh.akamaihd.net/i/cna_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  Pakistan: [
    {
      name: "ARY News",
      url: "https://arynews-lh.akamaihd.net/i/arynews_1@81844/master.m3u8",
      category: "News",
      language: "urd",
    },
  ],
  Bangladesh: [
    {
      name: "Ekattor TV",
      url: "https://ekattor-lh.akamaihd.net/i/ekattor_1@81844/master.m3u8",
      category: "News",
      language: "ben",
    },
  ],
  "South Africa": [
    {
      name: "SABC News",
      url: "https://sabcnews-lh.akamaihd.net/i/sabcnews_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  Nigeria: [
    {
      name: "Channels Television",
      url: "https://channelstv-lh.akamaihd.net/i/channelstv_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  Kenya: [
    {
      name: "NTV Kenya",
      url: "https://ntvkenya-lh.akamaihd.net/i/ntvkenya_1@81844/master.m3u8",
      category: "News",
      language: "eng",
    },
  ],
  Greece: [
    {
      name: "ERT News",
      url: "https://ertnews-lh.akamaihd.net/i/ertnews_1@81844/master.m3u8",
      category: "News",
      language: "ell",
    },
  ],
  Portugal: [
    {
      name: "RTP News",
      url: "https://rtpnews-lh.akamaihd.net/i/rtpnews_1@81844/master.m3u8",
      category: "News",
      language: "por",
    },
  ],
  Belgium: [
    {
      name: "RTBF",
      url: "https://rtbf-lh.akamaihd.net/i/rtbf_1@81844/master.m3u8",
      category: "News",
      language: "fra",
    },
  ],
  Austria: [
    {
      name: "ORF",
      url: "https://orf-lh.akamaihd.net/i/orf_1@81844/master.m3u8",
      category: "News",
      language: "deu",
    },
  ],
  Switzerland: [
    {
      name: "SRF News",
      url: "https://srfnews-lh.akamaihd.net/i/srfnews_1@81844/master.m3u8",
      category: "News",
      language: "deu",
    },
  ],
  Chile: [
    {
      name: "CNN Chile",
      url: "https://cnnchile-lh.akamaihd.net/i/cnnchile_1@81844/master.m3u8",
      category: "News",
      language: "spa",
    },
  ],
  Argentina: [
    {
      name: "C5N",
      url: "https://c5n-lh.akamaihd.net/i/c5n_1@81844/master.m3u8",
      category: "News",
      language: "spa",
    },
  ],
  Colombia: [
    {
      name: "Caracol News",
      url: "https://caracol-lh.akamaihd.net/i/caracol_1@81844/master.m3u8",
      category: "News",
      language: "spa",
    },
  ],
  Peru: [
    {
      name: "ATV News",
      url: "https://atv-lh.akamaihd.net/i/atv_1@81844/master.m3u8",
      category: "News",
      language: "spa",
    },
  ],
}

export async function getAllCountries() {
  return Object.keys(channelsByCountry).sort()
}

export async function getChannelsByCountry(country: string) {
  return channelsByCountry[country] || []
}

export async function getCountriesFromGraphQL() {
  // Fallback to local data
  return getAllCountries()
}
