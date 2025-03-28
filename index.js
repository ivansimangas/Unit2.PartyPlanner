/**
 * @typedef Party
 * @property {number} id - unique identifier for the party
 * @property {string} name - name of the party
 * @property {string} description - description of the party
 * @property {string} date - date of the party
 * @property {string} location - location where the party will be held
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2109-CPU-RM-WEB-PT"; // cohort-specific path
const RESOURCE = "/parties"; // resource path for parties
const API = BASE + COHORT + RESOURCE; // complete API URL

// === State ===
let parties = []; // Array to store the list of parties
let selectedParty = {}; // Object to store details of the selected party

/**
 * Fetch all parties from the API and update the state
 */
async function getParties() {
  try {
    const response = await fetch(API); // Fetch data from the API
    if (!response.ok) throw new Error("Failed to fetch parties!"); // Throw error if fetch fails
    const result = await response.json(); // Convert response to JavaScript object
    parties = result.data; // Update the state with fetched parties
    render(); // Re-render the UI after fetching data
  } catch (error) {
    console.error("Error fetching parties:", error); // Log any errors
  }
}

/**
 * Fetch details of a specific party based on the ID
 * @param {number} id - The ID of the party to fetch details for
 */
async function getPartyDetails(id) {
  try {
    const response = await fetch(`${API}/${id}`); // Fetch details for a specific party
    if (!response.ok) throw new Error("Failed to fetch party details!"); // Handle failed request
    const result = await response.json(); // Convert response to JavaScript object
    selectedParty = result.data; // Update the state with the selected party's details
    render(); // Re-render the UI to show the selected party's details
  } catch (error) {
    console.error("Error fetching party details:", error); // Log any errors
  }
}

// === Components ===

/**
 * Create a list of party names as clickable items
 * @returns {HTMLElement} - The list element containing party names
 */
function PartyList() {
  const $list = document.createElement("ul");
  $list.classList.add("party-list");

  parties.forEach((party) => {
    const $listItem = document.createElement("li");
    $listItem.textContent = party.name;
    $listItem.addEventListener("click", () => {
      getPartyDetails(party.id); // Fetch and display party details when clicked
    });
    $list.appendChild($listItem);
  });

  return $list;
}

/**
 * Create a component to display the details of a selected party
 * @param {Party} party - The party object to display
 * @returns {HTMLElement} - The card element displaying the party's details
 */
function PartyCard(party) {
  const $card = document.createElement("article");
  $card.classList.add("party-card");
  $card.innerHTML = `
    <h3>${party.name}</h3>
    <p><strong>Date:</strong> ${party.date}</p>
    <p><strong>Location:</strong> ${party.location}</p>
    <p><strong>Description:</strong> ${party.description}</p>
  `;
  return $card;
}

/**
 * Create a message asking the user to select a party
 * @returns {HTMLElement} - The message element prompting the user to select a party
 */
function NoPartySelected() {
  const $message = document.createElement("p");
  $message.textContent = "Please select a party to view more details.";
  return $message;
}

// === Render ===

/**
 * Render the UI based on the current state
 */
function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        ${
          parties.length > 0
            ? PartyList().outerHTML
            : "<p>No parties available</p>"
        }
      </section>
      <section id="party-details">
        <h2>Party Details</h2>
        ${
          Object.keys(selectedParty).length > 0
            ? PartyCard(selectedParty).outerHTML
            : NoPartySelected().outerHTML
        }
      </section>
    </main>
  `;
}

// === Initialize ===

/**
 * Initialize the application by fetching parties and rendering the UI
 */
async function init() {
  await getParties(); // Fetch all parties
  render(); // Render the initial state
}

init(); // Start the application
