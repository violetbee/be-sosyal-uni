export const publishedTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " yıl önce";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " ay önce";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " gün önce";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " saat önce";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " dakika önce";
  }
  return Math.floor(seconds) + " saniye önce";
};
