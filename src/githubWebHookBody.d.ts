export interface IGithubWebhookBody {
  action: string;
  label: {
    name: string;
  };
  pull_request: {
    number: number;
    url: string;
  };
}
