const data = {} as any;

function generateKey(label: string, prNumber: number) {
  return `${label}-${prNumber}`;
}

function set(announcementKey: string, intervalMs: number, callback: () => void) {
  if (data[announcementKey]) {
    cancel(announcementKey);
  }

  data[announcementKey] = setInterval(callback, intervalMs);
}

function cancel(announcementKey: string) {
  return clearInterval(data[announcementKey]);
}

export {
  set,
  cancel,
  generateKey,
};
