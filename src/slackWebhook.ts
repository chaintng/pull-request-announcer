import axios from "axios";
import {distanceInWords} from "date-fns";
import {IEachLabelConfig} from "./config";
import configJson from "./config.json";

export const announce = (
  announcementConfig: IEachLabelConfig,
  prNumber: number,
  prUrl: string,
  firstAnnounce: Date) => {
    axios.post(configJson.slackWebhookUrl, {
      channel: `#${announcementConfig.slackChannel}`,
      icon_emoji: ":memo:",
      text: `${announcementConfig.slackText} <${prUrl}>, [Since: ${distanceInWords(new Date(), firstAnnounce)} ago]`,
      username: "PR Announcer",
    });
};
