"use strict";
const tableTag = document.querySelector("table");
const tbodyTag = document.querySelector("tbody");
let i, j, temp;

for (i = 0; i < 3; i++) {
  const tr = document.createElement("tr");
  tbodyTag.appendChild("tr");
  console.log("hi");
  for (j = 0; j < 3; j++) {
    const td = document.createElement("td");
    td.addEventListener("click", (e) => {
      console.log(e.target);
    });
    tr.appendChild("td");
  }
}
