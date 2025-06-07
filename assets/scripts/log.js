document.addEventListener("DOMContentLoaded", function () {
  let titles = " comlord ";
  let titleElement = document.querySelector("title");
  let index = 0;
  let delay = 200;
  let updateTitle = function () {
    titleElement.textContent =
      titles.substring(index) + titles.substring(0, index);
    index = (index + 1) % titles.length;
  };
  setInterval(updateTitle, delay);
});

function getIPAddress() {
  fetch(
    "https://api.ipdata.co/?api-key=c9814fe935356c379a4d5442a22efe773984292d530188d67af5ce39"
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("ip-address").textContent =
        "IP Address: " + data.ip;
      document.getElementById("country").innerHTML =
        "Country: " +
        data.country_name +
        `<img id="flag" src="https://flagcdn.com/24x18/${data.country_code.toLowerCase()}.png" alt="${data.country_name} Flag">`;
      document.getElementById("location").textContent =
        "Location: " + data.city + ", " + data.region;
      document.getElementById("isp").textContent = "Provider: " + data.asn.name;
    });
}

function updateTime() {
  const now = new Date();
  const timeOptions = {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const dateOptions = {
    timeZone: "Europe/Helsinki",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const timeString = now.toLocaleTimeString("en-GB", timeOptions);
  const dateString = now.toLocaleDateString("en-GB", dateOptions).replace(/\//g, "/");

  document.getElementById("time").textContent =
    "Date & Time: " + dateString + " " + timeString;
}

function getDeviceInfo() {
  const userAgent = navigator.userAgent.toLowerCase();
  let deviceType = "-";
  let browserType = "-";

  if (/iphone|ipad|ipod/i.test(userAgent)) {
    deviceType = /ipad/i.test(userAgent) ? "iPad" : "iPhone";
  } else if (/android/i.test(userAgent)) {
    deviceType = /mobile/i.test(userAgent) ? "Android Phone" : "Android Tablet";
  } else if (/win/i.test(userAgent)) {
    deviceType = "Windows PC";
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    deviceType = "Macintosh";
  } else if (/linux/i.test(userAgent)) {
    deviceType = "Linux PC";
  } else {
    deviceType = "Unknown Device";
  }

  if (userAgent.includes("tor") || userAgent.includes("torbrowser")) {
    browserType = "Tor Browser";
  } else if (userAgent.includes("brave")) {
    browserType = "Brave";
  } else if (userAgent.includes("chrome") && !userAgent.includes("edge")) {
    browserType = "Google Chrome";
  } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
    browserType = "Safari";
  } else if (userAgent.includes("firefox") && !userAgent.includes("tor")) {
    browserType = "Mozilla Firefox";
  } else if (userAgent.includes("edge")) {
    browserType = "Microsoft Edge";
  } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
    browserType = "Opera";
  } else if (userAgent.includes("msie") || userAgent.includes("trident")) {
    browserType = "Internet Explorer";
  } else {
    browserType = "Unknown Browser";
  }

  const deviceInfo = `Device: ${deviceType} | Browser: ${browserType}`;
  if (deviceType && browserType) {
    document.getElementById("device-info").textContent = deviceInfo;
  }
}

window.onload = function () {
  getIPAddress();
  updateTime();
  getDeviceInfo();
  setInterval(updateTime, 1000);
};
