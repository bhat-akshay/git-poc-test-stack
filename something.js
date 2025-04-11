// Create a new div
const div = document.createElement('div');

// Style the div
div.style.padding = '10px';
div.style.border = '1px solid #ccc';
div.style.margin = '10px';
div.style.fontFamily = 'Arial, sans-serif';

// Generate and add random values
for (let i = 0; i < 5; i++) {
  const randomValue = Math.floor(Math.random() * 100);
  const p = document.createElement('p');
  p.textContent = `Random value ${i + 1}: ${randomValue}`;
  div.appendChild(p);
}

// Append the div to the body
document.body.appendChild(div);
