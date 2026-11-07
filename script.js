const issueData = {
  roads: {
    title: "Roads & footpaths",
    description: "For potholes, damaged roads, broken footpaths and similar public-realm concerns in Mumbai.",
    steps: [
      "Note the exact location: road name, nearest landmark and area. If safe, take a clear photograph.",
      "Use the BMC MARG grievance portal to register the concern, or call the BMC civic helpline on 1916.",
      "Keep the complaint or reference number if one is provided. Use it when following up.",
      "If the location is on a road managed by another authority, ask the official helpline which agency is responsible."
    ]
  },
  waste: {
    title: "Garbage & waste",
    description: "For missed collection, overflowing public bins and solid-waste concerns.",
    steps: [
      "Record the exact location and describe what is happening (for example, missed collection or an overflowing public bin).",
      "Use the BMC MARG grievance portal or call 1916 to ask for the complaint to be registered.",
      "Keep the reference number and check the complaint status through the official channel.",
      "Avoid touching or moving hazardous waste. Report its location to the relevant authority."
    ]
  },
  water: {
    title: "Water supply",
    description: "For water-supply interruptions or visible leaks that may fall within municipal responsibility.",
    steps: [
      "Write down the area, street and nearest landmark. Note when the interruption or leak began, if known.",
      "Contact BMC through the MARG portal or civic helpline 1916 and explain the issue and location.",
      "Ask whether the issue is municipal or managed by another provider or building-level system.",
      "Keep any complaint reference number for follow-up."
    ]
  },
  drainage: {
    title: "Drainage",
    description: "For blocked drains, overflowing manholes and waterlogging concerns.",
    steps: [
      "Identify the exact location and describe the issue. A photograph from a safe distance can help explain it.",
      "For a civic complaint, use BMC MARG or call 1916. Clearly state if the problem is worsening or affecting access.",
      "Do not enter floodwater or approach open manholes. Keep a safe distance and alert the relevant authority.",
      "Save the complaint reference number and use it for follow-up."
    ]
  },
  pests: {
    title: "Pest control",
    description: "For mosquito-related concerns and other municipal pest-control complaints.",
    steps: [
      "Describe the location and the nature of the concern (for example, stagnant water or a recurring mosquito problem).",
      "Use the BMC MARG portal or call 1916 to ask for the complaint to be registered.",
      "If stagnant water is on private premises or inside a building, the responsible party may differ; ask the official channel for guidance.",
      "Keep the complaint reference number for follow-up."
    ]
  },
  buildings: {
    title: "Buildings & construction",
    description: "For building-related civic concerns. The correct authority can depend on the property and type of work.",
    steps: [
      "Record the address and describe the concern factually. Do not enter a restricted or unsafe site to collect information.",
      "Contact BMC through MARG or 1916 and ask which department or authority handles the issue.",
      "For immediate danger to life or structural safety, move away from the area and contact emergency services.",
      "Keep the complaint reference number and any official response."
    ]
  }
};

const search = document.getElementById("issueSearch");
const cards = [...document.querySelectorAll(".issue-card")];
const noResults = document.getElementById("noResults");
const detail = document.getElementById("issueDetail");

search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const match = (card.dataset.terms + " " + card.innerText).toLowerCase().includes(query);
    card.hidden = !match;
    if (match) visible++;
  });
  noResults.hidden = visible !== 0;
  if (query) detail.hidden = true;
});

document.querySelectorAll(".issue-open").forEach(button => {
  button.addEventListener("click", () => {
    const item = issueData[button.dataset.issue];
    document.getElementById("detailTitle").textContent = item.title;
    document.getElementById("detailDescription").textContent = item.description;
    const list = document.getElementById("detailSteps");
    list.replaceChildren(...item.steps.map(step => {
      const li = document.createElement("li");
      li.textContent = step;
      return li;
    }));
    detail.hidden = false;
    detail.scrollIntoView({behavior:"smooth", block:"nearest"});
  });
});

document.getElementById("detailClose").addEventListener("click", () => {
  detail.hidden = true;
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
