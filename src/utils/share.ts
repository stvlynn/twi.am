import type { MBTIResponse } from '../types/mbti';
import axios from 'axios';

interface ShareData {
  userId: string;
  outputs: MBTIResponse['data']['outputs'];
}

interface ShortLinkResponse {
  link: {
    id: string;
    url: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }
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

export async function getShareUrl(data: MBTIResponse['data']['outputs'], userId: string) {
  const shortenerUrl = import.meta.env.VITE_SHORTENER_URL;
  
  // 直接返回短链接，因为它已经在 Dify 响应后创建了
  if (shortenerUrl) {
    return `${shortenerUrl}/${userId}`;
  }

  // 如果没有配置短链接服务，返回长链接
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const baseUrl = `${appUrl}${window.location.pathname}`;
  const encoded = encodeData(data, userId);
  return encoded ? `${baseUrl}?data=${encoded}` : baseUrl;
}

export function getDataFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('data');
}
