import Koa from "koa";
import bodyParser from "koa-bodyparser-ts";
import Router from "koa-router";
import * as Announcement from "./announcements";
import {IConfig, IEachLabelConfig} from "./config";
import configJson from "./config.json";
import {IGithubWebhookBody} from "./githubWebHookBody";
import * as SlackWebhook from "./slackWebhook";

const app = new Koa();
const router = new Router();

function findAnnouncementConfig(label: string): IEachLabelConfig {
  const config = configJson as IConfig;
  return config.watchLabels.find((x) => x.label === label);
}

app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.body = "ok";
});

router.post("/webhook", (ctx) => {
  const body = ctx.request.body as IGithubWebhookBody;
  const announcementConfig = findAnnouncementConfig(body.label.name);
  if (!announcementConfig) {
    return ctx.body = "ok";
  }

  const announcementKey = Announcement.generateKey(body.label.name, body.pull_request.number);

  switch (body.action) {
    case "labeled":
      const firstAnnounce = new Date();

      const announcementCallback = () => SlackWebhook.announce(
        announcementConfig,
        body.pull_request.number,
        body.pull_request.url,
        firstAnnounce,
      );

      Announcement.set(announcementKey, announcementConfig.intervalMs, announcementCallback);
      break;

    case "unlabeled":
      Announcement.cancel(announcementKey);
      break;
  }

  return ctx.body = "ok";
});

app.use(router.routes());

app.on("error", (err, ctx) => {
  console.error(err); // tslint:disable-line
});

app.listen(3000);
