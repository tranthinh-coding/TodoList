export function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + "s";
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time) * 1000;
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }

    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }

    return value || 0;
  });

  return timeStr;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "Just now";
  } else if (diff < 3600) {
    // less 1 hour
    return pluralize(Math.ceil(diff / 60), " minute") + " ago";
  } else if (diff < 3600 * 24) {
    return pluralize(Math.ceil(diff / 3600), " hour") + " ago";
  } else if (diff < 3600 * 24 * 2) {
    return "1 day ago";
  }

  if (option) {
    return parseTime(time, option);
  }

  return (
    pluralize(d.getMonth() + 1, " month") + " " +
    pluralize(d.getDate(), " day") + " " +
    pluralize(d.getHours(), " day") + " " +
    pluralize(d.getMinutes(), " minute")
  );
}
