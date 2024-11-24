import type { MBTIResponse } from '../types/mbti';

interface ShareData {
  userId: string;
  outputs: MBTIResponse['data']['outputs'];
}

export function encodeData(data: MBTIResponse['data']['outputs'], userId: string) {
  if (!data) return '';
  // 包含用户ID和分析结果
  const shareData: ShareData = {
    userId,
    outputs: {
      mbti: data.mbti,
      IE_report: data.IE_report,
      SN_report: data.SN_report,
      TF_report: data.TF_report,
      JP_report: data.JP_report,
      celebrity: data.celebrity,
      celebrity_report: data.celebrity_report
    }
  };
  return btoa(encodeURIComponent(JSON.stringify(shareData)));
}

export function decodeData(encoded: string): ShareData | null {
  try {
    const decoded = decodeURIComponent(atob(encoded));
    return JSON.parse(decoded);
  } catch (e) {
    console.error('Failed to decode share data:', e);
    return null;
  }
}

export function getShareUrl(data: MBTIResponse['data']['outputs'], userId: string) {
  const baseUrl = window.location.origin + window.location.pathname;
  const encoded = encodeData(data, userId);
  return encoded ? `${baseUrl}?data=${encoded}` : baseUrl;
}

export function getDataFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('data');
}
