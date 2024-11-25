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
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const baseUrl = `${appUrl}${window.location.pathname}`;
  const encoded = encodeData(data, userId);
  const longUrl = encoded ? `${baseUrl}?data=${encoded}` : baseUrl;

  // 如果没有配置短链接服务，直接返回长链接
  const shortenerUrl = import.meta.env.VITE_SHORTENER_URL;
  const shortenerToken = import.meta.env.VITE_SHORTENER_TOKEN;
  if (!shortenerUrl || !shortenerToken) {
    return longUrl;
  }

  try {
    // 发送创建短链接的请求
    const response = await axios.post<ShortLinkResponse>(
      `${shortenerUrl}/api/link/create`,
      {
        url: longUrl,
        slug: userId
      },
      {
        headers: {
          'Authorization': `Bearer ${shortenerToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 9000 // 设置9秒超时
      }
    );

    // 检查响应是否包含有效的link对象
    if (response.data?.link?.slug) {
      return `${shortenerUrl}/${response.data.link.slug}`;
    }

    // 如果响应格式不正确，返回长链接
    console.error('Invalid short link response:', response.data);
    return longUrl;
  } catch (e) {
    console.error('Failed to create short url:', e);
    return longUrl;
  }
}

export function getDataFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('data');
}
