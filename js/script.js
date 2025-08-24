// ----------- Update Main Product Image and Title -----------
function updateMainImage(el) {
  const main = document.getElementById('mainimg');
  const title = document.querySelector('.product-title');
  
  // Set main image source to the clicked thumbnail
  main.src = el.src;

  // Update product title if provided in dataset
  if (el.dataset.title) {
    title.textContent = el.dataset.title;
  }
}

// ----------- Modal: Open and Close for Size Chart -----------
function openModal() {
  document.getElementById('sizeChartModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('sizeChartModal').style.display = 'none';
}

// Close modal on ESC key press
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// Close modal when clicked outside the modal content
window.addEventListener('click', function(e) {
  const modal = document.getElementById('sizeChartModal');
  if (e.target === modal) closeModal();
});

function selectColor(btn) {
    // Remove active from all color buttons
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    
    // Add 'active' class to the selected color
    btn.classList.add('active');

    // Update main image and title based on selected color
    const main = document.getElementById('mainimg');
    const title = document.querySelector('.product-title');
    main.src = btn.dataset.img;
    title.textContent = `${btn.dataset.color} Variant`;
}

// ----------- Size Selection: Mark Button Active and Update Label -----------
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove 'active' from all size buttons
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        // Add 'active' to clicked size button
        btn.classList.add('active');
    });
});

document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    // Remove 'active' from all buttons
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    // Add 'active' to clicked button
    btn.classList.add('active');
    // Update the size label
    document.getElementById('selectedSizeLabel').textContent = `Selected Size: ${btn.textContent}`;
  });
});

// ----------- Compare Colours Modal Logic -----------
const thumbnailImgs = document.querySelectorAll('.thumbnail-image img');
const swatchGrid = document.getElementById('swatchGrid');
const comparePreview = document.getElementById('comparePreview');
const selectedSwatches = new Set();

// Open Compare Modal and Generate Swatch Grid
function openCompareModal() {
  swatchGrid.innerHTML = '';
  comparePreview.innerHTML = '';
  selectedSwatches.clear();

  // Generate swatches from thumbnails
  thumbnailImgs.forEach((img, index) => {
    const swatch = document.createElement('img');
    swatch.src = img.src;
    swatch.alt = img.alt;
    swatch.className = 'swatch-item';
    swatch.title = img.dataset.title || img.alt;

    // Toggle selection on click
    swatch.addEventListener('click', () => {
      if (swatch.classList.contains('selected')) {
        swatch.classList.remove('selected');
        selectedSwatches.delete(swatch.src);
      } else {
        swatch.classList.add('selected');
        selectedSwatches.add(swatch.src);
      }
      updateComparePreview();
    });

    swatchGrid.appendChild(swatch);
  });

  // Display the modal
  document.getElementById('compareModal').style.display = 'flex';
}

// Close Compare Modal
function closeCompareModal() {
  document.getElementById('compareModal').style.display = 'none';
}

// Update Compare Image Preview Area
function updateComparePreview() {
  comparePreview.innerHTML = '';
  selectedSwatches.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    comparePreview.appendChild(img);
  });
}

// ----------- Bundle Total Price Calculation -----------
function updateBundleTotal() {
  const prices = document.querySelectorAll('.bundle-product .price');
  let total = 0;

  // Sum prices using data-price attributes
  prices.forEach(p => {
    total += parseFloat(p.dataset.price);
  });

  // Update the total display
  document.getElementById('bundleTotal').textContent = total.toFixed(2);
}

// Run once on page load
updateBundleTotal();

// ----------- Product Tabs Functionality -----------
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to the clicked tab and its content
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});
