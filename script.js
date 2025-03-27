/**
 * @typedef Party
 * @property {number} id - unique identifier for the party
 * @property {string} name - name of the party
 * @property {string} description - description of the party
 * @property {string} date - date of the party
 * @property {string} location - location where the party will be held
 * @property {string} guestList - list of guests attending the party
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2109-CPU-RM-WEB-PT"; // cohort-specific path
const RESOURCE = "/parties"; // resource path for recipes
const API = BASE + COHORT + RESOURCE; //complete API URL

// === State ===

let parties = [];
let selectedParty = [];

async function getParties() {
  try {
    const response = await fetch(API);
    if (!respopnse.ok) throw new Error("Failed to fetch parties!");
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.error("Error fetching parties", error);
  }
}

/**
 * @param {number} id - the ID of the party to fetch details for
 */

async function getPartyDetails(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch party details!");
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error("Error fetching parties", error);
  }
}

// === Components ===
/**
 * @param {Party} party - the party object to display
 * @returns {HTMLElement} - a card element displaying the party's details
 */

function PartyCard(party) {
  const $card = document.createElement("article");
  $card.classList.add("party-card");
  $card.innerHTML = `
  <h3>${party.name}</h3>
  <p><strong>Date:</strong>${party.date}</p>
  <p><strong>Location:</strong>${party.location}</p>
  <p><strong>Description:</strong>${party.description}</p>
  <p><strong>Guest List:</strong>${party.guestList}</p>
  `;
  return $card;
}

/**
 * @returns {HTMLElement} - a list element containing party names
 */

function PartyList() {
  const $list = document.createElement("ul");
  $list.classList.add("party-list");

  parties.forEach((party) => {
    const $listItem = document.createElement("li");
    $listItem.textContent = party.name;
    $listItem.addEventListener("click", () => {
      getPartyDetails(party.id);
    });
    $list.appendChild($listItem);
  });
  return $list;
}

/**
 * @returns {HTMLElement} - a message prompting the user to select a party
 */

function NoPartySelected() {
  const $message = document.createElement("p");
  $messsage.textContent = "Please select a party to view more details.";
  return $message;
}

// === Render ===

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Party Planner</h1>
  <main>
    <section>
      <h2>
      ${
        parties.length > 0
          ? PartyList().outerHTML
          : "<p>No parties available</p>"
      }  <!-- Render list of parties or a message if no parties exist -->
      </section>
      <section id="party-details">
        <h2>Party Details</h2>
        ${
          selectedParty
            ? PartyCard(selectedParty).outerHTML
            : NoPartySelected().outerHTML
        }  <!-- Render selected party details or message if no party is selected -->
      </section>
      </h2>
    </section>
  </main>
  `;
}

// === Initialize ===

async function init() {
  await getParties();
  render();
}

init();
