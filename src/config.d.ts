export interface IConfig {
  slackWebhookUrl: string;
  watchLabels: IEachLabelConfig[];
}

interface IEachLabelConfig {
  label: string;
  slackText: string;
  slackChannel: string;
  intervalMs: number;
}
