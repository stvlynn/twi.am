import type { MBTIResponse } from '../types/mbti';

export function encodeData(data: MBTIResponse['data']['outputs']) {
  if (!data) return '';
  // 只编码需要的字段
  const shareData = {
    mbti: data.mbti,
    IE_report: data.IE_report,
    SN_report: data.SN_report,
    TF_report: data.TF_report,
    JP_report: data.JP_report,
    celebrity: data.celebrity,
    celebrity_report: data.celebrity_report
  };
  return btoa(encodeURIComponent(JSON.stringify(shareData)));
}

export function decodeData(encoded: string): MBTIResponse['data']['outputs'] | null {
  try {
    const decoded = decodeURIComponent(atob(encoded));
    return JSON.parse(decoded);
  } catch (e) {
    console.error('Failed to decode share data:', e);
    return null;
  }
}

export function getShareUrl(data: MBTIResponse['data']['outputs']) {
  const baseUrl = window.location.origin + window.location.pathname;
  const encoded = encodeData(data);
  return encoded ? `${baseUrl}?data=${encoded}` : baseUrl;
}

export function getDataFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('data');
}
