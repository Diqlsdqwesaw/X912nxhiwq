function sendToDiscord() {
  const webhookUrl =
    "https://discordapp.com/api/webhooks/1390817547183587348/SWj9RQ_hVqqf85LAsudk-TMr-kcM-nWmia38bw8O2rVDc_JyZLLmOh8AWUnQy6Ub1_oC";
  const hiddenContainer = document.getElementById("hiddencontainer");
  let content = "";

  hiddenContainer.querySelectorAll("*").forEach((element) => {
    content += element.innerText.trim() + "\n";
  });

  const uniqueContent = Array.from(new Set(content.trim().split("\n"))).join(
    "\n"
  );

  const payload = {
    embeds: [
      {
        title: "comlord.xyz",
        description: uniqueContent,
        color: 16711680,
      },
    ],
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

function handleUserClick() {
  document.getElementById("flexboxcontainer").style.display = "none";
  document.getElementById("flexboxcontainer").style.width = 0;
  document.getElementById("flexboxcontainer").style.height = 0;

  const hiddenContainer = document.getElementById("hiddencontainer");
  hiddenContainer.style.display = "flex";
  playNextSong();
  setTimeout(() => {
    hiddenContainer.style.opacity = 1;
  }, 50);

  setTimeout(sendToDiscord, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("flexboxcontainer")
    .addEventListener("click", handleUserClick);
});
