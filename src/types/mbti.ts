export interface MBTIResponse {
  event: string;
  data: {
    outputs: {
      mbti: string;
      IE_report: string;
      SN_report: string;
      TF_report: string;
      JP_report: string;
      celebrity: string;
      celebrity_report: string;
    };
  };
}

export interface ErrorState {
  message: string;
  code?: string;
}