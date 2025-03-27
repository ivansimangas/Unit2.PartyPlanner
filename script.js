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
